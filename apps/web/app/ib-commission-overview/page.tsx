'use client';

import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { 
  DollarSign, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, 
  Layers, Users, TrendingUp, Award, Zap, HelpCircle, Calculator, Star, Info
} from 'lucide-react';

export default function IBCommissionOverviewPage() {
  const [activeTab, setActiveTab] = useState<'backcom-matrix' | 'volume-rewards' | 'tier-guide' | 'calc'>('backcom-matrix');
  const [calcTier, setCalcTier] = useState<'titan' | 'silver' | 'gold' | 'platinum'>('gold');
  const [calcLink, setCalcLink] = useState<'stp' | 'mvp' | 'exp'>('stp');
  const [calcLots, setCalcLots] = useState<number>(100);

  // Official VT Markets Tier Matrix
  const BACKCOM_MATRIX = [
    {
      tier: 'TITAN',
      name: 'Titan',
      badge: 'Cấp Khởi Đầu',
      stp: 5,
      mvp: 7,
      exp: 9,
      reqNet: '$10,000',
      reqLot: '100',
      isTop: false
    },
    {
      tier: 'BẠC',
      name: 'Bạc (Silver)',
      badge: 'Cấp Tiềm Năng',
      stp: 6,
      mvp: 8,
      exp: 10,
      reqNet: '$30,000',
      reqLot: '300',
      isTop: false
    },
    {
      tier: 'VÀNG',
      name: 'Vàng (Gold)',
      sub: '(40% Spread)',
      badge: 'Backcom Full 40%',
      stp: 6.8,
      mvp: 9,
      exp: 11,
      reqNet: '$50,000',
      reqLot: '500',
      isTop: false
    },
    {
      tier: 'BẠCH KIM',
      name: 'Bạch Kim (Platinum)',
      badge: '★ Max Quyền Lợi & Volume Bonus',
      stp: 7,
      mvp: 9.5,
      exp: 12,
      reqNet: '$100,000',
      reqLot: '2,000',
      isTop: true
    }
  ];

  // Official Volume Rewards for Platinum
  const VOLUME_REWARDS = [
    { volume: '500,000,000', volumeLabel: '$500 Triệu USD', reward: 500, rewardLabel: '$500' },
    { volume: '1,500,000,000', volumeLabel: '$1.5 Tỷ USD', reward: 1500, rewardLabel: '$1,500' },
    { volume: '3,000,000,000', volumeLabel: '$3.0 Tỷ USD', reward: 2000, rewardLabel: '$2,000' },
    { volume: '5,000,000,000', volumeLabel: '$5.0 Tỷ USD', reward: 3000, rewardLabel: '$3,000' },
    { volume: '10,000,000,000', volumeLabel: '$10 Tỷ USD', reward: 4000, rewardLabel: '$4,000' },
    { volume: '25,000,000,000', volumeLabel: '$25 Tỷ USD', reward: 10000, rewardLabel: '$10,000' },
    { volume: '50,000,000,000', volumeLabel: '$50 Tỷ USD', reward: 20000, rewardLabel: '$20,000' },
    { volume: '100,000,000,000', volumeLabel: '$100 Tỷ USD', reward: 40000, rewardLabel: '$40,000' },
    { volume: '150,000,000,000', volumeLabel: '$150 Tỷ USD', reward: 60000, rewardLabel: '$60,000' },
    { volume: '250,000,000,000', volumeLabel: '$250 Tỷ USD', reward: 80000, rewardLabel: '$80,000' },
    { volume: '400,000,000,000', volumeLabel: '$400 Tỷ USD', reward: 200000, rewardLabel: '$200,000', isMax: true }
  ];

  // Calculator Logic
  const getRatePerLot = () => {
    const tierData = {
      titan: { stp: 5, mvp: 7, exp: 9 },
      silver: { stp: 6, mvp: 8, exp: 10 },
      gold: { stp: 6.8, mvp: 9, exp: 11 },
      platinum: { stp: 7, mvp: 9.5, exp: 12 }
    }[calcTier];
    return tierData[calcLink];
  };

  const currentRate = getRatePerLot();
  const estimatedIncomeUSD = calcLots * currentRate;
  const estimatedIncomeVND = estimatedIncomeUSD * 25400;

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <ShieldCheck className="w-4 h-4 text-[#00C2FF]" />
              <span>Chính Sách Backcom & Lộ Trình Thưởng Chính Thức VT Markets</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Cơ Chế Backcom &{' '}
              <span className="text-[#00C2FF]">
                Lộ Trình Thưởng Đối Tác
              </span>
            </h1>

            <p className="mt-4 max-w-3xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Minh bạch 100% cơ chế chi trả theo 4 cấp bậc <strong>Titan, Bạc, Vàng, Bạch Kim</strong> trên các loại link STP, MVP, EXP và bảng thưởng <strong>Trading Volume</strong> lên đến <strong>$200,000 USD</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0045DC] text-white font-black text-xs shadow-lg hover:scale-105 transition-all uppercase tracking-wider cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Đăng Ký Làm Đối Tác IB VT Markets</span>
              </a>
              <Link
                href="/rewards"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#08152B] hover:bg-[#0b1d3a] border border-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                <span>Xem Lộ Trình VT Rewards</span>
                <ArrowRight className="w-4 h-4 text-[#00C2FF]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tab Selector */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-6 sm:mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {[
              { id: 'backcom-matrix', label: '1. CƠ CHẾ BACKCOM', sub: 'Theo cấp bậc & link' },
              { id: 'volume-rewards', label: '2. THƯỞNG VOLUME', sub: 'Mốc lên đến $200k' },
              { id: 'tier-guide', label: '3. ĐỊNH NGHĨA CẤP BẬC', sub: 'Quyền lợi & Thăng tiến' },
              { id: 'calc', label: '4. TÍNH DỰ PHÓNG', sub: 'Ước tính tự động' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#08152B] border-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.2)]'
                    : 'bg-[#050D1A] border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className={`font-black text-xs sm:text-sm ${activeTab === tab.id ? 'text-[#00C2FF]' : 'text-white'}`}>
                  {tab.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{tab.sub}</div>
              </button>
            ))}
          </div>

          {/* TAB 1: BẢNG CƠ CHẾ BACKCOM THEO CẤP BẬC & LOẠI LINK */}
          {activeTab === 'backcom-matrix' && (
            <div className="mt-6 sm:mt-8 bg-[#050D1A] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800">
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bảng Chuẩn Chính Thức VT Markets</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Cơ Chế Chi Trả Backcom Theo Cấp Bậc & Loại Link</h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Đơn vị chi trả: <strong>USD / Lot</strong>. Tự động chi trả trực tiếp vào tài khoản giao dịch.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-[#00C2FF]/10 text-[#00C2FF] font-bold text-xs border border-[#00C2FF]/20">
                    Thanh toán tự động 24/7
                  </span>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#020712]">
                      <th className="p-4 text-xs font-black text-slate-300 uppercase tracking-wider">CẤP BẬC</th>
                      <th className="p-4 text-center text-xs font-black text-[#00C2FF] uppercase tracking-wider bg-[#00C2FF]/5 border-x border-slate-800">
                        LINK STP<br /><span className="text-[10px] text-slate-400 font-normal">(Spread 17)</span>
                      </th>
                      <th className="p-4 text-center text-xs font-black text-white uppercase tracking-wider border-r border-slate-800">
                        LINK MVP<br /><span className="text-[10px] text-slate-400 font-normal">(Spread 22)</span>
                      </th>
                      <th className="p-4 text-center text-xs font-black text-white uppercase tracking-wider border-r border-slate-800">
                        LINK EXP<br /><span className="text-[10px] text-slate-400 font-normal">(Spread 27)</span>
                      </th>
                      <th className="p-4 text-center text-xs font-black text-slate-300 uppercase tracking-wider border-r border-slate-800">
                        Yêu cầu Net/tháng
                      </th>
                      <th className="p-4 text-center text-xs font-black text-slate-300 uppercase tracking-wider">
                        Yêu cầu Lot/tháng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm font-bold">
                    {BACKCOM_MATRIX.map((row) => (
                      <tr 
                        key={row.tier}
                        className={`transition-colors ${
                          row.isTop 
                            ? 'bg-[#08152B]/60 hover:bg-[#08152B]' 
                            : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Tier Column */}
                        <td className="p-4.5">
                          <div className="flex items-center gap-2">
                            <span className={`font-black text-base ${row.isTop ? 'text-[#00C2FF]' : 'text-white'}`}>
                              {row.tier}
                            </span>
                            {row.sub && (
                              <span className="text-xs text-amber-400 font-semibold">{row.sub}</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block font-normal">{row.badge}</span>
                        </td>

                        {/* Link STP */}
                        <td className="p-4.5 text-center bg-[#00C2FF]/5 border-x border-slate-800 font-black text-lg text-[#00C2FF]">
                          ${row.stp} <span className="text-xs text-slate-400 font-normal">/ lot</span>
                        </td>

                        {/* Link MVP */}
                        <td className="p-4.5 text-center border-r border-slate-800 font-black text-lg text-white">
                          ${row.mvp} <span className="text-xs text-slate-400 font-normal">/ lot</span>
                        </td>

                        {/* Link EXP */}
                        <td className="p-4.5 text-center border-r border-slate-800 font-black text-lg text-white">
                          ${row.exp} <span className="text-xs text-slate-400 font-normal">/ lot</span>
                        </td>

                        {/* Req Net */}
                        <td className="p-4.5 text-center border-r border-slate-800 font-mono text-slate-200">
                          {row.reqNet}
                        </td>

                        {/* Req Lot */}
                        <td className="p-4.5 text-center font-mono text-[#00C2FF]">
                          {row.reqLot} Lots
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footnote */}
              <div className="mt-6 p-4 rounded-2xl bg-[#020712] border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
                <Info className="w-4 h-4 text-[#00C2FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Điều kiện duy trì & thăng cấp:</strong> Để thăng tiến cấp bậc, bạn cần đạt được các yêu cầu doanh số Net và Lot tối thiểu trong <strong>liên tiếp 3 tháng</strong>.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LỘ TRÌNH THƯỞNG TRADING VOLUME CHO BẠCH KIM */}
          {activeTab === 'volume-rewards' && (
            <div className="mt-8 bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Chính Sách Thưởng Khối Lượng Dành Riêng Cho Bạch Kim</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Lộ Trình Thưởng Trading Volume Bạch Kim</h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Phần thưởng tiền mặt cộng dồn trực tiếp khi đạt từng mốc khối lượng giao dịch quy đổi.</p>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Mức thưởng tối đa:</div>
                  <div className="text-xl font-black text-[#00C2FF]">$200,000 USD</div>
                </div>
              </div>

              {/* Formula Callout */}
              <div className="my-6 p-4 rounded-2xl bg-[#08152B] border border-[#00C2FF]/30 text-xs text-slate-300">
                <span className="font-bold text-[#00C2FF] uppercase tracking-wider block mb-1">Công thức tính Trading Volume:</span>
                <code className="font-mono text-white text-sm bg-[#020712] px-3 py-1.5 rounded-lg border border-slate-800 block mt-1">
                  Trading Volume = Số lot × Kích thước hợp đồng × (Giá mở + Giá đóng)
                </code>
              </div>

              {/* Volume Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VOLUME_REWARDS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border flex items-center justify-between transition-all ${
                      item.isMax
                        ? 'bg-gradient-to-r from-[#00C2FF]/20 to-[#0052FF]/20 border-[#00C2FF] shadow-[0_0_30px_rgba(0,194,255,0.25)] col-span-1 md:col-span-2 lg:col-span-3'
                        : 'bg-[#020712] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Mốc Khối Lượng (Volume)</div>
                      <div className="text-base font-black text-white mt-0.5">{item.volumeLabel}</div>
                      <div className="text-[11px] font-mono text-slate-400">{item.volume} $</div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Thưởng Bạch Kim</div>
                      <div className={`text-2xl font-black ${item.isMax ? 'text-[#00C2FF]' : 'text-[#00C2FF]'}`}>
                        {item.rewardLabel}
                      </div>
                      {item.isMax && (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#00C2FF] text-slate-950 font-black text-[9px] uppercase tracking-wider mt-1">
                          👑 MỐC CAO NHẤT
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ĐỊNH NGHĨA CÁC CẤP BẬC */}
          {activeTab === 'tier-guide' && (
            <div className="mt-8 bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="pb-6 border-b border-slate-800">
                <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Quy Định & Cơ Cấu Phân Cấp</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Định Nghĩa Các Cấp Bậc Đối Tác VT Markets</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Kim Cương */}
                <div className="p-6 rounded-2xl bg-[#08152B] border border-[#00C2FF]/40 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-2 rounded-xl bg-[#00C2FF]/20 text-[#00C2FF]">
                      <Star className="w-5 h-5 fill-[#00C2FF]" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white">Kim Cương (Diamond)</h3>
                      <span className="text-xs text-[#00C2FF] font-bold">Cấp Bậc Tối Cao</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Là cấp bậc cao nhất hiện nay, dành cho các IB lớn có cộng đồng hoặc doanh số lớn. <strong>Chỉ có Kim Cương mới set up được cho Bạch Kim nhận chính sách thưởng.</strong>
                  </p>
                </div>

                {/* 2. Bạch Kim */}
                <div className="p-6 rounded-2xl bg-[#08152B] border border-[#00C2FF]/40 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-2 rounded-xl bg-[#0052FF]/30 text-white">
                      <Award className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white">Bạch Kim (Platinum)</h3>
                      <span className="text-xs text-[#00C2FF] font-bold">Cấp Nhận Thưởng Volume</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Là cấp bậc duy nhất được backcom full cho khách lên đến <strong>40%</strong>, đồng thời cũng là cấp bậc duy nhất được thưởng thêm chính sách từ <strong>Trading Volume</strong> (lên đến $200,000 USD).
                  </p>
                </div>

                {/* 3. Vàng */}
                <div className="p-6 rounded-2xl bg-[#020712] border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Zap className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white">Vàng (Gold)</h3>
                      <span className="text-xs text-amber-400 font-bold">Khách Hàng Tiềm Năng (40% Spread)</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Là khách hàng có tiềm năng được Bạch Kim tin tưởng backcom full giúp tối ưu hóa lợi nhuận và giao dịch. Vàng có thể giới thiệu bạn bè để nhận chênh lệch hoa hồng trên việc tư vấn và hỗ trợ bạn bè giao dịch với cấp bậc <strong>Bạc</strong> và <strong>Titan</strong>.
                  </p>
                </div>

                {/* 4. Quy tắc thăng tiến */}
                <div className="p-6 rounded-2xl bg-[#020712] border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-2 rounded-xl bg-slate-800 text-slate-300">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white">Điều Kiện Thăng Tiến</h3>
                      <span className="text-xs text-slate-400 font-bold">Đánh Giá Định Kỳ</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Để thăng tiến cấp bậc, đối tác cần đạt được các yêu cầu doanh số <strong>Net nạp</strong> và <strong>Lot giao dịch tối thiểu</strong> trong <strong>liên tiếp 3 tháng</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MÁY TÍNH DỰ PHÓNG HOA HỒNG */}
          {activeTab === 'calc' && (
            <div className="mt-8 bg-[#050D1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="pb-6 border-b border-slate-800">
                <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Công Cụ Tính Hoa Hồng Tự Động</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Ước Tính Thu Nhập Backcom Hàng Tháng</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Select Tier */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-2">1. Chọn Cấp Bậc Của Bạn:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'titan', label: 'Titan' },
                        { id: 'silver', label: 'Bạc' },
                        { id: 'gold', label: 'Vàng (40%)' },
                        { id: 'platinum', label: 'Bạch Kim' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setCalcTier(t.id as any)}
                          className={`py-3 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            calcTier === t.id
                              ? 'bg-[#00C2FF] text-slate-950 shadow-md'
                              : 'bg-[#020712] border border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Link Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-2">2. Chọn Loại Link:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'stp', label: 'LINK STP (Spread 17)' },
                        { id: 'mvp', label: 'LINK MVP (Spread 22)' },
                        { id: 'exp', label: 'LINK EXP (Spread 27)' }
                      ].map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setCalcLink(l.id as any)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            calcLink === l.id
                              ? 'bg-[#0052FF] text-white shadow-md'
                              : 'bg-[#020712] border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lot Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-300 uppercase">3. Khối Lượng Giao Dịch / Tháng:</label>
                      <span className="font-mono font-black text-xl text-[#00C2FF]">{calcLots} Lots</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={3000}
                      step={10}
                      value={calcLots}
                      onChange={(e) => setCalcLots(Number(e.target.value))}
                      className="w-full h-2.5 bg-[#020712] rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>10 Lots</span>
                      <span>500 Lots</span>
                      <span>1,000 Lots</span>
                      <span>3,000 Lots</span>
                    </div>
                  </div>
                </div>

                {/* Output Card */}
                <div className="lg:col-span-5 bg-[#08152B] border border-[#00C2FF]/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Mức Hoàn Phí Tương Ứng:
                  </span>
                  <div className="text-2xl font-black text-[#00C2FF] mt-1">
                    ${currentRate} <span className="text-xs text-slate-300 font-normal">/ lot</span>
                  </div>

                  <div className="my-6 pt-6 border-t border-slate-700/60">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                      Ước Tính Thu Nhập Hoa Hồng:
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                      ${estimatedIncomeUSD.toLocaleString()}
                    </div>
                    <div className="text-sm font-bold text-[#00C2FF] mt-1">
                      ≈ {Math.round(estimatedIncomeVND).toLocaleString('vi-VN')} VNĐ
                    </div>
                  </div>

                  <a
                    href="https://www.vtmarkets.com/get-trading/?affid=8421818926"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Kích Hoạt Tài Khoản Nhận Mức Này</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
