'use client';

import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { 
  Award, Star, Sparkles, TrendingUp, DollarSign, ArrowRight, 
  CheckCircle2, ShieldCheck, Zap, Info, ChevronRight, Gift, Layers
} from 'lucide-react';

export default function RewardsPage() {
  const [calcLots, setCalcLots] = useState<number>(500);
  const [contractSize, setContractSize] = useState<number>(100); // 100 oz Gold or standard
  const [avgPrice, setAvgPrice] = useState<number>(2700); // XAUUSD price

  // Formula: Volume = Lots * ContractSize * (OpenPrice + ClosePrice)
  // Approx Open + Close = 2 * AvgPrice
  const calculatedVolume = calcLots * contractSize * (avgPrice * 2);

  const VOLUME_MILESTONES = [
    { volume: 500000000, label: '$500 Triệu USD', raw: '500,000,000', reward: '$500', tier: 'Cột mốc 1' },
    { volume: 1500000000, label: '$1.5 Tỷ USD', raw: '1,500,000,000', reward: '$1,500', tier: 'Cột mốc 2' },
    { volume: 3000000000, label: '$3.0 Tỷ USD', raw: '3,000,000,000', reward: '$2,000', tier: 'Cột mốc 3' },
    { volume: 5000000000, label: '$5.0 Tỷ USD', raw: '5,000,000,000', reward: '$3,000', tier: 'Cột mốc 4' },
    { volume: 10000000000, label: '$10 Tỷ USD', raw: '10,000,000,000', reward: '$4,000', tier: 'Cột mốc 5' },
    { volume: 25000000000, label: '$25 Tỷ USD', raw: '25,000,000,000', reward: '$10,000', tier: 'Cột mốc 6' },
    { volume: 50000000000, label: '$50 Tỷ USD', raw: '50,000,000,000', reward: '$20,000', tier: 'Cột mốc 7' },
    { volume: 100000000000, label: '$100 Tỷ USD', raw: '100,000,000,000', reward: '$40,000', tier: 'Cột mốc 8' },
    { volume: 150000000000, label: '$150 Tỷ USD', raw: '150,000,000,000', reward: '$60,000', tier: 'Cột mốc 9' },
    { volume: 250000000000, label: '$250 Tỷ USD', raw: '250,000,000,000', reward: '$80,000', tier: 'Cột mốc 10' },
    { volume: 400000000000, label: '$400 Tỷ USD', raw: '400,000,000,000', reward: '$200,000', tier: 'Thượng Đỉnh VIP', isMax: true }
  ];

  // Find next milestone based on calculated volume
  const reachedMilestones = VOLUME_MILESTONES.filter(m => calculatedVolume >= m.volume);
  const nextMilestone = VOLUME_MILESTONES.find(m => calculatedVolume < m.volume) || VOLUME_MILESTONES[VOLUME_MILESTONES.length - 1];
  const totalEarnedReward = reachedMilestones.reduce((acc, curr) => {
    const val = parseInt(curr.reward.replace(/[^0-9]/g, ''), 10);
    return acc + val;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Gift className="w-4 h-4 text-[#00C2FF]" />
              <span>Chương Trình VT Markets Rewards & Lộ Trình Thưởng Khối Lượng</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              VT Rewards &{' '}
              <span className="text-[#00C2FF]">
                Lộ Trình Phần Thưởng
              </span>
            </h1>

            <p className="mt-4 max-w-3xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Tích lũy khối lượng giao dịch quy đổi (Trading Volume) để mở khóa các mốc tiền thưởng từ <strong>$500</strong> lên đến <strong>$200,000 USD</strong> dành riêng cho khách hàng và đối tác <strong>Bạch Kim VT Markets</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs shadow-lg hover:scale-105 transition-all uppercase tracking-wider cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Mở Tài Khoản Nhận Thưởng</span>
              </a>
              <Link
                href="/ib-commission-overview"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#08152B] hover:bg-[#0b1d3a] border border-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                <span>Xem Bảng Backcom Cấp Bậc</span>
                <ArrowRight className="w-4 h-4 text-[#00C2FF]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Volume Simulator */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-6 sm:mt-10">
          <div className="bg-[#050D1A] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800">
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mô Phỏng Trực Tuyến</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Máy Tính Trading Volume & Dự Phóng Thưởng</h2>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#08152B] border border-[#00C2FF]/30 text-left sm:text-right w-full sm:w-auto">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Volume Hiện Tính:</div>
                <div className="text-base sm:text-lg font-black text-[#00C2FF] font-mono">
                  ${(calculatedVolume / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })} Triệu USD
                </div>
              </div>
            </div>

            {/* Formula block */}
            <div className="my-4 sm:my-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#020712] border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-[#00C2FF] uppercase tracking-wider block mb-1 text-[11px] sm:text-xs">Công Thức Chính Thức VT Markets:</span>
              <code className="font-mono text-white text-xs sm:text-sm bg-[#050D1A] px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 block mt-1 overflow-x-auto whitespace-normal">
                Trading Volume = Số lot × Kích thước hợp đồng (100) × (Giá mở + Giá đóng)
              </code>
            </div>

            {/* Slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase">Khối Lượng Giao Dịch Của Bạn / Nhóm:</label>
                  <span className="font-mono font-black text-xl text-[#00C2FF]">{calcLots} Lots</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={50000}
                  step={50}
                  value={calcLots}
                  onChange={(e) => setCalcLots(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#020712] rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>50 Lots</span>
                  <span>5,000 Lots</span>
                  <span>25,000 Lots</span>
                  <span>50,000 Lots</span>
                </div>

                <div className="mt-4 flex gap-4 text-xs text-slate-400">
                  <span>Giá Vàng (XAUUSD): <strong>${avgPrice}</strong></span>
                  <span>Kích thước lot: <strong>100 oz</strong></span>
                </div>
              </div>

              {/* Reward result card */}
              <div className="bg-[#08152B] border border-[#00C2FF]/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Cột Mốc Thưởng Đạt Được (Cộng Dồn):
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#00C2FF] mt-1">
                    ${totalEarnedReward.toLocaleString()} USD
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Đã mở khóa <strong>{reachedMilestones.length} / {VOLUME_MILESTONES.length}</strong> mốc thưởng Bạch Kim.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Mốc tiếp theo cần chinh phục:</span>
                  <strong className="text-[#00C2FF]">{nextMilestone?.label} ({nextMilestone?.reward})</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official 11 Milestone Grid */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#00C2FF]" />
              <span>Bảng 11 Cột Mốc Thưởng Bạch Kim Chính Thức</span>
            </h3>
            <span className="text-xs font-bold text-[#00C2FF]">
              Đơn vị chi trả: USD tiền mặt trực tiếp
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VOLUME_MILESTONES.map((item, index) => {
              const isAchieved = calculatedVolume >= item.volume;

              return (
                <div
                  key={index}
                  className={`rounded-2xl p-5 border flex items-center justify-between transition-all ${
                    item.isMax
                      ? 'bg-gradient-to-r from-[#00C2FF]/20 via-[#0052FF]/20 to-[#020712] border-[#00C2FF] shadow-[0_0_30px_rgba(0,194,255,0.25)] col-span-1 md:col-span-2 lg:col-span-3'
                      : isAchieved
                        ? 'bg-[#08152B] border-[#00C2FF]/50 shadow-md'
                        : 'bg-[#050D1A] border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-bold uppercase">
                        {item.tier}
                      </span>
                      {isAchieved && (
                        <span className="text-[10px] text-[#00C2FF] font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Đạt được
                        </span>
                      )}
                    </div>
                    <div className="text-base font-black text-white mt-1.5">{item.label}</div>
                    <div className="text-[11px] font-mono text-slate-400">{item.raw} $</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Phần Thưởng</div>
                    <div className={`text-2xl font-black ${item.isMax ? 'text-[#00C2FF]' : 'text-[#00C2FF]'}`}>
                      {item.reward}
                    </div>
                    {item.isMax && (
                      <span className="inline-block px-2 py-0.5 rounded bg-[#00C2FF] text-slate-950 font-black text-[9px] uppercase tracking-wider mt-1">
                        👑 MAX $200,000
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tier Hierarchy Guide */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-14">
          <div className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Phân Cấp Quyền Lợi & Đối Tác</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Định Nghĩa Cấp Bậc Tham Gia VT Rewards</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kim Cuong */}
              <div className="p-6 rounded-2xl bg-[#08152B] border border-[#00C2FF]/40 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 fill-[#00C2FF] text-[#00C2FF]" />
                  <h3 className="text-lg font-black text-white">Kim Cương</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cấp bậc cao nhất hiện nay, dành cho các IB lớn có cộng đồng hoặc doanh số lớn. <strong>Chỉ có Kim Cương mới set up được cho Bạch Kim nhận chính sách thưởng.</strong>
                </p>
              </div>

              {/* Bach Kim */}
              <div className="p-6 rounded-2xl bg-[#08152B] border border-[#00C2FF]/40 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-[#00C2FF]" />
                  <h3 className="text-lg font-black text-white">Bạch Kim (Platinum)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cấp bậc duy nhất được <strong>backcom full cho khách lên đến 40%</strong>, đồng thời cũng là cấp bậc duy nhất được thưởng thêm từ <strong>Trading Volume</strong> lên đến $200,000 USD.
                </p>
              </div>

              {/* Vang */}
              <div className="p-6 rounded-2xl bg-[#020712] border border-slate-800 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black text-white">Vàng (Gold - 40%)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Khách hàng tiềm năng được Bạch Kim tin tưởng backcom full. Vàng có thể giới thiệu bạn bè để nhận chênh lệch hoa hồng tư vấn ở cấp bậc <strong>Bạc</strong> và <strong>Titan</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
