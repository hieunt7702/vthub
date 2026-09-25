'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Sparkles, Filter, RefreshCw, ShieldCheck, ExternalLink, DollarSign 
} from 'lucide-react';

interface BrokerProfile {
  id: string;
  name: string;
  slug: string;
  wikifxScore: string;
  wikifxUrl: string;
  fscaLicense: string;
  fscLicense: string;
  maxLeverage: string;
  minSpread: string;
  rebatePerLot: string;
  description: string;
  status: 'ACTIVE' | 'PENDING';
  updatedAt: string;
}

const DEFAULT_VT_BROKER: BrokerProfile[] = [
  {
    id: 'broker-vt-markets',
    name: 'VT Markets',
    slug: 'vt-markets',
    wikifxScore: '8.68 / 10',
    wikifxUrl: 'https://www.wikifx.com/vi/dealer/8421818926.html',
    fscaLicense: 'FSCA No. 50865 (Nam Phi)',
    fscLicense: 'FSC No. GB23202269 (Mauritius)',
    maxLeverage: '1:1000',
    minSpread: '0.0 Pip',
    rebatePerLot: '$15 USD / Lot Vàng',
    description: 'Đối tác chiến lược độc quyền số 1 tại VT Rewards Hub. Khớp lệnh ECN siêu tốc, miễn phí toàn bộ Bot EA và hỗ trợ nạp rút VietQR 24/7.',
    status: 'ACTIVE',
    updatedAt: new Date().toISOString()
  }
];

export default function AdminBrokersPage() {
  const [brokers, setBrokers] = useState<BrokerProfile[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vt_broker_profile');
      if (stored) {
        try { return JSON.parse(stored); } catch {}
      }
      localStorage.setItem('vt_broker_profile', JSON.stringify(DEFAULT_VT_BROKER));
    }
    return DEFAULT_VT_BROKER;
  });

  const [editItem, setEditItem] = useState<BrokerProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<BrokerProfile>>({
    name: 'VT Markets',
    slug: 'vt-markets',
    wikifxScore: '8.68 / 10',
    wikifxUrl: 'https://www.wikifx.com/vi/dealer/8421818926.html',
    fscaLicense: 'FSCA No. 50865',
    fscLicense: 'FSC No. GB23202269',
    maxLeverage: '1:1000',
    minSpread: '0.0 Pip',
    rebatePerLot: '$15 / Lot',
    description: 'Đối tác chiến lược độc quyền tại VT Rewards Hub.'
  });

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenEdit = (b: BrokerProfile) => {
    setEditItem(b);
    setFormData({ ...b });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = brokers.map((b) =>
      b.id === editItem?.id ? ({ ...b, ...formData, updatedAt: new Date().toISOString() } as BrokerProfile) : b
    );
    setBrokers(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vt_broker_profile', JSON.stringify(updated));
    }
    showNotification('Đã lưu thông tin hồ sơ sàn VT Markets thành công!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#00C2FF] text-slate-950 px-4 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#050D1A] border border-[#00C2FF]/20 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Đối Tác Chiến Lược Độc Quyền</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Quản Lý Hồ Sơ Sàn VT Markets & Backcom</h1>
          <p className="text-slate-400 text-xs mt-1">
            Quản lý giấy phép, xếp hạng WikiFX (8.68/10) và tỷ lệ hoàn phí Backcom hiển thị trên toàn hệ thống.
          </p>
        </div>
      </div>

      {/* Broker Profile Card */}
      <div className="bg-[#050D1A] border border-[#00C2FF]/20 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        {brokers.map((b) => (
          <div key={b.id} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="h-12 px-4 bg-white rounded-xl flex items-center justify-center font-black text-slate-950 text-lg shadow">
                  {b.name}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{b.name}</h3>
                    <span className="px-2.5 py-0.5 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] font-bold rounded-lg text-[10px]">
                      WikiFX: {b.wikifxScore}
                    </span>
                  </div>
                  <a
                    href={b.wikifxUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#00C2FF] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>Xem trang chứng chỉ WikiFX chính thức</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleOpenEdit(b)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] hover:brightness-110 text-white font-black rounded-xl text-xs shadow-lg shadow-[#00C2FF]/20 transition-all cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                <span>Chỉnh Sửa Hồ Sơ Sàn</span>
              </button>
            </div>

            {/* Grid Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#020712] border border-slate-800 rounded-2xl">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Tỷ Lệ Hoàn Phí Backcom</span>
                <strong className="text-[#00C2FF] text-lg font-black mt-1 block">{b.rebatePerLot}</strong>
              </div>
              <div className="p-4 bg-[#020712] border border-slate-800 rounded-2xl">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Giấy Phép FSCA (Nam Phi)</span>
                <strong className="text-white text-sm font-semibold mt-1 block">{b.fscaLicense}</strong>
              </div>
              <div className="p-4 bg-[#020712] border border-slate-800 rounded-2xl">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Giấy Phép FSC (Mauritius)</span>
                <strong className="text-white text-sm font-semibold mt-1 block">{b.fscLicense}</strong>
              </div>
              <div className="p-4 bg-[#020712] border border-slate-800 rounded-2xl">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Đòn Bẩy & Spread</span>
                <strong className="text-[#00C2FF] text-sm font-bold mt-1 block">{b.maxLeverage} • Từ {b.minSpread}</strong>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Mô Tả & Định Vị Thương Hiệu:</span>
              <p className="text-slate-300 text-xs leading-relaxed bg-[#020712] p-4 rounded-xl border border-slate-800/80">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#050D1A] border border-[#00C2FF]/30 rounded-3xl w-full max-w-xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-black text-white mb-4">Cập Nhật Hồ Sơ Sàn VT Markets</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Điểm WikiFX *</label>
                  <input
                    type="text"
                    required
                    value={formData.wikifxScore}
                    onChange={(e) => setFormData({ ...formData, wikifxScore: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="8.68 / 10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mức Hoàn Phí Backcom *</label>
                  <input
                    type="text"
                    required
                    value={formData.rebatePerLot}
                    onChange={(e) => setFormData({ ...formData, rebatePerLot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    placeholder="$15 USD / Lot"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Link Chứng Chỉ WikiFX *</label>
                <input
                  type="text"
                  required
                  value={formData.wikifxUrl}
                  onChange={(e) => setFormData({ ...formData, wikifxUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Giấy Phép FSCA</label>
                  <input
                    type="text"
                    value={formData.fscaLicense}
                    onChange={(e) => setFormData({ ...formData, fscaLicense: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Giấy Phép FSC</label>
                  <input
                    type="text"
                    value={formData.fscLicense}
                    onChange={(e) => setFormData({ ...formData, fscLicense: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mô Tả Đối Tác</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#020712] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white text-xs font-black rounded-xl shadow-lg shadow-[#00C2FF]/20 hover:brightness-110 transition-all"
                >
                  Lưu Thông Tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
