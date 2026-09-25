'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { 
  Search, Sparkles, Calendar, Eye, BookOpen, 
  ArrowRight, Tag, Clock
} from 'lucide-react';
import { 
  VTPost, 
  STORAGE_KEYS, 
  INITIAL_POSTS, 
  useVTDataStore 
} from '../../lib/dataStore';

export default function NewsPage() {
  const { language } = useLanguage();
  const [posts] = useVTDataStore<VTPost>(STORAGE_KEYS.POSTS, INITIAL_POSTS);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelVi: 'Tất Cả Bài Viết', labelEn: 'All Posts' },
    { id: 'Tin Tức Thị Trường', labelVi: 'Tin Thị Trường', labelEn: 'Market News' },
    { id: 'Chiến Lược MQL5', labelVi: 'Chiến Lược MQL5 / Bot EA', labelEn: 'MQL5 Strategies' },
    { id: 'Hướng Dẫn VT Markets', labelVi: 'Hướng Dẫn VT Markets', labelEn: 'VT Guides & Rebates' },
    { id: 'Phân Tích Kỹ Thuật', labelVi: 'Phân Tích Kỹ Thuật', labelEn: 'Technical Analysis' }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchCat = activeCategory === 'all' || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>{language === 'vi' ? 'Cập Nhật Thị Trường & Kiến Thức MQL5' : 'Market Research & MQL5 Insights'}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              {language === 'vi' ? 'Tin Tức & Phân Tích' : 'News & Market Research'}{' '}
              <span className="text-[#00C2FF]">
                VT Rewards Hub
              </span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              {language === 'vi'
                ? 'Tổng hợp nhận định dòng tiền Smart Money Concepts, phân tích Vàng XAUUSD, mẹo tối ưu hóa bot EA MetaTrader 5 và chính sách hoàn phí Backcom mới nhất.'
                : 'Actionable institutional market analysis, Smart Money Concepts breakdowns, MQL5 EA optimization guides, and automated rebate updates.'}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#00C2FF] text-slate-950 font-black shadow-md'
                      : 'bg-[#050D1A] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {language === 'vi' ? cat.labelVi : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm bài viết, chiến lược...' : 'Search articles, strategies...'}
                className="w-full pl-10 pr-4 py-2 bg-[#050D1A] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#050D1A] p-6 hover:border-[#00C2FF]/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] font-bold uppercase">
                      {post.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-black text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    <Link href={`/tin-tuc/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-[#00C2FF]" />
                    <span>{post.views.toLocaleString()} lượt xem</span>
                  </div>

                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[#00C2FF] font-black hover:underline"
                  >
                    <span>{language === 'vi' ? 'Đọc tiếp' : 'Read more'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
