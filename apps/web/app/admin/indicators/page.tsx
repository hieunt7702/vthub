'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Download, CheckCircle2, 
  Sparkles, Filter, RefreshCw 
} from 'lucide-react';
import { 
  VTIndicator, 
  STORAGE_KEYS, 
  INITIAL_INDICATORS, 
  useVTDataStore 
} from '../../../lib/dataStore';

export default function AdminIndicatorsPage() {
  const [indicators, setIndicators] = useVTDataStore<VTIndicator>(
    STORAGE_KEYS.INDICATORS,
    INITIAL_INDICATORS
  );

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndicator, setEditIndicator] = useState<VTIndicator | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<VTIndicator>>({
    name: '',
    slug: '',
    description: '',
    downloadUrl: '',
    platform: 'MT5',
    category: 'SMC Algorithm',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '5.0',
    version: '1.0.0',
    isFeatured: true
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditIndicator(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      downloadUrl: '/downloads/ea-vtm/Apex_Oracle_SMC.ex5',
      platform: 'MT5',
      category: 'SMC Algorithm',
      price: 0,
      author: 'VT Markets Quant Lab',
      rating: '5.0',
      version: '1.0.0',
      isFeatured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (ind: VTIndicator) => {
    setEditIndicator(ind);
    setFormData({ ...ind });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa Bot EA này? Dữ liệu trên trang web sẽ được cập nhật ngay lập tức.')) {
      setIndicators((prev) => prev.filter((item) => item.id !== id));
      showNotification('Đã xóa Bot EA thành công!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'indicator';

    if (editIndicator) {
      setIndicators((prev) =>
        prev.map((item) =>
          item.id === editIndicator.id
            ? ({ ...item, ...formData, slug, price: Number(formData.price || 0) } as VTIndicator)
            : item
        )
      );
      showNotification('Đã cập nhật Bot EA thành công!');
    } else {
      const newInd: VTIndicator = {
        id: 'ea-' + Date.now(),
        name: formData.name || 'Bot EA Mới',
        slug,
        description: formData.description || '',
        downloadUrl: formData.downloadUrl || '/downloads/ea-vtm/Apex_Oracle_SMC.ex5',
        platform: formData.platform || 'MT5',
        category: formData.category || 'SMC Algorithm',
        price: Number(formData.price || 0),
        author: formData.author || 'VT Markets Quant Lab',
        rating: formData.rating || '5.0',
        downloadsCount: Math.floor(Math.random() * 500) + 100,
        version: formData.version || '1.0.0',
        isFeatured: Boolean(formData.isFeatured),
        createdAt: new Date().toISOString()
      };
      setIndicators((prev) => [newInd, ...prev]);
      showNotification('Đã thêm mới Bot EA thành công!');
    }
    setShowModal(false);
  };

  const handleResetDefaults = () => {
    if (confirm('Khôi phục danh sách 9 Bot EA MT5 gốc của VT Rewards Hub?')) {
      setIndicators(INITIAL_INDICATORS);
      showNotification('Đã khôi phục dữ liệu gốc!');
    }
  };

  const filtered = indicators.filter((ind) => {
    const matchSearch = ind.name.toLowerCase().includes(search.toLowerCase()) || ind.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter ? ind.category === categoryFilter : true;
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
            <span>Bộ 9 Expert Advisor VT Markets Độc Quyền</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Quản Lý Bộ 9 Bot EA MT5 & Thuật Toán</h1>
          <p className="text-slate-400 text-xs mt-1">
            Mọi thao tác thêm/sửa/xóa tại đây sẽ được <strong>đồng bộ tức thì</strong> lên trang chủ và trang /indicators.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 border border-slate-700 hover:border-[#00C2FF]/40 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Khôi phục mặc định"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Khôi phục</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] hover:brightness-110 text-white font-black rounded-xl text-xs shadow-lg shadow-[#00C2FF]/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Bot EA Mới</span>
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
            placeholder="Tìm theo tên Bot EA..."
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
            <option value="">Tất cả thuật toán</option>
            <option value="SMC Algorithm">SMC Algorithm</option>
            <option value="DCA / Grid">DCA / Grid</option>
            <option value="Price Action">Price Action</option>
            <option value="Multi-Strategy">Multi-Strategy</option>
          </select>
        </div>
      </div>

      {/* Indicators Table */}
      <div className="bg-[#050D1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Tên Bot EA</th>
                <th className="py-3.5 px-4">Nền Tảng</th>
                <th className="py-3.5 px-4">Thuật Toán</th>
                <th className="py-3.5 px-4">Chi Phí</th>
                <th className="py-3.5 px-4">Lượt Tải</th>
                <th className="py-3.5 px-4">File .ex5</th>
                <th className="py-3.5 px-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Không tìm thấy Bot EA nào phù hợp.
                  </td>
                </tr>
              ) : (
                filtered.map((ind) => (
                  <tr key={ind.id} className="hover:bg-[#08152B] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                        {ind.name}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                        {ind.description}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] font-bold rounded-lg text-[10px]">
                        {ind.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300">{ind.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] font-bold rounded-lg text-[10px]">
                        Miễn phí 100%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {ind.downloadsCount?.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={ind.downloadUrl}
                        download
                        className="inline-flex items-center gap-1 text-[11px] text-[#00C2FF] hover:underline font-mono"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[130px]">{ind.downloadUrl}</span>
                      </a>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(ind)}
                          className="p-1.5 bg-slate-800 hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ind.id)}
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
              {editIndicator ? 'Chỉnh Sửa Bot EA MT5' : 'Thêm Mới Bot EA MT5'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Bot EA *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Ví dụ: Apex Oracle SMC v1.0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nền Tảng *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  >
                    <option value="MT5">MetaTrader 5 (MT5)</option>
                    <option value="TradingView">TradingView</option>
                    <option value="cTrader">cTrader</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thuật Toán *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="SMC Algorithm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mô Tả Thuật Toán *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  placeholder="Mô tả cơ chế hoạt động, khung thời gian khuyên dùng..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Đường Dẫn File (.ex5) *</label>
                <input
                  type="text"
                  required
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#00C2FF]"
                  placeholder="/downloads/ea-vtm/Apex_Oracle_SMC.ex5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Cặp Tiền Hỗ Trợ</label>
                  <input
                    type="text"
                    value={formData.supportedSymbols || 'XAUUSD-STD, XAUUSD-STDc'}
                    onChange={(e) => setFormData({ ...formData, supportedSymbols: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phiên Bản (Version)</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="1.0.0"
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
                  {editIndicator ? 'Lưu Thay Đổi' : 'Tạo Bot EA Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
