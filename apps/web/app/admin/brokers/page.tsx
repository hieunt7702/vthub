'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3005/brokers';

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  rating: number;
  foundedYear: number;
  headquarters: string;
  regulations: string[];
  minDeposit: number;
  maxLeverage: number;
  spreadType: string;
  platforms: string[];
  createdAt: string;
  updatedAt?: string;
}

const DEFAULT_BROKERS: Broker[] = [
  {
    id: '1',
    name: 'Exness',
    slug: 'exness',
    logo: 'https://hieunthub.co/uploads/brokers/logos/01KJ4SCJ88E286DJM4DC19B8QH.webp',
    description: 'Sàn Forex có khối lượng giao dịch lớn nhất thế giới, nổi tiếng với spread cực thấp và hệ thống rút tiền tức thì.',
    rating: 4.8,
    foundedYear: 2008,
    headquarters: 'Cyprus',
    regulations: ['FCA', 'CySEC'],
    minDeposit: 10,
    maxLeverage: 2000,
    spreadType: 'Variable',
    platforms: ['MT4', 'MT5'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'XM',
    slug: 'xm',
    logo: 'https://hieunthub.co/uploads/brokers/logos/01KP2ZTF2WF63CXQGN8JQQ90HH.webp',
    description: 'XM cung cấp trải nghiệm giao dịch tuyệt vời với các chương trình khuyến mãi hấp dẫn và khớp lệnh siêu tốc.',
    rating: 4.6,
    foundedYear: 2009,
    headquarters: 'Cyprus',
    regulations: ['ASIC', 'CySEC', 'FSC'],
    minDeposit: 5,
    maxLeverage: 1000,
    spreadType: 'Variable',
    platforms: ['MT4', 'MT5'],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'IC Markets',
    slug: 'ic-markets',
    logo: 'https://hieunthub.co/uploads/brokers/logos/01KJC1HBZDKDEMV3T7WCF03QBW.webp',
    description: 'Sàn giao dịch dạng ECN thực sự lớn nhất, được các EA trader tin dùng vì spread gần như bằng không.',
    rating: 4.7,
    foundedYear: 2007,
    headquarters: 'Australia',
    regulations: ['ASIC', 'FCA', 'CySEC'],
    minDeposit: 200,
    maxLeverage: 500,
    spreadType: 'Variable',
    platforms: ['MT4', 'MT5', 'cTrader'],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function AdminBrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBroker, setEditBroker] = useState<Broker | null>(null);

  // Filter & Search & Sort states
  const [search, setSearch] = useState('');
  const [regulationFilter, setRegulationFilter] = useState('');
  const [spreadFilter, setSpreadFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Broker>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    rating: 4.5,
    foundedYear: 2010,
    headquarters: '',
    regulations: 'FCA, CySEC',
    minDeposit: 10,
    maxLeverage: 1000,
    spreadType: 'Variable',
    platforms: 'MT4, MT5',
    logo: ''
  });

  const fetchBrokers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setBrokers(data);
        localStorage.setItem('bh_brokers', JSON.stringify(data));
      } else {
        throw new Error('API response not OK');
      }
    } catch (error) {
      console.warn('API error, falling back to LocalStorage/Mocks:', error);
      const stored = localStorage.getItem('bh_brokers');
      if (stored) {
        setBrokers(JSON.parse(stored));
      } else {
        setBrokers(DEFAULT_BROKERS);
        localStorage.setItem('bh_brokers', JSON.stringify(DEFAULT_BROKERS));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, []);

  const handleOpenAdd = () => {
    setEditBroker(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      rating: 4.5,
      foundedYear: 2010,
      headquarters: '',
      regulations: 'FCA, CySEC',
      minDeposit: 10,
      maxLeverage: 1000,
      spreadType: 'Variable',
      platforms: 'MT4, MT5',
      logo: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (broker: Broker) => {
    setEditBroker(broker);
    setFormData({
      name: broker.name,
      slug: broker.slug,
      description: broker.description || '',
      rating: broker.rating || 4.5,
      foundedYear: broker.foundedYear || 2010,
      headquarters: broker.headquarters || '',
      regulations: broker.regulations?.join(', ') || '',
      minDeposit: broker.minDeposit || 10,
      maxLeverage: broker.maxLeverage || 1000,
      spreadType: broker.spreadType || 'Variable',
      platforms: broker.platforms?.join(', ') || 'MT4, MT5',
      logo: broker.logo || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      rating: Number(formData.rating),
      foundedYear: Number(formData.foundedYear),
      minDeposit: Number(formData.minDeposit),
      maxLeverage: Number(formData.maxLeverage),
      regulations: formData.regulations.split(',').map((r) => r.trim()).filter(Boolean),
      platforms: formData.platforms.split(',').map((p) => p.trim()).filter(Boolean),
      logo: formData.logo || `https://avatar.iran.liara.run/username?username=${formData.name}`
    };

    try {
      let res;
      if (editBroker) {
        // Edit via API
        res = await fetch(`${API_URL}/${editBroker.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create via API
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        fetchBrokers();
        setShowModal(false);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.warn('Backend connection failed, saving to client state:', err);
      // Client-only database write fallback
      const currentList = [...brokers];
      if (editBroker) {
        const idx = currentList.findIndex((b) => b.id === editBroker.id);
        if (idx !== -1) {
          currentList[idx] = {
            ...editBroker,
            ...payload,
            updatedAt: new Date().toISOString()
          };
        }
      } else {
        const newBroker: Broker = {
          ...payload,
          id: Date.now().toString(),
          slug: payload.slug || payload.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
          createdAt: new Date().toISOString()
        };
        currentList.unshift(newBroker);
      }
      setBrokers(currentList);
      localStorage.setItem('bh_brokers', JSON.stringify(currentList));
      setShowModal(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sàn giao dịch này không?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBrokers();
      } else {
        throw new Error('API delete failed');
      }
    } catch (err) {
      console.warn('Backend delete failed, removing from client state:', err);
      const filtered = brokers.filter((b) => b.id !== id);
      setBrokers(filtered);
      localStorage.setItem('bh_brokers', JSON.stringify(filtered));
    }
  };

  // Sort mechanism
  const handleSort = (field: keyof Broker) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filter mechanism
  const filteredBrokers = brokers
    .filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.slug.toLowerCase().includes(search.toLowerCase()) ||
        (b.description || '').toLowerCase().includes(search.toLowerCase());
      const matchesReg =
        !regulationFilter ||
        b.regulations?.some((r) => r.toLowerCase().includes(regulationFilter.toLowerCase()));
      const matchesSpread = !spreadFilter || b.spreadType === spreadFilter;
      return matchesSearch && matchesReg && matchesSpread;
    })
    .sort((a, b) => {
      let valA = a[sortField] ?? '';
      let valB = b[sortField] ?? '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredBrokers.length / rowsPerPage);
  const paginatedBrokers = filteredBrokers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const clearFilters = () => {
    setSearch('');
    setRegulationFilter('');
    setSpreadFilter('');
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Quản lý Sàn giao dịch</h1>
          <p className="text-zinc-400 text-sm">Quản lý cơ sở dữ liệu các sàn Forex chính thức trên hệ thống.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition shadow-lg shadow-orange-500/20 text-sm whitespace-nowrap self-start sm:self-center"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Thêm Sàn Mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Tìm theo tên sàn, slug, mô tả..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          {/* Regulation filter */}
          <div>
            <details className="relative group w-full" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
                <span>{regulationFilter === '' ? 'Tất cả giấy phép' : regulationFilter === 'FCA' ? 'FCA (Anh)' : regulationFilter === 'ASIC' ? 'ASIC (Úc)' : 'CySEC (Síp)'}</span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-full z-50">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); setRegulationFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${regulationFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Tất cả giấy phép
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setRegulationFilter('FCA'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${regulationFilter === 'FCA' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    FCA (Anh)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setRegulationFilter('ASIC'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${regulationFilter === 'ASIC' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    ASIC (Úc)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setRegulationFilter('CySEC'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${regulationFilter === 'CySEC' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    CySEC (Síp)
                  </button>
                </div>
              </div>
            </details>
          </div>

          {/* Spread Type filter */}
          <div>
            <details className="relative group w-full" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-700 transition">
                <span>{spreadFilter === '' ? 'Tất cả loại Spread' : spreadFilter === 'Fixed' ? 'Spread cố định (Fixed)' : 'Spread thả nổi (Variable)'}</span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="absolute left-0 top-full mt-2 w-full z-50">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); setSpreadFilter(''); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${spreadFilter === '' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Tất cả loại Spread
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setSpreadFilter('Fixed'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${spreadFilter === 'Fixed' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Spread cố định (Fixed)
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setSpreadFilter('Variable'); setCurrentPage(1); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                    className={`w-full text-left rounded px-3 py-2 text-sm transition ${spreadFilter === 'Variable' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    Spread thả nổi (Variable)
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

        {(search || regulationFilter || spreadFilter) && (
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40">
            <span className="text-xs text-zinc-400">
              Tìm thấy <strong className="text-white">{filteredBrokers.length}</strong> kết quả phù hợp.
            </span>
            <button
              onClick={clearFilters}
              className="text-xs text-orange-400 hover:text-orange-300 font-bold transition"
            >
              Clear Filters (Xóa bộ lọc)
            </button>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded flex flex-col flex-1 overflow-hidden shadow-xl min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 min-h-[300px]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Tên Sàn {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('slug')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Slug {sortField === 'slug' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rating')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Đánh giá {sortField === 'rating' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Giấy Phép</th>
                <th className="px-6 py-4 font-bold">Nền Tảng</th>
                <th
                  onClick={() => handleSort('createdAt')}
                  className="px-6 py-4 font-bold cursor-pointer hover:bg-zinc-900 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    Ngày Tạo {sortField === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </div>
                </th>
                <th className="px-6 py-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                    <div className="inline-block animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
                    Đang tải danh sách sàn forex...
                  </td>
                </tr>
              ) : paginatedBrokers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 font-medium">
                    Không tìm thấy sàn forex nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedBrokers.map((broker) => (
                  <tr key={broker.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={broker.logo}
                          alt={broker.name}
                          className="h-10 w-10 rounded object-cover bg-zinc-950 border border-zinc-800"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{broker.name}</div>
                          <div className="text-[10px] text-zinc-500">Founded: {broker.foundedYear}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400">{broker.slug}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                        ★ {broker.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {broker.regulations?.map((reg, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                            {reg}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {broker.platforms?.map((plat, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">
                            {plat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500">
                      {new Date(broker.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <details className="relative group text-left inline-block" data-hh-nav-dropdown="">
                        <summary className="list-none cursor-pointer p-1.5 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </summary>
                        <div className="absolute right-0 top-full mt-1 z-50 min-w-[120px] shadow-xl">
                          <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 flex flex-col gap-1">
                            <button
                              onClick={() => handleOpenEdit(broker)}
                              className="w-full text-left rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(broker.id)}
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
        {filteredBrokers.length > 0 && (
          <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs select-none mt-auto shrink-0 z-10 sticky bottom-0">
            <div className="text-zinc-500">
              Hiển thị từ <strong className="text-white">{(currentPage - 1) * rowsPerPage + 1}</strong> đến{' '}
              <strong className="text-white">
                {Math.min(currentPage * rowsPerPage, filteredBrokers.length)}
              </strong>{' '}
              trong tổng số <strong className="text-white">{filteredBrokers.length}</strong> sàn forex.
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Số dòng mỗi trang:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white focus:outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
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
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-xl h-full bg-zinc-950 border-l border-zinc-850 flex flex-col shadow-2xl animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Head */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editBroker ? `Sửa sàn: ${editBroker.name}` : 'Thêm Sàn Giao Dịch Mới'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Tên sàn forex</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="VD: Exness"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Slug (Đường dẫn)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="exness (tự tạo nếu trống)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Đường dẫn Logo URL</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                  placeholder="https://example.com/logo.webp"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Mô tả chi tiết</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50 min-h-[80px]"
                  placeholder="Mô tả sàn..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Đánh giá (Rating)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Năm thành lập</label>
                  <input
                    type="number"
                    required
                    value={formData.foundedYear}
                    onChange={(e) => setFormData({ ...formData, foundedYear: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Trụ sở chính</label>
                  <input
                    type="text"
                    required
                    value={formData.headquarters}
                    onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="VD: Cyprus"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Giấy phép (Phẩy cách)</label>
                  <input
                    type="text"
                    value={formData.regulations}
                    onChange={(e) => setFormData({ ...formData, regulations: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="FCA, CySEC, ASIC"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Nền tảng (Phẩy cách)</label>
                  <input
                    type="text"
                    value={formData.platforms}
                    onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="MT4, MT5, cTrader"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Min Deposit ($)</label>
                  <input
                    type="number"
                    value={formData.minDeposit}
                    onChange={(e) => setFormData({ ...formData, minDeposit: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Đòn bẩy tối đa</label>
                  <input
                    type="number"
                    value={formData.maxLeverage}
                    onChange={(e) => setFormData({ ...formData, maxLeverage: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="VD: 1000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wide">Loại Spread</label>
                  <details className="relative group w-full" data-hh-nav-dropdown="">
                    <summary className="list-none cursor-pointer w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-white flex items-center justify-between focus:outline-none focus:border-orange-500/50">
                      <span>{formData.spreadType === 'Variable' ? 'Thả nổi (Variable)' : 'Cố định (Fixed)'}</span>
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="absolute left-0 top-full mt-2 w-full z-50">
                      <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, spreadType: 'Variable' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.spreadType === 'Variable' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          Thả nổi (Variable)
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setFormData({ ...formData, spreadType: 'Fixed' }); document.activeElement instanceof HTMLElement && document.activeElement.blur(); }}
                          className={`w-full text-left rounded px-3 py-2 text-sm transition ${formData.spreadType === 'Fixed' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          Cố định (Fixed)
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              </div>

              {/* Modal Buttons */}
              <div className="p-6 border-t border-zinc-800 flex items-center justify-end gap-3 shrink-0 bg-zinc-950">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded border border-zinc-800 text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-900 transition text-sm font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white font-bold transition shadow-lg shadow-orange-500/20 text-sm"
                >
                  Lưu dữ liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
