'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { 
  Search, Scale, ArrowRight, Star, CheckCircle2 
} from 'lucide-react';

export interface BrokerItem {
  id: string;
  name: string;
  slug: string;
  logo: string;
  wikifxScore: string;
  isTopPick?: boolean;
  isSponsored?: boolean;
  verified: boolean;
  minDeposit: string;
  foundedYear: number;
  maxLeverage: string;
  spreadType: string;
  minSpread: string;
  platform: string;
  rebateGold: string;
  rebateFx: string;
  rebateBadge: string;
  licenses: { name: string; tier: 'tier1' | 'tier2' | 'normal' }[];
  features: string[];
}

export const TOP_BROKERS_DATA: BrokerItem[] = [
  {
    id: 'vt-markets',
    name: 'VT Markets',
    slug: 'vt-markets',
    logo: '/images/brokers/vt-markets.svg',
    wikifxScore: '8.68',
    isTopPick: true,
    isSponsored: true,
    verified: true,
    minDeposit: '$50',
    foundedYear: 2015,
    maxLeverage: '1:1000',
    spreadType: 'Raw ECN',
    minSpread: 'Từ 0.0 Pip',
    platform: 'MT4 / MT5 / App',
    rebateGold: 'Tỷ lệ tối đa thị trường',
    rebateFx: 'Hoàn phí tự động',
    rebateBadge: 'Tỷ lệ hoàn phí cao nhất',
    licenses: [
      { name: 'FSCA No. 50865', tier: 'tier1' },
      { name: 'FSC No. GB23202269', tier: 'tier1' }
    ],
    features: [
      'Bộ chỉ báo kỹ thuật chuyên sâu & Trình tạo EA MQL5 không cần code',
      'Tự động chi trả Backcom trực tiếp vào tài khoản giao dịch',
      'Nạp rút VietQR 24/7 tức thì không phí'
    ]
  },
  {
    id: 'exness',
    name: 'Exness',
    slug: 'exness',
    logo: '/images/brokers/exness.svg',
    wikifxScore: '8.90',
    verified: true,
    minDeposit: '$10',
    foundedYear: 2008,
    maxLeverage: 'Vô cực (1:Unlimited)',
    spreadType: 'Raw Spread / Pro',
    minSpread: 'Từ 0.1 Pip',
    platform: 'MT4 / MT5 / Web',
    rebateGold: '$6.0 / lot',
    rebateFx: '$3.5 / lot',
    rebateBadge: 'Hoàn phí cơ bản $6/lot',
    licenses: [
      { name: 'FCA (Anh Quốc)', tier: 'tier1' },
      { name: 'CySEC', tier: 'tier1' },
      { name: 'FSA', tier: 'normal' }
    ],
    features: ['Khối lượng thanh khoản lớn', 'Nạp rút tức thì tự động']
  },
  {
    id: 'ic-markets',
    name: 'IC Markets',
    slug: 'ic-markets',
    logo: '/images/brokers/ic-markets.svg',
    wikifxScore: '8.75',
    verified: true,
    minDeposit: '$200',
    foundedYear: 2007,
    maxLeverage: '1:500',
    spreadType: 'True ECN',
    minSpread: 'Từ 0.0 Pip',
    platform: 'MT4 / MT5 / cTrader',
    rebateGold: '$4.5 / lot',
    rebateFx: '$2.5 / lot',
    rebateBadge: 'Hoàn phí cơ bản $4.5/lot',
    licenses: [
      { name: 'ASIC (Úc)', tier: 'tier1' },
      { name: 'CySEC', tier: 'tier1' },
      { name: 'SCB', tier: 'normal' }
    ],
    features: ['Khớp lệnh True ECN', 'Hỗ trợ cTrader']
  },
  {
    id: 'xm',
    name: 'XM Global',
    slug: 'xm',
    logo: '/images/brokers/xm.svg',
    wikifxScore: '8.85',
    verified: true,
    minDeposit: '$5',
    foundedYear: 2009,
    maxLeverage: '1:1000',
    spreadType: 'Ultra Low / Standard',
    minSpread: 'Từ 0.6 Pip',
    platform: 'MT4 / MT5 / App',
    rebateGold: '$5.0 / lot',
    rebateFx: '$3.0 / lot',
    rebateBadge: 'Hoàn phí cơ bản $5/lot',
    licenses: [
      { name: 'ASIC (Úc)', tier: 'tier1' },
      { name: 'CySEC', tier: 'tier1' },
      { name: 'FSC', tier: 'normal' }
    ],
    features: ['Nhiều chương trình bonus nạp', 'Không phí swap một số cặp']
  },
  {
    id: 'vantage',
    name: 'Vantage Markets',
    slug: 'vantage',
    logo: '/images/brokers/vantage.svg',
    wikifxScore: '8.60',
    verified: true,
    minDeposit: '$50',
    foundedYear: 2009,
    maxLeverage: '1:500',
    spreadType: 'Raw ECN',
    minSpread: 'Từ 0.0 Pip',
    platform: 'MT4 / MT5 / App',
    rebateGold: '$8.0 / lot',
    rebateFx: '$4.0 / lot',
    rebateBadge: 'Hoàn phí $8/lot',
    licenses: [
      { name: 'ASIC (Úc)', tier: 'tier1' },
      { name: 'VFSC', tier: 'normal' }
    ],
    features: ['Hệ sinh thái copytrade', 'Giao diện ứng dụng tốt']
  },
  {
    id: 'tmgm',
    name: 'TMGM',
    slug: 'tmgm',
    logo: '/images/brokers/tmgm.svg',
    wikifxScore: '8.55',
    verified: true,
    minDeposit: '$100',
    foundedYear: 2013,
    maxLeverage: '1:500',
    spreadType: 'EDGE ECN',
    minSpread: 'Từ 0.1 Pip',
    platform: 'MT4 / MT5 / IRESS',
    rebateGold: '$6.0 / lot',
    rebateFx: '$3.0 / lot',
    rebateBadge: 'Hoàn phí $6/lot',
    licenses: [
      { name: 'ASIC (Úc)', tier: 'tier1' },
      { name: 'VFSC', tier: 'normal' },
      { name: 'FMA NZ', tier: 'tier1' }
    ],
    features: ['Khớp lệnh tốc độ cao', 'Hỗ trợ nền tảng IRESS']
  },
  {
    id: 'hfm',
    name: 'HFM (HF Markets)',
    slug: 'hfm',
    logo: '/images/brokers/hfm.svg',
    wikifxScore: '8.40',
    verified: true,
    minDeposit: '$0',
    foundedYear: 2010,
    maxLeverage: '1:2000',
    spreadType: 'Zero Spread',
    minSpread: 'Từ 0.2 Pip',
    platform: 'MT4 / MT5 / HFM App',
    rebateGold: '$7.0 / lot',
    rebateFx: '$3.5 / lot',
    rebateBadge: 'Hoàn phí $7/lot',
    licenses: [
      { name: 'FCA (Anh Quốc)', tier: 'tier1' },
      { name: 'CySEC', tier: 'tier1' },
      { name: 'FSCA', tier: 'normal' }
    ],
    features: ['Tài khoản Zero Spread', 'Đòn bẩy 1:2000']
  },
  {
    id: 'gtcfx',
    name: 'GTCFX',
    slug: 'gtcfx',
    logo: '/images/brokers/gtcfx.svg',
    wikifxScore: '8.20',
    verified: true,
    minDeposit: '$50',
    foundedYear: 2012,
    maxLeverage: '1:500',
    spreadType: 'Standard / ECN',
    minSpread: 'Từ 0.4 Pip',
    platform: 'MT4 / MT5',
    rebateGold: '$9.0 / lot',
    rebateFx: '$4.5 / lot',
    rebateBadge: 'Hoàn phí $9/lot',
    licenses: [
      { name: 'FCA', tier: 'tier1' },
      { name: 'VFSC', tier: 'normal' }
    ],
    features: ['Hỗ trợ giao dịch vàng', 'Thủ tục mở tài khoản nhanh']
  },
  {
    id: 'ebc',
    name: 'EBC Financial Group',
    slug: 'ebc',
    logo: '/images/brokers/ebc.svg',
    wikifxScore: '8.35',
    verified: true,
    minDeposit: '$10',
    foundedYear: 2020,
    maxLeverage: '1:500',
    spreadType: 'PRO ECN',
    minSpread: 'Từ 0.2 Pip',
    platform: 'MT4 / MT5',
    rebateGold: '$5.0 / lot',
    rebateFx: '$3.0 / lot',
    rebateBadge: 'Hoàn phí $5/lot',
    licenses: [
      { name: 'FCA (Anh Quốc)', tier: 'tier1' },
      { name: 'ASIC (Úc)', tier: 'tier1' },
      { name: 'CIMA', tier: 'normal' }
    ],
    features: ['Mới nổi tại Châu Á', 'Khớp lệnh khá tốt']
  }
];

export default function BrokersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [compareList, setCompareList] = useState<string[]>(['vt-markets']);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id));
    } else {
      if (compareList.length >= 4) {
        alert('Bạn chỉ có thể so sánh tối đa 4 sàn cùng lúc.');
        return;
      }
      setCompareList([...compareList, id]);
    }
  };

  const handleGoToCompare = () => {
    const query = compareList.join(',');
    router.push(`/brokers/so-sanh?brokers=${query}`);
  };

  const filteredBrokers = TOP_BROKERS_DATA.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase());
    
    if (activeFilter === 'spread') return matchSearch && b.minSpread.includes('0.0');
    if (activeFilter === 'rebate') return matchSearch && (b.rebateGold.includes('$15') || b.rebateGold.includes('$9') || b.rebateGold.includes('$8'));
    if (activeFilter === 'gold') return matchSearch && b.features.some(f => f.includes('Vàng') || f.includes('Bot EA') || b.id === 'vt-markets');
    if (activeFilter === 'license') return matchSearch && b.licenses.some(l => l.tier === 'tier1');

    return matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Scale className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>Dữ Liệu Xếp Hạng & So Sánh Sàn Chuẩn WikiFX 2026</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Bảng Xếp Hạng &{' '}
              <span className="text-[#00C2FF]">
                So Sánh Sàn Forex
              </span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Tổng hợp dữ liệu giấy phép, điểm đánh giá WikiFX, đòn bẩy, spread và mức hoàn phí Backcom. So sánh trực quan đối đầu giữa <strong>VT Markets</strong> và các sàn giao dịch hàng đầu.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm VT Markets, Exness, XM, IC Markets, Vantage, TMGM..."
                className="w-full pl-12 pr-32 py-4 bg-[#020712] border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] shadow-xl"
              />
              <button
                onClick={handleGoToCompare}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs rounded-xl shadow-md transition-all uppercase cursor-pointer"
              >
                So sánh sàn →
              </button>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Lọc nhanh:</span>
              {[
                { id: 'all', label: 'Tất cả sàn' },
                { id: 'spread', label: 'Spread 0.0 Pip' },
                { id: 'rebate', label: 'Tỷ lệ Rebate cao' },
                { id: 'gold', label: 'Tối ưu Vàng' },
                { id: 'license', label: 'Có giấy phép Tier-1' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-[#00C2FF] text-slate-950 shadow-md font-black'
                      : 'bg-[#020712] text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Brokers Grid */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-slate-400">
              Hiển thị <strong>{filteredBrokers.length}</strong> sàn giao dịch uy tín
            </span>
            <span className="text-xs text-[#00C2FF] font-bold">
              💡 Bấm nút [⚖️ So Sánh] trên các sàn để đối đầu trực tiếp
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrokers.map((broker) => {
              const isComparing = compareList.includes(broker.id);

              return (
                <div
                  key={broker.id}
                  className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${
                    broker.isTopPick
                      ? 'bg-gradient-to-b from-[#08152B] via-[#050D1A] to-[#020712] border-2 border-[#00C2FF] shadow-[0_0_35px_rgba(0,194,255,0.2)] hover:shadow-[0_0_50px_rgba(0,194,255,0.35)]'
                      : 'bg-[#050D1A] border border-slate-800 hover:border-[#00C2FF]/40 shadow-xl'
                  }`}
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {broker.isTopPick ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-[10px] rounded-lg uppercase tracking-wider flex items-center gap-1 shadow">
                            <Star className="w-3 h-3 fill-white" />
                            <span>★ TOP 1 ĐỐI TÁC CHIẾN LƯỢC</span>
                          </span>
                        </div>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-[#020712] border border-slate-800 text-slate-400 font-bold text-[10px] rounded-lg">
                          Broker Quốc Tế
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-xs font-black text-[#00C2FF] bg-[#00C2FF]/10 px-2 py-0.5 rounded-lg border border-[#00C2FF]/20">
                        <Star className="w-3.5 h-3.5 fill-[#00C2FF] text-[#00C2FF]" />
                        <span>{broker.wikifxScore}</span>
                      </div>
                    </div>

                    {/* Broker Official Logo & Basic Info */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="h-12 w-28 px-2 py-1 rounded-xl flex items-center justify-center shrink-0 bg-[#020712] border border-slate-800 shadow-inner">
                        <img 
                          src={broker.logo} 
                          alt={broker.name} 
                          className="h-7 w-auto max-w-[95px] object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white flex items-center gap-1.5 group-hover:text-[#00C2FF] transition-colors">
                          {broker.name}
                          {broker.verified && <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Thành lập năm {broker.foundedYear} • {broker.platform}</p>
                      </div>
                    </div>

                    {/* 2x2 Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-[#020712] p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nạp tối thiểu</span>
                        <strong className="text-slate-200 font-bold">{broker.minDeposit}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Đòn bẩy tối đa</span>
                        <strong className="text-[#00C2FF] font-bold">{broker.maxLeverage}</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Spread thấp nhất</span>
                        <strong className="text-white font-bold">{broker.minSpread}</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Loại Spread</span>
                        <strong className="text-slate-300 font-bold">{broker.spreadType}</strong>
                      </div>
                    </div>

                    {/* Rebate Highlight Bar */}
                    <div className={`mt-3 p-3 rounded-xl border flex items-center justify-between text-xs ${broker.isTopPick ? 'bg-[#00C2FF]/15 border-[#00C2FF]/40 text-[#00C2FF]' : 'bg-[#020712] border-slate-800 text-slate-300'}`}>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Hoàn Phí Backcom:</span>
                        <strong className="text-[#00C2FF] font-black text-sm">{broker.rebateGold}</strong>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30">
                        {broker.rebateBadge}
                      </span>
                    </div>

                    {/* Licenses Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {broker.licenses.map((lic, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#020712] border border-slate-800 text-slate-300 text-[10px] font-semibold rounded-md"
                        >
                          ● {lic.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <Link
                      href={broker.slug === 'vt-markets' ? '/brokers/vt-markets' : `/brokers/${broker.slug}`}
                      className={`flex-1 py-2.5 rounded-xl font-black text-xs text-center transition-all flex items-center justify-center gap-1.5 ${
                        broker.isTopPick
                          ? 'bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white shadow-md hover:brightness-110'
                          : 'bg-[#020712] hover:bg-slate-900 border border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>Xem Chi Tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Compare Checkbox Button */}
                    <button
                      onClick={() => toggleCompare(broker.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isComparing
                          ? 'bg-[#00C2FF] text-slate-950 font-black border border-[#00C2FF] shadow-[0_0_15px_rgba(0,194,255,0.3)]'
                          : 'bg-[#020712] hover:bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Chọn so sánh"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isComparing ? 'Đã chọn' : 'So sánh'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Floating Comparison Drawer (When 1+ Brokers Selected) */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 inset-x-0 z-40 max-w-3xl mx-auto px-4 animate-in slide-in-from-bottom-6 duration-300">
            <div className="bg-[#050D1A]/95 backdrop-blur-2xl border-2 border-[#00C2FF] rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#00C2FF]/20 text-[#00C2FF] rounded-2xl border border-[#00C2FF]/40">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Đang so sánh ({compareList.length}/4 sàn):</span>
                    <span className="text-[#00C2FF] font-extrabold">
                      {compareList.map((id) => TOP_BROKERS_DATA.find((b) => b.id === id)?.name).join(' vs ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Xem bảng so sánh chi tiết điểm thắng của VT Markets</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setCompareList([])}
                  className="px-3 py-2 bg-[#020712] hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-bold"
                >
                  Xóa
                </button>
                <button
                  onClick={handleGoToCompare}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs rounded-xl shadow-lg shadow-[#00C2FF]/30 hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>So Sánh Chi Tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
