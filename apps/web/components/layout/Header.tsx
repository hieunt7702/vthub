'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { Menu, X, ChevronDown, Gift, Bot, Sparkles, BookOpen, Activity, Shield, ShieldCheck } from 'lucide-react';

export function Header() {
  const pathname = usePathname() || '/';
  const { language, setLanguage, t } = useLanguage();
  const isVi = language === 'vi';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020712]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Logo VT Markets + Rewards Hub */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer hover:opacity-90 transition-opacity">
            <img 
              src="/logo_white.webp" 
              alt="VT Markets" 
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
            />
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-2.5">
              <span className="px-2 py-0.5 rounded-md bg-[#00C2FF]/15 border border-[#00C2FF]/40 text-[#00C2FF] text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-[0_0_12px_rgba(0,194,255,0.25)]">
                REWARDS HUB
              </span>
            </div>
          </Link>
        </div>

        {/* Clean Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-semibold justify-center">
          <Link 
            href="/" 
            className={`transition-colors whitespace-nowrap ${
              isActive('/', true) 
                ? 'text-[#00C2FF] font-bold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {t('nav.home')}
          </Link>

          <Link 
            href="/gioi-thieu-vt-markets" 
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              isActive('/gioi-thieu-vt-markets') 
                ? 'text-[#00C2FF] font-bold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>{isVi ? 'Về Sàn VT Markets' : 'About VT Markets'}</span>
          </Link>

          <Link 
            href="/rewards" 
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              isActive('/rewards') 
                ? 'border-[#00C2FF]/60 text-[#00C2FF] bg-[#00C2FF]/10 shadow-[0_0_15px_rgba(0,194,255,0.2)]' 
                : 'border-slate-700/80 text-[#00C2FF] hover:border-[#00C2FF]/50 bg-white/5'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>{isVi ? 'Phần Thưởng $200k' : 'Rewards $200k'}</span>
          </Link>

          <Link 
            href="/ib-commission-overview" 
            className={`transition-colors whitespace-nowrap ${
              isActive('/ib-commission-overview') 
                ? 'text-[#00C2FF] font-bold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {isVi ? 'Hoàn Phí & Volume' : 'Rebate & Volume'}
          </Link>

          <Link 
            href="/offers-bonus" 
            className={`transition-colors whitespace-nowrap ${
              isActive('/offers-bonus') 
                ? 'text-[#00C2FF] font-bold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {t('nav.promotions')}
          </Link>

          {/* Tools Dropdown */}
          <details className="relative group shrink-0" data-nav-dropdown="">
            <summary className="list-none cursor-pointer transition-colors inline-flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
              <span>{isVi ? 'Công Cụ & Bot EA' : 'Tools & EAs'}</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180 text-slate-400 shrink-0" />
            </summary>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[260px]">
              <div className="rounded-2xl border border-slate-800 bg-[#050D1A]/95 backdrop-blur-2xl shadow-2xl p-2.5 space-y-1">
                <Link href="/indicators" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition">
                  <Bot className="w-4 h-4 text-[#00C2FF]" />
                  <span>{isVi ? 'Kho 9 Bot EA MT5 Miễn Phí' : '9 Free MQL5 EAs'}</span>
                </Link>
                <Link href="/builder" className="flex items-center justify-between rounded-xl px-3 py-2 text-xs transition text-white bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 hover:border-teal-400/60 font-bold group/bld">
                  <span className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-teal-400 group-hover/bld:rotate-12 transition-transform" />
                    <span className="text-teal-300">{isVi ? 'Tạo Bot EA No-Code (Studio)' : 'No-Code EA Builder'}</span>
                  </span>
                  <span className="rounded bg-teal-500/30 px-1.5 py-0.5 text-[9px] font-black text-teal-200">AI</span>
                </Link>
                <Link href="/courses" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{isVi ? 'Khóa Học Trading 3 Cấp Độ' : '3-Tier Academy Courses'}</span>
                </Link>
                <Link href="/gia-vang-hom-nay" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>{isVi ? 'Bảng Giá Vàng Trực Tuyến' : 'Live Gold & Market'}</span>
                </Link>
                <Link href="/tin-tuc" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span>{isVi ? 'Tin Tức & Nhận Định' : 'News & Analysis'}</span>
                </Link>
              </div>
            </div>
          </details>
        </nav>

        {/* Right Action: Clean VI / EN switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#050D1A] border border-slate-700/80 rounded-lg p-0.5 text-xs font-bold">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                language === 'vi' 
                  ? 'bg-[#00C2FF]/20 text-[#00C2FF] font-extrabold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VI
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                language === 'en' 
                  ? 'bg-[#00C2FF]/20 text-[#00C2FF] font-extrabold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#020712]/98 px-4 py-4 space-y-2 text-sm font-semibold text-slate-300">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5 text-white">
            {t('nav.home')}
          </Link>
          <Link href="/gioi-thieu-vt-markets" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5 text-[#00C2FF] font-bold">
            🛡️ {isVi ? 'Về Sàn VT Markets (Thẩm Định 8.68)' : 'About VT Markets'}
          </Link>
          <Link href="/rewards" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#00C2FF] bg-[#00C2FF]/10 font-bold">
            🎁 {isVi ? 'Phần Thưởng $200k' : 'Rewards $200k'}
          </Link>
          <Link href="/ib-commission-overview" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#00C2FF] font-bold hover:bg-white/5">
            💰 {isVi ? 'Hoàn Phí & Trading Volume' : 'Rebate & Trading Volume'}
          </Link>
          <Link href="/indicators" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">
            📦 {isVi ? 'Kho 9 Bot EA MT5' : '9 Free MQL5 EAs'}
          </Link>
          <Link href="/builder" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-teal-300 bg-teal-500/10 font-bold hover:bg-teal-500/20 border border-teal-500/30">
            🤖 {isVi ? 'Tạo Bot EA No-Code (Studio)' : 'No-Code EA Builder'}
          </Link>
          <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">
            🎓 {isVi ? 'Khóa Học 3 Cấp Độ' : 'Academy Courses'}
          </Link>
          <Link href="/offers-bonus" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">
            🎉 {t('nav.promotions')}
          </Link>
          <Link href="/gia-vang-hom-nay" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5 text-amber-400">
            📈 {isVi ? 'Giá Vàng & Thị Trường LIVE' : 'Live Gold & Markets'}
          </Link>
          <Link href="/tin-tuc" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">
            📰 {t('nav.news')}
          </Link>
        </div>
      )}
    </header>
  );
}
