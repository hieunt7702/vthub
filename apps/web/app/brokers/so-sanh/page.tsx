'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { TOP_BROKERS_DATA } from '../page';
import { 
  Scale, CheckCircle2, ArrowRight, Star, ChevronLeft 
} from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const brokersParam = searchParams.get('brokers') || 'vt-markets,exness';
  const brokerIds = brokersParam.split(',').filter(Boolean);

  // Always ensure VT Markets is included first
  let selectedBrokers = TOP_BROKERS_DATA.filter((b) => brokerIds.includes(b.id));
  if (!selectedBrokers.some((b) => b.id === 'vt-markets')) {
    const vt = TOP_BROKERS_DATA.find((b) => b.id === 'vt-markets');
    if (vt) selectedBrokers.unshift(vt);
  } else {
    // Sort VT Markets to the very first column
    selectedBrokers = [
      selectedBrokers.find((b) => b.id === 'vt-markets')!,
      ...selectedBrokers.filter((b) => b.id !== 'vt-markets')
    ];
  }

  // Fallback if only 1 broker is selected
  if (selectedBrokers.length === 1) {
    const exness = TOP_BROKERS_DATA.find((b) => b.id === 'exness');
    if (exness) selectedBrokers.push(exness);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-24 pb-24">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8">
          <Link
            href="/brokers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-white mb-6 bg-[#050D1A] border border-slate-800 hover:border-[#00C2FF]/40 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại danh sách sàn</span>
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-4 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Scale className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>BẢNG SO SÁNH ĐỐI ĐẦU TRỰC TIẾP (SIDE-BY-SIDE)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              So Sánh Sàn{' '}
              <span className="text-[#00C2FF]">
                VT Markets vs Các Sàn Khác
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
              Đối chiếu chi tiết mức hoàn phí Backcom, tốc độ khớp lệnh, phí Spread, đòn bẩy và quyền lợi độc quyền.
            </p>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="bg-[#050D1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                {/* Header Row */}
                <thead>
                  <tr className="border-b border-slate-800 bg-[#020712]/90">
                    <th className="p-6 w-1/4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tiêu Chí So Sánh
                    </th>
                    {selectedBrokers.map((b) => (
                      <th
                        key={b.id}
                        className={`p-6 text-center transition-all ${
                          b.id === 'vt-markets'
                            ? 'bg-gradient-to-b from-[#00C2FF]/15 via-[#050D1A] to-transparent border-x-2 border-t-2 border-[#00C2FF]'
                            : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' && (
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-[10px] rounded-full uppercase tracking-wider mb-3 shadow">
                            <Star className="w-3 h-3 fill-white" />
                            <span>★ ĐỐI TÁC SỐ 1 (RECOMMENDED)</span>
                          </div>
                        )}
                        <div className="h-10 w-28 mx-auto px-2 py-1 rounded-xl flex items-center justify-center bg-[#020712] border border-slate-800 mb-2 shadow-inner">
                          <img 
                            src={b.logo} 
                            alt={b.name} 
                            className="h-6 w-auto max-w-[90px] object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-black text-white">{b.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-xs text-[#00C2FF] font-bold mt-1">
                          <Star className="w-3.5 h-3.5 fill-[#00C2FF] text-[#00C2FF]" />
                          <span>WikiFX: {b.wikifxScore} / 10</span>
                        </div>

                        <div className="mt-4">
                          <a
                            href={b.id === 'vt-markets' ? 'https://www.vtmarkets.com/get-trading/?affid=8421818926' : '#'}
                            target={b.id === 'vt-markets' ? '_blank' : '_self'}
                            rel="noreferrer"
                            className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow transition-all ${
                              b.id === 'vt-markets'
                                ? 'bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white hover:brightness-110 shadow-lg'
                                : 'bg-[#020712] hover:bg-slate-900 border border-slate-700 text-slate-200'
                            }`}
                          >
                            <span>Mở Tài Khoản</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {/* 1. Rebate Rate */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      💰 Mức Hoàn Phí Backcom (Vàng XAUUSD)
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' ? (
                          <div className="text-[#00C2FF] text-base font-black flex items-center justify-center gap-1">
                            <span>🏆 {b.rebateGold}</span>
                          </div>
                        ) : (
                          <span className="text-slate-300">{b.rebateGold}</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* 2. Indicators & Analysis Tools */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      📊 Bộ Chỉ Báo & Công Cụ Giao Dịch Độc Quyền
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' ? (
                          <span className="px-2.5 py-1 bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/40 rounded-lg font-bold">
                            ✓ Có (Full Suite Trị Giá $2,000)
                          </span>
                        ) : (
                          <span className="text-slate-500 font-semibold">✗ Không có</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* 3. Daily Automated Payout */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      ⚡ Chi Trả Backcom Tự Động Hàng Ngày
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' ? (
                          <span className="text-[#00C2FF] font-bold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                            <span>Tự Động Trả Vào Tài Khoản</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Thủ công / Cuối tháng</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* 4. Minimum Spread */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      📊 Spread Thấp Nhất (Raw Account)
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black text-[#00C2FF] border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80 text-slate-300'
                        }`}
                      >
                        {b.minSpread} ({b.spreadType})
                      </td>
                    ))}
                  </tr>

                  {/* 5. Max Leverage */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      🚀 Đòn Bẩy Tối Đa
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black text-[#00C2FF] border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80 text-slate-300'
                        }`}
                      >
                        {b.maxLeverage}
                      </td>
                    ))}
                  </tr>

                  {/* 6. VietQR Deposit */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      💳 Nạp Rút Ngân Hàng Việt Nam (VietQR)
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' ? (
                          <span className="text-[#00C2FF] font-bold">24/7 Tức Thì (0đ Phí)</span>
                        ) : (
                          <span className="text-slate-300">Hỗ trợ cổng thanh toán</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* 7. Licenses */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      🛡️ Giấy Phép & Quản Lý Pháp Lý
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-bold border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {b.licenses.map((lic, i) => (
                            <span key={i} className="text-slate-300 text-[11px]">
                              ● {lic.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* 8. 1-1 Tech Support */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-5 font-bold text-slate-300">
                      👥 Hỗ Trợ Kỹ Thuật & Tối Ưu Chiến Lược 1-1
                    </td>
                    {selectedBrokers.map((b) => (
                      <td
                        key={b.id}
                        className={`p-5 text-center ${
                          b.id === 'vt-markets' ? 'bg-[#00C2FF]/10 font-black border-x-2 border-[#00C2FF]' : 'border-x border-slate-800/80'
                        }`}
                      >
                        {b.id === 'vt-markets' ? (
                          <span className="px-2.5 py-1 bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/40 rounded-lg font-bold">
                            ✓ Kỹ Thuật Viên Hỗ Trợ Riêng
                          </span>
                        ) : (
                          <span className="text-slate-500">Hỗ trợ qua Livechat</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BrokerComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020712] text-white flex items-center justify-center">Đang tải bảng so sánh sàn...</div>}>
      <CompareContent />
    </Suspense>
  );
}
