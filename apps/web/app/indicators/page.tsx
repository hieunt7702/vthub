import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";

const indicators = [
  {
    name: "Moving Average Cross Pro",
    slug: "moving-average-cross-pro",
    badge: "Tham khảo",
    platform: "MetaTrader 5",
    category: "Xu hướng",
    platformColor: "bg-blue-500/15 text-blue-300",
    desc: "Chỉ báo cắt nhau giữa SMA 20 và EMA 50, tín hiệu vào lệnh tự động kèm cảnh báo âm thanh.",
    rating: "4.6",
    reviews: "1,245",
    author: "MetaQuotes"
  },
  {
    name: "RSI Divergence Hunter",
    slug: "rsi-divergence-hunter",
    badge: "Tham khảo",
    platform: "MetaTrader 5",
    category: "Dao động",
    platformColor: "bg-blue-500/15 text-blue-300",
    desc: "Phát hiện phân kỳ RSI tự động trên đa khung thời gian, báo điểm vào lệnh ngược xu hướng.",
    rating: "4.9",
    reviews: "847",
    author: "Mladen R."
  },
  {
    name: "Volume Profile Pro",
    slug: "volume-profile-pro",
    badge: "Tham khảo",
    platform: "MetaTrader 4",
    category: "Khối lượng",
    platformColor: "bg-cyan-500/15 text-cyan-300",
    desc: "Hiển thị volume theo giá thay vì theo thời gian, xác định vùng hỗ trợ kháng cự thật.",
    rating: "4.3",
    reviews: "2,104",
    author: "FXmillion"
  },
  {
    name: "SuperTrend Multi-TF",
    slug: "supertrend-multi-tf",
    badge: "Tham khảo",
    platform: "TradingView",
    category: "Xu hướng",
    platformColor: "bg-purple-500/15 text-purple-300",
    desc: "SuperTrend chuẩn ATR + multi-timeframe overlay, alert qua webhook tới Telegram.",
    rating: "4.8",
    reviews: "3,412",
    author: "LuxAlgo"
  },
  {
    name: "ATR Trailing Stop",
    slug: "atr-trailing-stop",
    badge: "Tham khảo",
    platform: "MetaTrader 5",
    category: "Xu hướng",
    platformColor: "bg-blue-500/15 text-blue-300",
    desc: "Trailing stop theo Average True Range, bảo vệ lợi nhuận động theo biến động thật.",
    rating: "4.5",
    reviews: "920",
    author: "EarnForex"
  }
];

interface SearchParams {
  category?: string;
  platform?: string;
}

export default async function IndicatorsPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentCategory = resolvedSearchParams?.category || "";
  const currentPlatform = resolvedSearchParams?.platform || "";

  let currentPlatformLabel = "Tất cả nền tảng";
  if (currentPlatform === "mt4") currentPlatformLabel = "MetaTrader 4";
  else if (currentPlatform === "mt5") currentPlatformLabel = "MetaTrader 5";
  else if (currentPlatform === "tradingview") currentPlatformLabel = "TradingView";
  else if (currentPlatform === "ctrader") currentPlatformLabel = "cTrader";

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              📊 5 chỉ báo được HH tuyển chọn
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Chỉ báo{" "}
              <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">MT4 / MT5 / TradingView</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
              Tổng hợp chỉ báo phổ biến nhất từ MetaTrader Market — kèm review của HieuNTHUB. Trader tự lựa chọn, tự kiểm thử, tự chịu trách nhiệm.
            </p>
          </div>
        </section>

        {/* Content Wrapper */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-zinc-100 mt-8">

          {/* Filters & Custom Premium Dropdown */}
          <section className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/indicators"
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${!currentCategory
                    ? "bg-orange-500 text-zinc-950"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                  }`}
              >
                Tất cả
              </Link>
              <Link
                href="/indicators?category=trend"
                className={`rounded-full px-4 py-1.5 text-sm transition ${currentCategory === "trend"
                    ? "bg-orange-500 text-zinc-950 font-semibold"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                  }`}
              >
                Xu hướng
                <span className="ml-1 text-xs opacity-70">3</span>
              </Link>
              <Link
                href="/indicators?category=oscillator"
                className={`rounded-full px-4 py-1.5 text-sm transition ${currentCategory === "oscillator"
                    ? "bg-orange-500 text-zinc-950 font-semibold"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                  }`}
              >
                Dao động
                <span className="ml-1 text-xs opacity-70">1</span>
              </Link>
              <Link
                href="/indicators?category=volume"
                className={`rounded-full px-4 py-1.5 text-sm transition ${currentCategory === "volume"
                    ? "bg-orange-500 text-zinc-950 font-semibold"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                  }`}
              >
                Khối lượng
                <span className="ml-1 text-xs opacity-70">1</span>
              </Link>
            </div>

            {/* Custom Platform Dropdown */}
            <div className="ml-auto relative">
              <details className="relative group text-left" data-hh-nav-dropdown="">
                <summary className="list-none cursor-pointer inline-flex items-center justify-between gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 outline-none hover:border-orange-500/30 hover:bg-white/[0.08] transition-all min-w-[180px] select-none shadow-lg shadow-black/10">
                  <span className="font-semibold text-zinc-100">{currentPlatformLabel}</span>
                  <svg className="h-4 w-4 text-zinc-400 transition group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>
                </summary>
                <div className="absolute right-0 top-full pt-2 z-50 min-w-[180px]">
                  <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl p-1.5 flex flex-col gap-1">
                    <Link href="/indicators" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${!currentPlatform ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      Tất cả nền tảng
                    </Link>
                    <Link href="/indicators?platform=mt4" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentPlatform === 'mt4' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      MetaTrader 4
                    </Link>
                    <Link href="/indicators?platform=mt5" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentPlatform === 'mt5' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      MetaTrader 5
                    </Link>
                    <Link href="/indicators?platform=tradingview" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentPlatform === 'tradingview' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      TradingView
                    </Link>
                    <Link href="/indicators?platform=ctrader" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentPlatform === 'ctrader' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      cTrader
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </section>

          {/* Indicators Grid */}
          <section className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {indicators.map((ind, index) => (
                <Link
                  key={index}
                  href={`/indicators/${ind.slug}`}
                  className="group relative overflow-hidden rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 transition hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-emerald-500/20 text-emerald-300">
                      {ind.badge}
                    </div>

                    {/* Graphic Box */}
                    <div className="mb-4 flex h-32 items-center justify-center rounded bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-zinc-900 border border-white/5 overflow-hidden">
                      <svg className="h-16 w-16 text-blue-400/60 transition group-hover:scale-105 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13l4-4 4 4 4-7 6 11" />
                      </svg>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                      <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${ind.platformColor}`}>
                        {ind.platform}
                      </span>
                      <span>•</span>
                      <span>{ind.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-white group-hover:text-orange-300 transition line-clamp-2">
                      {ind.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                      {ind.desc}
                    </p>
                  </div>

                  {/* Rating / Author */}
                  <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-zinc-300 font-semibold">{ind.rating}</span>
                      <span className="text-zinc-500">({ind.reviews})</span>
                    </div>
                    <span className="text-zinc-500 truncate max-w-[140px]">by {ind.author}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10"></div>
          </section>

          {/* Incoming section */}
          <section className="mt-12 mb-16 rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-3">
                  🚀 SẮP RA MẮT
                </div>
                <h3 className="text-2xl font-bold">Chỉ báo độc quyền HieuNTHUB</h3>
                <p className="mt-2 max-w-xl text-zinc-400">
                  HieuNTHUB đang phát triển bộ chỉ báo riêng tối ưu cho thị trường FX Việt Nam — cung cấp license + hỗ trợ 1-1.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
