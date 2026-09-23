"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useState, useMemo } from "react";
import Link from "next/link";

interface Course {
  slug: string;
  title: string;
  cover: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  price: string;
  isFree: boolean;
  lessonsCount: number;
  author: string;
  duration?: string;
  description: string;
  isFeatured?: boolean;
}

const coursesData: Course[] = [
  {
    slug: "fibo-matrix-101",
    title: "Fibo Matrix 101",
    cover: "https://hieunthub.co/uploads/courses/covers/01KQ29MRVFV72D2Q2C54X3G4K2.webp",
    difficulty: "Advanced",
    category: "technical-analysis",
    price: "$100",
    isFree: false,
    lessonsCount: 17,
    author: "HieuNTHUB Academy",
    description: "Hệ thống giao dịch Fibonacci kết hợp Matrix — từ cơ bản đến thực chiến",
    isFeatured: true
  },
  {
    slug: "chon-broker-101",
    title: "Chọn Broker 101",
    cover: "https://hieunthub.co/uploads/courses/covers/01KQ29N864HEECZBHMMK30AA1Q.webp",
    difficulty: "Beginner",
    category: "broker-selection",
    price: "FREE",
    isFree: true,
    lessonsCount: 10,
    author: "HieuNTHUB Academy",
    description: "Hướng dẫn chọn broker phù hợp — từ giấy phép, spread đến cách tránh broker scam",
    isFeatured: true
  },
  {
    slug: "forex-101",
    title: "Forex 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverForex101.webp",
    difficulty: "Beginner",
    category: "forex",
    price: "FREE",
    isFree: true,
    lessonsCount: 20,
    author: "HieuNTHUB Academy",
    description: "Khoá nhập môn Forex — từ khái niệm cơ bản đến đặt lệnh thực chiến trên MT4/MT5",
    isFeatured: true
  },
  {
    slug: "crazii-indicators-101",
    title: "CRAZII Indicators 101 · 12 chỉ báo độc quyền",
    cover: "https://hieunthub.co/uploads/courses/crazii-indicators-101/cover.webp",
    difficulty: "Beginner",
    category: "indicators",
    price: "FREE",
    isFree: true,
    lessonsCount: 12,
    author: "HieuNTHUB",
    duration: "18m",
    description: "Hệ thống 12 chỉ báo CRAZII Việt hoá đầy đủ · Học miễn phí qua HieuNTHUB",
    isFeatured: true
  },
  {
    slug: "gold-trading-101",
    title: "Gold Trading 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverGoldTrading.webp",
    difficulty: "Intermediate",
    category: "gold",
    price: "FREE",
    isFree: true,
    lessonsCount: 10,
    author: "HieuNTHUB Academy",
    description: "Giao dịch vàng XAU/USD — từ kiến thức nền tảng đến kế hoạch giao dịch hoàn chỉnh"
  },
  {
    slug: "price-action-101",
    title: "Price Action 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverPriceAction.webp",
    difficulty: "Intermediate",
    category: "technical-analysis",
    price: "FREE",
    isFree: true,
    lessonsCount: 20,
    author: "HieuNTHUB Academy",
    description: "Đọc hành động giá — nến, mô hình, kháng cự hỗ trợ và setup không cần indicator"
  },
  {
    slug: "trading-psychology",
    title: "Trading Psychology",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverTradingPsychology.webp",
    difficulty: "Intermediate",
    category: "psychology",
    price: "FREE",
    isFree: true,
    lessonsCount: 10,
    author: "HieuNTHUB Academy",
    description: "Tâm lý giao dịch — kỷ luật, kiểm soát cảm xúc và xây dựng mindset của trader thắng"
  },
  {
    slug: "news-trading-101",
    title: "News Trading 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverNewsTrading.webp",
    difficulty: "Intermediate",
    category: "news-trading",
    price: "FREE",
    isFree: true,
    lessonsCount: 8,
    author: "HieuNTHUB Academy",
    duration: "10m",
    description: "Giao dịch tin tức — NFP, FOMC, CPI và 3 chiến lược trade tin có kỷ luật"
  },
  {
    slug: "quan-ly-von-101",
    title: "Quản Lý Vốn 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverMoneyManagement.webp",
    difficulty: "Beginner",
    category: "money-management",
    price: "FREE",
    isFree: true,
    lessonsCount: 10,
    author: "HieuNTHUB Academy",
    duration: "12m",
    description: "Risk per trade, R:R, position sizing — 10 quy tắc giúp trader sống sót lâu dài"
  },
  {
    slug: "smart-money-101",
    title: "Smart Money 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverSmartMoney.webp",
    difficulty: "Advanced",
    category: "technical-analysis",
    price: "FREE",
    isFree: true,
    lessonsCount: 12,
    author: "HieuNTHUB Academy",
    duration: "15m",
    description: "Liquidity, Order Block, FVG, BOS/CHoCH — đọc dấu vết của smart money"
  },
  {
    slug: "prop-firm-101",
    title: "Prop Firm 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverPropFirm.webp",
    difficulty: "Intermediate",
    category: "prop-firm",
    price: "FREE",
    isFree: true,
    lessonsCount: 10,
    author: "HieuNTHUB Academy",
    duration: "13m",
    description: "FTMO, FundedNext, Topstep — pass challenge và quản lý funded chuyên nghiệp"
  },
  {
    slug: "phan-tich-co-ban-101",
    title: "Phân Tích Cơ Bản 101",
    cover: "https://hieunthub.co/uploads/courses/covers/CourseCoverFundamentalAnalysis.webp",
    difficulty: "Intermediate",
    category: "fundamental-analysis",
    price: "FREE",
    isFree: true,
    lessonsCount: 8,
    author: "HieuNTHUB Academy",
    duration: "11m",
    description: "GDP, CPI, FOMC, NFP — đọc dữ liệu kinh tế và trade tin có kỷ luật"
  }
];

export default function CoursesPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const featuredCourse = useMemo(() => {
    return coursesData.find(c => c.isFeatured) || coursesData[0];
  }, []);

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchDifficulty = difficultyFilter === "" || course.difficulty === difficultyFilter;
      const matchSearch = searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDifficulty && matchSearch;
    });
  }, [difficultyFilter, searchQuery]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const stats = useMemo(() => {
    return {
      total: coursesData.length,
      free: coursesData.filter(c => c.isFree).length,
      duration: "14h"
    };
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C] min-h-screen">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-40"></div>
          <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-10">
            {/* Breadcrumbs */}
            <nav className="text-xs text-zinc-500 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
              <span>›</span>
              <span className="text-zinc-300">Khoá học</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-4">
                  🎓 HỌC VIỆN BROKERSHUB
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Khóa học
                </h1>
                <p className="mt-4 max-w-2xl text-zinc-400 text-lg leading-relaxed">Học theo lộ trình từng bước — kết hợp lý thuyết, case study và setup thực chiến.</p>
              </div>

              <div className="lg:col-span-5 w-full">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-orange-300 tabular-nums">{stats.total}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Khoá học</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-blue-300 tabular-nums">{stats.duration}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Thời lượng</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-emerald-300 tabular-nums">{stats.free}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Miễn phí</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Big Card */}
        {featuredCourse && (
          <section className="border-b border-white/5 bg-[#0A0B0D]">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
              <Link href={`/courses/${featuredCourse.slug}`} className="group block rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent overflow-hidden hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20 transition relative">
                <div className="grid md:grid-cols-12 gap-0">

                  <div className="md:col-span-5 aspect-video md:aspect-auto relative overflow-hidden bg-zinc-900 min-h-[220px]">
                    <img src={featuredCourse.cover} alt={featuredCourse.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950/40"></div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                      ⭐ NỔI BẬT
                    </div>
                  </div>

                  <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 px-2.5 py-0.5 text-xs font-semibold">{featuredCourse.difficulty}</span>
                        <span className="rounded-full bg-white/[0.06] border border-white/15 text-zinc-200 px-2.5 py-0.5 text-xs font-semibold">{featuredCourse.category}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-orange-200 transition">{featuredCourse.title}</h2>
                      <p className="mt-3 text-zinc-300 leading-relaxed line-clamp-2">{featuredCourse.description}</p>
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mb-5">
                        <span className="flex items-center gap-1.5">📚 <strong className="text-white">{featuredCourse.lessonsCount}</strong> bài</span>
                        <span className="flex items-center gap-1.5">👨‍🏫 {featuredCourse.author}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <span className="text-3xl font-extrabold text-white">{featuredCourse.price}</span>
                          {!featuredCourse.isFree && <span className="text-sm text-zinc-400 font-semibold ml-1">USDT</span>}
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-5 py-2.5 text-sm font-extrabold text-zinc-950 group-hover:from-orange-300 group-hover:to-amber-500 transition shadow-lg">
                          Xem khoá học →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Live Filter and Catalog Grid */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">

            {/* Filter & Live Search Toolbar */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 relative max-w-md">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m21 21-4.3-4.3" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm khóa học, chủ đề..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded border border-white/10 bg-white/[0.04] pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                />
              </div>

              {/* Difficulty filters */}
              <div className="flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.04] p-1 self-start md:self-auto">
                {["", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setDifficultyFilter(level);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${difficultyFilter === level
                        ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 shadow-md shadow-orange-500/25"
                        : "text-zinc-300 hover:bg-white/5 hover:text-orange-300"
                      }`}
                  >
                    {level === "" ? "Tất cả" : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Header */}
            <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">
                  📖 TOÀN BỘ KHOÁ HỌC
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Khoá học dành cho bạn</h2>
              </div>
              <span className="text-sm text-zinc-400">
                <strong className="text-white">{filteredCourses.length}</strong> khoá học
              </span>
            </div>

            {paginatedCourses.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded bg-white/[0.01]">
                <span className="text-4xl">📚</span>
                <h3 className="mt-3 text-lg font-bold text-white">Chưa tìm thấy khóa học</h3>
                <p className="text-sm text-zinc-500 mt-1">Hãy thử tìm với bộ lọc hoặc từ khóa khác.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedCourses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="group rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden transition hover:border-orange-400/40 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-indigo-500/5 relative overflow-hidden shrink-0">
                      <img src={course.cover} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent"></div>

                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
                        {course.isFeatured ? (
                          <span className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider shadow">⭐ FEATURED</span>
                        ) : (
                          <span></span>
                        )}
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${course.isFree
                            ? "bg-emerald-500/90 text-zinc-950 font-extrabold shadow"
                            : "bg-zinc-950/80 border border-white/10 text-white"
                          }`}>
                          {course.price}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 text-[10px]">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${course.difficulty === "Beginner"
                            ? "bg-emerald-500/80 text-zinc-950"
                            : course.difficulty === "Intermediate"
                              ? "bg-amber-500/80 text-zinc-950"
                              : "bg-rose-500/80 text-zinc-950"
                          }`}>
                          {course.difficulty === "Beginner" ? "🌱" : course.difficulty === "Intermediate" ? "⚡" : "🚀"} {course.difficulty}
                        </span>
                        {course.duration && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950/70 backdrop-blur-sm text-zinc-200 px-2 py-0.5 font-semibold">
                            ⏱ {course.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-orange-300/80 font-bold mb-1.5">{course.category}</div>
                        <h3 className="font-extrabold text-white text-lg group-hover:text-orange-300 transition leading-snug line-clamp-2">{course.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">{course.description}</p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 flex items-center gap-1.5 truncate">
                          📚 <strong className="text-zinc-300">{course.lessonsCount}</strong> bài
                          <span className="text-zinc-700">·</span>
                          <span className="truncate max-w-[100px]">{course.author}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-orange-300 font-bold group-hover:translate-x-0.5 transition shrink-0">
                          Xem →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4" aria-label="Phân trang">
                <div className="text-sm text-zinc-400 tabular-nums order-2 md:order-1">
                  Hiển thị{" "}
                  <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong>{" "}
                  <span className="text-zinc-600">–</span>{" "}
                  <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredCourses.length)}</strong>{" "}
                  trên{" "}
                  <strong className="text-white">{filteredCourses.length}</strong>{" "}
                  khoá học
                </div>

                <div className="flex items-center gap-1.5 order-1 md:order-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition ${currentPage === 1
                        ? "bg-white/[0.02] text-zinc-600 cursor-not-allowed"
                        : "bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
                      }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-full px-3 text-sm transition ${isActive
                            ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 font-extrabold shadow-md shadow-orange-500/25"
                            : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 font-semibold"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition ${currentPage === totalPages
                        ? "bg-white/[0.02] text-zinc-600 cursor-not-allowed"
                        : "bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
                      }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </nav>
            )}

          </div>
        </section>

        {/* Partners Call-To-Action (CTA) Section */}
        <section className="bg-[#0A0B0D]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-3">
                    🤝 CHƯƠNG TRÌNH IB
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
                    Bạn là <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">IB partner</span>?
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-5 max-w-xl">
                    Đăng ký IB partner HieuNTHUB để được giảm giá / miễn phí một số khoá + nhận hoa hồng khi share course với client của bạn.
                  </p>
                  <Link href="/ib-commission-overview" className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-3 font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30">
                    Tìm hiểu chương trình IB →
                  </Link>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-3">
                  <div className="rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-2xl">💸</div>
                    <div className="mt-1 font-extrabold text-amber-300 text-lg">Giảm giá</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Khoá trả phí</div>
                  </div>
                  <div className="rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-2xl">📤</div>
                    <div className="mt-1 font-extrabold text-emerald-300 text-lg">Ref share</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Hoa hồng/đơn</div>
                  </div>
                  <div className="rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-2xl">📜</div>
                    <div className="mt-1 font-extrabold text-blue-300 text-lg">Cert</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Hoàn thành</div>
                  </div>
                  <div className="rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-2xl">∞</div>
                    <div className="mt-1 font-extrabold text-purple-300 text-lg">Trọn đời</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Truy cập</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
