'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Sparkles, Filter, RefreshCw 
} from 'lucide-react';
import { 
  VTPost, 
  STORAGE_KEYS, 
  INITIAL_POSTS, 
  useVTDataStore 
} from '../../../lib/dataStore';

export default function AdminPostsPage() {
  const [posts, setPosts] = useVTDataStore<VTPost>(
    STORAGE_KEYS.POSTS,
    INITIAL_POSTS
  );

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState<VTPost | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<VTPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Tin Tức Thị Trường',
    author: 'VT Research Team',
    readTime: '5 phút đọc',
    thumbnail: '',
    isFeatured: true
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Tin Tức Thị Trường',
      author: 'VT Research Team',
      readTime: '5 phút đọc',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      isFeatured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: VTPost) => {
    setEditPost(p);
    setFormData({ ...p });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này? Trang /tin-tuc sẽ cập nhật ngay lập tức.')) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showNotification('Đã xóa bài viết và đồng bộ tức thì!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'bai-viet';

    if (editPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editPost.id ? ({ ...p, ...formData, slug } as VTPost) : p))
      );
      showNotification('Đã cập nhật bài viết thành công!');
    } else {
      const newPost: VTPost = {
        id: 'post-' + Date.now(),
        title: formData.title || 'Bài Viết Mới',
        slug,
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        category: formData.category || 'Tin Tức Thị Trường',
        author: formData.author || 'VT Research Team',
        readTime: formData.readTime || '5 phút đọc',
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        isFeatured: Boolean(formData.isFeatured),
        views: 1,
        publishedAt: new Date().toISOString()
      };
      setPosts((prev) => [newPost, ...prev]);
      showNotification('Đã tạo bài viết mới và hiển thị trực tiếp trên trang tin tức!');
    }
    setShowModal(false);
  };

  const handleResetDefaults = () => {
    if (confirm('Khôi phục danh sách bài viết gốc chuẩn VT Rewards Hub?')) {
      setPosts(INITIAL_POSTS);
      showNotification('Đã khôi phục dữ liệu bài viết gốc!');
    }
  };

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter ? p.category === categoryFilter : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#00C2FF] text-slate-950 px-4 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#050D1A] border border-[#00C2FF]/20 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Quản Trị Tin Tức & Kiến Thức Thị Trường</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Quản Lý Bài Viết & Phân Tích VT Markets</h1>
          <p className="text-slate-400 text-xs mt-1">
            Mọi bài viết xuất bản tại đây sẽ <strong>hiển thị ngay tức thì</strong> trên trang chủ và trang /tin-tuc.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 border border-slate-700 hover:border-[#00C2FF]/40 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Khôi phục</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] hover:brightness-110 text-white font-black rounded-xl text-xs shadow-lg shadow-[#00C2FF]/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Viết Bài Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#050D1A] p-4 border border-slate-800 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề bài viết..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#00C2FF] shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#00C2FF]"
          >
            <option value="">Tất cả chuyên mục</option>
            <option value="Tin Tức Thị Trường">Tin Tức Thị Trường</option>
            <option value="Chiến Lược MQL5">Chiến Lược MQL5</option>
            <option value="Hướng Dẫn VT Markets">Hướng Dẫn VT Markets</option>
            <option value="Phân Tích Kỹ Thuật">Phân Tích Kỹ Thuật</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#050D1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Tiêu Đề Bài Viết</th>
                <th className="py-3.5 px-4">Chuyên Mục</th>
                <th className="py-3.5 px-4">Tác Giả</th>
                <th className="py-3.5 px-4">Thời Gian Đọc</th>
                <th className="py-3.5 px-4">Lượt Xem</th>
                <th className="py-3.5 px-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Không tìm thấy bài viết nào phù hợp.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-[#08152B] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white group-hover:text-[#00C2FF] transition-colors line-clamp-1 max-w-md">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md mt-0.5">
                        {post.excerpt}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] font-bold rounded-lg text-[10px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {post.author}
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      {post.readTime}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {post.views?.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 bg-slate-800 hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050D1A] border border-[#00C2FF]/30 rounded-3xl w-full max-w-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-black text-white mb-4">
              {editPost ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Tin Tức / Phân Tích Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tiêu Đề Bài Viết *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Tiêu đề hấp dẫn, chuẩn SEO..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Chuyên Mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  >
                    <option value="Tin Tức Thị Trường">Tin Tức Thị Trường</option>
                    <option value="Chiến Lược MQL5">Chiến Lược MQL5</option>
                    <option value="Hướng Dẫn VT Markets">Hướng Dẫn VT Markets</option>
                    <option value="Phân Tích Kỹ Thuật">Phân Tích Kỹ Thuật</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tác Giả</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="VT Research Team"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Đoạn Tóm Tắt (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Tóm tắt ngắn gọn 1-2 câu hiển thị ở trang danh sách..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nội Dung Chi Tiết *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF] font-sans leading-relaxed"
                  placeholder="Nhập nội dung bài viết chi tiết..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ảnh Bìa (Thumbnail URL)</label>
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thời Gian Đọc</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="5 phút đọc"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white text-xs font-black rounded-xl shadow-lg shadow-[#00C2FF]/20 hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer"
                >
                  {editPost ? 'Lưu Thay Đổi' : 'Xuất Bản Bài Viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
