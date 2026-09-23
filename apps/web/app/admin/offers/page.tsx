'use client';

import { useState, useEffect } from 'react';

interface Offer {
  id: string;
  title: string;
  description: string;
  type: string; // WELCOME_BONUS, DEPOSIT_BONUS, NO_DEPOSIT, REFUND_BONUS
  amount: number;
  isHot: boolean;
  brokerId: string;
  brokerName: string;
  validUntil: string;
  createdAt: string;
}

const DEFAULT_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Welcome Bonus 30 USD',
    description: 'XM tặng ngay $30 Welcome Bonus khi khách hàng mở tài khoản thực và hoàn thành KYC xác minh danh tính.',
    type: 'WELCOME_BONUS',
    amount: 30,
    isHot: true,
    brokerId: '2',
    brokerName: 'XM',
    validUntil: '2026-12-31',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Deposit Bonus 100%',
    description: 'Infinox nhân đôi tài khoản giao dịch cho các giao dịch nạp tiền đầu tiên lên đến $1000.',
    type: 'DEPOSIT_BONUS',
    amount: 1000,
    isHot: true,
    brokerId: '4',
    brokerName: 'Infinox',
    validUntil: '2026-09-30',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'No Deposit Bonus 50 USD',
    description: 'Tặng ngay $50 trải nghiệm mà không cần nạp tiền. Lợi nhuận có thể rút sau khi giao dịch đủ số lot tối thiểu.',
    type: 'NO_DEPOSIT',
    amount: 50,
    isHot: false,
    brokerId: '1',
    brokerName: 'Exness',
    validUntil: '2026-08-15',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [brokers, setBrokers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editOffer, setEditOffer] = useState<Offer | null>(null);

  // Filters & Sorting & Pagination
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Offer>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'WELCOME_BONUS',
    amount: 30,
    isHot: false,
    brokerId: '',
    validUntil: ''
  });

  const loadData = () => {
    setLoading(true);
    // Load Offers
    const storedOffers = localStorage.getItem('bh_offers');
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers));
    } else {
      setOffers(DEFAULT_OFFERS);
      localStorage.setItem('bh_offers', JSON.stringify(DEFAULT_OFFERS));
    }

    // Load Brokers list to link
    const storedBrokers = localStorage.getItem('bh_brokers');
    if (storedBrokers) {
      setBrokers(JSON.parse(storedBrokers));
    } else {
      setBrokers([
        { id: '1', name: 'Exness' },
        { id: '2', name: 'XM' },
        { id: '3', name: 'IC Markets' },
        { id: '4', name: 'Infinox' }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditOffer(null);
    setFormData({
      title: '',
      description: '',
      type: 'WELCOME_BONUS',
      amount: 30,
      isHot: false,
      brokerId: brokers[0]?.id || '',
      validUntil: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description || '',
      type: offer.type,
      amount: offer.amount || 0,
      isHot: offer.isHot || false,
      brokerId: offer.brokerId,
      validUntil: offer.validUntil || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenBroker = brokers.find((b) => b.id === formData.brokerId);
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      brokerName: chosenBroker ? chosenBroker.name : 'Unknown Broker'
    };

    const currentList = [...offers];
    if (editOffer) {
      const idx = currentList.findIndex((o) => o.id === editOffer.id);
      if (idx !== -1) {
        currentList[idx] = {
          ...editOffer,
          ...payload,
        };
      }
    } else {
      const newOffer: Offer = {
        ...payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      currentList.unshift(newOffer);
    }

    setOffers(currentList);
    localStorage.setItem('bh_offers', JSON.stringify(currentList));
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này không?')) return;
    const filtered = offers.filter((o) => o.id !== id);
    setOffers(filtered);
    localStorage.setItem('bh_offers', JSON.stringify(filtered));
  };

  // Sort
  const handleSort = (field: keyof Offer) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filter & Search
  const filteredOffers = offers
    .filter((o) => {
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.brokerName.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeFilter || o.type === typeFilter;
      return matchesSearch && matchesType;
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
  const totalPages = Math.ceil(filteredOffers.length / rowsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Quản lý Khuyến mãi &amp; Bonus</h1>
          <p className="text-zinc-400 text-sm">Đăng tải, cập nhật các gói bonus, khuyến mãi cho các sàn Forex liên kết.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition shadow-lg shadow-orange-500/20 text-sm whitespace-nowrap self-start sm:self-center"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Thêm Khuyến Mãi Mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, tên sàn, mô tả..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Type filter */}
          <div>
            <details className="relative group w-full" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
                <span>
                  {typeFilter === '' ? 'Tất cả loại Bonus' : 
                   typeFilter === 'WELCOME_BONUS' ? 'Thưởng chào mừng (Welcome)' : 
                   typeFilter === 'DEPOSIT_BONUS' ? 'Thưởng nạp tiền (Deposit)' : 'Không cần nạp tiền (No Deposit)'}
                </span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-full z-50">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); setTypeFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${typeFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Tất cả loại Bonus
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setTypeFilter('WELCOME_BONUS'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${typeFilter === 'WELCOME_BONUS' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Thưởng chào mừng (Welcome)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setTypeFilter('DEPOSIT_BONUS'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${typeFilter === 'DEPOSIT_BONUS' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Thưởng nạp tiền (Deposit)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setTypeFilter('NO_DEPOSIT'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${typeFilter === 'NO_DEPOSIT' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Không cần nạp tiền (No Deposit)
                  </button>
                </div>
              </div>
            </details>
          </div>
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
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Tiêu Đề Khuyến Mãi {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('brokerName')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Sàn Forex {sortField === 'brokerName' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Phân Loại</th>
                <th
                  onClick={() => handleSort('amount')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Trị Giá {sortField === 'amount' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Trạng Thái</th>
                <th
                  onClick={() => handleSort('validUntil')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Hạn Sử Dụng {sortField === 'validUntil' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th className="px-6 py-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                    Đang tải danh sách khuyến mãi...
                  </td>
                </tr>
              ) : paginatedOffers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 font-medium">
                    Không tìm thấy khuyến mãi nào.
                  </td>
                </tr>
              ) : (
                paginatedOffers.map((offer) => (
                  <tr key={offer.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-white max-w-[200px] truncate">{offer.title}</td>
                    <td className="px-6 py-4 text-zinc-300 font-semibold">{offer.brokerName}</td>
                    <td className="px-6 py-4 text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        offer.type === 'WELCOME_BONUS'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : offer.type === 'DEPOSIT_BONUS'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                          : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                        {offer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-extrabold text-amber-300 tabular-nums">
                      ${offer.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {offer.isHot ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-extrabold tracking-wider">
                          🔥 HOT
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Thường</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400">{offer.validUntil || 'Vô thời hạn'}</td>
                    <td className="px-6 py-4 text-right">
                      <details className="relative group text-left inline-block" data-hh-nav-dropdown="">
                        <summary className="list-none cursor-pointer p-1.5 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </summary>
                        <div className="absolute right-0 top-full mt-1 z-50 min-w-[120px] shadow-xl">
                          <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 flex flex-col gap-1">
                            <button
                              onClick={() => handleOpenEdit(offer)}
                              className="w-full text-left rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(offer.id)}
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

        {/* Pagination controls */}
        {filteredOffers.length > 0 && (
          <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs select-none mt-auto shrink-0 z-10 sticky bottom-0">
            <div className="text-zinc-500">
              Hiển thị từ <strong className="text-white">{(currentPage - 1) * rowsPerPage + 1}</strong> đến{' '}
              <strong className="text-white">
                {Math.min(currentPage * rowsPerPage, filteredOffers.length)}
              </strong>{' '}
              trong tổng số <strong className="text-white">{filteredOffers.length}</strong> khuyến mãi.
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 text-white font-bold rounded disabled:opacity-40 transition"
              >
                Trước
              </button>
              <span className="px-3 text-zinc-400">
                Trang <strong>{currentPage}</strong> / {totalPages || 1}
              </span>
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

      {/* Add / Edit Drawer */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-850 flex flex-col shadow-2xl animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Head */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editOffer ? 'Chỉnh Sửa Khuyến Mãi' : 'Thêm Khuyến Mãi Mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Tiêu đề khuyến mãi</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-amber-500/50"
                  placeholder="VD: Nhận ngay 30 USD chào mừng"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Mô tả ngắn</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-amber-500/50 min-h-[80px]"
                  placeholder="Mô tả cơ chế hoặc điều kiện..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Sàn liên kết</label>
                  <details className="relative group w-full" data-hh-nav-dropdown="">
                    <summary className="list-none cursor-pointer w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white flex items-center justify-between focus:outline-none focus:border-amber-500/50">
                      <span>{brokers.find(b => b.id === formData.brokerId)?.name || 'Chọn sàn'}</span>
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="absolute left-0 top-full mt-2 w-full z-50">
                      <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1 max-h-48 overflow-y-auto">
                        {brokers.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={(e) => { e.preventDefault(); setFormData({ ...formData, brokerId: b.id }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                            className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.brokerId === b.id ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </details>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Loại Khuyến mãi</label>
                  <details className="relative group w-full" data-hh-nav-dropdown="">
                    <summary className="list-none cursor-pointer w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white flex items-center justify-between focus:outline-none focus:border-amber-500/50">
                      <span>{formData.type === 'WELCOME_BONUS' ? 'WELCOME_BONUS' : formData.type === 'DEPOSIT_BONUS' ? 'DEPOSIT_BONUS' : 'NO_DEPOSIT'}</span>
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="absolute left-0 top-full mt-2 w-full z-50">
                      <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, type: 'WELCOME_BONUS' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.type === 'WELCOME_BONUS' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          WELCOME_BONUS
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, type: 'DEPOSIT_BONUS' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.type === 'DEPOSIT_BONUS' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          DEPOSIT_BONUS
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, type: 'NO_DEPOSIT' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.type === 'NO_DEPOSIT' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          NO_DEPOSIT
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Trị giá ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Hạn sử dụng</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHot"
                  checked={formData.isHot}
                  onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                  className="rounded border-zinc-850 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="isHot" className="text-xs font-bold text-zinc-300 uppercase cursor-pointer">Đánh dấu là khuyến mãi NỔI BẬT (HOT 🔥)</label>
              </div>

              </div>
              {/* Action Buttons */}
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
