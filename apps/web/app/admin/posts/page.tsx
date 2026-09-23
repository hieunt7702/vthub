'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: string;
  createdAt: string;
}

const DEFAULT_POSTS: Post[] = [
  {
    id: '1',
    title: 'Top 5 sàn Forex uy tín nhất 2024',
    slug: 'top-5-san-forex',
    content: 'Nội dung bài viết đánh giá 5 sàn forex tốt nhất...',
    thumbnail: '',
    published: true,
    authorId: 'admin_1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Hướng dẫn sử dụng MT5 cơ bản',
    slug: 'huong-dan-mt5',
    content: 'Cách đặt lệnh, thêm chỉ báo trên MT5...',
    thumbnail: '',
    published: false,
    authorId: 'mod_1',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);

  // Search & Filter & Sort & Pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Post>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    thumbnail: '',
    published: true,
    authorId: 'admin_1'
  });

  const loadData = () => {
    setLoading(true);
    const stored = localStorage.getItem('bh_posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem('bh_posts', JSON.stringify(DEFAULT_POSTS));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      thumbnail: '',
      published: true,
      authorId: 'admin_1'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (post: Post) => {
    setEditPost(post);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      content: post.content || '',
      thumbnail: post.thumbnail || '',
      published: post.published !== undefined ? post.published : true,
      authorId: post.authorId || 'admin_1'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };

    const currentList = [...posts];
    if (editPost) {
      const idx = currentList.findIndex((p) => p.id === editPost.id);
      if (idx !== -1) {
        currentList[idx] = {
          ...editPost,
          ...payload
        };
      }
    } else {
      const newPost: Post = {
        ...payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      currentList.unshift(newPost);
    }

    setPosts(currentList);
    localStorage.setItem('bh_posts', JSON.stringify(currentList));
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này không?')) return;
    const filtered = posts.filter((p) => p.id !== id);
    setPosts(filtered);
    localStorage.setItem('bh_posts', JSON.stringify(filtered));
  };

  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filter & Search
  const filteredPosts = posts
    .filter((p) => {
      const matchesSearch =
        (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.authorId || '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === '' ? true : statusFilter === 'PUBLISHED' ? p.published === true : p.published === false;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = (valA as string).toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / rowsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Quản lý Bài Viết</h1>
          <p className="text-zinc-400 text-sm">Quản lý nội dung blog, tin tức, và kiến thức giao dịch.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition shadow-lg shadow-orange-500/20 text-sm whitespace-nowrap self-start sm:self-center"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Thêm Bài Viết Mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-4 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, tác giả..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />

          <details className="relative group w-full" data-hh-nav-dropdown="">
            <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
              <span>{statusFilter === '' ? 'Tất cả trạng thái' : statusFilter === 'PUBLISHED' ? 'Đã xuất bản (PUBLISHED)' : 'Bản nháp (DRAFT)'}</span>
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="absolute left-0 top-full mt-2 w-full z-50">
              <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                <button
                  onClick={(e) => { e.preventDefault(); setStatusFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                  className={`w-full text-left rounded px-3 py-2 text-sm transition ${statusFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                >
                  Tất cả trạng thái
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); setStatusFilter('PUBLISHED'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                  className={`w-full text-left rounded px-3 py-2 text-sm transition ${statusFilter === 'PUBLISHED' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                >
                  Đã xuất bản (PUBLISHED)
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); setStatusFilter('DRAFT'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                  className={`w-full text-left rounded px-3 py-2 text-sm transition ${statusFilter === 'DRAFT' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                >
                  Bản nháp (DRAFT)
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded flex flex-col flex-1 overflow-hidden shadow-xl min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 min-h-[300px]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort('title')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 select-none"
                >
                  Tiêu Đề {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('slug')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 select-none"
                >
                  Đường dẫn (Slug) {sortField === 'slug' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-4 font-bold">Mô tả</th>
                <th
                  onClick={() => handleSort('published')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 select-none"
                >
                  Trạng Thái {sortField === 'published' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('createdAt')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 select-none"
                >
                  Ngày Tạo {sortField === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">Đang tải...</td>
                </tr>
              ) : paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">Không có dữ liệu.</td>
                </tr>
              ) : (
                paginatedPosts.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-white max-w-[300px] truncate">{p.title || 'Chưa đặt tiêu đề'}</td>
                    <td className="px-6 py-4 text-zinc-300 font-semibold">{p.slug}</td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400 max-w-[200px] truncate">{p.content}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                        p.published
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                      }`}>
                        {p.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(p.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 text-right">
                      <details className="relative group text-left inline-block" data-hh-nav-dropdown="">
                        <summary className="list-none cursor-pointer p-1.5 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </summary>
                        <div className="absolute right-0 top-full mt-1 z-50 min-w-[120px] shadow-xl">
                          <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 flex flex-col gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="w-full text-left rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="w-full text-left rounded px-3 py-2 text-sm transition text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              Xóa
                            </button>
                          </div>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs select-none mt-auto shrink-0 z-10 sticky bottom-0">
            <div className="text-zinc-500">
              Hiển thị từ <strong className="text-white">{(currentPage - 1) * rowsPerPage + 1}</strong> đến{' '}
              <strong className="text-white">
                {Math.min(currentPage * rowsPerPage, filteredPosts.length)}
              </strong>{' '}
              trong tổng số <strong className="text-white">{filteredPosts.length}</strong> bài viết.
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 text-white font-bold rounded disabled:opacity-40 transition"
              >
                Trước
              </button>
              <span className="px-3 text-zinc-400">Trang {currentPage} / {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 text-white font-bold rounded disabled:opacity-40 transition"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Drawer */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-3xl h-full bg-zinc-950 border-l border-zinc-850 flex flex-col shadow-2xl animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editPost ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Tiêu đề bài viết</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Đường dẫn tĩnh (Slug)</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                      placeholder="VD: huong-dan-mt5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Ảnh bìa (Thumbnail URL)</label>
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Nội dung (Content)</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50 min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Trạng thái xuất bản</label>
                  <details className="relative group w-full" data-hh-nav-dropdown="">
                    <summary className="list-none cursor-pointer w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white flex items-center justify-between focus:outline-none focus:border-orange-500/50">
                      <span>{formData.published ? 'Đã xuất bản (PUBLISHED)' : 'Bản nháp (DRAFT)'}</span>
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="absolute left-0 top-full mt-2 w-full z-50">
                      <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, published: true }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.published ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          Đã xuất bản (PUBLISHED)
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, published: false }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${!formData.published ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          Bản nháp (DRAFT)
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
              
              <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 shrink-0 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded border border-zinc-800 text-zinc-400 hover:text-white text-sm font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white font-bold transition shadow-lg shadow-orange-500/20 text-sm"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
