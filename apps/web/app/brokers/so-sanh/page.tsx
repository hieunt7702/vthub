import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import Link from "next/link";

export default function BrokerComparePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            {/* Breadcrumbs */}
            <nav className="text-xs text-zinc-500 mb-5">
              <Link href="/" className="hover:text-orange-300">Trang chủ</Link>
              <span className="mx-2">›</span>
              <Link href="/brokers" className="hover:text-orange-300">Sàn giao dịch</Link>
              <span className="mx-2">›</span>
              <span className="text-zinc-300">So sánh</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-4">
                ⚖️ SO SÁNH SÀN SIDE-BY-SIDE
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Chọn sàn để{" "}
                <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">so sánh</span>
              </h1>
              <p className="mt-4 text-zinc-400 text-base md:text-lg">
                Spread · Rebate · CPA · RevShare · Giấy phép — điểm thắng được highlight 🏆
              </p>
            </div>
          </div>
        </section>

        {/* Empty State / Comparison Select Section */}
        <section>
          <div className="max-w-2xl mx-auto px-4 lg:px-8 py-16 text-center">
            <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 md:p-12">
              <div className="text-6xl mb-4">⚖️</div>
              <h2 className="text-2xl font-bold text-white mb-3">Chọn ít nhất 2 sàn để so sánh</h2>
              <p className="text-zinc-400 mb-6">
                Vào trang Sàn giao dịch, click nút "So sánh" trên 2-4 broker bạn muốn. HieuNTHUB sẽ render bảng so sánh chi tiết spread, rebate, CPA, RevShare, giấy phép side-by-side.
              </p>
              <Link href="/brokers" className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-8 py-4 font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30">
                Tìm sàn để so sánh →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
