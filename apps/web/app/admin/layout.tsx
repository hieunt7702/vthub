'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthChecking(false);
      return;
    }

    const auth = localStorage.getItem('bh_admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthChecking(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('bh_admin_auth');
    router.push('/admin/login');
  };

  const navigation = [
    {
      name: 'Dashboard Tổng Quan',
      href: '/admin',
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: 'Sàn Giao Dịch & WikiFX',
      href: '/admin/brokers',
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      name: 'Tạo Bot No-Code (Studio)',
      href: '/builder',
      icon: (
        <svg className="h-5 w-5 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: 'Bộ 9 Bot EA MT5',
      href: '/admin/indicators',
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-9a2 2 0 00-2-2h-2a2 2 0 00-2 2v9a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
    },
    {
      name: 'Ưu Đãi & Bonus Thưởng',
      href: '/admin/offers',
      icon: (
        <svg className="h-5 w-5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      name: 'Khóa Học Academy',
      href: '/admin/courses',
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: 'Bài Viết Tin Tức',
      href: '/admin/posts',
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      name: 'Passview Trader',
      href: '/admin/passview',
      icon: (
        <svg className="h-5 w-5 shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    }
  ];

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#020712] text-slate-100 flex font-sans">
        {children}
      </div>
    );
  }

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#020712] flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#00C2FF]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#020712] text-slate-100 flex font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-68 bg-[#050D1A] border-r border-slate-800 hidden md:flex flex-col select-none">
        {/* Sidebar Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-[#08152B]/40">
          <Link href="/admin" className="font-extrabold text-sm text-white tracking-wider flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/40">
              <span className="font-black text-xs">VT</span>
            </div>
            <span>VT Rewards Hub</span>
            <span className="text-[9px] bg-[#00C2FF] text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
              Admin
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`transition-colors duration-200 ${isActive ? 'text-[#00C2FF]' : 'text-slate-500 group-hover:text-slate-300'}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Back button */}
        <div className="p-4 border-t border-slate-800 bg-[#020712]/40">
          <Link
            href="/"
            className="flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-700/80 hover:border-[#00C2FF]/50 text-xs font-bold rounded-xl text-slate-300 hover:text-white transition w-full"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Về Trang Chủ
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#050D1A] border-b border-slate-800 flex items-center justify-between px-6 select-none sticky top-0 z-10">
          <div className="md:hidden">
            <span className="font-bold text-sm text-white">
              VT Rewards Admin
            </span>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020712] border border-slate-800">
              <div className="h-2 w-2 rounded-full bg-[#00C2FF] animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium hidden sm:block">admin@vtrewardshub.com</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-hidden bg-[#020712] flex flex-col min-w-0">
          <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
