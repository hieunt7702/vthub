"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PredictionsPage() {
  const { t } = useLanguage();
  const [isLinked, setIsLinked] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  useEffect(() => {
    setIsLinked(localStorage.getItem('vtLinked') === 'true');
    const handleStorageChange = () => {
      setIsLinked(localStorage.getItem('vtLinked') === 'true');
    };
    window.addEventListener('vt-linked-change', handleStorageChange);
    return () => window.removeEventListener('vt-linked-change', handleStorageChange);
  }, []);

  const handleLinkAccount = () => {
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setIsLinked(true);
      localStorage.setItem('vtLinked', 'true');
      window.dispatchEvent(new Event('vt-linked-change'));
    }, 1500);
  };

  if (!isLinked) {
    return (
      <>
        <Header />
        <main id="main-content" className="flex-grow bg-[#090A0C] min-h-screen text-zinc-300 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="flex-1 flex items-center justify-center p-4 relative z-10 min-h-[calc(100vh-160px)]">
            <div className="max-w-md w-full bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded p-8 shadow-2xl shadow-purple-500/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-fuchsia-600 rounded mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-10 h-10 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2">Dự Đoán Hôm Nay</h1>
              <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
                Liên kết tài khoản giao dịch VT Market của bạn để bắt đầu sử dụng khối lượng (lots) từ Hệ thống Thưởng tham gia dự đoán và nhận những phần thưởng giá trị.
              </p>

              <button
                onClick={handleLinkAccount}
                disabled={isLinking}
                className="w-full relative group overflow-hidden rounded border border-white/10 p-1 transition-all hover:border-purple-500/50 bg-[#161719]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative bg-gradient-to-r from-purple-400 to-fuchsia-600 text-zinc-950 font-bold py-3.5 px-6 rounded flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                  {isLinking ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang kết nối...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Liên kết tài khoản VT Market
                    </>
                  )}
                </div>
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Kết nối an toàn & bảo mật
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow bg-[#090A0C] min-h-screen text-zinc-300 pb-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8 relative z-10 pt-10">
          <div className="flex flex-col gap-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Participants */}
              <div className="md:col-span-3 bg-black/40 rounded border border-white/10 p-5 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Người Tham Gia</div>
                <div className="text-xl font-bold text-white mb-1">1/50</div>
                <div className="text-[10px] text-zinc-500">2% chỗ đã dùng</div>
              </div>

              {/* Time */}
              <div className="md:col-span-3 bg-black/40 rounded border border-white/10 p-5 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="w-10 h-10 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Khung Giờ</div>
                <div className="text-lg font-bold text-emerald-400 mb-1">Đang mở</div>
                <div className="text-[10px] text-zinc-500">01:00:00 - 16:30:00 (UTC+7)</div>
              </div>

              {/* XAUUSD Banner */}
              <div className="md:col-span-6 bg-gradient-to-r from-amber-900/40 to-amber-600/20 rounded border border-amber-500/30 p-6 relative overflow-hidden flex items-center shadow-lg shadow-amber-500/10">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C] via-[#090A0C]/80 to-transparent"></div>
                
                <div className="relative z-10 w-full">
                  <div className="text-lg font-bold text-white mb-1">Giá XAUUSD</div>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">4,508.37</div>
                </div>
              </div>
              
              {/* Available Lots */}
              <div className="md:col-span-3 bg-black/40 rounded border border-white/10 p-5 flex flex-col items-center justify-center text-center mt-0 shadow-lg">
                <div className="w-10 h-10 rounded bg-zinc-500/20 text-zinc-400 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Lot Khả Dụng</div>
                <div className="text-xl font-bold text-white mb-1">0.0000</div>
                <div className="text-[10px] text-zinc-500">Đã trừ: 0.0000 lot</div>
              </div>

              {/* Fee Per Try */}
              <div className="md:col-span-3 bg-black/40 rounded border border-white/10 p-5 flex flex-col items-center justify-center text-center mt-0 shadow-lg">
                <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Phí Mỗi Lượt</div>
                <div className="text-xl font-bold text-white mb-1">0.1000 lot</div>
                <div className="text-[10px] text-zinc-500">Trừ từ lot khả dụng trên sàn</div>
              </div>

              {/* Join Prediction Form */}
              <div className="md:col-span-6 bg-[#161719] rounded border border-purple-500/30 p-6 flex flex-col justify-center shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">Tham gia dự đoán</h3>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Nhập đúng 4 chữ số (0000-9999). Mỗi ngày một lượt (Thứ Hai – Thứ Sáu). Mỗi lượt trừ <strong className="text-white">0.1000 lot</strong> từ Hệ thống thưởng.
                </p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="VD: 0123" 
                    className="flex-1 bg-black/40 border border-white/10 rounded px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 text-white font-semibold px-5 py-2.5 rounded transition flex items-center gap-2 shadow-lg shadow-purple-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Gửi dự đoán
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Prize Pool Table */}
              <div className="lg:col-span-2 bg-black/40 rounded border border-white/10 overflow-hidden flex flex-col shadow-lg">
                <div className="p-5 border-b border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Bảng giải thưởng hôm nay <span className="text-amber-400">01/06/2026</span></h3>
                  </div>
                </div>
                <div className="px-5 pt-3 pb-2 text-xs text-zinc-400">
                  Mức thưởng tăng theo số người tham gia — cập nhật realtime.
                </div>
                <div className="flex-1 p-5 pt-2 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="text-[10px] text-amber-500 uppercase tracking-wider font-bold border-b border-white/10">
                        <th className="py-3 px-2">CẤP</th>
                        <th className="py-3 px-2 text-center">SỐ GIẢI</th>
                        <th className="py-3 px-2">NGƯỜI THẮNG HÔM NAY</th>
                        <th className="py-3 px-2 text-right">TỔNG THƯỞNG</th>
                        <th className="py-3 px-2 text-right">MỖI GIẢI</th>
                        <th className="py-3 px-2 text-right">TRẦN TỐI ĐA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold text-[10px]">Nhất</span>
                        </td>
                        <td className="py-3 px-2 text-center text-white font-medium">1</td>
                        <td className="py-3 px-2 text-zinc-500">Chưa có</td>
                        <td className="py-3 px-2 text-right text-amber-400 font-bold">$0.20</td>
                        <td className="py-3 px-2 text-right text-white font-medium">$0.20</td>
                        <td className="py-3 px-2 text-right text-zinc-500">$10.00</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-300/20 border border-zinc-300/30 text-zinc-300 font-semibold text-[10px]">Nhì</span>
                        </td>
                        <td className="py-3 px-2 text-center text-white font-medium">1</td>
                        <td className="py-3 px-2 text-zinc-500">Chưa có</td>
                        <td className="py-3 px-2 text-right text-amber-400 font-bold">$0.20</td>
                        <td className="py-3 px-2 text-right text-white font-medium">$0.20</td>
                        <td className="py-3 px-2 text-right text-zinc-500">$10.00</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-semibold text-[10px]">Ba</span>
                        </td>
                        <td className="py-3 px-2 text-center text-white font-medium">1</td>
                        <td className="py-3 px-2 text-zinc-500">Chưa có</td>
                        <td className="py-3 px-2 text-right text-amber-400 font-bold">$0.12</td>
                        <td className="py-3 px-2 text-right text-white font-medium">$0.12</td>
                        <td className="py-3 px-2 text-right text-zinc-500">$6.00</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold text-[10px]">Tư</span>
                        </td>
                        <td className="py-3 px-2 text-center text-white font-medium">2</td>
                        <td className="py-3 px-2 text-zinc-500">Chưa có</td>
                        <td className="py-3 px-2 text-right text-amber-400 font-bold">$0.16</td>
                        <td className="py-3 px-2 text-right text-white font-medium">$0.08</td>
                        <td className="py-3 px-2 text-right text-zinc-500">$8.00</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-300 font-semibold text-[10px]">Khuyến khích</span>
                        </td>
                        <td className="py-3 px-2 text-center text-white font-medium">3</td>
                        <td className="py-3 px-2 text-zinc-500">Chưa có</td>
                        <td className="py-3 px-2 text-right text-amber-400 font-bold">$0.12</td>
                        <td className="py-3 px-2 text-right text-white font-medium">$0.04</td>
                        <td className="py-3 px-2 text-right text-zinc-500">$6.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Participants Table */}
              <div className="lg:col-span-1 bg-black/40 rounded border border-white/10 flex flex-col overflow-hidden shadow-lg">
                <div className="p-5 border-b border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                  </div>
                  <h3 className="text-base font-bold text-white">Người tham gia (1)</h3>
                </div>
                <div className="flex-1 p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[280px]">
                    <thead>
                      <tr className="bg-white/[0.02] text-blue-400 uppercase tracking-wider font-bold border-b border-white/10">
                        <th className="py-2.5 px-4 w-10">#</th>
                        <th className="py-2.5 px-4">ID NGƯỜI DÙNG</th>
                        <th className="py-2.5 px-4 text-right">THỜI GIAN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-zinc-500">1</td>
                        <td className="py-3 px-4 text-white">lee**********kr1</td>
                        <td className="py-3 px-4 text-right text-zinc-400">08:42:11 01/06</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 border-t border-white/10 flex items-center justify-between bg-white/[0.01]">
                  <span className="text-[10px] text-zinc-500">1-1 / 1</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">Records per page</span>
                    <select className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none">
                      <option>10</option>
                      <option>20</option>
                    </select>
                    <div className="flex gap-1 ml-2">
                      <button className="w-6 h-6 rounded bg-white/5 text-zinc-600 flex items-center justify-center cursor-not-allowed">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button className="w-6 h-6 rounded bg-amber-500 text-black font-bold flex items-center justify-center text-xs">
                        1
                      </button>
                      <button className="w-6 h-6 rounded bg-white/5 text-zinc-600 flex items-center justify-center cursor-not-allowed">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
