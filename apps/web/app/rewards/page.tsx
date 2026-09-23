"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useLanguage } from "../../contexts/LanguageContext";
import { ScrollReveal, ScrollRevealItem } from "../../components/animations/ScrollReveal";

// Reward Levels Data
const REWARD_LEVELS = [
  { level: 0, title: "Khởi động", lots: 0, reward: "$0", color: "from-zinc-500 to-zinc-700", icon: "🚀" },
  { level: 1, title: "Tân Binh", lots: 10, reward: "$80", color: "from-emerald-400 to-teal-500", icon: "🌱" },
  { level: 2, title: "Gắn Kết", lots: 25, reward: "$200", color: "from-blue-400 to-indigo-500", icon: "🤝" },
  { level: 3, title: "Tiềm Năng", lots: 50, reward: "$450", color: "from-indigo-400 to-purple-500", icon: "⭐" },
  { level: 4, title: "Chuyên Nghiệp", lots: 100, reward: "$1,000", color: "from-purple-400 to-fuchsia-500", icon: "💼" },
  { level: 5, title: "Tinh Anh", lots: 250, reward: "$2,600", color: "from-fuchsia-400 to-pink-500", icon: "⚔️" },
  { level: 6, title: "Bậc Thầy", lots: 500, reward: "$5,500", color: "from-pink-400 to-rose-500", icon: "🏆" },
  { level: 7, title: "Huyền Thoại", lots: 1000, reward: "$12,000", color: "from-rose-400 to-red-500", icon: "👑" },
  { level: 8, title: "Đại Sứ", lots: 2500, reward: "$32,000", color: "from-orange-400 to-red-500", icon: "🦅" },
  { level: 9, title: "Kẻ Thống Trị", lots: 5000, reward: "$70,000", color: "from-amber-400 to-orange-500", icon: "🦁" },
  { level: 10, title: "Thượng Đỉnh", lots: 10000, reward: "$150,000", color: "from-yellow-300 to-amber-500", icon: "💎" },
];

export default function RewardsPage() {
  const { t } = useLanguage();
  const [isLinked, setIsLinked] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  // Mock User Data
  const currentLots = 45.5;
  const currentLevelIndex = 2; // User has passed Level 2
  const nextLevel = REWARD_LEVELS[currentLevelIndex + 1] || REWARD_LEVELS[REWARD_LEVELS.length - 1] || {
    level: 10,
    title: "Thượng Đỉnh",
    lots: 10000,
    reward: "$150,000",
    color: "from-yellow-300 to-amber-500",
    icon: "💎"
  };
  const progressPercent = nextLevel.lots > 0 ? Math.min(100, (currentLots / nextLevel.lots) * 100) : 100;

  useEffect(() => {
    setIsLinked(localStorage.getItem('vtLinked') === 'true');
    const handleStorageChange = () => {
      setIsLinked(localStorage.getItem('vtLinked') === 'true');
    };
    window.addEventListener('vt-linked-change', handleStorageChange);
    return () => window.removeEventListener('vt-linked-change', handleStorageChange);
  }, []);

  const handleLinkAccount = () => {
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setIsLinked(true);
      localStorage.setItem('vtLinked', 'true');
      window.dispatchEvent(new Event('vt-linked-change'));
    }, 1500);
  };

  if (!isLinked) {
    return (
      <>
        <Header />
        <main id="main-content" className="flex-grow bg-zinc-950 min-h-screen text-zinc-300 relative overflow-hidden flex flex-col">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-[url('https://hieunthub.co/uploads/branding/grid-bg.svg')] bg-center opacity-[0.05] mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-orange-500/10 via-orange-900/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-amber-500/10 to-orange-600/10 rounded blur-[120px] pointer-events-none"></div>

          {/* Hero Section */}
          <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 z-10 border-b border-white/5">
            <ScrollReveal animation="fade-up" className="max-w-7xl mx-auto px-4 lg:px-8 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-400 mb-8 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
                VT Markets Rewards
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white flex flex-col items-center drop-shadow-2xl max-w-5xl">
                Hệ thống thưởng giao dịch dành cho khách hàng VT Markets
              </h1>
              
              <p className="mt-8 max-w-3xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">
                Liên kết tài khoản giao dịch của bạn để bắt đầu tích lũy khối lượng (lots), theo dõi tiến độ và mở khóa những phần thưởng độc quyền lên đến <span className="text-orange-400 font-semibold">$150,000</span>.
              </p>

              <div className="mt-12 flex justify-center w-full max-w-md">
                <button
                  onClick={handleLinkAccount}
                  disabled={isLinking}
                  className="w-full group relative inline-flex items-center justify-center gap-2 rounded bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-bold text-zinc-950 hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 text-lg sm:text-xl overflow-hidden disabled:opacity-70 disabled:hover:-translate-y-0"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  {isLinking ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-zinc-950 relative" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative">Đang kết nối...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">Liên kết tài khoản ngay</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Kết nối an toàn & bảo mật
              </div>
            </ScrollReveal>
          </section>

          {/* Cách Tham Gia Phase */}
          <section className="py-20 lg:py-28 relative z-10">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <ScrollReveal animation="fade-up" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Cách <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">tham gia</span> chương trình thưởng
                </h2>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" staggerChildren={0.2} className="grid md:grid-cols-4 gap-8">
                <ScrollRevealItem className="relative p-6 rounded bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="h-14 w-14 rounded-full bg-orange-500/20 border-2 border-orange-400 text-orange-400 text-xl font-bold flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(251,146,60,0.3)]">1</div>
                  <div className="hidden md:block absolute top-12 left-24 right-0 h-[2px] bg-gradient-to-r from-orange-500/30 to-transparent"></div>
                  <h3 className="font-bold text-lg text-white mb-3">Liên kết tài khoản VT Markets</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Khách hàng kết nối tài khoản giao dịch hợp lệ vào hệ thống để bắt đầu quá trình ghi nhận.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="relative p-6 rounded bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="h-14 w-14 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 text-xl font-bold flex items-center justify-center mb-6">2</div>
                  <div className="hidden md:block absolute top-12 left-24 right-0 h-[2px] bg-gradient-to-r from-amber-500/30 to-transparent"></div>
                  <h3 className="font-bold text-lg text-white mb-3">Giao dịch và tích lũy khối lượng</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Các giao dịch hợp lệ sẽ được dùng để quy đổi ra điểm/mốc khối lượng (lots) tương ứng.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="relative p-6 rounded bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="h-14 w-14 rounded-full bg-yellow-500/20 border-2 border-yellow-400 text-yellow-400 text-xl font-bold flex items-center justify-center mb-6">3</div>
                  <div className="hidden md:block absolute top-12 left-24 right-0 h-[2px] bg-gradient-to-r from-yellow-500/30 to-transparent"></div>
                  <h3 className="font-bold text-lg text-white mb-3">Theo dõi tiến độ nhận thưởng</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Khách hàng có thể kiểm tra mình đang ở mốc nào và cần bao nhiêu khối lượng để đạt mốc tiếp theo.</p>
                </ScrollRevealItem>
                <ScrollRevealItem className="relative p-6 rounded bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 text-xl font-bold flex items-center justify-center mb-6">4</div>
                  <h3 className="font-bold text-lg text-white mb-3">Nhận quyền lợi khi đủ điều kiện</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Hướng dẫn quy trình nhận phần thưởng và ưu đãi khi đã đạt mốc yêu cầu của chương trình.</p>
                </ScrollRevealItem>
              </ScrollReveal>

              <ScrollReveal animation="scale-up" delay={0.4} className="mt-16 text-center">
                <button
                  onClick={handleLinkAccount}
                  className="inline-flex items-center justify-center gap-2 rounded bg-white/5 border border-white/20 px-6 py-3 font-bold text-white hover:bg-white/10 transition shadow-lg"
                >
                  Kiểm tra điều kiện nhận thưởng
                </button>
              </ScrollReveal>
            </div>
          </section>

        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow bg-[#090A0C] min-h-screen text-zinc-300 pb-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 relative z-10 pt-10">
          
          {/* Left Sidebar - Roadmap (Scrollable) */}
          <ScrollReveal animation="fade-right" className="w-full lg:w-80 shrink-0">
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded border border-white/10 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Lộ Trình Phần Thưởng
              </h2>
              
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 top-4 bottom-8 w-px bg-white/10"></div>
                
                <div className="space-y-6">
                  {REWARD_LEVELS.map((level, index) => {
                    const isCompleted = index <= currentLevelIndex;
                    const isCurrentTarget = index === currentLevelIndex + 1;
                    const isLocked = index > currentLevelIndex + 1;

                    return (
                      <div key={level.level} className={`relative flex items-start gap-4 ${isLocked ? 'opacity-40' : ''}`}>
                        {/* Timeline Node */}
                        <div className={`relative z-10 w-12 h-12 shrink-0 rounded flex items-center justify-center text-xl shadow-lg border ${
                          isCompleted 
                            ? `bg-gradient-to-br ${level.color} border-white/20 text-white shadow-${level.color.split('-')[1]}-500/30` 
                            : isCurrentTarget
                              ? 'bg-[#161719] border-orange-500 text-white shadow-orange-500/20 shadow-lg'
                              : 'bg-[#161719] border-white/10 text-zinc-500'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            level.icon
                          )}
                        </div>

                        <div className="pt-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Level {level.level}</span>
                            {isCurrentTarget && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold uppercase tracking-wider">Mục tiêu</span>
                            )}
                          </div>
                          <div className={`font-bold ${isCompleted || isCurrentTarget ? 'text-white' : 'text-zinc-400'}`}>
                            {level.title}
                          </div>
                          <div className="text-sm mt-0.5 text-zinc-400">
                            {level.lots} Lots <span className="mx-1.5 text-zinc-700">•</span> 
                            <span className={isCompleted || isCurrentTarget ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
                              {level.reward}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Center Main Content (Sticky) */}
          <div className="flex-1 flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
            
            {/* Progress Overview Card */}
            <ScrollReveal animation="fade-down" className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded border border-white/10 p-1 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <svg className="w-40 h-40 text-orange-500 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div className="bg-[#090A0C]/40 backdrop-blur-md rounded p-6 sm:p-8 relative z-10 border border-white/[0.05]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-zinc-400 text-sm font-medium mb-1">Khối Lượng Hiện Tại</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-extrabold text-white tracking-tighter">{currentLots}</span>
                      <span className="text-xl text-zinc-500 font-semibold">Lots</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium shadow-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Tăng +12.5 Lots tháng này
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Tiến độ đến {nextLevel.title}</div>
                        <div className="text-white font-semibold">Level {nextLevel.level} ({nextLevel.lots} Lots)</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">{progressPercent.toFixed(1)}%</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-[#161719] rounded-full overflow-hidden border border-white/10 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 relative transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripes_1s_linear_infinite]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-zinc-500">
                      <span>{currentLots} lots</span>
                      <span>Còn {Math.max(0, nextLevel.lots - currentLots).toFixed(1)} lots</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Stats Grid */}
            <ScrollReveal animation="fade-up" staggerChildren={0.1} delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScrollRevealItem className="bg-white/[0.03] rounded border border-white/10 p-5 flex items-center gap-4 hover:border-orange-400/30 transition shadow-sm">
                 <div className="w-12 h-12 rounded bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </div>
                 <div>
                   <div className="text-zinc-500 text-xs font-medium mb-0.5">Tổng Thưởng Đã Nhận</div>
                   <div className="text-xl font-bold text-white">$280</div>
                 </div>
              </ScrollRevealItem>
              <ScrollRevealItem className="bg-white/[0.03] rounded border border-white/10 p-5 flex items-center gap-4 hover:border-orange-400/30 transition shadow-sm">
                 <div className="w-12 h-12 rounded bg-purple-500/15 border border-purple-400/30 text-purple-400 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                 </div>
                 <div>
                   <div className="text-zinc-500 text-xs font-medium mb-0.5">Số Lệnh Giao Dịch</div>
                   <div className="text-xl font-bold text-white">142</div>
                 </div>
              </ScrollRevealItem>
              <ScrollRevealItem className="bg-white/[0.03] rounded border border-white/10 p-5 flex items-center gap-4 hover:border-orange-400/30 transition shadow-sm">
                 <div className="w-12 h-12 rounded bg-rose-500/15 border border-rose-400/30 text-rose-400 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <div>
                   <div className="text-zinc-500 text-xs font-medium mb-0.5">Thời Gian Tham Gia</div>
                   <div className="text-xl font-bold text-white">45 Ngày</div>
                 </div>
              </ScrollRevealItem>
            </ScrollReveal>

            {/* Claimed Rewards List */}
            <ScrollReveal animation="fade-up" delay={0.4} className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded border border-white/10 overflow-hidden mt-2 shadow-xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Phần Thưởng Của Bạn</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/5">
                  2 Đã nhận
                </span>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-[#161719] text-zinc-400 text-xs uppercase tracking-wider border-b border-white/5">
                      <th className="px-6 py-4 font-semibold">Phần Thưởng</th>
                      <th className="px-6 py-4 font-semibold">Cấp Độ</th>
                      <th className="px-6 py-4 font-semibold">Ngày Nhận</th>
                      <th className="px-6 py-4 font-semibold text-right">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    <tr className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10 border border-emerald-500/30">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-white">$200 Tiền Mặt</div>
                            <div className="text-xs text-zinc-500">Thưởng đạt chỉ tiêu khối lượng</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold">
                          Level 2
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">12/05/2026</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                          Đã chuyển
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10 border border-emerald-500/30">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-white">$80 Tiền Mặt</div>
                            <div className="text-xs text-zinc-500">Thưởng đạt chỉ tiêu khối lượng</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold">
                          Level 1
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">28/04/2026</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          Đã chuyển
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 border-t border-white/5 text-center bg-[#161719]/50">
                <div className="text-sm text-zinc-400">Bạn đang hướng tới phần thưởng <strong className="text-white">Level 3 ($450)</strong>. Cố lên nhé!</div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
