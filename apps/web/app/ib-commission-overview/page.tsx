import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";

const ibBrokers = [
  {
    name: "Dupoin",
    slug: "dupoin",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KNKNVFQ3XNQ4JNXTJP154PWK.webp",
    rating: "4.5",
    trustBadge: "Mới",
    trustClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$9", fx: "$3.5" },
      { name: "Premium Level 2", gold: "$10", fx: "$4.5" },
      { name: "Premium Level 3", gold: "$11", fx: "$5.5" },
      { name: "VIP Partner", gold: "$12", fx: "$6.5", isTop: true }
    ]
  },
  {
    name: "EC Markets",
    slug: "ec-markets",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4T0306DMGXZC7W44WKZ4PV.webp",
    rating: "4.5",
    trustBadge: "Khá",
    trustClass: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$16", fx: "$5" },
      { name: "Premium Level 2", gold: "$17", fx: "$6" },
      { name: "Premium Level 3", gold: "$18", fx: "$7" },
      { name: "VIP Partner", gold: "$19", fx: "$8", isTop: true }
    ]
  },
  {
    name: "Moneta Markets",
    slug: "moneta-markets",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJA5TDGZAN3XD88N37TM3WZQ.webp",
    rating: "4.5",
    trustBadge: "Khá",
    trustClass: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$5", fx: "$5" },
      { name: "Premium Level 2", gold: "$5.5", fx: "$5.5" },
      { name: "Premium Level 3", gold: "$6", fx: "$6" },
      { name: "VIP Partner", gold: "$6.5", fx: "$6.5", isTop: true }
    ]
  },
  {
    name: "DBG Markets",
    slug: "dbg-markets",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJPVKRJ7Y08CHM2R811FECF8.webp",
    rating: "4.4",
    trustBadge: "Khá",
    trustClass: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$10", fx: "$4" },
      { name: "Premium Level 2", gold: "$12", fx: "$5" },
      { name: "Premium Level 3", gold: "$14", fx: "$6", isTop: true },
      { name: "VIP Partner", gold: "$16", fx: "$6" }
    ]
  },
  {
    name: "Decode FX",
    slug: "decode-fx",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJRT63W817Z9E23DS8VB46F4.webp",
    rating: "4.4",
    trustBadge: "Khá",
    trustClass: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$2", fx: "$2" },
      { name: "Premium Level 2", gold: "$3", fx: "$3" },
      { name: "Premium Level 3", gold: "$3", fx: "$3" },
      { name: "VIP Partner", gold: "$4", fx: "$4", isTop: true }
    ]
  },
  {
    name: "PU Prime",
    slug: "pu-prime",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SDF4FPJT10V0NK9AYY42E.webp",
    rating: "4.2",
    trustBadge: "Khá",
    trustClass: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30",
    type: "Rebate",
    mechanisms: [
      { name: "Premium Level 1", gold: "$8", fx: "$4" },
      { name: "Premium Level 2", gold: "$9", fx: "$5" },
      { name: "Premium Level 3", gold: "$10", fx: "$6" },
      { name: "VIP Partner", gold: "$11", fx: "$7", isTop: true }
    ]
  }
];

interface SearchParams {
  commission_type?: string;
  q?: string;
}

export default async function IBCommissionOverviewPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentCommType = resolvedSearchParams?.commission_type || "rebate";

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
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              🎯 Cơ chế IB minh bạch
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Bảng tổng hợp cơ chế IB &amp; Affiliate
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
              Trang này tổng hợp toàn bộ cơ chế hoa hồng HieuNTHUB đang đàm phán được với các broker đối tác.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="rounded border border-white/10 bg-white/[0.03] p-5">
                <div className="text-3xl md:text-4xl font-extrabold text-orange-300">15</div>
                <div className="text-xs text-zinc-500 mt-1">Brokers</div>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.03] p-5">
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-300">46</div>
                <div className="text-xs text-zinc-500 mt-1">Mechanisms</div>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.03] p-5">
                <div className="text-3xl md:text-4xl font-extrabold text-amber-300">4</div>
                <div className="text-xs text-zinc-500 mt-1">Commission types</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">

          {/* Collapsible Welcome Letter */}
          <details className="rounded border border-white/10 bg-white/[0.03] mb-8 group">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 hover:bg-white/[0.02] transition rounded select-none">
              <span className="font-semibold text-white">📩 Thư ngỏ từ HieuNTHUB</span>
              <svg className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 text-sm text-zinc-400 leading-relaxed border-t border-white/5 mt-2">
              <p className="font-bold text-white mb-2">Kính gửi Quý Đối Tác,</p>
              <p className="mb-4">Trang này tổng hợp toàn bộ cơ chế hoa hồng HieuNTHUB đang đàm phán được với các broker đối tác, theo 2 mô hình:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300">
                <li>Premium Level × Net/tháng — thưởng tăng theo doanh số Net Deposit hàng tháng (Vantage, GTCFX, EC Markets, DBG, ...)</li>
                <li>Tier-based Plan × Lot volume — thưởng tăng theo khối lượng lot giao dịch (Thinkmarkets, ...)</li>
              </ul>
              <p className="mb-4">Bấm trực tiếp vào từng cơ chế để xem file PDF chi tiết.</p>
              <p className="mb-2">Nếu Quý Đối Tác đạt volume cao và cần điều khoản riêng, dùng nút "Yêu cầu cơ chế cao hơn" cuối trang.</p>
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="font-bold text-white">Trân trọng,</p>
                <p className="text-orange-400 font-semibold">Đội ngũ HieuNTHUB</p>
              </div>
            </div>
          </details>

          {/* Filters Bar */}
          <section className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                <Link
                  href="/ib-commission-overview?commission_type=rebate"
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${currentCommType === "rebate"
                      ? "bg-orange-500 text-zinc-950"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300"
                    }`}
                >
                  Rebate
                </Link>
                <Link
                  href="/ib-commission-overview?commission_type=revshare"
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${currentCommType === "revshare"
                      ? "bg-orange-500 text-zinc-950"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300"
                    }`}
                >
                  RevShare
                </Link>
                <Link
                  href="/ib-commission-overview?commission_type=cpa"
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${currentCommType === "cpa"
                      ? "bg-orange-500 text-zinc-950"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300"
                    }`}
                >
                  CPA
                </Link>
                <Link
                  href="/ib-commission-overview?commission_type=hybrid"
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${currentCommType === "hybrid"
                      ? "bg-orange-500 text-zinc-950"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-orange-300"
                    }`}
                >
                  Hybrid
                </Link>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-2.5 lg:w-80 focus-within:border-orange-400/50 transition">
                <svg className="h-4 w-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="search" placeholder="Tìm broker..." className="flex-1 bg-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-500" />
              </div>
            </div>
          </section>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ibBrokers.map((broker, idx) => (
              <article key={idx} className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 transition p-6 flex flex-col justify-between">

                {/* head */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img src={broker.logo} alt={broker.name} className="h-12 w-12 rounded object-cover shrink-0" />
                      <div>
                        <h3 className="font-extrabold text-white text-base truncate max-w-[140px]">{broker.name}</h3>
                        <div className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                          <span>★</span>
                          <span className="text-zinc-300 font-bold">{broker.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${broker.trustClass}`}>
                        {broker.trustBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[9px] font-extrabold uppercase tracking-wider">
                        {broker.type}
                      </span>
                    </div>
                  </div>

                  {/* mechanisms list */}
                  <ul className="space-y-1.5 mt-4">
                    {broker.mechanisms.map((mech, mIdx) => (
                      <li key={mIdx} className={`rounded border transition-all hover:bg-white/5 ${mech.isTop
                          ? "border-orange-500/20 bg-orange-500/[0.03] hover:border-orange-500/40"
                          : "border-white/5 bg-white/[0.02]"
                        }`}>
                        <Link href={`/mechanisms/${broker.slug}/${currentCommType}/${mech.name.toLowerCase().replace(/ /g, "-")}`} className="flex items-center justify-between p-3 text-xs">
                          <span className="font-bold text-zinc-300">{mech.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-200">
                              <strong className="text-orange-400">{mech.gold}</strong> Gold
                            </span>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-200">
                              <strong className="text-emerald-400">{mech.fx}</strong> FX
                            </span>
                            <svg className="h-3 w-3 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"></path></svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* foot review button */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link href={`/brokers/danh-gia-${broker.slug}`} className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-orange-300 transition font-bold">
                    <span>Trang đánh giá broker</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
