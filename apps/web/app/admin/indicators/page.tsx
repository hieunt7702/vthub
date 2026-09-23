'use client';

import { useState, useEffect } from 'react';

interface Indicator {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
  platform: string; // MT4, MT5, TradingView
  price: number; // 0 = Free
  createdAt: string;
}

const DEFAULT_INDICATORS: Indicator[] = [
  {
    id: '1',
    name: 'Moving Average Cross Pro',
    slug: 'moving-average-cross-pro',
    description: 'Chỉ báo cắt nhau giữa SMA 20 và EMA 50, tín hiệu vào lệnh tự động kèm cảnh báo âm thanh.',
    thumbnail: '',
    downloadUrl: 'https://hieunthub.co/downloads/ma-cross.ex4',
    platform: 'MT5',
    price: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'RSI Divergence Hunter',
    slug: 'rsi-divergence-hunter',
    description: 'Phát hiện phân kỳ RSI tự động trên đa khung thời gian, báo điểm vào lệnh ngược xu hướng.',
    thumbnail: '',
    downloadUrl: 'https://hieunthub.co/downloads/rsi-divergence.ex5',
    platform: 'MT5',
    price: 49,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Volume Profile Pro',
    slug: 'volume-profile-pro',
    description: 'Hiển thị volume theo giá thay vì theo thời gian, xác định vùng hỗ trợ kháng cự thật.',
    thumbnail: '',
    downloadUrl: 'https://hieunthub.co/downloads/volume-profile.ex4',
    platform: 'MT4',
    price: 0,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function AdminIndicatorsPage() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editIndicator, setEditIndicator] = useState<Indicator | null>(null);

  // Filter & Search & Pagination & Sort
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Indicator>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    downloadUrl: '',
    platform: 'MT5',
    price: 0,
    thumbnail: ''
  });

  const loadData = () => {
    setLoading(true);
    const stored = localStorage.getItem('bh_indicators');
    if (stored) {
      setIndicators(JSON.parse(stored));
    } else {
      setIndicators(DEFAULT_INDICATORS);
      localStorage.setItem('bh_indicators', JSON.stringify(DEFAULT_INDICATORS));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditIndicator(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      downloadUrl: '',
      platform: 'MT5',
      price: 0,
      thumbnail: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (ind: Indicator) => {
    setEditIndicator(ind);
    setFormData({
      name: ind.name,
      slug: ind.slug,
      description: ind.description || '',
      downloadUrl: ind.downloadUrl || '',
      platform: ind.platform,
      price: ind.price || 0,
      thumbnail: ind.thumbnail || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };

    const currentList = [...indicators];
    if (editIndicator) {
      const idx = currentList.findIndex((i) => i.id === editIndicator.id);
      if (idx !== -1) {
        currentList[idx] = {
          ...editIndicator,
          ...payload
        };
      }
    } else {
      const newInd: Indicator = {
        ...payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      currentList.unshift(newInd);
    }

    setIndicators(currentList);
    localStorage.setItem('bh_indicators', JSON.stringify(currentList));
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa chỉ báo này không?')) return;
    const filtered = indicators.filter((i) => i.id !== id);
    setIndicators(filtered);
    localStorage.setItem('bh_indicators', JSON.stringify(filtered));
  };

  const handleSort = (field: keyof Indicator) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filtering
  const filteredIndicators = indicators
    .filter((i) => {
      const matchesSearch =
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase());
      const matchesPlat = !platformFilter || i.platform === platformFilter;
      const matchesPrice =
        !priceFilter ||
        (priceFilter === 'free' ? i.price === 0 : i.price > 0);
      return matchesSearch && matchesPlat && matchesPrice;
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
  const totalPages = Math.ceil(filteredIndicators.length / rowsPerPage);
  const paginatedIndicators = filteredIndicators.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Head */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Quản lý Chỉ Báo Kỹ Thuật</h1>
          <p className="text-zinc-400 text-sm">Quản lý kho tàng chỉ báo MT4, MT5 và TradingView cung cấp cho trader.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition shadow-lg shadow-orange-500/20 text-sm whitespace-nowrap self-start sm:self-center"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Thêm Chỉ Báo Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Tìm theo tên chỉ báo, mô tả..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />

          <div>
            <details className="relative group w-full" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
                <span>
                  {platformFilter === '' ? 'Tất cả nền tảng' : 
                   platformFilter === 'MT4' ? 'MetaTrader 4 (MT4)' : 
                   platformFilter === 'MT5' ? 'MetaTrader 5 (MT5)' : 'TradingView'}
                </span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-full z-50">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); setPlatformFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${platformFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Tất cả nền tảng
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setPlatformFilter('MT4'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${platformFilter === 'MT4' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    MetaTrader 4 (MT4)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setPlatformFilter('MT5'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${platformFilter === 'MT5' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    MetaTrader 5 (MT5)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setPlatformFilter('TradingView'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${platformFilter === 'TradingView' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    TradingView
                  </button>
                </div>
              </div>
            </details>
          </div>

          <div>
            <details className="relative group w-full" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
                <span>
                  {priceFilter === '' ? 'Tất cả mức giá' : 
                   priceFilter === 'free' ? 'Miễn phí (Free)' : 'Có phí (Paid)'}
                </span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-full z-50">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); setPriceFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${priceFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Tất cả mức giá
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setPriceFilter('free'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${priceFilter === 'free' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Miễn phí (Free)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setPriceFilter('paid'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${priceFilter === 'paid' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Có phí (Paid)
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded flex flex-col flex-1 overflow-hidden shadow-xl min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 min-h-[300px]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  Tên Chỉ Báo {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('platform')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  Nền Tảng {sortField === 'platform' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  Giá Bán {sortField === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-4 font-bold">Đường Dẫn Tải Về</th>
                <th
                  onClick={() => handleSort('createdAt')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
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
              ) : paginatedIndicators.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-medium">Chưa có chỉ báo nào.</td>
                </tr>
              ) : (
                paginatedIndicators.map((ind) => (
                  <tr key={ind.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{ind.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
                        {ind.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ind.price === 0 ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                          Miễn phí
                        </span>
                      ) : (
                        <span className="text-xs font-extrabold text-amber-300 tabular-nums">
                          ${ind.price}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400 max-w-[200px] truncate">{ind.downloadUrl || 'Chưa cung cấp'}</td>
                    <td className="px-6 py-4 text-xs text-zinc-500">{new Date(ind.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 text-right">
                      <details className="relative group text-left inline-block" data-hh-nav-dropdown="">
                        <summary className="list-none cursor-pointer p-1.5 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </summary>
                        <div className="absolute right-0 top-full mt-1 z-50 min-w-[120px] shadow-xl">
                          <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 flex flex-col gap-1">
                            <button
                              onClick={() => handleOpenEdit(ind)}
                              className="w-full text-left rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(ind.id)}
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
        {filteredIndicators.length > 0 && (
          <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs select-none mt-auto shrink-0 z-10 sticky bottom-0">
            <div className="text-zinc-500">
              Hiển thị từ <strong className="text-white">{(currentPage - 1) * rowsPerPage + 1}</strong> đến{' '}
              <strong className="text-white">
                {Math.min(currentPage * rowsPerPage, filteredIndicators.length)}
              </strong>{' '}
              trong tổng số <strong className="text-white">{filteredIndicators.length}</strong> chỉ báo.
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

      {/* Drawer Form Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-850 flex flex-col shadow-2xl animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editIndicator ? 'Chỉnh Sửa Chỉ Báo' : 'Thêm Chỉ Báo Mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Tên chỉ báo kỹ thuật</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="VD: RSI Divergence Hunter"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Mô tả ngắn</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-emerald-500/50 min-h-[80px]"
                  placeholder="Giải thích cơ chế hoạt động..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Nền tảng hỗ trợ</label>
                  <details className="relative group w-full" data-hh-nav-dropdown="">
                    <summary className="list-none cursor-pointer w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white flex items-center justify-between focus:outline-none">
                      <span>{formData.platform === 'MT4' ? 'MetaTrader 4 (MT4)' : formData.platform === 'MT5' ? 'MetaTrader 5 (MT5)' : 'TradingView'}</span>
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="absolute left-0 top-full mt-2 w-full z-50">
                      <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, platform: 'MT4' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.platform === 'MT4' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          MetaTrader 4 (MT4)
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, platform: 'MT5' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.platform === 'MT5' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          MetaTrader 5 (MT5)
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, platform: 'TradingView' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.platform === 'TradingView' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          TradingView
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Giá bán ($) (0 = Miễn phí)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Đường dẫn file download</label>
                <input
                  type="text"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="https://hieunthub.co/downloads/your-indicator.ex4"
                />
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
