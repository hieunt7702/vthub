'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Star, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Zap,
  Globe2,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Smartphone,
  Server,
  Headphones,
  Info,
  Calendar,
  Layers,
  BarChart3,
  MapPin,
  Clock,
  Download,
  Share2,
  Heart,
  Bookmark,
  MessageSquare,
  Check
} from 'lucide-react';

export default function GioiThieuVTMarketsPage() {
  const [activeMainTab, setActiveMainTab] = useState<string>('account-info');
  const [activeAccountType, setActiveAccountType] = useState<string>('Cent ECN');
  const [activeAppPlatform, setActiveAppPlatform] = useState<string>('all');
  const [activeRegionTab, setActiveRegionTab] = useState<string>('country');
  const [activeWebsiteTab, setActiveWebsiteTab] = useState<string>('all');

  // Thông số kỹ thuật chi tiết các loại tài khoản (100% Tiếng Việt)
  const ACCOUNT_SPECS: Record<string, any> = {
    'Cent ECN': {
      condition: 'Hạng A (Tiêu Chuẩn Cao Nhất)',
      currency: 'USD Cent (Tài khoản Xu)',
      leverage: '1:1000 (Tối Đa)',
      eaSupport: true,
      minDeposit: '$50 (Khoảng 1.250.000 VNĐ)',
      minSpread: 'Từ 0.0 Pip Cent',
      depositMethods: 'VietQR 24/7, Chuyển khoản ngân hàng, USDT',
      withdrawMethods: 'Ngân hàng nội địa Việt Nam (1 - 3 phút), USDT 24/7',
      minTrade: '0.01 Cent Lot (Thích hợp kiểm thử Bot EA)',
      commission: '$6 / mỗi vòng giao dịch (Ưu đãi)',
      products: 'Vàng Cent (XAUUSD-STDc), Cặp tiền tệ Forex Cent'
    },
    'Cent STP': {
      condition: 'Hạng A (Tiêu Chuẩn Cao Nhất)',
      currency: 'USD Cent (Tài khoản Xu)',
      leverage: '1:1000 (Tối Đa)',
      eaSupport: true,
      minDeposit: '$50 (Khoảng 1.250.000 VNĐ)',
      minSpread: 'Từ 1.2 Pip Cent',
      depositMethods: 'VietQR 24/7, Chuyển khoản ngân hàng, USDT',
      withdrawMethods: 'Ngân hàng nội địa Việt Nam (1 - 3 phút), USDT',
      minTrade: '0.01 Cent Lot',
      commission: '$0 (Miễn phí hoa hồng)',
      products: 'Vàng Cent, Cặp tiền Ngoại hối Cent'
    },
    'RAW ECN': {
      condition: 'Hạng A (Khớp lệnh siêu tốc)',
      currency: 'USD, EUR, GBP, AUD',
      leverage: '1:1000 (Tối Đa)',
      eaSupport: true,
      minDeposit: '$50 (Khoảng 1.250.000 VNĐ)',
      minSpread: 'Từ 0.0 Pip (Cực mỏng)',
      depositMethods: 'VietQR 24/7, Internet Banking, USDT, Thẻ Visa/Mastercard',
      withdrawMethods: 'Ngân hàng Việt Nam (1 - 3 phút tự động), USDT 24/7',
      minTrade: '0.01 Lot Tiêu chuẩn',
      commission: '$6 / mỗi vòng giao dịch (Khớp lệnh trực tiếp LP Tier-1)',
      products: 'Vàng (XAUUSD), Ngoại hối (Forex), Dầu thô, Cổ phiếu Mỹ, Crypto'
    },
    'Standard STP': {
      condition: 'Hạng A (Phổ thông)',
      currency: 'USD, EUR, GBP',
      leverage: '1:1000 (Tối Đa)',
      eaSupport: true,
      minDeposit: '$50 (Khoảng 1.250.000 VNĐ)',
      minSpread: 'Từ 1.0 Pip',
      depositMethods: 'VietQR 24/7, Internet Banking, USDT',
      withdrawMethods: 'Ngân hàng Việt Nam (1 - 3 phút), USDT 24/7',
      minTrade: '0.01 Lot Tiêu chuẩn',
      commission: '$0 (Hoàn toàn miễn phí hoa hồng)',
      products: 'Forex, Vàng, Chỉ số chứng khoán quốc tế, Năng lượng'
    },
    'Swap-Free RAW ECN': {
      condition: 'Hạng A (Miễn phí qua đêm)',
      currency: 'USD',
      leverage: '1:500',
      eaSupport: true,
      minDeposit: '$100 (Khoảng 2.500.000 VNĐ)',
      minSpread: 'Từ 0.0 Pip',
      depositMethods: 'VietQR 24/7, USDT',
      withdrawMethods: 'VietQR tức thì, USDT 24/7',
      minTrade: '0.01 Lot',
      commission: '$6 / lot (Không tính phí qua đêm Swap-Free)',
      products: 'Forex, Vàng Thế Giới Miễn phí qua đêm'
    },
    'Swap-Free STP': {
      condition: 'Hạng A (Miễn phí qua đêm)',
      currency: 'USD',
      leverage: '1:500',
      eaSupport: true,
      minDeposit: '$100 (Khoảng 2.500.000 VNĐ)',
      minSpread: 'Từ 1.2 Pip',
      depositMethods: 'VietQR 24/7, USDT',
      withdrawMethods: 'VietQR tức thì, USDT 24/7',
      minTrade: '0.01 Lot',
      commission: '$0 (Miễn phí hoa hồng & Miễn phí qua đêm)',
      products: 'Forex, Vàng Thế Giới Swap-Free'
    },
    'Pro ECN': {
      condition: 'Hạng A+ (Dành cho VIP Trader)',
      currency: 'USD, EUR',
      leverage: '1:1000',
      eaSupport: true,
      minDeposit: '$10,000 (Tài khoản VIP)',
      minSpread: '0.0 Pip (Thanh khoản trực tiếp ngân hàng)',
      depositMethods: 'Chuyển khoản quốc tế Swift, VietQR VIP, USDT',
      withdrawMethods: 'Ưu tiên xử lý lệnh VIP tức thì 24/7',
      minTrade: '0.1 Lot',
      commission: '$3.5 / lot (Phí ưu đãi đặc quyền VIP)',
      products: 'Toàn bộ 1,000+ mã giao dịch toàn cầu'
    }
  };

  // Dữ liệu Spread Thời Gian Thực Trực Tiếp
  const SPREAD_DATA = [
    { symbol: 'EURUSD', name: 'Euro / Đô la Mỹ', flag: '/wikifx/EURUSD.png_wiki-template-global-webp', buy: '1.13704', type: 'Tiêu chuẩn', spread: '1.4', avgSpread: '1.49', swapBuy: '-5.76', swapSell: '2.50' },
    { symbol: 'USDJPY', name: 'Đô la Mỹ / Yên Nhật', flag: '/wikifx/USDJPY.png_wiki-template-global-webp', buy: '158.423', type: 'Tiêu chuẩn', spread: '1.7', avgSpread: '1.98', swapBuy: '6.77', swapSell: '-21.52' },
    { symbol: 'GBPUSD', name: 'Bảng Anh / Đô la Mỹ', flag: '/wikifx/GBPUSD.png_wiki-template-global-webp', buy: '1.32129', type: 'Tiêu chuẩn', spread: '1.5', avgSpread: '2.30', swapBuy: '-1.03', swapSell: '-1.14' },
    { symbol: 'AUDUSD', name: 'Đô la Úc / Đô la Mỹ', flag: '/wikifx/AUDUSD.png_wiki-template-global-webp', buy: '0.70144', type: 'Tiêu chuẩn', spread: '1.5', avgSpread: '1.54', swapBuy: '0.28', swapSell: '-1.97' },
    { symbol: 'GBPJPY', name: 'Bảng Anh / Yên Nhật', flag: '/wikifx/GBPJPY.png_wiki-template-global-webp', buy: '209.310', type: 'Tiêu chuẩn', spread: '2.0', avgSpread: '3.63', swapBuy: '4.45', swapSell: '-19.82' },
    { symbol: 'USDCAD', name: 'Đô la Mỹ / Đô la Canada', flag: '/wikifx/USDCAD.png_wiki-template-global-webp', buy: '1.41491', type: 'Tiêu chuẩn', spread: '1.4', avgSpread: '1.75', swapBuy: '2.18', swapSell: '-7.12' },
    { symbol: 'XAUUSD', name: 'Vàng Thế Giới (Spot Gold)', flag: '/wikifx/EURUSD.png_wiki-template-global-webp', buy: '2,735.80', type: 'RAW ECN', spread: '0.9', avgSpread: '1.10', swapBuy: '-14.20', swapSell: '5.10' }
  ];

  // Link Tải Ứng Dụng Chính Thức
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cn.com.vtmarkets';
  const APP_STORE_URL = 'https://apps.apple.com/us/app/vt-markets-online-trading/id1372647263';

  // Danh Sách Ứng Dụng Giao Dịch Di Động
  const TRADING_APPS = [
    {
      id: 'app-1',
      platform: 'iOS / Android',
      category: 'ios',
      title: 'VT Markets - Trading App',
      downloads: '10,664+ lượt tải',
      desc: 'Giao dịch hơn 1.000+ tài sản: Cổ phiếu, Forex, Vàng với nạp rút tức thì và hỗ trợ CSKH 24/7.',
      iconBg: 'bg-[#002244]',
      screens: [
        '/wikifx/diandian1788811658999_445463.png_ddefault-webp',
        '/wikifx/diandian1788811658999_792271.png_ddefault-webp',
        '/wikifx/diandian1788811659000_101592.png_ddefault-webp',
        '/wikifx/diandian1788811659000_146356.png_ddefault-webp'
      ]
    },
    {
      id: 'app-2',
      platform: 'Android',
      category: 'android',
      title: 'VT Markets Pro - Trading App',
      downloads: '32,000+ lượt tải',
      desc: 'Phiên bản chuyên nghiệp với biểu đồ TradingView tích hợp, phân tích thị trường nâng cao và khớp lệnh 1-chạm.',
      iconBg: 'bg-[#1E293B]',
      screens: [
        '/wikifx/diandian1788811659000_159518.png_ddefault-webp',
        '/wikifx/diandian1788811659000_249456.png_ddefault-webp',
        '/wikifx/diandian1788811659000_398435.png_ddefault-webp',
        '/wikifx/diandian1788811659000_404762.png_ddefault-webp'
      ]
    },
    {
      id: 'app-3',
      platform: 'iOS / Android',
      category: 'android',
      title: 'VT Markets-Online Trading',
      downloads: '28,399+ lượt tải',
      desc: 'Ứng dụng đoạt giải thưởng: Giao dịch không phí hoa hồng, nạp rút tức thì và bảo vệ tài khoản đa tầng.',
      iconBg: 'bg-[#002244]',
      screens: [
        '/wikifx/diandian1788811659000_516509.png_ddefault-webp',
        '/wikifx/diandian1788811659000_701396.png_ddefault-webp',
        '/wikifx/diandian1788811659000_780725.png_ddefault-webp',
        '/wikifx/diandian1788811659000_807892.png_ddefault-webp'
      ]
    }
  ];

  // Xếp Hạng Mức Độ Ảnh Hưởng Theo Quốc Gia
  const REGION_DATA = [
    { country: 'Thái Lan (TH)', flagImg: '/wikifx/TH.png_wiki-template-global-webp', score: '6.72', width: '92%', color: 'bg-[#e56338]' },
    { country: 'Ấn Độ (IN)', flagImg: '/wikifx/IN.png_wiki-template-global', score: '6.49', width: '88%', color: 'bg-[#3b82f6]' },
    { country: 'Tây Ban Nha (ES)', flagImg: '/wikifx/ES.png_wiki-template-global', score: '6.42', width: '86%', color: 'bg-[#f59e0b]' },
    { country: 'Hà Lan (NL)', flagImg: '/wikifx/NL.png_wiki-template-global', score: '6.12', width: '80%', color: 'bg-[#3b82f6]' },
    { country: 'Philippines (PH)', flagImg: '/wikifx/PH.png_wiki-template-global', score: '6.07', width: '78%', color: 'bg-[#3b82f6]' },
    { country: 'Canada (CA)', flagImg: '/wikifx/CA.png_wiki-template-global', score: '5.60', width: '70%', color: 'bg-[#3b82f6]' },
    { country: 'Indonesia (ID)', flagImg: '/wikifx/ID.png_wiki-template-global', score: '5.53', width: '68%', color: 'bg-[#3b82f6]' },
    { country: 'Hoa Kỳ (US)', flagImg: '/wikifx/US.png_wiki-template-global-webp', score: '4.92', width: '60%', color: 'bg-[#3b82f6]' },
    { country: 'Ý (IT)', flagImg: '/wikifx/IT.png_wiki-template-global', score: '4.82', width: '58%', color: 'bg-[#3b82f6]' },
    { country: 'Việt Nam (VN)', flagImg: '/wikifx/VN.png_wiki-template-global-webp', score: '4.40', width: '52%', color: 'bg-[#3b82f6]' }
  ];

  // Danh Sách Hệ Thống Website Chính Thức
  const WEBSITES_DATA = [
    { domain: 'global-vtrader.com', ip: '104.21.55.212', flagImg: '/wikifx/US.png_wiki-template-global-webp', countryName: 'Hoa Kỳ' },
    { domain: 'vtmarketsgroup.com', ip: '13.113.71.26', flagImg: '/wikifx/JP.png_wiki-template-global-webp', countryName: 'Nhật Bản' },
    { domain: 'vtmarketszht.com', ip: '13.113.71.26', flagImg: '/wikifx/JP.png_wiki-template-global-webp', countryName: 'Nhật Bản' },
    { domain: 'vtmarketsvie.com', ip: '104.21.55.212', flagImg: '/wikifx/US.png_wiki-template-global-webp', countryName: 'Hoa Kỳ' },
    { domain: 'vtmarkets-fa.com', ip: '172.67.170.219', flagImg: '/wikifx/US.png_wiki-template-global-webp', countryName: 'Hoa Kỳ' },
    { domain: 'vnvtglobal.com', ip: '104.21.16.1', flagImg: '/wikifx/US.png_wiki-template-global-webp', countryName: 'Hoa Kỳ' }
  ];

  const currentSpec = ACCOUNT_SPECS[activeAccountType] || ACCOUNT_SPECS['Cent ECN'];

  return (
    <div className="min-h-screen flex flex-col bg-[#030812] text-slate-100 font-sans selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-4 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1200px] mx-auto px-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-[#00C2FF]">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-500">Giới thiệu sàn giao dịch</span>
            <span>/</span>
            <span className="text-[#00C2FF] font-medium">VT Markets (Đánh Giá Uy Tín: 8.68/10)</span>
          </div>
        </div>

        {/* 1. MASTER HEADER CARD */}
        <section className="max-w-[1200px] mx-auto px-4 mb-6">
          <div className="rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-[#0F1B2F] via-[#0A1324] to-[#050C1A] p-5 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-40 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left: Big Logo & Score Box (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-3.5">
                {/* Logo Large Banner Box */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 relative flex flex-col items-center justify-center shadow-lg min-h-[120px]">
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2CB250] text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                    Có giám sát quản lý
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#FAF0E4] text-[#B27E36] border border-[#E5C9A6] font-black text-[10px]">
                    VA
                  </span>
                  <div className="my-2 flex items-center justify-center w-full px-2">
                    <img
                      src="/logo_white.webp"
                      alt="VT Markets Logo"
                      className="h-12 sm:h-14 w-auto object-contain invert"
                    />
                  </div>
                </div>

                {/* Score Number Box */}
                <div className="bg-[#050E1F] border border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
                  <div>
                    <span className="text-[11px] text-amber-300/90 font-bold flex items-center gap-1">
                      Chỉ Số Thẩm Định <Info className="w-3 h-3 text-amber-400" />
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-amber-400 leading-tight tracking-tight flex items-baseline gap-1">
                      8.68
                      <span className="text-xs font-bold text-slate-400">/10</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
                      Hạng A (Top Sàn)
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-medium">Thẩm định độc lập 2026</span>
                  </div>
                </div>
              </div>

              {/* Middle: Title & Official Website Box (4.5 Cols) */}
              <div className="lg:col-span-4 space-y-3.5">
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight">VT Markets</h1>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 flex-wrap">
                    <img src="/wikifx/036.png_wiki-template-global-webp" alt="Australia" className="w-4 h-auto inline" />
                    <span>Nước Úc</span>
                    <span className="text-slate-600">|</span>
                    <span>10 - 15 năm hoạt động</span>
                    <span className="text-slate-600">|</span>
                    <span>Điều kiện giao dịch: <strong className="text-emerald-400 font-black">Hạng A</strong></span>
                  </p>
                </div>

                {/* Account Type Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30">
                    Tài khoản ECN
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30">
                    Tài khoản Vàng
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#00C2FF]/15 text-[#00C2FF] text-xs font-bold border border-[#00C2FF]/30">
                    Tài khoản Cent (STDc)
                  </span>
                </div>

                {/* Blue Website URL Box */}
                <div className="bg-[#0052FF] hover:bg-[#0045DC] rounded-xl p-3 flex items-center justify-between text-white shadow transition-all">
                  <div>
                    <a
                      href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-bold hover:underline block leading-tight"
                    >
                      https://www.vtmarkets.com/
                    </a>
                    <span className="text-[10px] text-blue-200 block uppercase font-semibold">Trang Chủ Chính Thức VT Markets</span>
                  </div>
                  <a
                    href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 hover:opacity-80"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* 2 Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-white shadow transition-all cursor-pointer"
                  >
                    Mở Tài Khoản Live
                  </a>
                  <button
                    onClick={() => setActiveMainTab('account-info')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-center text-xs font-semibold text-slate-300 shadow transition-all cursor-pointer"
                  >
                    Mốc Thời Gian
                  </button>
                </div>
              </div>

              {/* Right: Radar Pentagon Chart & Server Condition (3.5 Cols) */}
              <div className="lg:col-span-4 space-y-3">
                
                {/* Radar Pentagon Chart Box */}
                <div className="bg-[#050E1F] border border-slate-800 rounded-xl p-3 relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      Chỉ Số Đánh Giá Ngũ Giác <Info className="w-3 h-3 text-amber-400" />
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black">
                      TOP 1
                    </span>
                  </div>

                  {/* SVG Pentagon Chart */}
                  <div className="relative w-full h-[145px] flex items-center justify-center">
                    <svg viewBox="0 0 240 160" className="w-full h-full">
                      {/* Outer Pentagon Web */}
                      <polygon points="120,25 195,58 170,130 70,130 45,58" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1" />
                      <polygon points="120,45 170,68 152,115 88,115 70,68" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="0.8" />
                      
                      {/* Real Score Polygon */}
                      <polygon points="120,30 190,60 165,122 75,125 48,60" fill="rgba(245, 158, 11, 0.35)" stroke="#F59E0B" strokeWidth="1.8" />
                      
                      {/* Vertex Labels with exact scores */}
                      {/* Top: Quản lý */}
                      <text x="120" y="14" textAnchor="middle" className="text-[9px] fill-slate-400">Quản lý</text>
                      <text x="120" y="24" textAnchor="middle" className="text-[9px] font-bold fill-amber-300">8.29</text>

                      {/* Top-Right: KS rủi ro */}
                      <text x="195" y="48" textAnchor="middle" className="text-[9px] fill-slate-400">KS rủi ro</text>
                      <text x="195" y="58" textAnchor="middle" className="text-[9px] font-bold fill-emerald-400">9.80</text>

                      {/* Bottom-Right: Kinh doanh */}
                      <text x="175" y="142" textAnchor="middle" className="text-[9px] fill-slate-400">Kinh doanh</text>
                      <text x="175" y="152" textAnchor="middle" className="text-[9px] font-bold fill-amber-300">8.00</text>

                      {/* Bottom-Left: Chỉ số danh tiếng */}
                      <text x="65" y="142" textAnchor="middle" className="text-[9px] fill-slate-400">Danh tiếng</text>
                      <text x="65" y="152" textAnchor="middle" className="text-[9px] font-bold fill-amber-300">8.63</text>

                      {/* Top-Left: Chỉ số kỹ thuật */}
                      <text x="45" y="48" textAnchor="middle" className="text-[9px] fill-slate-400">Kỹ thuật</text>
                      <text x="45" y="58" textAnchor="middle" className="text-[9px] font-bold fill-[#00C2FF]">9.98</text>

                      {/* Center Score */}
                      <text x="120" y="85" textAnchor="middle" className="text-[18px] font-black fill-amber-400">8.68</text>
                    </svg>
                  </div>
                </div>

                {/* Mini Trading Condition Overview Box */}
                <div className="bg-[#050E1F] border border-slate-800 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-white text-[11px]">Điều kiện giao dịch</span>
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" />
                      <Share2 className="w-3.5 h-3.5 cursor-pointer hover:text-blue-400" />
                      <Bookmark className="w-3.5 h-3.5 cursor-pointer hover:text-amber-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Điều kiện xếp hạng</span>
                      <strong className="text-lg font-black text-emerald-400">A (Top 1)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tốc độ trung bình</span>
                      <strong className="text-sm font-bold text-white">460.3 <span className="text-[10px] font-normal text-slate-400">mili giây</span></strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-slate-400">Máy chủ MT4/5: </span>
                      <strong className="text-emerald-400">Chính thức</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-300">VTMarkets-Live 🇺🇸 MT4 <span className="text-amber-400 font-bold">(318 máy chủ) &gt;</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 2. TWO-COLUMN LAYOUT: REGULATION (LEFT) & SURVEY / GENERAL INFO (RIGHT) */}
        <section className="max-w-[1200px] mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN (4 COLS): Cơ Quan Quản Lý & Giấy Phép */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#0A1324] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">Cơ Quan Quản Lý Pháp Lý (3)</h3>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">Đã Xác Thực</span>
                </div>

                {/* ASIC */}
                <div className="p-3.5 rounded-xl bg-[#050E1F] border border-slate-800 space-y-1 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img src="/wikifx/036.png_wiki-template-global-webp" alt="ASIC" className="w-4 h-auto inline" />
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">ASIC</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Có giám sát quản lý
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-semibold">Nước Úc - GP Tạo lập Thị trường Ngoại hối (MM)</p>
                  <p className="text-[10px] text-slate-400 font-mono">Giấy phép AR số: <strong className="text-slate-200">001300704</strong></p>
                </div>

                {/* FSCA */}
                <div className="p-3.5 rounded-xl bg-[#050E1F] border border-slate-800 space-y-1 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🇿🇦</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">FSCA</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Có giám sát quản lý
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-semibold">Nam Phi - GP Giao dịch Ngoại hối (EP)</p>
                  <p className="text-[10px] text-slate-400 font-mono">Giấy phép FSP số: <strong className="text-slate-200">50865</strong></p>
                </div>

                {/* FSC */}
                <div className="p-3.5 rounded-xl bg-[#050E1F] border border-slate-800 space-y-1 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🇲🇺</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">FSC</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Có giám sát quản lý
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-semibold">Mauritius - GP Môi giới Đầu tư Phái sinh</p>
                  <p className="text-[10px] text-slate-400 font-mono">Giấy phép số: <strong className="text-slate-200">GB23202269</strong></p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (8 COLS): Survey Expo & Thông Tin Doanh Nghiệp */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Khảo Sát Thực Tế & Triển Lãm Toàn Cầu Box */}
              <div className="bg-[#0A1324] border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">Khảo Sát Thực Tế Toàn Cầu</h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Đạt Chuẩn Uy Tín
                    </span>
                    <span className="text-xs font-bold text-white ml-1">VT Markets</span>
                  </div>
                  <span className="text-[11px] text-slate-400">🇦🇪 Triển lãm Tài chính Dubai & Sydney</span>
                </div>

                {/* 3 Real Survey Photos */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] bg-slate-900 shadow-md">
                    <img 
                      src="/wikifx/FXS638633018044296353_984012.jpg_lssurvey-webp" 
                      alt="Khảo sát văn phòng VT Markets" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] bg-slate-900 shadow-md">
                    <img 
                      src="/wikifx/FXS638633018094107323_407343.jpg_lssurvey-webp" 
                      alt="Triển lãm tài chính quốc tế VT Markets" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] bg-slate-900 shadow-md">
                    <img 
                      src="/wikifx/FXS638633018121587949_589512.jpg_lssurvey-webp" 
                      alt="Văn phòng đại diện VT Markets" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin chung */}
              <div className="bg-[#0A1324] border border-slate-800 rounded-2xl p-5 shadow-xl relative space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">Thông Tin Doanh Nghiệp & Kênh Liên Hệ</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs cursor-pointer hover:text-green-400">💬</span>
                    <span className="text-slate-400 text-xs cursor-pointer hover:text-white">𝕏</span>
                    <span className="text-slate-400 text-xs cursor-pointer hover:text-blue-400">ⓕ</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Khu vực đăng ký</span>
                    <strong className="text-white font-semibold flex items-center gap-1">
                      <img src="/wikifx/036.png_wiki-template-global-webp" alt="Úc" className="w-3.5 h-auto inline" />
                      Nước Úc (Sydney, Australia)
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Hộp thư dịch vụ CSKH</span>
                    <strong className="text-[#00C2FF] font-mono">info@vtmarkets.com</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Thời gian hoạt động</span>
                    <strong className="text-white font-semibold">10 - 15 năm</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Trang web công ty</span>
                    <a href="https://www.vtmarkets.com/" target="_blank" rel="noreferrer" className="text-[#00C2FF] hover:underline font-semibold">
                      https://www.vtmarkets.com/
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Tên công ty pháp lý</span>
                    <strong className="text-white font-semibold">VT Markets Pty Ltd</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Facebook chính thức</span>
                    <a href="https://www.facebook.com/VTMarketsVietnam/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-semibold">
                      facebook.com/VTMarketsVietnam/
                    </a>
                  </div>
                </div>

                {/* Tóm tắt về công ty */}
                <div className="pt-3 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Tóm tắt chứng nhận</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1">
                      🏆 Giải thưởng 2025 SkyLine Thái Lan
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                      10 - 15 năm hoạt động
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                      Đăng ký tại Nước Úc
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                      Đăng ký tại Nam Phi
                    </span>
                  </div>
                </div>

                {/* Yellow "Nhận xét" Floating Button */}
                <div className="absolute right-5 bottom-5">
                  <a
                    href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-full bg-[#FFD733] hover:bg-[#F2CA2B] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Nhận xét</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE DATA SECTION WITH TAB BAR (100% TIẾNG VIỆT) */}
        <section className="max-w-[1200px] mx-auto px-4 mb-10">
          <div className="bg-[#0A1324] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Top Main Navigation Tabs with Yellow Active Underline */}
            <div className="flex items-center gap-6 px-6 border-b border-slate-800 overflow-x-auto scrollbar-none bg-[#070F1E]">
              {[
                { id: 'account-info', label: 'Thông Tin Tài Khoản' },
                { id: 'trading-apps', label: 'Ứng Dụng Giao Dịch' },
                { id: 'trading-conditions', label: 'Hạ Tầng & Khớp Lệnh' },
                { id: 'regions', label: 'Khu Vực Hoạt Động Toàn Cầu' },
                { id: 'marketing', label: 'Chiến Lược Thương Hiệu' },
                { id: 'verified-data', label: 'Dữ Liệu Thẩm Định' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`py-4 text-xs sm:text-sm font-semibold whitespace-nowrap relative transition-colors cursor-pointer ${
                    activeMainTab === tab.id
                      ? 'text-[#FFD733] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeMainTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD733] rounded-t-sm shadow-[0_0_8px_rgba(255,215,51,0.6)]" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: THÔNG TIN TÀI KHOẢN */}
            {activeMainTab === 'account-info' && (
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h3 className="text-base font-bold text-white mb-4">Các Loại Tài Khoản Giao Dịch VT Markets</h3>

                  {/* Subtabs for Account Types */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Object.keys(ACCOUNT_SPECS).map((acc) => (
                      <button
                        key={acc}
                        onClick={() => setActiveAccountType(acc)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeAccountType === acc
                            ? 'bg-[#FFD733] text-slate-950 font-black shadow-md'
                            : 'bg-[#050E1F] text-slate-300 hover:text-white border border-slate-800'
                        }`}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>

                  {/* 2-Column Parameter Grid (100% Tiếng Việt) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-12 text-xs py-4 border-t border-b border-slate-800/80 bg-[#050E1F]/60 rounded-xl p-5">
                    {/* Left Col */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Điều kiện xếp hạng:</span>
                        <strong className="text-emerald-400 font-bold">{currentSpec.condition}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Đòn bẩy tối đa:</span>
                        <span className="text-white font-semibold">{currentSpec.leverage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Mức nạp tối thiểu:</span>
                        <strong className="text-[#00C2FF]">{currentSpec.minDeposit}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phương thức nạp tiền:</span>
                        <span className="text-slate-300">{currentSpec.depositMethods}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Khối lượng tối thiểu:</span>
                        <strong className="text-white">{currentSpec.minTrade}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Sản phẩm giao dịch:</span>
                        <span className="text-slate-300">{currentSpec.products}</span>
                      </div>
                    </div>

                    {/* Right Col */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Loại tiền tệ cơ sở:</span>
                        <span className="text-slate-300">{currentSpec.currency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hỗ trợ Robot EA tự động:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Có (Tối ưu chuyên sâu MT5)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Mức Spread thấp nhất:</span>
                        <strong className="text-amber-400">{currentSpec.minSpread}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phương thức rút tiền:</span>
                        <span className="text-slate-300">{currentSpec.withdrawMethods}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phí hoa hồng (Commission):</span>
                        <strong className="text-white">{currentSpec.commission}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Spread Thời Gian Thực Trực Tiếp */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#00C2FF]" />
                    <span>Bảng Spread Thời Gian Thực Trực Tiếp</span>
                  </h4>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#050E1F] text-slate-300 border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Cặp tiền giao dịch</th>
                          <th className="py-3 px-4 font-semibold text-center">Giá mua (Live)</th>
                          <th className="py-3 px-4 font-semibold text-center">Loại tài khoản</th>
                          <th className="py-3 px-4 font-semibold text-center">Chênh lệch Spread</th>
                          <th className="py-3 px-4 font-semibold text-center">Spread trung bình ngày</th>
                          <th className="py-3 px-4 font-semibold text-center">Phí qua đêm Mua (USD/Lot)</th>
                          <th className="py-3 px-4 font-semibold text-center">Phí qua đêm Bán (USD/Lot)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-[#070F1E]/60">
                        {SPREAD_DATA.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                              <img src={row.flag} alt={row.symbol} className="w-5 h-5 object-contain rounded-full" />
                              <span>{row.symbol}</span>
                              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">({row.name})</span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                              {row.buy}
                            </td>
                            <td className="py-3 px-4 text-center text-slate-300">
                              {row.type}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                {row.spread} Pip
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center text-slate-200 font-medium">
                              {row.avgSpread} Pip
                            </td>
                            <td className="py-3 px-4 text-center font-mono text-slate-300">
                              {row.swapBuy}
                            </td>
                            <td className="py-3 px-4 text-center font-mono text-slate-300">
                              {row.swapSell}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer: "Xem thêm" & Date */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:w-auto text-center sm:text-left">
                      <button className="px-8 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer">
                        Xem Thêm Cặp Tiền Khác
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Cập nhật trực tiếp: 2026-09-25
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: ỨNG DỤNG GIAO DỊCH (VỚI LINK TẢI GOOGLE PLAY & APP STORE) */}
            {activeMainTab === 'trading-apps' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Ứng Dụng Giao Dịch Di Động Chính Thức</h3>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveAppPlatform('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        activeAppPlatform === 'all'
                          ? 'bg-[#FFD733] text-slate-950 font-black'
                          : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                      }`}
                    >
                      Tất cả (3 App)
                    </button>
                    <button
                      onClick={() => setActiveAppPlatform('ios')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        activeAppPlatform === 'ios'
                          ? 'bg-[#FFD733] text-slate-950 font-black'
                          : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                      }`}
                    >
                      Dành cho iOS (iPhone/iPad)
                    </button>
                    <button
                      onClick={() => setActiveAppPlatform('android')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        activeAppPlatform === 'android'
                          ? 'bg-[#FFD733] text-slate-950 font-black'
                          : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                      }`}
                    >
                      Dành cho Android (APK/Google Play)
                    </button>
                  </div>
                </div>

                {/* App Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TRADING_APPS
                    .filter(app => activeAppPlatform === 'all' || app.category === activeAppPlatform)
                    .map((app) => (
                      <div key={app.id} className="border border-slate-800 rounded-2xl p-4 bg-[#050E1F] shadow-lg space-y-4 flex flex-col justify-between">
                        <div>
                          {/* Top App Header */}
                          <div className="flex items-start gap-3">
                            <div className={`w-11 h-11 rounded-xl ${app.iconBg} border border-slate-700 flex items-center justify-center text-white font-black text-base shrink-0 shadow-md`}>
                              vt
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{app.title}</h4>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{app.desc}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[9px] text-slate-500 block">Lượt tải về</span>
                              <strong className="text-xs font-bold text-emerald-400">{app.downloads}</strong>
                            </div>
                          </div>

                          {/* 4 App Screenshot Preview Images */}
                          <div className="grid grid-cols-4 gap-1.5 pt-3 mt-3 border-t border-slate-800">
                            {app.screens.map((src, sIdx) => (
                              <div key={sIdx} className="rounded-lg border border-slate-800 overflow-hidden aspect-[9/18] bg-slate-900 shadow-sm">
                                <img src={src} alt="Giao diện App" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Direct Download Buttons for Google Play & App Store */}
                        <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                          <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-center text-[10px] font-bold text-white flex items-center justify-center gap-1 transition-all shadow-sm"
                          >
                            <span>Google Play</span>
                            <Download className="w-3 h-3 text-[#00C2FF]" />
                          </a>
                          <a
                            href={APP_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-center text-[10px] font-bold text-white flex items-center justify-center gap-1 transition-all shadow-sm"
                          >
                            <span>App Store</span>
                            <Download className="w-3 h-3 text-amber-400" />
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: HẠ TẦNG & KHỚP LỆNH */}
            {activeMainTab === 'trading-conditions' && (
              <div className="p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-bold text-white">Hạ Tầng Máy Chủ & Điều Kiện Thanh Khoản Siêu Tốc</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-slate-800 bg-[#050E1F] space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00C2FF]">
                      <Server className="w-4 h-4" />
                      <span>Máy Chủ Equinix NY4 & LD4</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Tốc độ khớp lệnh siêu tốc dưới 15ms</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Kết nối trực tiếp 318 cụm máy chủ thanh khoản Tier-1 (J.P. Morgan, Citi, Barclays), đảm bảo lệnh của bạn vào thị trường ngay lập tức, không báo giá lại và chống trượt giá tối đa.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-800 bg-[#050E1F] space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <CreditCard className="w-4 h-4" />
                      <span>Cổng Nạp Rút VietQR Tự Động 24/7</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Tự động xử lý trong 1 - 3 phút</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Nạp rút tức thì qua tất cả các ngân hàng Việt Nam (Vietcombank, Techcombank, MB, ACB, BIDV) và USDT TRC20/ERC20 với mức phí nạp rút hoàn toàn 0%.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: KHU VỰC HOẠT ĐỘNG TOÀN CẦU */}
            {activeMainTab === 'regions' && (
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white">Khu Vực Hoạt Động & Mức Độ Ảnh Hưởng Toàn Cầu</h3>
                      <span className="text-xs text-slate-400">Mức ảnh hưởng: <strong className="text-emerald-400">Hạng A</strong></span>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setActiveRegionTab('country')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          activeRegionTab === 'country' ? 'bg-[#FFD733] text-slate-950 font-black' : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                        }`}
                      >
                        Theo Quốc Gia
                      </button>
                      <button
                        onClick={() => setActiveRegionTab('company')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          activeRegionTab === 'company' ? 'bg-[#FFD733] text-slate-950 font-black' : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                        }`}
                      >
                        Theo Pháp Nhân Công Ty
                      </button>
                    </div>
                  </div>

                  {/* World Map & Ranking Bars */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                    {/* Map Graphic (Left) */}
                    <div className="lg:col-span-6 bg-[#050E1F] border border-slate-800 rounded-2xl p-6 text-center">
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">
                        <div className="space-y-2">
                          <Globe2 className="w-16 h-16 text-[#00C2FF]/60 mx-auto animate-pulse" />
                          <span className="block font-bold text-white text-sm">Bản Đồ Mức Độ Phủ Sóng Toàn Cầu VT Markets</span>
                          <span className="text-[11px] text-slate-400 block">Hiện diện và cung cấp thanh khoản tại hơn 160+ quốc gia & vùng lãnh thổ</span>
                        </div>
                      </div>
                    </div>

                    {/* Bars Ranking (Right) with real flag images */}
                    <div className="lg:col-span-6 space-y-2.5">
                      {REGION_DATA.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="w-36 font-bold text-white flex items-center gap-1.5">
                            <img src={item.flagImg} alt={item.country} className="w-4 h-auto inline rounded-xs" />
                            <span>{item.country}</span>
                          </div>
                          <div className="flex-1 mx-3 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className={`${item.color} h-full rounded-full`} style={{ width: item.width }} />
                          </div>
                          <span className="w-8 text-right font-mono font-bold text-amber-400">{item.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Website Domains Section */}
                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white">Hệ Thống Website & Cổng Giao Dịch Chính Thức</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Tất cả (21 Website)', 'Hoa Kỳ (17)', 'Nhật Bản (2)', 'Trung Quốc (1)', 'Nước Úc (1)'].map((tabStr, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setActiveWebsiteTab(tabStr)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                            (activeWebsiteTab === tabStr || (activeWebsiteTab === 'all' && tIdx === 0))
                              ? 'bg-[#FFD733] text-slate-950 font-black'
                              : 'bg-[#050E1F] text-slate-400 border border-slate-800'
                          }`}
                        >
                          {tabStr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domains Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WEBSITES_DATA.map((web, wIdx) => (
                      <div key={wIdx} className="p-3.5 rounded-xl border border-slate-800 bg-[#050E1F] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={web.flagImg} alt={web.countryName} className="w-4 h-auto inline" />
                          <span className="font-semibold text-white">{web.domain}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                          {web.ip}
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 5 & 6: CHIẾN LƯỢC THƯƠNG HIỆU & DỮ LIỆU THẨM ĐỊNH */}
            {(activeMainTab === 'marketing' || activeMainTab === 'verified-data') && (
              <div className="p-8 sm:p-12 text-center space-y-4">
                <Award className="w-14 h-14 text-amber-400 mx-auto opacity-90" />
                <h3 className="text-lg font-bold text-white">Chiến Lược Thương Hiệu & Sự Kiện Quốc Tế</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  VT Markets tự hào là nhà tài trợ chính thức của giải đua xe danh giá Newcastle 500 Supercars, đồng thời là đối tác chiến lược tại các diễn đàn kinh tế tài chính toàn cầu tại Dubai, Bangkok và Singapore.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* 4. BOTTOM ACTION CALL TO ACTION */}
        <section className="max-w-[1200px] mx-auto px-4 text-center">
          <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#0F1B2F] to-[#040A14] p-8 sm:p-10 shadow-2xl">
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Bắt Đầu Giao Dịch Cùng Sàn VT Markets (Hạng A Quốc Tế)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-xl mx-auto leading-relaxed">
              Mở tài khoản chính thức qua VT Rewards Hub để nhận ngay cơ chế hoàn phí Backcom tự động cao nhất, nhận miễn phí bộ 9 Bot EA MT5 và thưởng nạp 50%.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Mở Tài Khoản Live VT Markets Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/indicators"
                className="px-6 py-3.5 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm transition-all"
              >
                <span>Khám Phá Kho 9 Bot EA MT5</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
