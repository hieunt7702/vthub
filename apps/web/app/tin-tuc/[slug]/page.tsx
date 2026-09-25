'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { 
  VTPost, 
  STORAGE_KEYS, 
  INITIAL_POSTS, 
  useVTDataStore 
} from '../../../lib/dataStore';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  DollarSign, 
  ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [posts] = useVTDataStore<VTPost>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  const article = posts.find((a) => a.slug === slug) || posts[0] || INITIAL_POSTS[0]!;

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-20">
        {/* Header Banner */}
        <section className="relative border-b border-slate-800 bg-[#050D1A] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-white mb-6 bg-[#020712] border border-slate-800 hover:border-[#00C2FF]/40 px-3.5 py-1.5 rounded-full transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isVi ? 'Quay Lại Danh Sách Tin Tức' : 'Back to News List'}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/30 px-3 py-1 font-bold text-[#00C2FF] uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-[#00C2FF]" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Eye className="h-3.5 w-3.5 text-[#00C2FF]" />
                {article.views?.toLocaleString()} lượt xem
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              {article.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-[#020712] border border-slate-800 rounded-2xl p-4">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
              <div className="whitespace-pre-line leading-relaxed">
                {article.content}
              </div>
            </div>

            {/* CTA Box: Nhận Hoàn Phí Backcom */}
            <div className="mt-12 rounded-2xl border border-[#00C2FF]/40 bg-[#08152B] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/40 shrink-0">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm sm:text-base">
                    {isVi ? 'Nhận Thưởng & Hoàn Phí Backcom Tự Động VT Markets' : 'Automated Backcom Rebates VT Markets'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isVi ? 'Tự động hoàn tiền trực tiếp vào tài khoản giao dịch mỗi ngày không qua trung gian.' : 'Receive daily automated cashback rebates directly into your trading account.'}
                  </p>
                </div>
              </div>

              <Link
                href="/ib-commission-overview"
                className="whitespace-nowrap flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] px-5 py-2.5 text-xs font-black text-white hover:brightness-110 shadow-lg shadow-[#00C2FF]/20 transition-all shrink-0 uppercase tracking-wider"
              >
                <span>{isVi ? 'Xem Cơ Chế Backcom' : 'View Rebate Matrix'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
