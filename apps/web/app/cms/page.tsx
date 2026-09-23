"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useState, useMemo } from "react";
import Link from "next/link";

import { Article, articlesData } from "./cmsArticlesDb";

const categories = [
  { slug: "", label: "Tất cả (56)" },
  { slug: "beginner-guides", label: "Hướng dẫn cho người mới" },
  { slug: "danh-gia-broker", label: "Đánh Giá Broker" },
  { slug: "copy-trading", label: "Copy Trading" },
  { slug: "eabotindicator", label: "EA/Bot/Indicator" },
  { slug: "gold-prices", label: "Giá Vàng" },
  { slug: "market-insights-analysis", label: "Phân tích & góc nhìn" },
  { slug: "market-news", label: "Tin tức thị trường" },
  { slug: "trading-education", label: "Kiến thức Trading" }
];

export default function CMSNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const featuredArticle = useMemo(() => {
    return articlesData.find(a => a.isFeatured) || articlesData[0];
  }, []);

  const filteredArticles = useMemo(() => {
    return articlesData.filter(art => {
      const matchCat = selectedCategory === "" || art.category === selectedCategory;
      const matchSearch = searchQuery === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C] min-h-screen">

        {/* Header Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              📰 TIN TỨC &amp; PHÂN TÍCH
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Tin tức &amp;{" "}
              <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">phân tích</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
              Cập nhật xu hướng forex, đánh giá sàn, hướng dẫn IB từ team HieuNTHUB.
            </p>

            {/* Categories filters tabs switcher */}
            <nav className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${selectedCategory === cat.slug
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30 font-bold"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Live Search bar */}
        <section className="max-w-md mx-auto px-4 mt-6">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m21 21-4.3-4.3" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <input
              type="text"
              placeholder="Tìm tin tức, góc nhìn..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded border border-white/10 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
            />
          </div>
        </section>

        {/* Featured Big Article Card */}
        {featuredArticle && (
          <section className="border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-12">
              <Link href={`/cms/${featuredArticle.slug}`} className="group grid lg:grid-cols-2 gap-0 rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden hover:border-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/10 transition">

                <div className="relative aspect-video lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-gradient-to-br from-blue-500/25 to-indigo-500/5">
                  <img src={featuredArticle.cover} alt={featuredArticle.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-orange-500 text-zinc-950 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                    ⭐ Nổi bật
                  </div>
                </div>

                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4 flex-wrap">
                    <span className="rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 px-2.5 py-0.5 font-semibold">{featuredArticle.categoryLabel}</span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-orange-300 transition leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-4 text-zinc-400 line-clamp-3 text-base leading-relaxed">{featuredArticle.snippet}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-orange-300 font-semibold group-hover:gap-3 transition-all">
                    Đọc bài đầy đủ
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Catalog Grid Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-12">
            <h2 className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold mb-6">
              📚 Tất cả bài viết
            </h2>

            {paginatedArticles.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded bg-white/[0.01]">
                <span className="text-4xl">📰</span>
                <h3 className="mt-3 text-lg font-bold text-white">Chưa tìm thấy bài viết nào</h3>
                <p className="text-sm text-zinc-500 mt-1">Vui lòng chọn bộ lọc khác.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/cms/${art.slug}`}
                    className="group flex flex-col rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] overflow-hidden hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 transition h-full"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/25 to-indigo-500/5 border-b border-white/5 shrink-0">
                      <img src={art.cover} alt={art.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" decoding="async" />
                      <span className="absolute top-3 left-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-orange-300 px-2.5 py-0.5 text-[10px] font-semibold">
                        {art.categoryLabel}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-extrabold text-white text-base group-hover:text-orange-300 transition line-clamp-2 leading-tight">
                          {art.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-400 line-clamp-3 leading-relaxed">{art.snippet}</p>
                      </div>

                      <div className="mt-5 pt-4 flex items-center gap-3 text-[11px] text-zinc-500 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {art.date}
                        </span>
                        <span className="text-zinc-700">·</span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {art.readTime}
                        </span>
                        <span className="ml-auto text-orange-300 group-hover:translate-x-0.5 transition font-bold text-xs">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex justify-center" role="navigation" aria-label="Pagination Navigation">
                  <ul className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/[0.03] p-1.5">

                    <li>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`inline-flex items-center justify-center min-w-9 h-9 px-3 rounded text-sm font-bold transition ${currentPage === 1
                            ? "text-zinc-600 cursor-not-allowed"
                            : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-300"
                          }`}
                      >
                        ‹
                      </button>
                    </li>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <li key={pageNum}>
                          <button
                            type="button"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`inline-flex items-center justify-center min-w-9 h-9 px-3 rounded text-sm font-bold transition tabular-nums ${isActive
                                ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 shadow-md shadow-orange-500/25"
                                : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-300"
                              }`}
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    })}

                    <li>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`inline-flex items-center justify-center min-w-9 h-9 px-3 rounded text-sm font-bold transition ${currentPage === totalPages
                            ? "text-zinc-600 cursor-not-allowed"
                            : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-300"
                          }`}
                      >
                        ›
                      </button>
                    </li>

                  </ul>
                </nav>
              </div>
            )}

          </div>
        </section>

        {/* Action conversion CTA panel */}
        <section>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Đọc xong rồi?{" "}
                  <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">Tìm broker phù hợp</span>
                </h3>
                <p className="mt-2 text-zinc-400 max-w-xl mx-auto">Áp dụng kiến thức vừa đọc — so sánh sàn forex và chọn broker với cơ chế IB tốt nhất.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/brokers" className="rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-3 font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30">
                    Xem tất cả broker
                  </Link>
                  <Link href="/brokers/so-sanh" className="rounded border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white hover:border-white/20 transition">
                    So sánh broker
                  </Link>
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
