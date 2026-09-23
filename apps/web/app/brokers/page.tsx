import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";

const brokers = [
  {
    id: "24",
    name: "GTCFX",
    slug: "gtcfx",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJC1HBZDKDEMV3T7WCF03QBW.webp",
    rating: "4.3",
    stars: 4,
    topPick: true,
    sponsored: true,
    verified: true,
    licenses: [
      { name: "FCA", status: "high" },
      { name: "ASIC", status: "high" },
      { name: "VFSC", status: "normal" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: true
  },
  {
    id: "33",
    name: "Vantage",
    slug: "vantage",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KP2ZTF2WF63CXQGN8JQQ90HH.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: false,
    licenses: [
      { name: "ASIC", status: "high" },
      { name: "FCA", status: "high" },
      { name: "VFSC", status: "normal" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: true
  },
  {
    id: "19",
    name: "HFM",
    slug: "hfm",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SBN05D7JBA333SC0S2NG7.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: true,
    licenses: [
      { name: "FCA", status: "high" },
      { name: "CySEC", status: "high" },
      { name: "FSCA", status: "high" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: false
  },
  {
    id: "15",
    name: "TMGM",
    slug: "tmgm",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SNYTVW6J7FPCJEK0ZC2R8.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: true,
    licenses: [
      { name: "ASIC", status: "high" },
      { name: "VFSC", status: "normal" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: false
  },
  {
    id: "13",
    name: "Mitrade",
    slug: "mitrade",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4T4V0SC5NNTKVVZWK0PAC7.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: true,
    licenses: [
      { name: "ASIC", status: "high" },
      { name: "CySEC", status: "high" },
      { name: "CIMA", status: "high" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "Mobile App/Proprietary",
    rebate: false
  },
  {
    id: "11",
    name: "Axi",
    slug: "axi",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KHQZS599JZATCC6YP88TVDH0.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: true,
    licenses: [
      { name: "ASIC", status: "high" },
      { name: "FCA", status: "high" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: false
  },
  {
    id: "10",
    name: "Exness",
    slug: "exness",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SCJ88E286DJM4DC19B8QH.webp",
    rating: "4.7",
    stars: 4.5,
    topPick: false,
    sponsored: false,
    verified: true,
    licenses: [
      { name: "FCA", status: "high" },
      { name: "CySEC", status: "high" }
    ],
    minDeposit: "Free",
    leverage: "—",
    platform: "MT4/MT5",
    rebate: true
  }
];

interface SearchParams {
  sort?: string;
  q?: string;
  rebate?: string;
  cpa?: string;
  xauusd?: string;
  regulated?: string;
}

export default async function BrokersPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentSort = resolvedSearchParams?.sort || "";

  let currentSortLabel = "Mặc định";
  if (currentSort === "rating") currentSortLabel = "Đánh giá cao nhất";
  else if (currentSort === "spread") currentSortLabel = "Spread thấp";
  else if (currentSort === "rebate") currentSortLabel = "Rebate cao";

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                29+ sàn forex được tuyển chọn
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Tất cả{" "}
                <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">sàn forex</span>
              </h1>
              <p className="mt-4 text-zinc-400 text-lg">
                Đánh giá độc lập từ team HH, không sponsor. Lọc theo spread, rebate, giấy phép.
              </p>

              {/* Search Form */}
              <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto" method="GET" action="/brokers">
                <div className="flex-1 flex items-center gap-3 rounded border border-white/10 bg-white/5 px-5 py-4 focus-within:border-orange-400/50 transition backdrop-blur">
                  <svg className="h-5 w-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input type="text" name="q" placeholder="Tìm FPG, Mitrade, Exness..." autoComplete="off" className="flex-1 bg-transparent placeholder:text-zinc-500 outline-none text-zinc-100" />
                </div>
                <button type="submit" className="rounded bg-gradient-to-r from-orange-400 to-amber-600 px-8 py-4 font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30 whitespace-nowrap">
                  Tìm sàn ngay →
                </button>
              </form>

              {/* Quick Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link href="/brokers?sort=spread" className="rounded-full px-3.5 py-1.5 text-xs transition border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300">
                  ⚡ Spread thấp
                </Link>
                <Link href="/brokers?rebate=1" className="rounded-full px-3.5 py-1.5 text-xs transition border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300">
                  💰 Rebate cao
                </Link>
                <Link href="/brokers?cpa=1" className="rounded-full px-3.5 py-1.5 text-xs transition border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300">
                  🚀 CPA Lifetime
                </Link>
                <Link href="/brokers?xauusd=1" className="rounded-full px-3.5 py-1.5 text-xs transition border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300">
                  🥇 XAUUSD
                </Link>
                <Link href="/brokers?regulated=1" className="rounded-full px-3.5 py-1.5 text-xs transition border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300">
                  🛡️ Có giấy phép
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Sorting header */}
        <section className="border-b border-white/5 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">
              <strong className="text-white">29</strong> sàn được tuyển chọn
            </div>

            {/* Custom Premium Dropdown */}
            <div className="flex items-center gap-2.5 relative">
              <span className="text-xs text-zinc-500 font-medium">Sắp xếp:</span>
              <details className="relative group text-left" data-hh-nav-dropdown="">
                <summary className="list-none cursor-pointer inline-flex items-center justify-between gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 outline-none hover:border-orange-500/30 hover:bg-white/[0.08] transition-all min-w-[160px] select-none shadow-lg shadow-black/10">
                  <span className="font-semibold text-zinc-100">{currentSortLabel}</span>
                  <svg className="h-4 w-4 text-zinc-400 transition group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>
                </summary>
                <div className="absolute right-0 top-full pt-2 z-50 min-w-[180px]">
                  <div className="rounded border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl p-1.5 flex flex-col gap-1">
                    <Link href="/brokers" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${!currentSort ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      Mặc định
                    </Link>
                    <Link href="/brokers?sort=rating" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentSort === 'rating' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      Đánh giá cao nhất
                    </Link>
                    <Link href="/brokers?sort=spread" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentSort === 'spread' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      Spread thấp
                    </Link>
                    <Link href="/brokers?sort=rebate" className={`rounded px-3.5 py-2.5 text-xs font-semibold transition text-left ${currentSort === 'rebate' ? 'bg-orange-500/20 text-orange-300 font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
                      Rebate cao
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Brokers Grid */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brokers.map((broker) => (
                <div
                  key={broker.id}
                  className={`broker-card group relative rounded border transition flex flex-col ${broker.topPick
                      ? "border-orange-400/40 bg-gradient-to-b from-orange-500/10 to-orange-500/[0.02] hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20"
                      : "border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/10"
                    }`}
                  data-broker-id={broker.id}
                  data-broker-name={broker.name}
                  data-broker-slug={broker.slug}
                >
                  {/* Badges */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                    {broker.topPick && (
                      <span className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider shadow-lg shadow-orange-500/40">
                        ⭐ TOP PICK
                      </span>
                    )}
                    {broker.sponsored && (
                      <span className="rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-zinc-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                        Sponsored
                      </span>
                    )}
                  </div>

                  <Link href={`/brokers/danh-gia-${broker.slug}`} className="flex-1 block p-5">
                    <div className="flex items-start gap-3">
                      <img
                        src={broker.logo}
                        alt={broker.name}
                        className={`h-14 w-14 rounded text-base object-cover shrink-0 ${broker.topPick ? "shadow-lg shadow-orange-500/30" : ""
                          }`}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="flex-1 min-w-0 mt-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-extrabold text-base text-white group-hover:text-orange-300 transition truncate">
                            {broker.name}
                          </h3>
                          {broker.verified && (
                            <svg className="h-3.5 w-3.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="verified">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, idx) => {
                              const starVal = idx + 1;
                              if (starVal <= Math.floor(Number(broker.rating))) {
                                return (
                                  <svg key={idx} className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 1.5l2.7 5.46 6.03.88-4.36 4.25 1.03 6L10 15.27 4.6 18.09l1.03-6L1.27 7.84l6.03-.88L10 1.5z" />
                                  </svg>
                                );
                              } else if (starVal - 0.5 === Number(broker.rating)) {
                                return (
                                  <svg key={idx} className="h-3 w-3 text-amber-400" viewBox="0 0 20 20">
                                    <defs>
                                      <linearGradient id={`hs-${broker.id}`} x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="50%" stopColor="currentColor" />
                                        <stop offset="50%" stopColor="transparent" />
                                      </linearGradient>
                                    </defs>
                                    <path d="M10 1.5l2.7 5.46 6.03.88-4.36 4.25 1.03 6L10 15.27 4.6 18.09l1.03-6L1.27 7.84l6.03-.88L10 1.5z" fill={`url(#hs-${broker.id})`} stroke="currentColor" strokeWidth="0.5" />
                                  </svg>
                                );
                              } else {
                                return (
                                  <svg key={idx} className="h-3 w-3 text-amber-400/30" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 1.5l2.7 5.46 6.03.88-4.36 4.25 1.03 6L10 15.27 4.6 18.09l1.03-6L1.27 7.84l6.03-.88L10 1.5z" />
                                  </svg>
                                );
                              }
                            })}
                          </span>
                          <span className="text-xs font-bold text-white tabular-nums">{broker.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Licenses */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {broker.licenses.map((lic, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${lic.status === "high"
                              ? "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300"
                              : "bg-white/[0.05] border border-white/10 text-zinc-400"
                            }`}
                        >
                          {lic.status === "high" && <span className="text-emerald-400">●</span>}
                          {lic.name}
                        </span>
                      ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-4 grid grid-cols-3 gap-1.5 rounded border border-white/10 bg-white/[0.02] p-1.5">
                      <div className="rounded px-2 py-1.5 text-center">
                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Min</div>
                        <div className="text-xs font-extrabold text-white tabular-nums truncate">{broker.minDeposit}</div>
                      </div>
                      <div className="rounded px-2 py-1.5 text-center border-x border-white/5">
                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Lev</div>
                        <div className="text-xs font-extrabold text-amber-300 tabular-nums truncate">{broker.leverage}</div>
                      </div>
                      <div className="rounded px-2 py-1.5 text-center">
                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Platform</div>
                        <div className="text-xs font-extrabold text-blue-300 truncate">{broker.platform}</div>
                      </div>
                    </div>

                    {/* Rebate Tag */}
                    {broker.rebate && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 border border-amber-400/30 text-amber-300 px-2 py-0.5 text-[10px] font-bold">
                          <span>Rebate</span>
                          <span className="text-amber-200">✓</span>
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Actions */}
                  <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                    <Link
                      href={`/brokers/danh-gia-${broker.slug}`}
                      className={`rounded px-3 py-2 text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${broker.topPick
                          ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 hover:from-orange-300 hover:to-amber-500 shadow-md shadow-orange-500/25"
                          : "border border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 text-zinc-200"
                        }`}
                    >
                      Xem chi tiết →
                    </Link>
                    <button
                      type="button"
                      data-action="compare"
                      className="rounded border border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 px-3 py-2 text-xs font-semibold text-zinc-400 transition flex items-center justify-center gap-1.5"
                    >
                      So sánh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
