'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Sparkles, ShieldCheck, Key, RefreshCw, Lock, Eye, ExternalLink
} from 'lucide-react';
import { 
  VTPassview, 
  STORAGE_KEYS, 
  INITIAL_PASSVIEWS, 
  useVTDataStore 
} from '../../../lib/dataStore';

export default function AdminPassviewsPage() {
  const [passviews, setPassviews] = useVTDataStore<VTPassview>(
    STORAGE_KEYS.PASSVIEWS,
    INITIAL_PASSVIEWS
  );

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editPassview, setEditPassview] = useState<VTPassview | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<VTPassview>>({
    brokerName: 'VT Markets',
    brokerId: 'vt-markets',
    brokerLogo: '/logo_white.webp',
    rating: '4.9',
    accountType: 'RAW ECN VIP',
    platform: 'MT5',
    status: 'Ổn định',
    server: 'VTMarkets-Live',
    login: '',
    passwordInvestor: '',
    reviewUrl: '/brokers/vt-markets'
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditPassview(null);
    setFormData({
      brokerName: 'VT Markets',
      brokerId: 'vt-markets',
      brokerLogo: '/logo_white.webp',
      rating: '4.9',
      accountType: 'RAW ECN VIP',
      platform: 'MT5',
      status: 'Ổn định',
      server: 'VTMarkets-Live',
      login: '',
      passwordInvestor: '',
      reviewUrl: '/brokers/vt-markets'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (pv: VTPassview) => {
    setEditPassview(pv);
    setFormData(pv);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.login?.trim() || !formData.passwordInvestor?.trim()) {
      alert('Vui lòng nhập đầy đủ Số tài khoản (Login) và Mật khẩu Investor!');
      return;
    }

    const payload: VTPassview = {
      id: editPassview?.id || `pv-${Date.now()}`,
      brokerName: formData.brokerName || 'VT Markets',
      brokerId: formData.brokerId || 'vt-markets',
      brokerLogo: formData.brokerLogo || '/logo_white.webp',
      rating: formData.rating || '4.9',
      accountType: formData.accountType || 'RAW ECN VIP',
      platform: (formData.platform as 'MT4' | 'MT5') || 'MT5',
      status: formData.status || 'Ổn định',
      server: formData.server || 'VTMarkets-Live',
      login: formData.login || '',
      passwordInvestor: formData.passwordInvestor || '',
      registerLinks: editPassview?.registerLinks || [
        { label: 'Mở Tài Khoản Nhận Backcom', href: 'https://www.vtmarkets.com/get-trading/?affid=8421818926', group: 'Link khách lẻ' },
        { label: 'Đăng Ký Đối Tác IB', href: '/ib-commission-overview', group: 'Link IB' }
      ],
      reviewUrl: formData.reviewUrl || '/brokers/vt-markets',
      createdAt: editPassview?.createdAt || new Date().toISOString()
    };

    if (editPassview) {
      setPassviews(passviews.map(p => p.id === editPassview.id ? payload : p));
      showNotification('Đã cập nhật tài khoản Passview thành công!');
    } else {
      setPassviews([payload, ...passviews]);
      showNotification('Đã thêm tài khoản Passview mới thành công!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, login: string) => {
    if (confirm(`Bạn có chắc muốn xóa tài khoản Passview ${login} không?`)) {
      setPassviews(passviews.filter(p => p.id !== id));
      showNotification('Đã xóa tài khoản Passview thành công!');
    }
  };

  const filteredPassviews = passviews.filter(p => {
    const q = search.toLowerCase();
    return p.brokerName.toLowerCase().includes(q) || p.server.toLowerCase().includes(q) || p.login.includes(q) || p.accountType.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#00C2FF] text-slate-950 font-bold px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,194,255,0.4)] animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#050D1A] border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Key className="w-8 h-8 text-[#00C2FF]" />
            <span>Quản Lý Tài Khoản Passview</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Dữ liệu đồng bộ trực tiếp thời gian thực lên trang công khai <strong className="text-[#00C2FF]">/passview</strong>.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,194,255,0.3)] hover:brightness-110 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Tài Khoản Passview</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm tài khoản theo số login, server, sàn..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#050D1A] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
        />
      </div>

      {/* Passview List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPassviews.map((pv) => (
          <div
            key={pv.id}
            className="bg-[#050D1A] border border-slate-800 p-6 rounded-3xl flex flex-col justify-between hover:border-[#00C2FF]/50 transition shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-lg border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] text-[10px] font-black uppercase">
                  {pv.platform} &bull; {pv.accountType}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  {pv.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-black text-white">{pv.brokerName}</h3>
                <span className="text-xs text-amber-400 font-bold">★ {pv.rating}</span>
              </div>

              <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Server:</span>
                  <span className="font-bold text-white">{pv.server}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Login (ID):</span>
                  <span className="font-bold text-[#00C2FF]">{pv.login}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Password Investor:</span>
                  <span className="font-bold text-amber-300">{pv.passwordInvestor}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleOpenEdit(pv)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#00C2FF] transition"
                title="Chỉnh sửa"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(pv.id, pv.login)}
                className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 transition"
                title="Xóa tài khoản"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredPassviews.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-[#050D1A] border border-slate-800 rounded-3xl text-slate-400 text-sm">
            Không tìm thấy tài khoản Passview nào phù hợp.
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#050D1A] border border-[#00C2FF]/40 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00C2FF]" />
              <span>{editPassview ? 'Chỉnh Sửa Passview' : 'Thêm Passview Mới'}</span>
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tên Sàn *</label>
                  <input
                    type="text"
                    required
                    value={formData.brokerName}
                    onChange={(e) => setFormData({ ...formData, brokerName: e.target.value })}
                    placeholder="VD: VT Markets"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nền Tảng</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'MT4' | 'MT5' })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  >
                    <option value="MT5">MetaTrader 5 (MT5)</option>
                    <option value="MT4">MetaTrader 4 (MT4)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Loại Tài Khoản</label>
                  <input
                    type="text"
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    placeholder="VD: RAW ECN VIP / STANDARD"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Trạng Thái</label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="VD: Ổn định / Live Trading"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Server Đăng Nhập *</label>
                <input
                  type="text"
                  required
                  value={formData.server}
                  onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                  placeholder="VD: VTMarkets-Live / VTMarkets-Live2"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Số Login (Tài Khoản) *</label>
                  <input
                    type="text"
                    required
                    value={formData.login}
                    onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                    placeholder="VD: 8820491"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mật Khẩu Investor (Read-only) *</label>
                  <input
                    type="text"
                    required
                    value={formData.passwordInvestor}
                    onChange={(e) => setFormData({ ...formData, passwordInvestor: e.target.value })}
                    placeholder="VD: VTRewards@2026"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-amber-300 focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white text-xs font-bold hover:brightness-110 transition cursor-pointer"
                >
                  Lưu & Đồng Bộ Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
