'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, Scale } from 'lucide-react';

export default function TermsPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 font-sans flex flex-col">
      <Header />

      {/* Header */}
      <section className="border-b border-slate-800 bg-[#050D1A] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-white mb-6 bg-[#020712] border border-slate-800 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isVi ? 'Về Trang Chủ' : 'Back to Home'}</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-3.5 py-1 text-xs font-black text-[#00C2FF] mb-4 uppercase tracking-widest">
            <Scale className="h-3.5 w-3.5" />
            <span>VT Rewards Hub Legal Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {isVi ? 'Điều Khoản Dịch Vụ & Bản Quyền Phần Mềm' : 'Terms of Service & License Agreement'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isVi ? 'Cập nhật lần cuối: Tháng 09/2026' : 'Last updated: September 2026'}
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10 flex-grow">
        <div className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#00C2FF] text-xs font-black">01</span>
              <span>{isVi ? 'Định Nghĩa & Giải Thích Thuật Ngữ' : 'Definitions'}</span>
            </h2>
            <p>
              {isVi
                ? 'Hệ thống VT Rewards Hub là cổng thông tin tổng hợp quyền lợi, cung cấp bộ 9 Bot Expert Advisor (EA VTM), kho chỉ báo kỹ thuật và chương trình hoàn phí Backcom hỗ trợ cộng đồng trader tại sàn giao dịch VT Markets.'
                : 'VT Rewards Hub is a dedicated utility portal providing 9 official Expert Advisor (EA VTM) bots, technical indicator repositories, and transparent rebate tracking for VT Markets traders.'}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#00C2FF] text-xs font-black">02</span>
              <span>{isVi ? 'Bản Chất Công Nghệ & Bộ Bot EA Miễn Phí' : 'Free EA Suite & Technology Policy'}</span>
            </h2>
            <p>
              {isVi
                ? 'Mọi tệp Bot EA MT5 (.ex5), chỉ báo kỹ thuật và dữ liệu giá vàng/stock live được cung cấp hoàn toàn miễn phí cho cộng đồng với mục đích hỗ trợ phân tích và tự động hóa giao dịch cá nhân.'
                : 'All automated EA files (.ex5), indicators, and live quotes are provided free of charge for community analytical assistance and personal algorithmic trading execution.'}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#00C2FF] text-xs font-black">03</span>
              <span>{isVi ? 'Quy Định Về Hoàn Phí Tự Động (Backcom Rebate)' : 'Automated Backcom Rebate Policy'}</span>
            </h2>
            <p>
              {isVi
                ? 'Chương trình hoàn phí (Rebate) được ghi nhận dựa trên khối lượng giao dịch (Lot) thực tế phát sinh hợp lệ trên tài khoản VT Markets và hoàn trực tiếp vào tài khoản MT5 mỗi ngày.'
                : 'Rebate payouts are accurately calculated and credited directly to trading MT5 accounts daily based on valid traded volumes under partner affiliation programs.'}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
