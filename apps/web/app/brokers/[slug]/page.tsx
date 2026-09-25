import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import Link from "next/link";
import { 
  Star, 
  Zap, 
  DollarSign, 
  ArrowRight,
  Award,
  Building,
  BadgeCheck,
  CreditCard
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function BrokerDetailPage() {
  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 font-sans flex flex-col selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />
      <main id="main-content" className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#00C2FF]">Trang chủ</Link>
          <span>/</span>
          <Link href="/brokers" className="hover:text-[#00C2FF]">Sàn đối tác</Link>
          <span>/</span>
          <span className="text-[#00C2FF] font-bold">VT Markets (WikiFX: 8.68/10)</span>
        </div>

        {/* Broker Header Card */}
        <div className="rounded-3xl border border-[#00C2FF]/30 bg-[#050D1A] p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[250px] bg-[#00C2FF]/10 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0052FF] px-3 py-1 text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 shadow">
                  <Award className="h-3.5 w-3.5 text-white" />
                  <span>Đối Tác Chiến Lược Số 1 VT Markets</span>
                </span>
                <span className="rounded-full bg-[#00C2FF]/15 border border-[#00C2FF]/40 px-3 py-1 text-xs font-bold text-[#00C2FF] flex items-center gap-1">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#00C2FF]" />
                  <span>Điểm WikiFX: 8.68 / 10 (Sàn Uy Tín Hàng Đầu)</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-32 items-center justify-center rounded-2xl bg-[#020712] border border-slate-700 p-2 shadow-inner">
                  <img src="/images/brokers/vt-markets.svg" alt="VT Markets" className="max-h-10 w-auto" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">VT Markets</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-200">Hoạt động từ 2015 &bull; 10+ Năm Toàn Cầu</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                VT Markets là nhà môi giới tài chính toàn cầu được cấp phép và giám sát bởi <strong>FSCA (No. 50865)</strong> và <strong>FSC Mauritius (No. GB23202269)</strong>. Cung cấp nền tảng MetaTrader 5 (MT5), MetaTrader 4 (MT4), tốc độ khớp lệnh ECN/STP mili-giây, đòn bẩy đến 1:1000 và bảo chứng nạp rút tự động qua ngân hàng Việt Nam 24/7.
              </p>

              {/* Quick Spec Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-[#020712] border border-slate-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Đòn Bẩy Tối Đa</span>
                  <span className="font-mono font-bold text-[#00C2FF] text-sm">1:1000</span>
                </div>
                <div className="bg-[#020712] border border-slate-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Spread Thấp Nhất</span>
                  <span className="font-mono font-bold text-white text-sm">Từ 0.0 Pip</span>
                </div>
                <div className="bg-[#020712] border border-slate-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Nạp Tối Thiểu</span>
                  <span className="font-mono font-bold text-white text-sm">$50 USD</span>
                </div>
                <div className="bg-[#020712] border border-slate-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Nạp Rút VN</span>
                  <span className="font-mono font-bold text-[#00C2FF] text-sm">VietQR 24/7 (0 Phí)</span>
                </div>
              </div>
            </div>

            {/* Right: Registration & Rebate Activation Card */}
            <div className="lg:col-span-4 rounded-2xl border border-[#00C2FF]/40 bg-[#08152B] p-6 text-center shadow-2xl">
              <div className="text-[11px] font-bold text-[#00C2FF] uppercase tracking-wider mb-1">
                Kích Hoạt Tài Khoản & Nhận Hoàn Phí
              </div>
              <div className="text-2xl font-black text-white mb-4">
                Hoàn Đến <span className="text-[#00C2FF]">$15 / Lot Vàng</span>
              </div>

              <div className="space-y-2.5 mb-5 text-left text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Giấy phép cơ quan:</span>
                  <strong className="text-white font-mono">FSCA, FSC</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Nền tảng giao dịch:</span>
                  <strong className="text-[#00C2FF] font-bold">MT5 / MT4 / App</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Bảo hiểm tài khoản:</span>
                  <strong className="text-white">Segregated Tier-1</strong>
                </div>
                <div className="flex justify-between text-[#00C2FF] font-bold">
                  <span>Cơ chế Backcom:</span>
                  <span>Tự Động Trả Trực Tiếp Hàng Ngày</span>
                </div>
              </div>

              <a
                href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] py-3.5 text-xs sm:text-sm font-black text-white hover:brightness-110 shadow-lg shadow-[#00C2FF]/25 transition-all uppercase tracking-wide mb-2"
              >
                <DollarSign className="h-4 w-4 text-white" />
                <span>Mở Tài Khoản Nhận Hoàn Phí</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-[10.5px] text-slate-500">Mở tài khoản trực tiếp dưới hệ sinh thái VT Rewards Hub</p>
            </div>
          </div>
        </div>

        {/* Regulatory & Safety Details from WikiFX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-[#050D1A] p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#00C2FF] font-bold text-sm">
              <Building className="h-4 w-4 text-[#00C2FF]" />
              <span>Pháp Lý & Quản Lý Giám Sát</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              VT Markets tuân thủ các quy định khắt khe của Cơ quan Quản lý Tài chính Nam Phi (FSCA License No. 50865) và FSC (No. GB23202269), kiểm toán tài chính độc lập hàng năm.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#050D1A] p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#00C2FF] font-bold text-sm">
              <CreditCard className="h-4 w-4 text-[#00C2FF]" />
              <span>Bảo Vệ Tiền Gửi (Segregated Fund)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toàn bộ tiền gửi của khách hàng được giữ tại tài khoản tách biệt tại các ngân hàng xếp hạng Tier-1 (Commonwealth Bank of Australia), hoàn toàn không sử dụng cho hoạt động công ty.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#050D1A] p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#00C2FF] font-bold text-sm">
              <Zap className="h-4 w-4 text-[#00C2FF]" />
              <span>Khớp Lệnh Siêu Tốc Cho Giao Dịch Thuật Toán</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Máy chủ đặt tại trung tâm dữ liệu Equinix NY4 và LD4, độ trễ chỉ dưới 5ms, tối ưu hóa tuyệt đối cho các chiến lược Scalping Vàng và giao dịch định lượng.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
