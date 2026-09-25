'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 font-sans flex flex-col">
      <Header />

      <section className="border-b border-slate-800 bg-[#050D1A] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-white mb-6 bg-[#020712] border border-slate-800 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isVi ? 'Về Trang Chủ' : 'Back to Home'}</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-3.5 py-1 text-xs font-black text-[#00C2FF] mb-4 uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>VT Rewards Hub Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {isVi ? 'Chính Sách Bảo Mật Quyền Riêng Tư' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isVi ? 'Cam kết bảo vệ 100% dữ liệu và không thu thập thông tin cá nhân trái phép' : 'Committed to strict privacy protection and data security'}
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10 flex-grow">
        <div className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#00C2FF] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00C2FF]" />
              {isVi ? '1. Cam Kết Không Thu Thập Dữ Liệu Trái Phép' : '1. Zero Invasive Data Harvesting'}
            </h3>
            <p>
              {isVi
                ? 'Hệ thống VT Rewards Hub được xây dựng vì lợi ích cộng đồng. Mọi tiện ích tải bộ 9 Bot EA MT5, tra cứu giá vàng/stock live, tính toán Backcom và xem đánh giá sàn đều có thể sử dụng tự do mà không thu thập dữ liệu nhạy cảm.'
                : 'VT Rewards Hub operates on transparent community principles. All EA downloads, gold/stock trackers, and rebate calculators can be utilized freely without mandatory submission of sensitive personal credentials.'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#00C2FF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00C2FF]" />
              {isVi ? '2. Minh Bạch Chính Sách Đối Tác & Hoàn Phí' : '2. Transparent Partner & Rebate Policy'}
            </h3>
            <p>
              {isVi
                ? 'Mọi thông tin liên quan đến tài khoản nhận hoàn phí Backcom được đồng bộ trực tiếp và an toàn thông qua cơ chế chính thức của VT Markets.'
                : 'All account information regarding automated backcom rebates is synchronized directly and securely through official VT Markets APIs.'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
