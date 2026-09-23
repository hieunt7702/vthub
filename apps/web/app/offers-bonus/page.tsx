import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";

const offers = [
  {
    id: "vt-markets",
    name: "VT Markets",
    slug: "vt-markets",
    logo: "https://hieunthub.co/uploads/brokers/logos/vt-markets-logo-v3.png",
    rating: "4.6",
    stars: 4,
    bonusCount: "2 BONUS",
    bonuses: [
      {
        label: "Thưởng chào mừng",
        emoji: "👋",
        link: "https://www.vtmarketsglobalvn.com/loyalty-programs/",
        type: "welcome",
        colorClass: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
      },
      {
        label: "Active Trader Program",
        emoji: "✨",
        link: "https://www.vtmarketsglobalvn.com/loyalty-programs/active-trader-program/",
        type: "other",
        colorClass: "border-purple-400/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
      }
    ],
    claimLink: "https://www.vtmarketsglobalvn.com/loyalty-programs/"
  },
  {
    id: "infinox",
    name: "Infinox",
    slug: "infinox",
    logo: "https://hieunthub.co/uploads/brokers/logos/01KMQ0DQKRJEWC9F1TD5NN79NA.webp",
    rating: "3.7",
    stars: 4,
    bonusCount: "3 BONUS",
    bonuses: [
      {
        label: "Thưởng chào mừng",
        emoji: "👋",
        link: "https://myaccount.dailyix.com/links/go/9927845",
        type: "welcome",
        colorClass: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
      },
      {
        label: "Thưởng nạp tiền",
        emoji: "💵",
        link: "https://myaccount.dailyix.com/links/go/9927845",
        type: "deposit",
        colorClass: "border-blue-400/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
      },
      {
        label: "Bonus khác",
        emoji: "✨",
        link: "https://myaccount.dailyix.com/links/go/9927845",
        type: "other",
        colorClass: "border-purple-400/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
      }
    ],
    claimLink: "https://myaccount.dailyix.com/links/go/9927845"
  }
];

interface SearchParams {
  bonus?: string;
  q?: string;
}

export default async function OffersBonusPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentBonusType = resolvedSearchParams?.bonus || "";

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              🔥 KHUYẾN MÃI ĐANG HOẠT ĐỘNG
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Bonus &{" "}
              <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Khuyến mãi</span>
              {" "}từ broker đối tác
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
              Tổng hợp tất cả welcome bonus, deposit match, no-deposit từ các broker HH đối tác — không phí ẩn.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-orange-300">2</span>
                <span className="text-zinc-500">sàn có khuyến mãi</span>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-emerald-300">5</span>
                <span className="text-zinc-500">gói khuyến mãi</span>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-amber-300">100%</span>
                <span className="text-zinc-500">miễn phí</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="border-b border-white/5 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5">
            <form method="GET" action="/offers-bonus" className="space-y-3">

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-orange-400/50 transition">
                  <svg className="h-4 w-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input type="text" name="q" placeholder="Tìm sàn (FPG, Mitrade, Exness)" className="flex-1 bg-transparent placeholder:text-zinc-500 outline-none text-sm text-zinc-100" />
                </div>
                <button type="submit" className="rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-2.5 text-sm font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/20">
                  Tìm sàn
                </button>
              </div>

              {/* Tags Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold whitespace-nowrap mr-1">Loại:</span>

                <Link
                  href="/offers-bonus"
                  className={`rounded-full whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold transition ${!currentBonusType
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-orange-300 hover:border-orange-400/40"
                    }`}
                >
                  🎁 Tất cả
                </Link>

                <Link
                  href="/offers-bonus?bonus=welcome"
                  className={`rounded-full whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold transition ${currentBonusType === "welcome"
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-orange-300 hover:border-orange-400/40"
                    }`}
                >
                  👋 Thưởng chào mừng
                </Link>

                <Link
                  href="/offers-bonus?bonus=deposit"
                  className={`rounded-full whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold transition ${currentBonusType === "deposit"
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-orange-300 hover:border-orange-400/40"
                    }`}
                >
                  💵 Thưởng nạp tiền
                </Link>

                <Link
                  href="/offers-bonus?bonus=withdrawable"
                  className={`rounded-full whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold transition ${currentBonusType === "withdrawable"
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-orange-300 hover:border-orange-400/40"
                    }`}
                >
                  💸 Bonus rút được
                </Link>

                <Link
                  href="/offers-bonus?bonus=other"
                  className={`rounded-full whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold transition ${currentBonusType === "other"
                      ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/30"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-orange-300 hover:border-orange-400/40"
                    }`}
                >
                  ✨ Bonus khác
                </Link>
              </div>
            </form>
          </div>
        </section>

        {/* Info Counter */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-3">
          <div className="text-sm text-zinc-400">
            <strong className="text-white">2</strong> sàn đang có khuyến mãi
          </div>
        </div>

        {/* Offers Grid */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <article key={offer.id} className="group rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 transition flex flex-col p-6">

                  {/* Broker Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <img src={offer.logo} alt={offer.name} className="h-14 w-14 rounded object-cover shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <Link href={`/brokers/danh-gia-${offer.slug}`} className="block font-extrabold text-lg text-white hover:text-orange-300 transition truncate">
                        {offer.name}
                      </Link>
                      <div className="text-xs mt-1 flex items-center gap-1.5">
                        <span className="text-amber-400">★★★★☆</span>
                        <span className="text-zinc-500">{offer.rating}/5</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0">
                      {offer.bonusCount}
                    </div>
                  </div>

                  {/* Bonuses List */}
                  <div className="flex-1 space-y-2 mb-5">
                    {offer.bonuses.map((bonus, index) => (
                      <a
                        key={index}
                        href={bonus.link}
                        target="_blank"
                        rel="nofollow noopener"
                        className={`flex items-center justify-between gap-2 rounded border px-3 py-2.5 text-sm font-semibold transition ${bonus.colorClass}`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="text-base shrink-0">{bonus.emoji}</span>
                          <span className="truncate">{bonus.label}</span>
                        </span>
                        <svg className="h-3.5 w-3.5 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>

                  {/* Bottom CTAs */}
                  <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/5">
                    <a
                      href={offer.claimLink}
                      target="_blank"
                      rel="nofollow noopener"
                      className="flex items-center justify-center gap-2 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-4 py-2.5 text-sm font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/20"
                    >
                      Nhận khuyến mãi
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <Link href={`/brokers/danh-gia-${offer.slug}`} className="text-center text-xs text-zinc-400 hover:text-orange-300 transition">
                      Xem chi tiết broker →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* consultation banner */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-3">
                    🎯 DÀNH CHO TRADER
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                    Cần tư vấn chọn broker{" "}
                    <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">có bonus tốt nhất?</span>
                  </h3>
                  <p className="mt-3 text-zinc-400">Team HH support 1-1 qua Telegram. Phân tích cơ chế bonus + điều kiện rút.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <Link href="/contact" className="rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-3.5 font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30 text-center">
                    Liên hệ tư vấn
                  </Link>
                  <Link href="/brokers" className="rounded border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white hover:border-white/20 transition text-center">
                    So sánh broker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
