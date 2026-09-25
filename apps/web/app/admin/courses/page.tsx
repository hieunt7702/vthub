'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Sparkles, Filter, RefreshCw 
} from 'lucide-react';
import { 
  VTCourse, 
  STORAGE_KEYS, 
  INITIAL_COURSES, 
  useVTDataStore 
} from '../../../lib/dataStore';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useVTDataStore<VTCourse>(
    STORAGE_KEYS.COURSES,
    INITIAL_COURSES
  );

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState<VTCourse | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<VTCourse>>({
    title: '',
    slug: '',
    level: 'Cơ bản',
    duration: '6 Giờ',
    lessonsCount: 12,
    description: '',
    instructor: 'VT Rewards Academy',
    isFree: true
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditCourse(null);
    setFormData({
      title: '',
      slug: '',
      level: 'Cơ bản',
      duration: '6 Giờ',
      lessonsCount: 12,
      description: '',
      instructor: 'VT Rewards Academy',
      isFree: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (c: VTCourse) => {
    setEditCourse(c);
    setFormData({ ...c });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa khóa học này? Trang /courses sẽ cập nhật ngay tức thì.')) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showNotification('Đã xóa khóa học thành công!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'khoa-hoc';

    if (editCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editCourse.id ? ({ ...c, ...formData, slug } as VTCourse) : c))
      );
      showNotification('Đã cập nhật khóa học và đồng bộ lên trang web!');
    } else {
      const newCourse: VTCourse = {
        id: 'crs-' + Date.now(),
        title: formData.title || 'Khóa Học Mới',
        slug,
        level: (formData.level as any) || 'Cơ bản',
        duration: formData.duration || '6 Giờ',
        lessonsCount: Number(formData.lessonsCount || 10),
        description: formData.description || '',
        instructor: formData.instructor || 'VT Rewards Academy',
        isFree: true,
        enrolledCount: Math.floor(Math.random() * 300) + 50,
        createdAt: new Date().toISOString()
      };
      setCourses((prev) => [newCourse, ...prev]);
      showNotification('Đã thêm khóa học mới thành công!');
    }
    setShowModal(false);
  };

  const handleResetDefaults = () => {
    if (confirm('Khôi phục danh sách khóa học mặc định?')) {
      setCourses(INITIAL_COURSES);
      showNotification('Đã khôi phục dữ liệu gốc!');
    }
  };

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchLvl = levelFilter ? c.level === levelFilter : true;
    return matchSearch && matchLvl;
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
            <span>Đào Tạo & Học Viện Trader</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Quản Lý Khóa Học VT Rewards Academy</h1>
          <p className="text-slate-400 text-xs mt-1">
            Quản lý giáo trình trading bot, thuật toán MQL5 và phân tích thị trường miễn phí cho cộng đồng.
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
            <span>Thêm Khóa Học</span>
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
            placeholder="Tìm theo tên khóa học..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#00C2FF] shrink-0" />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#00C2FF]"
          >
            <option value="">Tất cả trình độ</option>
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trung cấp">Trung cấp</option>
            <option value="Nâng cao">Nâng cao</option>
            <option value="Master">Master</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-[#050D1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Tên Khóa Học</th>
                <th className="py-3.5 px-4">Trình Độ</th>
                <th className="py-3.5 px-4">Thời Lượng</th>
                <th className="py-3.5 px-4">Số Bài Học</th>
                <th className="py-3.5 px-4">Học Viên</th>
                <th className="py-3.5 px-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Chưa có khóa học nào.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#08152B] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white group-hover:text-[#00C2FF] transition-colors line-clamp-1 max-w-md">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md mt-0.5">
                        {c.description}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] font-bold rounded-lg text-[10px]">
                        {c.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {c.duration}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {c.lessonsCount} bài
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {c.enrolledCount?.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 bg-slate-800 hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
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
          <div className="bg-[#050D1A] border border-[#00C2FF]/30 rounded-3xl w-full max-w-xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-black text-white mb-4">
              {editCourse ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Khóa Học *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Ví dụ: Nhập Môn Trading Bot & Tối Ưu Hóa EA Trên MT5"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Trình Độ *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  >
                    <option value="Cơ bản">Cơ bản</option>
                    <option value="Trung cấp">Trung cấp</option>
                    <option value="Nâng cao">Nâng cao</option>
                    <option value="Master">Master</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thời Lượng</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="6 Giờ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Số Bài Học</label>
                  <input
                    type="number"
                    value={formData.lessonsCount}
                    onChange={(e) => setFormData({ ...formData, lessonsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mô Tả Khóa Học *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Mô tả nội dung đào tạo..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Giảng Viên / Tổ Chức Đào Tạo</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="VT Rewards Academy"
                />
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
                  {editCourse ? 'Lưu Thay Đổi' : 'Tạo Khóa Học Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
