'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Download, Search, Sparkles, Filter, CheckCircle2, 
  ArrowRight, ShieldCheck, Activity, Layers, Bot, Clock, HelpCircle, FileCode, X
} from 'lucide-react';
import { 
  VTIndicator, 
  STORAGE_KEYS, 
  INITIAL_INDICATORS, 
  useVTDataStore 
} from '../../lib/dataStore';

export default function IndicatorsPage() {
  const { language } = useLanguage();
  const [indicators] = useVTDataStore<VTIndicator>(
    STORAGE_KEYS.INDICATORS,
    INITIAL_INDICATORS
  );

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEA, setSelectedEA] = useState<VTIndicator | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const filtered = indicators.filter((ind) => {
    const matchTab = activeTab === 'all' || ind.category === activeTab;
    const matchSearch =
      ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Bot className="w-4 h-4 text-[#00C2FF]" />
              <span>Hệ Thống 9 Expert Advisor (EA VTM) MetaTrader 5 Độc Quyền</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Kho Bot EA & Chỉ Báo{' '}
              <span className="text-[#00C2FF]">
                VT Markets
              </span>
            </h1>

            <p className="mt-4 max-w-3xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Tổng hợp 9 dòng Expert Advisor tối ưu hóa cấu trúc và bảo mật, vận hành chuyên sâu trên các tài khoản <strong>XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP</strong> tại sàn VT Markets.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowGuide(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs shadow-lg hover:scale-105 transition-all uppercase tracking-wider cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Hướng Dẫn Cài Đặt MT5</span>
              </button>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#08152B] hover:bg-[#0b1d3a] border border-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                <span>Tự Tạo EA Bằng Visual Flow</span>
                <ArrowRight className="w-4 h-4 text-[#00C2FF]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
          {/* Search & Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất cả 9 Bot' },
                { id: 'Smart Money Concept (SMC)', label: 'Smart Money (SMC)' },
                { id: 'Giao dịch Lưới (Grid)', label: 'Lưới (Grid)' },
                { id: 'Chiến lược DCA', label: 'Chiến lược DCA' },
                { id: 'Theo Xu Hướng', label: 'Theo Xu Hướng' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#00C2FF] text-slate-950 font-black shadow-md'
                      : 'bg-[#050D1A] text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm EA VTM..."
                className="w-full pl-10 pr-4 py-2 bg-[#050D1A] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF]"
              />
            </div>
          </div>

          {/* Bot Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-800 bg-[#050D1A] p-6 hover:border-[#00C2FF]/40 transition-all flex flex-col justify-between shadow-xl group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] font-bold text-[10px] border border-[#00C2FF]/20 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold bg-[#020712] px-2 py-0.5 rounded border border-slate-800">
                      v{item.version}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-black text-white group-hover:text-[#00C2FF] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Technical Specs */}
                  <div className="mt-4 p-3 bg-[#020712] border border-slate-800/80 rounded-2xl space-y-2 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00C2FF]" /> Timeframe:
                      </span>
                      <strong className="text-slate-200 font-mono">{item.recommendedTimeframe || 'M5'}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00C2FF]" /> Server Target:
                      </span>
                      <strong className="text-[#00C2FF] text-[10px]">VT-Markets XAUUSD</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href={item.downloadUrl}
                    download
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs text-center shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải File .EX5</span>
                  </a>
                  <button
                    onClick={() => setSelectedEA(item)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#020712] hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Disclaimer Box */}
          <div className="mt-12 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-sm font-black uppercase text-amber-300 tracking-wider">
                Khuyến Cáo Quản Trị Rủi Ro & Miễn Trừ Trách Nhiệm (Disclaimer)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bộ 9 Expert Advisor và công cụ phân tích MT5 tại VT Rewards Hub được phát triển và chia sẻ miễn phí 100% nhằm mục đích hỗ trợ nghiên cứu chiến lược thuật toán cho cộng đồng trader VT Markets. Thị trường tài chính ngoại hối và phái sinh CFD luôn có độ biến động cao và tiềm ẩn rủi ro sụt giảm vốn. VT Rewards Hub không cung cấp lời khuyên đầu tư tài chính hay cam kết lợi nhuận cố định. Quý nhà đầu tư cần kiểm soát khối lượng giao dịch, cài đặt Stop Loss phù hợp và tự chịu trách nhiệm với các quyết định giao dịch của mình.
              </p>
            </div>
          </div>
        </section>

        {/* EA Detail Modal */}
        {selectedEA && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#050D1A] border border-[#00C2FF]/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedEA(null)}
                className="absolute right-4 top-4 p-2 rounded-full bg-[#020712] text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#00C2FF]/20 text-[#00C2FF] font-bold text-xs">
                  {selectedEA.category}
                </span>
                <span className="text-xs text-slate-400">Version {selectedEA.version}</span>
              </div>

              <h2 className="text-2xl font-black text-white">{selectedEA.name}</h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{selectedEA.description}</p>

              <div className="my-6 p-4 rounded-2xl bg-[#020712] border border-slate-800 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Khung thời gian khuyên dùng:</span>
                  <strong className="text-white font-mono">{selectedEA.recommendedTimeframe}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cặp tiền tệ (Symbol) hỗ trợ:</span>
                  <strong className="text-[#00C2FF] font-mono">{selectedEA.supportedSymbols}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bảo mật sàn giao dịch:</span>
                  <strong className="text-[#00C2FF]">VT-Markets Server Lock (IsSecurityValid)</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedEA.downloadUrl}
                  download
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs text-center uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải File .EX5 Cài Đặt MT5</span>
                </a>
                <button
                  onClick={() => { setSelectedEA(null); setShowGuide(true); }}
                  className="px-4 py-3 rounded-xl bg-[#020712] border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-900"
                >
                  Xem hướng dẫn cài
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Installation Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#050D1A] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowGuide(false)}
                className="absolute right-4 top-4 p-2 rounded-full bg-[#020712] text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#00C2FF] uppercase">
                <HelpCircle className="w-4 h-4" />
                <span>Quy Trình Cài Đặt MetaTrader 5</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-4">Hướng Dẫn Cài Đặt Bot EA VTM</h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-[#020712] border border-slate-800">
                  <strong className="text-white block mb-1">1. Sao chép file bot .ex5:</strong>
                  Mở MT5 &rarr; Chọn <code>File</code> &rarr; <code>Open Data Folder</code> &rarr; Vào thư mục <code>MQL5/Experts</code> và dán file bot vào.
                </div>

                <div className="p-4 rounded-2xl bg-[#020712] border border-slate-800">
                  <strong className="text-white block mb-1">2. Cài đặt WebRequest (Cho bot Apex Oracle SMC gọi AI):</strong>
                  Trên MT5 chọn <code>Tools</code> &rarr; <code>Options</code> &rarr; Chuyển qua tab <code>Expert Advisors</code>. Tích chọn <strong>&quot;Allow WebRequest for listed URL&quot;</strong> và thêm đường dẫn <code>https://api.openai.com</code>.
                </div>

                <div className="p-4 rounded-2xl bg-[#020712] border border-slate-800">
                  <strong className="text-white block mb-1">3. Bật Algo Trading:</strong>
                  Tích chọn <strong>&quot;Allow Algo Trading&quot;</strong> tại tab Expert Advisors và nhấn nút <strong>Algo Trading</strong> trên thanh công cụ MT5 (chuyển sang màu xanh lá).
                </div>

                <div className="p-4 rounded-2xl bg-[#020712] border border-slate-800">
                  <strong className="text-white block mb-1">4. Kéo Bot vào Chart Vàng VT Markets:</strong>
                  Nhấn <code>Ctrl + N</code> (Navigator) &rarr; Chuột phải vào Experts chọn <code>Refresh</code> &rarr; Kéo bot vào biểu đồ <code>XAUUSD-STD</code> hoặc <code>XAUUSD-STDc</code>.
                </div>
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="mt-6 w-full py-3 rounded-xl bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs uppercase tracking-wider shadow"
              >
                Đã hiểu, đóng hướng dẫn
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
