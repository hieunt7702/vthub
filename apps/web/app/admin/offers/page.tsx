'use client';

import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Sparkles, Filter, RefreshCw, Gift, DollarSign, ExternalLink 
} from 'lucide-react';
import { 
  VTOffer, 
  STORAGE_KEYS, 
  INITIAL_OFFERS, 
  useVTDataStore 
} from '../../../lib/dataStore';

export default function AdminOffersPage() {
  const [offers, setOffers] = useVTDataStore<VTOffer>(
    STORAGE_KEYS.OFFERS,
    INITIAL_OFFERS
  );

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editOffer, setEditOffer] = useState<VTOffer | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const [formData, setFormData] = useState<Partial<VTOffer>>({
    title: '',
    broker: 'VT Markets',
    tag: 'QUYỀN LỢI ĐỘC QUYỀN',
    badgeColor: 'bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30',
    description: '',
    highlights: ['Hoàn phí trực tiếp về tài khoản MT5', 'Thanh toán tự động hàng ngày'],
    actionText: 'Nhận Hoàn Phí Ngay',
    actionLink: 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
    referralUrl: 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
    isFeatured: true,
    hot: false,
    validUntil: 'Vô thời hạn'
  });

  const [highlightInput, setHighlightInput] = useState('');

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditOffer(null);
    setFormData({
      title: '',
      broker: 'VT Markets',
      tag: 'QUYỀN LỢI ĐỘC QUYỀN',
      badgeColor: 'bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30',
      description: '',
      highlights: ['Hoàn phí trực tiếp về tài khoản MT5', 'Thanh toán tự động hàng ngày'],
      actionText: 'Nhận Hoàn Phí Ngay',
      actionLink: 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
      referralUrl: 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
      isFeatured: true,
      hot: false,
      validUntil: 'Vô thời hạn'
    });
    setHighlightInput('');
    setShowModal(true);
  };

  const handleOpenEdit = (offer: VTOffer) => {
    setEditOffer(offer);
    setFormData(offer);
    setHighlightInput(offer.highlights ? offer.highlights.join('\n') : '');
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Vui lòng nhập tên chương trình ưu đãi!');
      return;
    }

    const hlList = highlightInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: VTOffer = {
      id: editOffer?.id || `off-${Date.now()}`,
      title: formData.title || '',
      broker: formData.broker || 'VT Markets',
      tag: formData.tag || 'ƯU ĐÃI ĐẶC BIỆT',
      badgeColor: formData.badgeColor || 'bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30',
      description: formData.description || '',
      highlights: hlList.length > 0 ? hlList : (formData.highlights || []),
      actionText: formData.actionText || 'Nhận Ưu Đãi',
      actionLink: formData.actionLink || 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
      referralUrl: formData.referralUrl || 'https://www.vtmarkets.com/get-trading/?affid=8421818926',
      isFeatured: formData.isFeatured ?? true,
      hot: formData.hot ?? false,
      validUntil: formData.validUntil || 'Vô thời hạn',
      createdAt: editOffer?.createdAt || new Date().toISOString()
    };

    if (editOffer) {
      setOffers(offers.map(o => o.id === editOffer.id ? payload : o));
      showNotification('Đã cập nhật chương trình ưu đãi thành công!');
    } else {
      setOffers([payload, ...offers]);
      showNotification('Đã tạo chương trình ưu đãi mới thành công!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa ưu đãi "${name}" không?`)) {
      setOffers(offers.filter(o => o.id !== id));
      showNotification('Đã xóa ưu đãi thành công!');
    }
  };

  const filteredOffers = offers.filter(o => {
    const q = search.toLowerCase();
    return o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.broker.toLowerCase().includes(q);
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
            <Gift className="w-8 h-8 text-[#00C2FF]" />
            <span>Quản Lý Ưu Đãi & Hoàn Phí</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Dữ liệu đồng bộ trực tiếp thời gian thực lên trang <strong className="text-[#00C2FF]">/offers-bonus</strong> và trang chủ.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,194,255,0.3)] hover:brightness-110 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Ưu Đãi Mới</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm ưu đãi theo tiêu đề, nội dung, sàn..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#050D1A] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
          />
        </div>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#050D1A] border border-slate-800 p-6 rounded-3xl flex flex-col justify-between hover:border-[#00C2FF]/50 transition shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-black uppercase ${offer.badgeColor || 'bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30'}`}>
                  {offer.tag || 'ƯU ĐÃI'}
                </span>
                <div className="flex items-center gap-1.5">
                  {offer.hot && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00C2FF] text-slate-950 text-[9px] font-black uppercase">
                      Hot Pick
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-medium">Hạn: {offer.validUntil}</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white mb-2">{offer.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">{offer.description}</p>

              {offer.highlights && offer.highlights.length > 0 && (
                <div className="space-y-1 mb-6">
                  {offer.highlights.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="text-[#00C2FF]">&bull;</span>
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <a
                href={offer.actionLink || offer.referralUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00C2FF] hover:underline flex items-center gap-1 font-bold"
              >
                <span>{offer.actionText || 'Xem Liên Kết'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(offer)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#00C2FF] transition"
                  title="Chỉnh sửa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(offer.id, offer.title)}
                  className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 transition"
                  title="Xóa ưu đãi"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredOffers.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-[#050D1A] border border-slate-800 rounded-3xl text-slate-400 text-sm">
            Không tìm thấy chương trình ưu đãi nào phù hợp.
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#050D1A] border border-[#00C2FF]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00C2FF]" />
              <span>{editOffer ? 'Chỉnh Sửa Ưu Đãi' : 'Thêm Ưu Đãi Mới'}</span>
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tiêu Đề Ưu Đãi *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="VD: Chương Trình Hoàn Phí Backcom Tự Động..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tag Nhãn</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="VD: QUYỀN LỢI ĐỘC QUYỀN"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thời Hạn</label>
                  <input
                    type="text"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    placeholder="VD: Vô thời hạn / Đến 31/12/2026"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mô Tả Chi Tiết *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả quyền lợi hoàn phí, điều kiện nhận thưởng..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Điểm Nổi Bật (Mỗi dòng 1 gạch đầu dòng)</label>
                <textarea
                  rows={3}
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  placeholder="Hoàn phí trực tiếp về tài khoản MT5&#10;Thanh toán tự động mỗi ngày&#10;Không điều kiện rút tiền"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nút Hành Động (Text)</label>
                  <input
                    type="text"
                    value={formData.actionText}
                    onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                    placeholder="VD: Nhận Hoàn Phí Ngay"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Link Hành Động (URL/Route)</label>
                  <input
                    type="text"
                    value={formData.actionLink}
                    onChange={(e) => setFormData({ ...formData, actionLink: e.target.value })}
                    placeholder="VD: https://www.vtmarkets.com/... hoặc /rewards"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hot}
                    onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                    className="rounded text-[#00C2FF] focus:ring-0"
                  />
                  <span>Đánh dấu Hot Pick</span>
                </label>
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
