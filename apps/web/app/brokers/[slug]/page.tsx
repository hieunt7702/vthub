import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dynamic database of broker review metrics
const brokerReviewsDb: Record<string, any> = {
  "ec-markets": {
    name: "EC Markets",
    slug: "ec-markets",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4T0306DMGXZC7W44WKZ4PV.webp",
    rating: "4.5",
    stars: 4.5,
    trustStatus: "Trust trung bình",
    trustLevel: "3/5",
    trustBarCount: 3,
    licensesCount: 1,
    verifiedDate: "02/2026",
    foundedYear: "2012",
    yearsActive: "14 năm",
    maxLeverage: "1:1000",
    withdrawalTime: "1–2 business days",
    region: "Global",
    executionModel: "STP",
    minDeposit: "$50",
    hasRebate: true,
    hasSwapFree: false,
    pros: [
      "High leverage up to 1:1000",
      "STP execution",
      "Low minimum deposit ($50)",
      "Crypto trading supported",
      "Raw/ECN account available"
    ],
    cons: [
      "Offshore regulation only (FSC)",
      "Limited brand recognition",
      "No swap-free option"
    ],
    platforms: ["MT4", "MT5"],
    accounts: ["Standard", "Raw / ECN"],
    products: ["Forex", "Gold & Metals", "Crypto"],
    licenses: [
      {
        shortCode: "FSC",
        name: "Ủy ban Dịch vụ Tài chính Mauritius",
        regulatorLogo: "https://hieunthub.co/uploads/regulators/01KJ6QTNP8KSR86JARXZDW33V6.webp",
        regulatorSite: "https://www.fscmauritius.org",
        status: "Đang giám sát",
        code: "GB21200130",
        entity: "EC Markets Limited",
        country: "Global"
      }
    ],
    mechanisms: [
      { name: "Premium Level 1", tier: "PRO" },
      { name: "Premium Level 2", tier: "PRO" },
      { name: "Premium Level 3", tier: "PRO" },
      { name: "VIP Partner", tier: "VIP" }
    ],
    faqs: [
      { q: "Đòn bẩy tối đa tại EC Markets là bao nhiêu?", a: "Đòn bẩy tối đa tại EC Markets là 1:1000." },
      { q: "Nạp tối thiểu tại EC Markets là bao nhiêu?", a: "Mức nạp tối thiểu tại EC Markets là $50." },
      { q: "EC Markets có được cấp phép không?", a: "Có. Giấy phép: FSC." },
      { q: "EC Markets hỗ trợ những nền tảng giao dịch nào?", a: "Các nền tảng: MT4, MT5." },
      { q: "Thời gian xử lý rút tiền tại EC Markets là bao lâu?", a: "Thời gian rút tiền tại EC Markets: 1–2 ngày làm việc." }
    ],
    similar: [
      { name: "Markets4you", slug: "markets4you", rating: "3.9/5", logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SCZ8E8R3DN38KJ2858JV7.webp" },
      { name: "STARTRADER", slug: "startrader", rating: "4.1/5", logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4TBG5PYYCGC5M9ZS0RSNYC.webp" }
    ]
  }
};

export default async function BrokerDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const slug = rawSlug.startsWith("danh-gia-") ? rawSlug.substring(9) : rawSlug;

  const broker = brokerReviewsDb[slug] || brokerReviewsDb["ec-markets"]; // Fallback to EC Markets if not found

  if (!broker) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">

        {/* Detail Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-10 lg:pb-14">
            {/* Breadcrumbs */}
            <nav className="text-xs text-zinc-500 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
              <span>›</span>
              <Link href="/brokers" className="hover:text-orange-300 transition">Sàn giao dịch</Link>
              <span>›</span>
              <span className="text-zinc-300 truncate">{broker.name}</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

              {/* Left Column info */}
              <div className="lg:col-span-7">
                <div className="flex items-start gap-5 mb-5">
                  <img src={broker.logo} alt={broker.name} className="h-20 w-20 rounded object-cover shrink-0 shadow-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 px-2.5 py-0.5 text-xs font-semibold">
                        <span>⚠️</span>
                        {broker.trustStatus}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">{broker.name}</h1>
                    <div className="mt-3 flex items-center gap-4 text-sm flex-wrap text-zinc-400">
                      <div className="flex items-center gap-1.5" aria-label={`${broker.rating} / 5`}>
                        <span className="inline-flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <svg key={idx} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M10 1.5l2.7 5.46 6.03.88-4.36 4.25 1.03 6L10 15.27 4.6 18.09l1.03-6L1.27 7.84l6.03-.88L10 1.5z" />
                            </svg>
                          ))}
                        </span>
                        <span className="font-extrabold text-white text-base">{broker.rating}</span>
                        <span className="text-zinc-500 text-xs">/ 5</span>
                      </div>
                      <span className="text-zinc-700">·</span>
                      <span><strong className="text-white">{broker.licensesCount}</strong> giấy phép</span>
                      <span className="text-zinc-700">·</span>
                      <span className="text-zinc-500">Verified <strong className="text-emerald-300">{broker.verifiedDate}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Regulator badges */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {broker.licenses.map((lic: any, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition hover:scale-105 cursor-pointer border-white/15 bg-white/[0.06] text-zinc-200 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200"
                    >
                      <img src={lic.regulatorLogo} alt={lic.shortCode} className="h-3.5 w-3.5 object-contain shrink-0" loading="lazy" />
                      <span>{lic.shortCode}</span>
                      <span className="text-[10px] opacity-60">· {lic.country}</span>
                    </button>
                  ))}
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">📅</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Năm thành lập</span>
                    </div>
                    <div className="font-extrabold text-blue-300 text-base truncate">{broker.foundedYear}</div>
                    {broker.yearsActive && <div className="text-[10px] text-zinc-500 mt-0.5">{broker.yearsActive}</div>}
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">⚡</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Max leverage</span>
                    </div>
                    <div className="font-extrabold text-amber-300 text-base truncate">{broker.maxLeverage}</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">⏱️</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Rút tiền</span>
                    </div>
                    <div className="font-extrabold text-purple-300 text-base truncate">{broker.withdrawalTime}</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">🌍</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Khu vực</span>
                    </div>
                    <div className="font-extrabold text-rose-300 text-base truncate">{broker.region}</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">⚖️</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Khớp lệnh</span>
                    </div>
                    <div className="font-extrabold text-cyan-300 text-base truncate">{broker.executionModel}</div>
                  </div>
                </div>

                {/* Card footer options */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="button" className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 px-4 py-2 text-sm font-semibold text-zinc-300 transition">So sánh</button>
                  <Link href="/brokers/so-sanh" className="text-sm text-zinc-400 hover:text-orange-300 transition">
                    Xem trang so sánh →
                  </Link>
                </div>
              </div>

              {/* Right Column Sticky CTA Card */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 rounded border border-orange-400/30 bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent p-5 md:p-6 shadow-2xl shadow-orange-500/10">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-400/15 border border-orange-400/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-orange-300 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                        MỞ TÀI KHOẢN
                      </div>
                      <h3 className="mt-2 text-lg md:text-xl font-extrabold text-white truncate">Đăng ký {broker.name}</h3>
                    </div>
                    <img src={broker.logo} alt="" className="h-12 w-12 rounded object-cover shrink-0" />
                  </div>

                  {broker.hasRebate && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-400/25 px-2 py-1 text-[11px] text-emerald-200 font-semibold">
                        <span className="text-emerald-400">✓</span>
                        <span>Rebate</span>
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-1.5 mb-4 rounded border border-white/10 bg-white/[0.03] p-1.5">
                    <div className="rounded px-2.5 py-2 text-center">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Min</div>
                      <div className="font-extrabold text-white text-sm tabular-nums truncate">{broker.minDeposit}</div>
                    </div>
                    <div className="rounded px-2.5 py-2 text-center border-x border-white/5">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Đòn bẩy</div>
                      <div className="font-extrabold text-white text-sm tabular-nums truncate">{broker.maxLeverage}</div>
                    </div>
                    <div className="rounded px-2.5 py-2 text-center">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">XAU</div>
                      <div className="font-extrabold text-white text-sm tabular-nums truncate">—</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] uppercase tracking-[0.12em] text-orange-300/80 font-bold">Link khách lẻ</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-orange-400/30 to-transparent"></div>
                      </div>
                      <div className="space-y-2">
                        <a href="https://www.ecmarkets.com/" target="_blank" rel="nofollow noopener" className="flex items-center justify-between gap-3 rounded px-4 py-3 transition group bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 font-extrabold shadow-lg shadow-orange-500/25 hover:from-orange-300 hover:to-amber-500">
                          <span className="text-sm truncate">Primary Register Link</span>
                          <svg className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                        <a href="https://www.ecmarkets.com/" target="_blank" rel="nofollow noopener" className="flex items-center justify-between gap-3 rounded px-4 py-3 transition group bg-white/[0.04] border border-white/10 text-zinc-100 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200 font-semibold">
                          <span className="text-sm truncate">Standard Link 2</span>
                          <svg className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                      <span>HH verified</span>
                    </div>
                    <span className="text-zinc-700">·</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" /></svg>
                      <span>Hỗ trợ 24/7</span>
                    </div>
                    <span className="text-zinc-700">·</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" /></svg>
                      <span>Free</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] text-zinc-500 leading-relaxed flex items-start gap-1.5">
                    <svg className="h-3 w-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" /></svg>
                    <span>Trading có rủi ro. Tự nghiên cứu trước khi nạp tiền. Không khuyến nghị đầu tư.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pros & Cons Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">⚖️ ĐÁNH GIÁ NHANH</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Ưu &amp; nhược điểm</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded border border-emerald-400/20 bg-gradient-to-b from-emerald-500/10 to-emerald-500/[0.02] p-6">
                <h3 className="text-base font-extrabold text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded bg-emerald-500/20 border border-emerald-400/30">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  </span>
                  Ưu điểm
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-200">
                  {broker.pros.map((pro: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 shrink-0 font-bold">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded border border-rose-400/20 bg-gradient-to-b from-rose-500/10 to-rose-500/[0.02] p-6">
                <h3 className="text-base font-extrabold text-rose-300 mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded bg-rose-500/20 border border-rose-400/30">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" /></svg>
                  </span>
                  Nhược điểm
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-200">
                  {broker.cons.map((con: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-rose-400 mt-0.5 shrink-0 font-bold">−</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Conditions Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">📊 GIAO DỊCH</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Điều kiện giao dịch</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                <div className="text-[10px] uppercase tracking-wider text-blue-300 font-bold mb-3 flex items-center gap-1.5">📱 Nền tảng</div>
                <div className="flex flex-wrap gap-2">
                  {broker.platforms.map((plat: string, idx: number) => (
                    <span key={idx} className="rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 px-3 py-1 text-xs font-semibold">{plat}</span>
                  ))}
                </div>
              </div>

              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                <div className="text-[10px] uppercase tracking-wider text-purple-300 font-bold mb-3 flex items-center gap-1.5">👤 Loại tài khoản</div>
                <div className="flex flex-wrap gap-2">
                  {broker.accounts.map((acc: string, idx: number) => (
                    <span key={idx} className="rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-200 px-3 py-1 text-xs font-semibold">{acc}</span>
                  ))}
                </div>
              </div>

              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-3 flex items-center gap-1.5">💎 Sản phẩm</div>
                <div className="flex flex-wrap gap-2">
                  {broker.products.map((prod: string, idx: number) => (
                    <span key={idx} className="rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-200 px-3 py-1 text-xs font-semibold">{prod}</span>
                  ))}
                </div>
              </div>

              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Mô hình khớp lệnh</div>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-300">{broker.executionModel}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Tiers Section */}
        <section id="commission-tiers" className="border-b border-white/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">📄 CƠ CHẾ CÔNG KHAI</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Cơ chế hoa hồng {broker.name}</h2>
              <p className="text-sm text-zinc-400 mt-1">Xem chi tiết spread, rebate, điều kiện duy trì từng tier.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {broker.mechanisms.map((mech: any, idx: number) => (
                <div key={idx} className="group text-left rounded border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-amber-500/[0.02] hover:border-amber-400/50 hover:shadow-lg hover:shadow-orange-500/10 transition p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded bg-amber-500/15 border border-amber-400/30 text-amber-300">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${mech.tier === "VIP" ? "bg-orange-500 text-zinc-950" : "bg-amber-500/20 border border-amber-400/40 text-amber-300"
                        }`}>{mech.tier}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Tier</div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-orange-300 transition mb-3">{mech.name}</h3>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs mt-4">
                    <span className="text-zinc-400">Xem bản đầy đủ</span>
                    <span className="inline-flex items-center gap-1 text-orange-300 font-bold group-hover:translate-x-0.5 transition">
                      Xem file PDF
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" /></svg>
              Cơ chế cao hơn các tier mặc định?
              <Link href="/contact" className="text-orange-300 hover:text-orange-200 font-semibold">
                Yêu cầu cơ chế riêng →
              </Link>
            </div>
          </div>
        </section>

        {/* Safety & Trust Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">🛡️ AN TOÀN</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Giấy phép &amp; độ tin cậy</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded border border-amber-400/20 bg-gradient-to-b from-amber-500/10 to-amber-500/[0.02] p-6">
                <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-2">Độ tin cậy HH</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-3xl font-extrabold text-amber-200">{broker.trustLevel}</div>
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full ${idx < broker.trustBarCount ? "bg-amber-400" : "bg-white/10"
                        }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed mb-3">
                  Trust trung bình — Đánh giá dựa trên giấy phép Tier-1, lịch sử thanh khoản, audit độc lập của team HH.
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Tier-1</div>
                    <div className="font-extrabold text-emerald-300 text-lg">0</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Total</div>
                    <div className="font-extrabold text-white text-lg">{broker.licensesCount}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mb-2">Giấy phép ({broker.licensesCount})</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {broker.licenses.map((lic: any, idx: number) => (
                    <div key={idx} className="rounded border transition p-4 border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-orange-400/40">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded shrink-0 flex items-center justify-center bg-white/[0.04] backdrop-blur-sm p-1.5 overflow-hidden ring-1 ring-white/15">
                          <img src={lic.regulatorLogo} alt={lic.shortCode} className="h-full w-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-white text-sm">{lic.shortCode}</span>
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">{lic.status}</span>
                          </div>
                          <div className="text-xs text-zinc-400 truncate mt-1">{lic.name}</div>
                          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-zinc-500">
                            <span className="inline-flex items-center gap-1">📍 {lic.country}</span>
                            <span className="font-mono text-emerald-300/80">#{lic.code}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">❓ FAQ</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Câu hỏi thường gặp</h2>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {broker.faqs.map((faq: any, idx: number) => (
                <details key={idx} className="group rounded border border-white/10 bg-white/[0.03] hover:border-orange-400/30 transition overflow-hidden h-fit">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 px-5 py-4 font-semibold text-white hover:bg-white/[0.02] transition select-none">
                    <span className="leading-relaxed">{faq.q}</span>
                    <svg className="h-5 w-5 text-zinc-400 transition group-open:rotate-180 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Similar Brokers Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">🔗 CÓ THỂ BẠN QUAN TÂM</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Broker tương tự</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {broker.similar.map((sim: any, idx: number) => (
                <Link key={idx} href={`/brokers/danh-gia-${sim.slug}`} className="group rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 transition p-5 flex flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <img src={sim.logo} alt={sim.name} className="h-14 w-14 rounded object-cover shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-white text-base group-hover:text-orange-300 transition truncate">{sim.name}</h3>
                      <div className="text-xs text-amber-400 mt-0.5">★ {sim.rating}</div>
                    </div>
                    <svg className="h-4 w-4 text-zinc-500 group-hover:text-orange-300 group-hover:translate-x-0.5 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
