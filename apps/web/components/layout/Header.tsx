"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";

export function Header() {
  const pathname = usePathname() || "/";
  const { language, setLanguage } = useLanguage();

  // Helper function to check if active
  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const [isVtLinked, setIsVtLinked] = useState(false);
  useEffect(() => {
    setIsVtLinked(localStorage.getItem('vtLinked') === 'true');
    const handleStorageChange = () => {
      setIsVtLinked(localStorage.getItem('vtLinked') === 'true');
    };
    window.addEventListener('vt-linked-change', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('vt-linked-change', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vtLinked');
    window.dispatchEvent(new Event('vt-linked-change'));
  };

  const handleLinkAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem('vtLinked', 'true');
    window.dispatchEvent(new Event('vt-linked-change'));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img 
              src="https://hieunthub.co/uploads/brokers/logos/vt-markets-logo-v3.png" 
              alt="VT Rewards Hub" 
              width="36" 
              height="36" 
              loading="eager" 
              decoding="async" 
              className="h-9 w-9 rounded object-cover shadow-lg shadow-orange-500/30 shrink-0"
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-extrabold text-base sm:text-lg text-white">VT Rewards Hub</div>
              <div className="text-[10px] text-zinc-500 -mt-0.5">by VT Markets</div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm justify-center shrink-0">
          <Link 
            href="/" 
            className={`relative inline-flex items-center gap-1.5 transition whitespace-nowrap font-semibold ${
              isActive("/", true) ? "text-orange-400" : "text-zinc-400 hover:text-orange-300"
            }`}
          >
            <span>Trang chủ</span>
          </Link>
          <Link 
            href="/rewards" 
            className={`relative inline-flex items-center gap-1.5 transition whitespace-nowrap px-2.5 py-1 rounded-full border border-amber-400/30 font-bold ${
              isActive("/rewards") ? "bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]" : "text-zinc-400 hover:text-amber-300 bg-amber-500/10 shadow-[0_0_10px_rgba(251,191,36,0.15)] hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            }`}
          >
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span>Rewards</span>
          </Link>
          <Link 
            href="/ib-commission-overview" 
            className={`relative inline-flex items-center gap-1.5 transition whitespace-nowrap font-semibold ${
              isActive("/ib-commission-overview") ? "text-orange-400" : "text-zinc-400 hover:text-orange-300"
            }`}
          >
            <span>IB Partner</span>
          </Link>
          <Link 
            href="/offers-bonus" 
            className={`relative inline-flex items-center gap-1.5 transition whitespace-nowrap font-semibold ${
              isActive("/offers-bonus") ? "text-orange-400" : "text-zinc-400 hover:text-orange-300"
            }`}
          >
            <span>Promotions</span>
          </Link>

          {/* Tools Dropdown */}
          <details className="hidden md:block relative group" data-hh-nav-dropdown="">
            <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 text-sm transition font-semibold text-zinc-400 hover:text-orange-300">
              <span>Tools</span>
              <svg className="h-3.5 w-3.5 transition group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>
            </summary>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 min-w-[200px]">
              <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl p-2">
                <Link href="/indicators" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white">
                  Chỉ báo & EA
                </Link>
                <Link href="/gia-vang-hom-nay" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white">
                  Giá vàng Live
                </Link>
                <Link href="/passview" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white">
                  Passview giao dịch
                </Link>
                <Link href="/courses" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white">
                  Khóa học
                </Link>
                <Link href="/predictions" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-white">
                  Dự đoán thị trường
                </Link>
              </div>
            </div>
          </details>

          <Link 
            href="/contact" 
            className={`relative inline-flex items-center gap-1.5 transition whitespace-nowrap font-semibold ${
              isActive("/contact") ? "text-orange-400" : "text-zinc-400 hover:text-orange-300"
            }`}
          >
            <span>Support</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex flex-1 items-center justify-end gap-3 shrink-0">
          {/* Desktop Lang Toggle */}
          <div className="hidden md:inline-flex items-center text-xs text-zinc-400 border border-white/10 rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`px-2.5 py-1 transition ${
                language === "vi" ? "bg-orange-500/20 text-orange-300 font-bold" : "hover:bg-white/5"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 transition ${
                language === "en" ? "bg-orange-500/20 text-orange-300 font-bold" : "hover:bg-white/5"
              }`}
            >
              EN
            </button>
          </div>

          {/* User Avatar OR Contact Button */}
          {isVtLinked ? (
            <details className="hidden sm:block relative group" data-hh-nav-dropdown="">
              <summary className="list-none cursor-pointer inline-flex items-center outline-none">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 p-[2px] shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
                  <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-900 overflow-hidden">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </summary>
              <div className="absolute right-0 top-full pt-3 z-50 min-w-[260px]">
                <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
                  <div className="p-3 border-b border-white/10 mb-2">
                    <div className="text-xs text-zinc-500 font-medium mb-0.5">Tài khoản liên kết</div>
                    <div className="text-sm text-white font-bold tracking-wide flex items-center justify-between">
                      VTM-982412
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Đã kết nối</span>
                    </div>
                  </div>
                  <Link href="/rewards" className="flex items-center gap-2 rounded px-3 py-2 text-sm transition text-zinc-300 hover:bg-white/5 hover:text-orange-300 group">
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-orange-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    Theo dõi tiến độ
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 rounded px-3 py-2 text-sm transition text-rose-400 hover:bg-rose-500/10 text-left group">
                    <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </details>
          ) : (
            <button onClick={handleLinkAccount} className="hidden sm:inline-flex rounded bg-gradient-to-r from-orange-400 to-amber-600 px-4 py-2 text-sm font-semibold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/30 whitespace-nowrap">
              Liên kết tài khoản
            </button>
          )}

          {/* Mobile Menu */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer rounded border border-white/10 bg-white/5 p-2 hover:border-white/20 transition" aria-label="Menu">
              <svg className="h-5 w-5 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-72 max-h-[80vh] overflow-y-auto rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl p-2 z-50">
              <Link href="/" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/", true) ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Trang chủ</span>
              </Link>
              <Link href="/rewards" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/rewards") ? "text-amber-400 bg-amber-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="flex-1">Rewards</span>
              </Link>
              <Link href="/ib-commission-overview" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/ib-commission-overview") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">IB Partner</span>
              </Link>
              <Link href="/offers-bonus" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/offers-bonus") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Promotions</span>
              </Link>
              
              <div className="my-2 border-t border-white/5"></div>
              <div className="px-3 pt-1 pb-2 text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Tools</div>
              
              <Link href="/indicators" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/indicators") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Chỉ báo & EA</span>
              </Link>
              <Link href="/gia-vang-hom-nay" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/gia-vang-hom-nay") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Giá vàng Live</span>
              </Link>
              <Link href="/passview" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/passview") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Passview</span>
              </Link>
              <Link href="/courses" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/courses") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Khóa học</span>
              </Link>
              <Link href="/predictions" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/predictions") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Dự đoán</span>
              </Link>

              <div className="my-2 border-t border-white/5"></div>

              <Link href="/contact" className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition font-semibold ${isActive("/contact") ? "text-orange-400 bg-orange-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                <span className="flex-1">Support</span>
              </Link>
              
              {/* Mobile Lang */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 px-3 text-xs">
                <span className="text-zinc-500">Ngôn ngữ:</span>
                <button
                  type="button"
                  onClick={() => setLanguage("vi")}
                  className={`px-2 py-0.5 rounded ${language === "vi" ? "bg-orange-500/20 text-orange-300 font-bold" : "text-zinc-400"}`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-0.5 rounded ${language === "en" ? "bg-orange-500/20 text-orange-300 font-bold" : "text-zinc-400"}`}
                >
                  EN
                </button>
              </div>
              
              <div className="mt-2 pt-2 border-t border-white/10">
                {isVtLinked ? (
                   <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded px-3 py-2 text-sm transition text-rose-400 border border-rose-500/20 bg-rose-500/10 font-semibold">
                     Đăng xuất
                   </button>
                ) : (
                  <button onClick={handleLinkAccount} className="w-full block rounded bg-gradient-to-r from-orange-400 to-amber-600 px-3 py-2 text-sm font-semibold text-zinc-950 text-center">
                    Liên kết tài khoản
                  </button>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
