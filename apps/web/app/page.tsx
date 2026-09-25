'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Sparkles, Download, ArrowRight, Bot, ChevronRight, Activity, Sliders, 
  ShieldCheck, Gift, Award, Zap, TrendingUp, ArrowUpRight, ArrowDownRight,
  Scale, BookOpen, Layers, BarChart2, Star, CheckCircle2, DollarSign, ExternalLink
} from 'lucide-react';
import { 
  useVTDataStore, 
  STORAGE_KEYS, 
  INITIAL_INDICATORS, 
  INITIAL_POSTS, 
  VTIndicator, 
  VTPost 
} from '../lib/dataStore';

const LIVE_TICKERS = [
  { symbol: 'XAUUSD', name: 'Gold Spot', ask: '2,718.50', bid: '2,718.00', change: '+1.42%', up: true },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', ask: '1.0845', bid: '1.0844', change: '+0.18%', up: true },
  { symbol: 'BTCUSD', name: 'Bitcoin', ask: '96,420.50', bid: '96,415.00', change: '+3.15%', up: true },
  { symbol: 'US30', name: 'Wall Street 30', ask: '43,890.20', bid: '43,888.00', change: '-0.32%', up: false },
  { symbol: 'US500', name: 'US SPX 500', ask: '5,982.40', bid: '5,982.10', change: '+0.45%', up: true },
  { symbol: 'GBPUSD', name: 'British Pound', ask: '1.2960', bid: '1.2958', change: '-0.12%', up: false },
  { symbol: 'ETHUSD', name: 'Ethereum', ask: '3,480.10', bid: '3,478.50', change: '+2.80%', up: true },
  { symbol: 'NAS100', name: 'US Tech 100', ask: '21,140.80', bid: '21,138.00', change: '+0.92%', up: true }
];

export default function Home() {
  const { language, t } = useLanguage();
  const [indicators] = useVTDataStore<VTIndicator>(STORAGE_KEYS.INDICATORS, INITIAL_INDICATORS);
  const [posts] = useVTDataStore<VTPost>(STORAGE_KEYS.POSTS, INITIAL_POSTS);

  // Activate dynamic scroll reveal on view
  useScrollReveal();

  // Active Showcase Tab (matching VT Markets 3D interactive tabs)
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<number>(0);
  const [isHoveringShowcase, setIsHoveringShowcase] = useState<boolean>(false);

  // Backcom Rebate Calculator (Custom Rate + Volume)
  const [customRebateRate, setCustomRebateRate] = useState<number>(15);
  const [monthlyLots, setMonthlyLots] = useState<number>(50);
  const estimatedMonthlyCashback = monthlyLots * customRebateRate;
  const estimatedAnnualCashback = estimatedMonthlyCashback * 12;

  const SHOWCASE_TABS = [
    {
      id: 'rewards',
      title: 'VT Rewards & Lộ Trình Thưởng Khối Lượng',
      short: 'Phần Thưởng $200k',
      icon: Gift,
      badge: 'Lộ trình thưởng tối đa',
      highlight: '$200,000 USD Tiền Mặt',
      description: 'Chương trình thưởng khối lượng giao dịch quy đổi (Trading Volume) dành riêng cho đối tác & khách hàng Bạch Kim với 11 cột mốc cộng dồn minh bạch.',
      features: [
        'Mốc thưởng bắt đầu từ $500 đến $200,000 USD',
        'Tự động ghi nhận theo công thức quy đổi chuẩn',
        'Chi trả trực tiếp về tài khoản hoặc rút ngân hàng'
      ],
      link: '/rewards',
      btnText: 'Xem Lộ Trình Phần Thưởng',
      coinSymbol: '🎁',
      coinColor: 'from-[#00C2FF] to-[#0052FF]'
    },
    {
      id: 'backcom',
      title: 'Hoàn Phí Rebate & Theo Dõi Volume',
      short: 'Hoàn Phí & Volume',
      icon: DollarSign,
      badge: 'Thanh toán tự động 24/7',
      highlight: 'Tự Động Tính & Hoàn Trực Tiếp',
      description: 'Nhận lại chi phí chênh lệch giá và hoa hồng theo từng lot giao dịch thực tế. Tiền hoàn tự động trả trực tiếp vào tài khoản giao dịch mỗi ngày không qua trung gian.',
      features: [
        'Tự động đối chiếu khối lượng giao dịch chuẩn xác',
        'Tự do tùy chỉnh mức hoàn phí theo tài khoản',
        'Không giữ tiền, không yêu cầu điều kiện rút'
      ],
      link: '/ib-commission-overview',
      btnText: 'Xem Cơ Chế Hoàn Phí & Volume',
      coinSymbol: '💰',
      coinColor: 'from-amber-400 to-orange-500'
    },
    {
      id: 'ea-bots',
      title: 'Bộ 9 Bot EA MT5 Độc Quyền',
      short: '9 Bot EA MT5',
      icon: Bot,
      badge: 'Miễn phí 100% mã nguồn .ex5',
      highlight: 'Apex Oracle AI & Dual Vortex DCA',
      description: 'Hệ thống 9 Expert Advisor tối ưu hóa bảo mật và thuật toán, chuyên biệt cho Vàng XAUUSD với SMC, Lưới Grid đa hướng, FVG và Turtle Trading.',
      features: [
        'Tích hợp trí tuệ nhân tạo OpenAI API & SMC',
        'Cơ chế tỉa lệnh chéo cứu tài khoản thông minh',
        'Chia sẻ miễn phí kèm khuyến nghị quản trị rủi ro'
      ],
      link: '/indicators',
      btnText: 'Khám Phá 9 Bot EA MT5',
      coinSymbol: '🤖',
      coinColor: 'from-cyan-400 to-blue-600'
    },
    {
      id: 'ea-builder',
      title: 'Tạo Bot EA No-Code (Studio)',
      short: 'Tạo Bot No-Code',
      icon: Sparkles,
      badge: 'Kéo Thả Trực Quan + AI MQL5',
      highlight: 'Studio Thiết Kế Bot MT5 Thuần Túy',
      description: 'Tự tay thiết kế chiến lược giao dịch tự động không cần lập trình: Kéo thả các khối Price Action, SMC, Quản Lý Vốn và sinh mã nguồn MQL5 chuẩn 0-Error ngay lập tức.',
      features: [
        'Kéo thả trực quan sơ đồ khối logic đa tầng',
        'Tích hợp chỉ báo MA, RSI, MACD, SMC FVG',
        'Xuất file MQL5 hoàn chỉnh tương thích MT5'
      ],
      link: '/builder',
      btnText: 'Trải Nghiệm Studio Tạo Bot',
      coinSymbol: '⚡',
      coinColor: 'from-teal-400 to-emerald-600'
    },
    {
      id: 'academy',
      title: 'Khóa Học Trading 3 Cấp Độ',
      short: 'Khóa Học 3 Cấp Độ',
      icon: BookOpen,
      badge: 'Đào tạo thực chiến 100% Miễn Phí',
      highlight: 'Cơ Bản ➔ Nâng Cao ➔ Chuyên Sâu SMC/MQL5',
      description: 'Lộ trình bài bản 3 cấp độ rõ ràng: Nhập môn trading MT5, phân tích kỹ thuật Smart Money Concept (SMC) và tự động hóa chiến lược bằng thuật toán MQL5.',
      features: [
        'Cấp 1: Nhập môn MT5 & Quản trị rủi ro cơ bản',
        'Cấp 2: SMC, Order Block & Vùng mất cân bằng FVG',
        'Cấp 3: Lập trình thuật toán Bot & Tối ưu hóa EA'
      ],
      link: '/courses',
      btnText: 'Vào Học Miễn Phí',
      coinSymbol: '🎓',
      coinColor: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'live-gold',
      title: 'Bảng Giá Vàng & Thị Trường Trực Tuyến',
      short: 'Giá Vàng Live',
      icon: BarChart2,
      badge: 'Bảng Giá Thị Trường Trực Tuyến',
      highlight: '12 Loại Vàng VN + Biểu Đồ XAU/USD',
      description: 'Bảng giá trực tuyến Vàng SJC 9999, DOJI, PNJ, Bảo Tín cùng biểu đồ Vàng thế giới Realtime và chỉ số Top cổ phiếu Mỹ cập nhật theo từng giây.',
      features: [
        'Cập nhật giá Mua/Bán theo từng phiên giao dịch',
        'Biểu đồ kỹ thuật TradingView XAU/USD nâng cao',
        'Tích hợp nguồn đối chiếu minh bạch uy tín'
      ],
      link: '/gia-vang-hom-nay',
      btnText: 'Xem Bảng Giá Vàng Trực Tuyến',
      coinSymbol: '🟡',
      coinColor: 'from-yellow-400 to-amber-600'
    }
  ];

  // Auto-play / Auto-rotation for 3D coin showcase tabs (every 3.5s when not hovered)
  useEffect(() => {
    if (isHoveringShowcase) return;

    const interval = setInterval(() => {
      setActiveShowcaseTab((prev) => (prev + 1) % SHOWCASE_TABS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHoveringShowcase, SHOWCASE_TABS.length]);

  const currentTab = (SHOWCASE_TABS[activeShowcaseTab] || SHOWCASE_TABS[0])!;

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow">
        {/* 1. HIGH-CLARITY VT MARKETS OFFICIAL VIDEO HERO */}
        <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-white/10 bg-[#000a14] text-center px-4 lg:px-8 pt-12 pb-16">
          {/* Authentic Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://d3a7kndgi8x4pg.cloudfront.net/vt/image/home_banner_video_img.webp"
              className="absolute inset-0 w-full h-full object-cover object-center"
            >
              <source src="https://d3a7kndgi8x4pg.cloudfront.net/vt/video/home_banner_video_new.mp4" type="video/mp4" />
              <source src="/videos/hero_bg.mp4" type="video/mp4" />
            </video>
            {/* Clear Mask Layer */}
            <div className="absolute inset-0 bg-[#000a14]/50 backdrop-brightness-90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-transparent to-[#000a14]/40"></div>
          </div>

          {/* Hero Content with Smooth Reveal */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center scroll-reveal">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/40 bg-[#00C2FF]/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-6 shadow-[0_0_20px_rgba(0,194,255,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2FF]"></span>
              </span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-tight sm:leading-[0.95] drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]">
              {t('hero.title_main')}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#00C2FF] uppercase tracking-wide drop-shadow-lg max-w-3xl">
              {t('hero.title_sub')}
            </p>

            {/* Description */}
            <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed font-medium drop-shadow px-2">
              {t('hero.description')}
            </p>

            {/* Large Clear Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/rewards"
                className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-100 text-[#0052FF] font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#0052FF]" />
                <span>{t('hero.btn_get_started')}</span>
              </Link>

              <Link
                href="/ib-commission-overview"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#050D1A]/90 hover:bg-[#08152B] text-white font-bold text-xs sm:text-sm border border-slate-700/80 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 hover:border-[#00C2FF]/60"
              >
                <DollarSign className="w-4 h-4 text-[#00C2FF]" />
                <span>Xem Cơ Chế Hoàn Phí Backcom</span>
              </Link>
            </div>

            {/* Metrics Bar */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-6 md:gap-10 w-full max-w-2xl pt-6 sm:pt-8 border-t border-white/15">
              <Link href="/ib-commission-overview" className="flex flex-col items-center hover:scale-105 transition-transform group">
                <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#00C2FF] tracking-tight">{t('hero.stat_rebate')}</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5 sm:mt-1 group-hover:text-[#00C2FF] transition-colors text-center">{t('hero.stat_rebate_lbl')}</span>
              </Link>
              <Link href="/gioi-thieu-vt-markets" className="flex flex-col items-center border-x border-white/15 px-1 sm:px-3 hover:scale-105 transition-transform group">
                <span className="text-xl sm:text-3xl md:text-4xl font-black text-amber-400 tracking-tight">{t('hero.stat_rating')}</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5 sm:mt-1 group-hover:text-amber-300 transition-colors flex items-center gap-1 text-center">
                  <span>{t('hero.stat_rating_lbl')}</span>
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                </span>
              </Link>
              <Link href="/indicators" className="flex flex-col items-center hover:scale-105 transition-transform group">
                <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#00C2FF] tracking-tight">9 Bot EA</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5 sm:mt-1 group-hover:text-[#00C2FF] transition-colors text-center">Suite MT5 Miễn Phí</span>
              </Link>
            </div>
          </div>

          {/* Smooth Scroll Indicator */}
          <div className="relative z-10 mt-10 flex flex-col items-center">
            <a
              href="#showcase-section"
              className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200">
                {t('hero.scroll_down')}
              </span>
              <svg 
                className="w-5 h-5 text-slate-400 group-hover:text-[#00C2FF] animate-bounce duration-1000 mt-1" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.5} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </section>

        {/* 2. VT MARKETS STYLE LIVE SCROLLING TICKER MARQUEE */}
        <section className="bg-[#030914] border-y border-slate-800 py-3 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <div className="shrink-0 flex items-center gap-2 pr-6 border-r border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse"></span>
              <span>Live Market:</span>
            </div>
            <div className="flex-grow overflow-hidden relative">
              <div className="flex gap-8 items-center animate-marquee whitespace-nowrap">
                {[...LIVE_TICKERS, ...LIVE_TICKERS].map((tick, idx) => (
                  <div key={idx} className="inline-flex items-center gap-3 bg-[#050D1A] border border-slate-800/80 px-3.5 py-1.5 rounded-xl">
                    <span className="font-bold text-white text-xs">{tick.symbol}</span>
                    <span className="text-slate-400 text-xs">{tick.ask}</span>
                    <span className={`inline-flex items-center text-xs font-bold ${tick.up ? 'text-[#00C2FF]' : 'text-rose-400'}`}>
                      {tick.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {tick.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. VT MARKETS 3D PERSPECTIVE COIN ARRAY & AUTO-ROTATING SHOWCASE */}
        <section 
          id="showcase-section" 
          className="py-16 sm:py-24 max-w-7xl mx-auto px-4 lg:px-8"
          onMouseEnter={() => setIsHoveringShowcase(true)}
          onMouseLeave={() => setIsHoveringShowcase(false)}
        >
          {/* Header Title Matching VT Markets */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-3.5 py-1 text-[11px] sm:text-xs font-bold text-[#00C2FF] mb-3 sm:mb-4 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>HỆ SINH THÁI TIỆN ÍCH ĐỘT PHÁ VT REWARDS HUB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
              Mọi Bước Chuyển Dịch Thị Trường &bull;{' '}
              <span className="text-[#00C2FF] drop-shadow-[0_0_35px_rgba(0,194,255,0.35)]">
                Mở Ra Vô Hạn Cơ Hội
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-2">
              Nhấp chọn từng biểu tượng hoặc thẻ dịch vụ để khám phá trọn vẹn đặc quyền tài chính, bộ công cụ tự động hóa và học viện chuyên sâu VT Markets.
            </p>
          </div>

          {/* Interactive Feature Category Tabs Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mb-10 sm:mb-14 scroll-reveal">
            {SHOWCASE_TABS.map((tab, idx) => {
              const isSelected = activeShowcaseTab === idx;
              const TabIcon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveShowcaseTab(idx);
                  }}
                  className={`group relative px-3 sm:px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl border text-[11px] sm:text-sm font-black transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white border-[#00C2FF] shadow-[0_0_30px_rgba(0,194,255,0.4)] scale-105 z-20'
                      : 'bg-[#050D1A] border-slate-800 text-slate-300 hover:text-white hover:border-[#00C2FF]/40 hover:bg-[#08152B]'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-[#00C2FF]'}`} />
                  <span>{tab.short}</span>
                </button>
              );
            })}
          </div>

          {/* AUTHENTIC VT MARKETS 3D PERSPECTIVE GLASS COIN ARRAY WITH AUTO-ROTATION */}
          <div className="mb-10 sm:mb-14 px-1 sm:px-2 py-4 sm:py-6 overflow-hidden scroll-reveal">
            <div className="flex items-center justify-center -space-x-2 sm:-space-x-6 lg:-space-x-10 perspective-1000 py-4 sm:py-6">
              {SHOWCASE_TABS.map((tab, idx) => {
                const isSelected = activeShowcaseTab === idx;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveShowcaseTab(idx)}
                    className={`cursor-pointer transition-all duration-500 transform ${
                      isSelected
                        ? '-translate-y-4 sm:-translate-y-8 scale-105 sm:scale-110 z-30'
                        : 'hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 opacity-80 sm:opacity-85 hover:opacity-100 z-10'
                    }`}
                    style={{
                      transform: isSelected 
                        ? 'translateY(-14px) scale(1.1) rotateY(0deg) rotateX(5deg)' 
                        : `rotateY(${(idx - activeShowcaseTab) * 8}deg) rotateX(10deg) translateY(${Math.abs(idx - activeShowcaseTab) * 4}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Glass Coin / Medallion Rim */}
                    <div
                      className={`relative w-14 h-14 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-full flex flex-col items-center justify-center p-1.5 sm:p-3 text-center transition-all duration-500 ${
                        isSelected
                          ? 'border-2 border-[#00C2FF] bg-gradient-to-br from-white/25 via-[#00C2FF]/15 to-[#0052FF]/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,194,255,0.6)] animate-coin-active'
                          : 'border border-white/20 bg-gradient-to-br from-white/10 via-slate-900/60 to-slate-950/80 backdrop-blur-lg shadow-2xl hover:border-[#00C2FF]/50'
                      }`}
                    >
                      {/* Inner metallic/crystal ring */}
                      <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-white/20 pointer-events-none" />
                      
                      {/* 3D Coin Emblem */}
                      <span className="text-lg sm:text-3xl lg:text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] transform transition-transform group-hover:scale-110">
                        {tab.coinSymbol}
                      </span>
                      
                      <span className="mt-0.5 sm:mt-1 text-[7px] sm:text-[10px] lg:text-[11px] font-black text-white uppercase tracking-wider line-clamp-1 max-w-[48px] sm:max-w-none">
                        {tab.short}
                      </span>

                      {isSelected && (
                        <div className="absolute -bottom-1.5 sm:-bottom-2 w-2 h-2 sm:w-3 sm:h-3 bg-[#00C2FF] rounded-full shadow-[0_0_12px_#00C2FF]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic 3D Glass Showcase Feature Card */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#00C2FF]/30 bg-gradient-to-b from-[#08152B] via-[#050D1A] to-[#020712] p-5 sm:p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden scroll-reveal">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-[#00C2FF]/15 blur-[140px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center relative z-10">
              {/* Left Column: Feature Details */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#00C2FF]/15 border border-[#00C2FF]/30 text-[#00C2FF] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#00C2FF]" />
                  <span>{currentTab.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {currentTab.title}
                </h3>

                <div className="text-lg sm:text-xl lg:text-2xl font-black text-[#00C2FF]">
                  {currentTab.highlight}
                </div>

                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  {currentTab.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
                  {currentTab.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C2FF] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 sm:pt-4">
                  <Link
                    href={currentTab.link}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#00C2FF]/25 hover:brightness-110 hover:scale-105 transition-all"
                  >
                    <span>{currentTab.btnText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Showcase Medallion Presentation */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
                <div className="relative w-44 h-44 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                  {/* Background layered glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0052FF]/30 to-[#00C2FF]/30 blur-2xl animate-pulse" />
                  
                  {/* Outer Orbit Ring */}
                  <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#00C2FF]/40 animate-spin-slow" />
                  
                  {/* Glass Disc 1 (Back Depth Layer) */}
                  <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white/5 border border-white/20 backdrop-blur-md transform -translate-x-3 -translate-y-3 sm:-translate-x-4 sm:-translate-y-4 shadow-xl" />
                  
                  {/* Glass Disc 2 (Active Foreground 3D Medallion) */}
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-[#00C2FF]/15 border-2 border-[#00C2FF] backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,194,255,0.45)] transform hover:scale-105 transition-transform duration-500">
                    <span className="text-4xl sm:text-6xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
                      {currentTab.coinSymbol}
                    </span>
                    <span className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-black text-white uppercase tracking-wider bg-[#020712]/90 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-white/20 shadow-lg">
                      {currentTab.short}
                    </span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider text-center">
                  Khám phá toàn diện hệ sinh thái VT Markets
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BACKCOM REBATE CALCULATOR */}
        <section id="calculator-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80 scroll-reveal">
          <div className="bg-[#050D1A] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5 text-[#00C2FF]" />
                  <span>{t('calc.badge')}</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                  {t('calc.title')}
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {t('calc.desc')}
                </p>

                <div className="bg-[#020712] p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-2 border-b border-slate-800/80">
                    <div>
                      <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase block mb-1">
                        {t('calc.rate_label')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C2FF] font-bold text-sm">$</span>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          step="0.5"
                          value={customRebateRate}
                          onChange={(e) => setCustomRebateRate(Math.max(1, Number(e.target.value)))}
                          className="w-full pl-7 pr-3 py-2 sm:py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-black text-[#00C2FF] focus:outline-none focus:border-[#00C2FF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase block mb-1">
                        {t('calc.lots_label')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={monthlyLots}
                          onChange={(e) => setMonthlyLots(Math.max(1, Number(e.target.value)))}
                          className="w-full px-3 py-2 sm:py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-black text-white focus:outline-none focus:border-[#00C2FF]"
                        />
                        <span className="text-xs text-slate-400 whitespace-nowrap font-semibold">
                          {t('calc.lots_unit')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>{t('calc.slider_label')}</span>
                      <strong className="text-[#00C2FF] font-bold">{monthlyLots} Lots</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="300"
                      step="5"
                      value={monthlyLots}
                      onChange={(e) => setMonthlyLots(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                      <span>5 Lots</span>
                      <span>50 Lots</span>
                      <span>150 Lots</span>
                      <span>300+ Lots</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#08152B] border border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-3 sm:space-y-4">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase block">
                  {t('calc.monthly_title')}
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00C2FF]">
                  ${estimatedMonthlyCashback.toLocaleString('en-US')} USD
                </div>
                <div className="text-xs text-[#00C2FF] font-semibold">
                  ≈ {(estimatedMonthlyCashback * 25400).toLocaleString('vi-VN')} VNĐ / {language === 'vi' ? 'tháng' : 'month'}
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {t('calc.annual_text')} <strong className="text-[#00C2FF] font-bold">${estimatedAnnualCashback.toLocaleString('en-US')} USD</strong>
                </div>
                <a
                  href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-all uppercase cursor-pointer"
                >
                  <span>{t('calc.btn_claim')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 9 BOT EA MT5 SHOWCASE & STUDIO (WITH DISCLAIMER) */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80 scroll-reveal">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#00C2FF] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                <Bot className="w-4 h-4" />
                <span>KHO BOT EA MT5 & STUDIO NO-CODE</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                Bộ 9 Expert Advisor VT-Markets
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Tải file .ex5 miễn phí, tích hợp AI OpenAI API hoặc tự tay thiết kế Bot EA với Studio No-Code.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Link href="/builder" className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Studio Build Bot</span>
              </Link>
              <Link href="/indicators" className="text-xs font-bold text-[#00C2FF] hover:underline flex items-center gap-1">
                <span>Xem đầy đủ 9 bot</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indicators.slice(0, 3).map((ind) => (
              <div
                key={ind.id}
                className="bg-[#050D1A] border border-slate-800 hover:border-[#00C2FF]/40 rounded-2xl p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-[#00C2FF]/10 text-[#00C2FF] font-bold rounded-md text-[10px] uppercase">
                      {ind.category}
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 font-bold rounded-md text-[10px]">
                      100% Free
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base">{ind.name}</h3>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-2">{ind.description}</p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{ind.downloadsCount} lượt tải</span>
                  <a
                    href={ind.downloadUrl}
                    download
                    className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải .EX5</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Disclaimer Box */}
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider">
                Khuyến Cáo Quản Trị Rủi Ro & Miễn Trừ Trách Nhiệm
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Toàn bộ 9 Expert Advisor và công cụ phân tích kỹ thuật được VT Rewards Hub chia sẻ miễn phí 100% nhằm mục đích học tập chiến lược và hỗ trợ giao dịch. Giao dịch ngoại hối (Forex) & Vàng (CFD) luôn tiềm ẩn rủi ro biến động giá. Nhà đầu tư nên kiểm thử kỹ lưỡng trên tài khoản Demo/Cent và tự chịu trách nhiệm với quyết định phân bổ vốn của mình.
              </p>
            </div>
          </div>
        </section>

        {/* 6. KHÓA HỌC TRADING 3 CẤP ĐỘ */}
        <section className="py-16 max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80 scroll-reveal">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>HỌC VIỆN VT REWARDS ACADEMY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Lộ Trình Khóa Học 3 Cấp Độ Thực Chiến
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Từ kiến thức nền tảng, chiến lược Smart Money Concept (SMC) đến tự động hóa Bot Trading chuyên sâu.
              </p>
            </div>
            <Link href="/courses" className="text-xs font-bold text-[#00C2FF] hover:underline flex items-center gap-1">
              <span>Xem tất cả khóa học</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#050D1A] border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-400/60 transition-all">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-500/15 text-blue-300 font-bold rounded-md text-[10px] uppercase border border-blue-500/30">
                  CẤP ĐỘ 1: CƠ BẢN
                </span>
                <h3 className="font-bold text-white text-base mt-3">Nhập Môn Trading & Vận Hành MT5</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Hiểu rõ cơ chế nạp rút, đòn bẩy, cách đặt lệnh Stop Loss, Take Profit và nguyên tắc quản trị rủi ro 1% tài khoản.
                </p>
              </div>
              <div className="mt-6 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">100% Miễn Phí</span>
                <Link href="/courses" className="text-xs text-[#00C2FF] font-bold hover:underline">
                  Vào Học &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-[#050D1A] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/60 transition-all">
              <div>
                <span className="px-2.5 py-0.5 bg-cyan-500/15 text-cyan-300 font-bold rounded-md text-[10px] uppercase border border-cyan-500/30">
                  CẤP ĐỘ 2: NÂNG CAO
                </span>
                <h3 className="font-bold text-white text-base mt-3">Chiến Lược SMC & Order Block Chuyên Nghiệp</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Phân tích cấu trúc thị trường, săn thanh khoản (Liquidity Hunt), xác định Fair Value Gap (FVG) và điểm vào lệnh tối ưu.
                </p>
              </div>
              <div className="mt-6 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">100% Miễn Phí</span>
                <Link href="/courses" className="text-xs text-[#00C2FF] font-bold hover:underline">
                  Vào Học &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-[#050D1A] border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400/60 transition-all">
              <div>
                <span className="px-2.5 py-0.5 bg-purple-500/15 text-purple-300 font-bold rounded-md text-[10px] uppercase border border-purple-500/30">
                  CẤP ĐỘ 3: CHUYÊN SÂU
                </span>
                <h3 className="font-bold text-white text-base mt-3">Lập Trình MQL5 & Quản Trị Hệ Thống Bot EA</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Thiết kế thuật toán tự động, tối ưu hóa Strategy Tester, kết nối OpenAI API và vận hành hệ sinh thái 9 Bot EA ổn định.
                </p>
              </div>
              <div className="mt-6 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">100% Miễn Phí</span>
                <Link href="/courses" className="text-xs text-[#00C2FF] font-bold hover:underline">
                  Vào Học &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. LATEST NEWS & INSIGHTS */}
        <section className="py-16 max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80 scroll-reveal">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4" />
                <span>{t('news.badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {t('news.title')}
              </h2>
            </div>
            <Link href="/tin-tuc" className="text-xs font-bold text-[#00C2FF] hover:underline flex items-center gap-1">
              <span>{t('news.view_all')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((p) => (
              <div key={p.id} className="bg-[#050D1A] border border-slate-800 hover:border-[#00C2FF]/40 rounded-2xl p-6 flex flex-col justify-between transition-all">
                <div>
                  <span className="text-[10px] text-[#00C2FF] font-bold uppercase tracking-wider">{p.category}</span>
                  <Link href={`/tin-tuc/${p.slug}`}>
                    <h3 className="font-bold text-white text-sm hover:text-[#00C2FF] transition-colors mt-2 line-clamp-2">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 text-xs mt-2.5 line-clamp-2">{p.excerpt}</p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>{p.readTime}</span>
                  <Link href={`/tin-tuc/${p.slug}`} className="text-[#00C2FF] font-bold hover:underline">
                    {t('news.read_more')} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
