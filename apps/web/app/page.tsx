import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import Link from "next/link";

import { ScrollReveal, ScrollRevealItem } from "../components/animations/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-zinc-950 pb-20 pt-28 lg:pt-36">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('https://hieunthub.co/uploads/branding/grid-bg.svg')] bg-center opacity-[0.05] mix-blend-screen"></div>
          <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-orange-500/20 via-orange-900/5 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-amber-500/20 to-orange-600/20 rounded blur-[150px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Animated Trading Line Graph Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.12] hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M -50,380 C 150,220 300,500 550,300 C 800,100 1000,400 1200,200 C 1350,50 1420,150 1500,80"
                stroke="url(#hero-line-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="stroke-dash-animated"
              />
              <defs>
                <linearGradient id="hero-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                  <stop offset="25%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#eab308" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Cards Background - Visible on xl screens */}
          <div className="absolute inset-0 pointer-events-none hidden xl:block z-0">
            {/* Card 1 - Top Left */}
            <div className="absolute top-[12%] right-1/2 mr-[450px] 2xl:mr-[550px] animate-float origin-right scale-90 2xl:scale-100 pointer-events-auto group">
              <div className="flex flex-col gap-3 w-72 rounded border border-blue-500/20 bg-gradient-to-br from-[#0f172a]/90 via-[#020617]/95 to-zinc-950/95 backdrop-blur-xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:border-blue-500/40 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner text-blue-400">🏆</div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base leading-tight group-hover:text-blue-300 transition-colors">VT Rewards</h3>
                      <p className="text-zinc-400 text-xs mt-0.5">Hệ thống thưởng</p>
                    </div>
                  </div>
                  <div className="text-blue-400 text-xs font-bold flex items-center gap-1 mt-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    ⭐ 5.0
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
                  <div className="rounded bg-white/5 p-2 flex flex-col justify-center border border-transparent group-hover:border-blue-500/10 transition-colors">
                    <span className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider">Tích lũy lot</span>
                    <span className="text-white text-xs font-bold">Tự động</span>
                  </div>
                  <div className="rounded bg-emerald-500/10 p-2 flex flex-col justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow">
                    <span className="text-emerald-500 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Đổi quà</span>
                    <span className="text-white text-xs font-bold">✔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Bottom Left */}
            <div className="absolute top-[60%] right-1/2 mr-[420px] 2xl:mr-[520px] animate-float-delayed origin-right scale-90 2xl:scale-100 pointer-events-auto group">
              <div className="flex flex-col gap-3 w-72 rounded border border-orange-500/25 bg-gradient-to-br from-[#1c0f05]/95 via-[#0c0500]/98 to-zinc-955/98 backdrop-blur-xl p-5 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:border-orange-500/50 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.3)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl shadow-inner text-orange-400">🤝</div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base leading-tight group-hover:text-orange-450 transition-colors">Đối tác IB</h3>
                      <p className="text-zinc-400 text-xs mt-0.5">Cơ chế hoa hồng</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 px-2 py-0.5 rounded text-[10px] font-extrabold mt-1 shadow-lg animate-pulse-glow">
                    TOP PICK
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
                  <div className="rounded bg-white/5 p-2 flex flex-col justify-center border border-transparent group-hover:border-orange-500/10 transition-colors">
                    <span className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider">Hoa hồng</span>
                    <span className="text-white text-xs font-bold">Cao nhất</span>
                  </div>
                  <div className="rounded bg-emerald-500/10 p-2 flex flex-col justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow">
                    <span className="text-emerald-500 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Rebate</span>
                    <span className="text-white text-xs font-bold">✔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Bottom Right */}
            <div className="absolute top-[45%] left-1/2 ml-[450px] 2xl:ml-[550px] animate-float-slow origin-left scale-90 2xl:scale-100 pointer-events-auto group">
              <div className="flex flex-col gap-3 w-72 rounded border border-purple-500/20 bg-gradient-to-br from-[#1e1b4b]/90 via-[#090514]/95 to-zinc-950/95 backdrop-blur-xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:border-purple-500/40 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl shadow-inner text-purple-400">🎉</div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base leading-tight group-hover:text-purple-300 transition-colors">Khuyến mãi</h3>
                      <p className="text-zinc-400 text-xs mt-0.5">Ưu đãi độc quyền</p>
                    </div>
                  </div>
                  <div className="text-purple-400 text-xs font-bold flex items-center gap-1 mt-1 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    ⭐ 4.9
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
                  <div className="rounded bg-white/5 p-2 flex flex-col justify-center border border-transparent group-hover:border-purple-500/10 transition-colors">
                    <span className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider">Cập nhật</span>
                    <span className="text-white text-xs font-bold">Liên tục</span>
                  </div>
                  <div className="rounded bg-emerald-500/10 p-2 flex flex-col justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow">
                    <span className="text-emerald-500 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Tham gia</span>
                    <span className="text-white text-xs font-bold">✔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Ambient Orbs */}
          <div className="absolute top-0 left-[20%] w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[30%] left-[40%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Floating Glassmorphic 3D Icons - Distributed across screen */}
          <div className="absolute top-[20%] left-[8%] 2xl:left-[12%] animate-float-slow pointer-events-none opacity-80 hidden md:flex" style={{ animationDelay: '0.5s' }}>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(255,255,255,0.1)] rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-110">
              🌟
            </div>
          </div>

          <div className="absolute top-[35%] right-[8%] 2xl:right-[12%] animate-float pointer-events-none opacity-70 hidden md:flex" style={{ animationDelay: '1.5s' }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-xl border border-orange-500/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(249,115,22,0.15)] -rotate-12 transition-transform duration-500 hover:-rotate-0 hover:scale-110">
              💎
            </div>
          </div>

          <div className="absolute bottom-[25%] left-[15%] 2xl:left-[20%] animate-float-delayed pointer-events-none opacity-60 hidden md:flex" style={{ animationDelay: '2.5s' }}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)] rotate-45 transition-transform duration-500 hover:rotate-0 hover:scale-110">
              🎁
            </div>
          </div>

          <div className="absolute bottom-[30%] right-[18%] 2xl:right-[22%] animate-float pointer-events-none opacity-80 hidden md:flex" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-110">
              🏆
            </div>
          </div>

          <ScrollReveal animation="fade-up" duration={0.8} className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 text-center flex flex-col items-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-md px-5 py-2 text-sm md:text-base font-semibold text-orange-300 mb-10 shadow-[0_0_30px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/20 group hover:border-orange-500/50 transition-colors duration-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <svg className="w-4 h-4 text-orange-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Hệ thống quyền lợi giao dịch toàn diện
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-[72px] font-black tracking-tighter leading-none text-white flex flex-col items-center drop-shadow-2xl w-full font-headline-lg uppercase">
              <span className="bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent pb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                VT Rewards Hub
              </span>
              <span className="mt-4 block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 text-3xl md:text-5xl lg:text-[48px] font-extrabold leading-tight drop-shadow-[0_0_30px_rgba(249,115,22,0.15)] max-w-[900px] uppercase">
                Trung tâm đối tác & Quyền lợi giao dịch
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-[800px] mx-auto text-zinc-400 text-base md:text-lg lg:text-xl leading-relaxed font-medium font-body-lg">
              Một nền tảng duy nhất giúp khách hàng VT Markets theo dõi chương trình thưởng, tích lũy khối lượng, cập nhật ưu đãi và nhận hỗ trợ tài khoản. Đồng thời, <span className="text-zinc-200 font-semibold">IB/Đối tác</span> dễ dàng nắm rõ cơ chế hoa hồng, rebate và chính sách phát triển.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              <Link href="/rewards" className="group relative inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-[size:200%_auto] hover:bg-[right_center] px-8 py-4 font-bold text-zinc-950 transition-all duration-500 shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:-translate-y-1 text-base md:text-lg overflow-hidden ring-1 ring-orange-400/20">
                <span className="absolute top-0 -left-[100%] w-[50%] h-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000 group-hover:left-[150%] ease-out"></span>
                <span className="relative whitespace-nowrap">Xem quyền lợi khách hàng</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/ib-commission-overview" className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 font-bold text-white hover:bg-white/[0.08] hover:border-orange-500/30 transition-all duration-300 shadow-lg hover:-translate-y-1 text-base md:text-lg">
                <span className="relative whitespace-nowrap">Khám phá cơ chế đối tác</span>
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Trust Indicators / Mini stats */}
            <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-6 w-full max-w-4xl">
              <div className="flex items-center gap-3 rounded border border-white/5 bg-white/[0.02] backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold text-zinc-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] hover:text-white transition-all duration-300 group shadow-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.228 12c.162-.486.272-1 .318-1.543M12 7v5l4 2" />
                  </svg>
                </span>
                Tích lũy tự động
              </div>
              <div className="flex items-center gap-3 rounded border border-white/5 bg-white/[0.02] backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold text-zinc-300 hover:border-orange-500/20 hover:bg-orange-500/[0.02] hover:text-white transition-all duration-300 group shadow-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                Minh bạch 100%
              </div>
              <div className="flex items-center gap-3 rounded border border-white/5 bg-white/[0.02] backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold text-zinc-300 hover:border-amber-500/20 hover:bg-amber-500/[0.02] hover:text-white transition-all duration-300 group shadow-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                Hỗ trợ 24/7
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. Vấn đề thị trường */}
        <section className="py-20 lg:py-28 bg-zinc-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="fade-right">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Khách hàng và IB thường bỏ lỡ quyền lợi vì thông tin bị <span className="text-rose-400">phân tán</span>
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 shrink-0 rounded bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Khách hàng không biết mình đang có quyền lợi gì</h3>
                      <p className="text-zinc-400 mt-1">Chương trình thưởng, ưu đãi, điều kiện nhận quà thường bị phân tán ở nhiều nơi. Trader khó tự theo dõi khối lượng giao dịch và tiến độ tích lũy.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-12 w-12 shrink-0 rounded bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">IB khó nắm rõ cơ chế hoa hồng, rebate</h3>
                      <p className="text-zinc-400 mt-1">Cơ chế hoa hồng và điều kiện volume đôi khi chưa rõ ràng, khiến đối tác thiếu một hệ thống vững chắc để tư vấn và chăm sóc khách hàng.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-left" delay={0.2} className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
                <div className="relative rounded border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl overflow-hidden">
                  <div className="text-2xl font-bold text-white mb-6">Giải pháp: Một hệ sinh thái quyền lợi</div>
                  <div className="space-y-4">
                    <div className="rounded bg-white/5 border border-white/5 p-4 hover:border-orange-500/30 transition">
                      <div className="font-bold text-orange-300">Quyền lợi khách hàng</div>
                      <div className="text-sm text-zinc-400 mt-1">Tổng hợp ưu đãi, hỗ trợ tài khoản dành cho trader VT Markets.</div>
                    </div>
                    <div className="rounded bg-white/5 border border-white/5 p-4 hover:border-orange-500/30 transition">
                      <div className="font-bold text-orange-300">Hệ thống thưởng giao dịch</div>
                      <div className="text-sm text-zinc-400 mt-1">Theo dõi khối lượng giao dịch, tiến độ tích lũy lot và các mốc phần thưởng.</div>
                    </div>
                    <div className="rounded bg-white/5 border border-white/5 p-4 hover:border-orange-500/30 transition">
                      <div className="font-bold text-orange-300">Cơ chế IB/Đối tác</div>
                      <div className="text-sm text-zinc-400 mt-1">Cung cấp thông tin hoa hồng, rebate và chính sách hợp tác phát triển.</div>
                    </div>
                    <div className="rounded bg-white/5 border border-white/5 p-4 hover:border-orange-500/30 transition">
                      <div className="font-bold text-orange-300">Công cụ và hỗ trợ giao dịch</div>
                      <div className="text-sm text-zinc-400 mt-1">Tổng hợp tài nguyên, công cụ, chỉ báo và nội dung hỗ trợ.</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. Tính năng nổi bật */}
        <section className="py-20 lg:py-28 border-t border-white/5 bg-gradient-to-b from-zinc-950 to-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Tính năng <span className="text-orange-400">nổi bật</span></h2>
              <p className="text-zinc-400 mt-4 text-lg">Mọi thông tin quan trọng được gom lại trong một nền tảng rõ ràng, dễ theo dõi và dễ hành động.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" staggerChildren={0.1} delay={0.2} className="grid md:grid-cols-3 gap-6">
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-white mb-2">Hệ thống thưởng KH</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Theo dõi chương trình thưởng giao dịch đang áp dụng và điều kiện tham gia.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-2">Tích lũy lot & mở khóa</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Giao dịch, tích lũy khối lượng và nhận quyền lợi mở khóa theo từng mốc phần thưởng.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2">Liên kết tài khoản</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Dễ dàng liên kết tài khoản giao dịch VT Markets để hệ thống tự động ghi nhận quyền lợi.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">Ưu đãi & khuyến mãi</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Cập nhật nhanh nhất các ưu đãi, chương trình đặc biệt và quà tặng dành cho khách hàng.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-white mb-2">Cơ chế IB/Đối tác</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Tổng hợp cơ chế đầy đủ dành cho IB và đối tác để phát triển tệp khách hàng hiệu quả.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-2">Rebate & hoa hồng</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Minh bạch thông tin về rebate và hoa hồng giúp đối tác dễ dàng xây dựng chiến lược.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">👑</div>
                <h3 className="text-xl font-bold text-white mb-2">Tư vấn cơ chế riêng</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Hỗ trợ đối tác có tệp khách hàng hoặc volume tốt để tối ưu hóa nguồn thu nhập.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-white mb-2">Công cụ giao dịch</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Tài nguyên phong phú hỗ trợ trader trong quá trình phân tích và giao dịch mỗi ngày.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="rounded border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition hover:-translate-y-1">
                <div className="text-3xl mb-4">🎧</div>
                <h3 className="text-xl font-bold text-white mb-2">Hỗ trợ khách hàng</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Đội ngũ sẵn sàng đồng hành, giải đáp thắc mắc trong quá trình tham gia chương trình.</p>
              </ScrollRevealItem>
            </ScrollReveal>
          </div>
        </section>

        {/* Khách hàng nhận được gì */}
        <section className="py-20 lg:py-28 border-t border-white/5 relative overflow-hidden bg-zinc-950">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="fade-right">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Khách hàng VT Markets <span className="text-orange-400">nhận được gì?</span></h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Dễ theo dõi chương trình thưởng đang áp dụng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Biết rõ điều kiện nhận quyền lợi và ưu đãi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Kiểm tra tiến độ tích lũy lot và mốc phần thưởng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Không bỏ lỡ ưu đãi quan trọng hay sự kiện đặc biệt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Có thêm tài nguyên hỗ trợ quá trình phân tích giao dịch</span>
                  </li>
                </ul>
                <Link href="/rewards" className="inline-flex items-center justify-center gap-2 rounded bg-orange-500/20 border border-orange-500/30 px-6 py-3 font-bold text-orange-300 hover:bg-orange-500/30 transition shadow-lg">
                  Kiểm tra quyền lợi của bạn
                </Link>
              </ScrollReveal>
              <ScrollReveal animation="fade-left" delay={0.2} className="relative">
                <div className="rounded border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px]"></div>
                  <div className="text-5xl mb-6">🏆</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Giao dịch càng nhiều, nhận quyền lợi càng lớn</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    VT Rewards Hub thiết kế riêng các mốc quyền lợi linh hoạt để tôn vinh sự đồng hành của bạn. Chỉ cần liên kết tài khoản, mọi tiến trình sẽ được hệ thống cập nhật minh bạch để bạn luôn hiểu rõ các đặc quyền khi giao dịch cùng VT Markets.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* IB và đối tác có thêm công cụ */}
        <section className="py-20 lg:py-28 border-t border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="fade-right" delay={0.2} className="order-2 lg:order-1 relative">
                <div className="rounded border border-white/10 bg-gradient-to-tr from-zinc-950 to-zinc-900 p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 blur-[50px]"></div>
                  <div className="text-5xl mb-6">🤝</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nâng tầm đối tác phát triển khách hàng</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Thay vì tự mình quản lý ưu đãi rời rạc, đối tác giờ đây đã có một nền tảng chuyên nghiệp để giới thiệu cho khách hàng. Hệ thống không chỉ giúp giữ chân khách hàng lâu hơn mà còn mở ra cơ hội tối ưu hóa hoa hồng theo volume một cách minh bạch.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-left" className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">IB và đối tác có thêm công cụ <span className="text-amber-400">phát triển hiệu quả</span></h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Hiểu rõ cơ chế IB, chính sách rebate và hoa hồng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Cơ sở vững chắc để tư vấn khách hàng chuyên nghiệp hơn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Có thể yêu cầu tư vấn cơ chế riêng nếu có volume tốt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Dễ xây dựng mô hình phát triển khách hàng lâu dài</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-zinc-300">Tận dụng chương trình thưởng để tăng giá trị cho khách hàng</span>
                  </li>
                </ul>
                <Link href="/ib-commission-overview" className="inline-flex items-center justify-center gap-2 rounded bg-amber-500/20 border border-amber-500/30 px-6 py-3 font-bold text-amber-300 hover:bg-amber-500/30 transition shadow-lg">
                  Xem cơ chế đối tác
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 4. Quy trình hoạt động */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <ScrollReveal animation="fade-up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Cách VT Rewards Hub <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">hoạt động</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" staggerChildren={0.2} className="grid md:grid-cols-4 gap-8">
              <ScrollRevealItem className="relative">
                <div className="h-16 w-16 rounded-full bg-orange-500/20 border-2 border-orange-400 text-orange-400 text-2xl font-bold flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(251,146,60,0.3)]">1</div>
                <div className="hidden md:block absolute top-8 left-16 right-0 h-[2px] bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                <h3 className="font-bold text-xl text-white mb-3">Truy cập hệ thống</h3>
                <p className="text-zinc-400 text-sm">Tìm hiểu quyền lợi, chương trình thưởng, ưu đãi hoặc cơ chế đối tác đang áp dụng.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="relative">
                <div className="h-16 w-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 text-2xl font-bold flex items-center justify-center mb-6">2</div>
                <div className="hidden md:block absolute top-8 left-16 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                <h3 className="font-bold text-xl text-white mb-3">Liên kết tài khoản</h3>
                <p className="text-zinc-400 text-sm">Kết nối tài khoản VT Markets để ghi nhận thông tin đủ điều kiện tham gia chương trình.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="relative">
                <div className="h-16 w-16 rounded-full bg-yellow-500/20 border-2 border-yellow-400 text-yellow-400 text-2xl font-bold flex items-center justify-center mb-6">3</div>
                <div className="hidden md:block absolute top-8 left-16 right-0 h-[2px] bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
                <h3 className="font-bold text-xl text-white mb-3">Theo dõi tiến độ</h3>
                <p className="text-zinc-400 text-sm">Kiểm tra điều kiện, khối lượng giao dịch, mốc thưởng hoặc quyền lợi tương ứng.</p>
              </ScrollRevealItem>
              <ScrollRevealItem className="relative">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 text-2xl font-bold flex items-center justify-center mb-6">4</div>
                <h3 className="font-bold text-xl text-white mb-3">Nhận hỗ trợ</h3>
                <p className="text-zinc-400 text-sm">Khi đạt điều kiện, được hướng dẫn quy trình nhận quyền lợi và phần thưởng.</p>
              </ScrollRevealItem>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. USP & Social Proof */}
        <section className="py-20 lg:py-28 border-t border-white/5 bg-zinc-950 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="fade-right" staggerChildren={0.1} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ScrollRevealItem className="rounded border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:border-orange-400/40 hover:shadow-xl transition flex flex-col justify-between">
                  <h3 className="font-bold text-white text-lg">Rewards</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Theo dõi chương trình thưởng và quyền lợi giao dịch.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="rounded border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:border-orange-400/40 hover:shadow-xl transition flex flex-col justify-between">
                  <h3 className="font-bold text-white text-lg">Promotions</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Tổng hợp ưu đãi, chương trình đặc biệt và quà tặng.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="rounded border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:border-orange-400/40 hover:shadow-xl transition flex flex-col justify-between">
                  <h3 className="font-bold text-white text-lg">IB Partner</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Cập nhật cơ chế đối tác, rebate và chính sách hợp tác.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="rounded border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:border-orange-400/40 hover:shadow-xl transition flex flex-col justify-between">
                  <h3 className="font-bold text-white text-lg">Trading Tools</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Cung cấp tài nguyên và công cụ hỗ trợ trader.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="rounded border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:border-orange-400/40 hover:shadow-xl transition flex flex-col justify-between">
                  <h3 className="font-bold text-white text-lg">Support</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Hướng dẫn khách hàng kiểm tra điều kiện và liên kết tài khoản.</p>
                </ScrollRevealItem>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sự khác biệt của <span className="text-orange-400">VT Rewards Hub</span></h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <div>
                      <strong className="text-white block text-lg">Không chỉ giới thiệu ưu đãi</strong>
                      <span className="text-zinc-400 text-sm">Giúp khách hàng theo dõi, hiểu rõ và hành động để nhận quyền lợi.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <div>
                      <strong className="text-white block text-lg">Kết nối quyền lợi với cơ chế đối tác</strong>
                      <span className="text-zinc-400 text-sm">IB có thêm lợi thế để tư vấn, chăm sóc và giữ chân khách hàng tốt hơn.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <div>
                      <strong className="text-white block text-lg">Mọi thông tin trên một nền tảng duy nhất</strong>
                      <span className="text-zinc-400 text-sm">Tất cả được tập trung để người dùng không phải tìm kiếm rời rạc.</span>
                    </div>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6. CTA Cuối trang */}
        <section className="border-t border-white/5">
          <ScrollReveal animation="scale-up" className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Bắt đầu tối ưu quyền lợi của bạn cùng VT Rewards Hub
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10">
              Dù bạn là khách hàng đang giao dịch cùng VT Markets hay IB/đối tác đang phát triển hệ thống khách hàng, VT Rewards Hub giúp bạn nắm rõ hơn các quyền lợi, chương trình thưởng và cơ chế hợp tác đang có.
            </p>
            <Link href="/rewards" className="inline-block rounded bg-gradient-to-r from-orange-400 to-amber-600 px-10 py-5 font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30 text-xl">
              Kiểm tra quyền lợi của bạn ngay hôm nay
            </Link>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
