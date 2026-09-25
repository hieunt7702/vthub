'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, Bot, Lock } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <footer className="bg-[#020712] border-t border-slate-800 w-full py-16 relative overflow-hidden text-slate-400 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-1">
            <img 
              src="/logo_white.webp" 
              alt="VT Markets" 
              className="h-6 w-auto object-contain"
            />
            <span className="px-2 py-0.5 rounded-md bg-[#00C2FF]/15 border border-[#00C2FF]/40 text-[#00C2FF] text-[10px] font-black tracking-wider uppercase">
              REWARDS HUB
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {isVi 
              ? 'Hệ sinh thái tiện ích miễn phí toàn diện cho cộng đồng trader VT Markets: Bộ 9 Bot EA MT5, trình tạo EA MQL5, phân tích thị trường và cơ chế hoàn phí (Backcom).'
              : 'The comprehensive utility ecosystem for VT Markets traders: 9 Expert Advisors, MQL5 EA Builder, market intelligence, and automated rebate rewards.'}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/30 px-3 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00C2FF]" />
              <span>VT Markets Partner Hub</span>
            </span>
          </div>
        </div>

        {/* Links Column 1: Ecosystem & Tools */}
        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-xs">
            {isVi ? 'Công Cụ & Tiện Ích' : 'Ecosystem & Tools'}
          </h4>
          <Link href="/builder" className="hover:text-white transition-colors w-fit flex items-center gap-1 text-teal-300 font-semibold">
            <Bot className="h-3.5 w-3.5" />
            <span>{isVi ? 'Build Bot EA Studio (No-Code)' : 'No-Code EA Builder'}</span>
          </Link>
          <Link href="/indicators" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Kho 9 Bot EA MT5' : '9 EA MT5 Suite'}
          </Link>
          <Link href="/courses" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Khóa Học 3 Cấp Độ (Cơ bản - Nâng cao - Chuyên sâu)' : '3-Tier Academy Courses'}
          </Link>
          <Link href="/gia-vang-hom-nay" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Giá Vàng & Thị Trường Live' : 'Live Gold & Markets'}
          </Link>
        </div>

        {/* Links Column 2: Content & Rewards */}
        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-xs">
            {isVi ? 'Nội Dung & Quyền Lợi' : 'Knowledge & Rewards'}
          </h4>
          <Link href="/tin-tuc" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Tin Tức & Nhận Định Thị Trường' : 'Market Research & News'}
          </Link>
          <Link href="/courses" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Khóa Học Trading Miễn Phí' : 'Trading Courses'}
          </Link>
          <Link href="/rewards" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Chương Trình Thưởng VT Rewards' : 'VT Rewards Program'}
          </Link>
          <Link href="/ib-commission-overview" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Cơ Chế Hoàn Phí (Backcom IB)' : 'IB Commission & Rebates'}
          </Link>
          <Link href="/offers-bonus" className="hover:text-white transition-colors w-fit">
            {isVi ? 'Khuyến Mãi & Bonus' : 'Promotions & Bonus'}
          </Link>
        </div>

        {/* Links Column 3: Legal & Admin */}
        <div className="flex flex-col gap-3 text-xs">
          <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-xs">
            {isVi ? 'Pháp Lý & Quản Trị' : 'Legal & Policies'}
          </h4>
          <Link href="/terms" className="hover:text-slate-200 transition-colors w-fit">
            {isVi ? 'Điều khoản dịch vụ' : 'Terms of Service'}
          </Link>
          <Link href="/privacy" className="hover:text-slate-200 transition-colors w-fit">
            {isVi ? 'Chính sách bảo mật' : 'Privacy Policy'}
          </Link>
          <Link href="/disclaimer" className="hover:text-rose-400 transition-colors w-fit text-rose-400/90 font-medium">
            {isVi ? 'Cảnh báo rủi ro (Risk Warning)' : 'Risk Disclaimer'}
          </Link>
          <div className="pt-2 border-t border-slate-800">
            <Link href="/admin/login" className="text-slate-500 hover:text-[#00C2FF] text-[11px] transition-colors w-fit flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>{isVi ? 'Cổng Admin Đăng Nhập' : 'Admin Portal Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} VT Rewards Hub. Thuộc hệ sinh thái đối tác sàn VT Markets.
        </div>
        <div>
          VT Markets Ecosystem &bull; MetaTrader 5 &bull; All Utilities Free for Community
        </div>
      </div>
    </footer>
  );
}
