'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function DisclaimerPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="min-h-screen bg-[#04090f] text-slate-100 font-sans pb-20">
      <section className="border-b border-rose-500/20 bg-gradient-to-b from-[#18080a] to-[#04090f] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 mb-6 bg-rose-950/60 border border-rose-500/30 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isVi ? 'Về Trang Chủ' : 'Back to Home'}</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs font-black text-rose-300 mb-4 uppercase tracking-widest">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>High Risk Investment Warning</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {isVi ? 'Cảnh Báo Rủi Ro Tài Chính & Miễn Trừ Trách Nhiệm' : 'Risk Warning & Disclaimer'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isVi ? 'Vui lòng đọc kỹ các cảnh báo rủi ro trước khi tham gia giao dịch phái sinh ký quỹ' : 'Please review this risk notice before engaging in leveraged margin trading'}
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#12070a]/90 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-300">
            <strong>⚠️ CẢNH BÁO RỦI RO QUAN TRỌNG:</strong> Giao dịch Ngoại hối (Forex), Hợp đồng Chênh lệch (CFD) và Kim loại quý (Vàng XAUUSD) sử dụng đòn bẩy tài chính tiềm ẩn mức độ rủi ro cao và có thể không phù hợp với mọi nhà đầu tư. Bạn có thể mất một phần hoặc toàn bộ số vốn đã đầu tư.
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">
              {isVi ? '1. Không Phải Lời Khuyên Đầu Tư' : '1. Educational & Software Purpose Only'}
            </h3>
            <p>
              {isVi
                ? 'Toàn bộ nội dung phân tích tin tức, chỉ báo và mã nguồn Expert Advisor được tạo ra chỉ mang tính chất tham khảo kỹ thuật và hỗ trợ học tập, hoàn toàn không cấu thành lời khuyên đầu tư tài chính.'
                : 'All market research, algorithmic EA builders, and indicator suites are provided for educational and analytical purposes only and do not constitute financial investment advice.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
