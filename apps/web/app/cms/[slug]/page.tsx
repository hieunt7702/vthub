import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { articlesData, Article } from "../cmsArticlesDb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShareButtons } from "./ShareButtons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CMSDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const article = articlesData.find((art) => art.slug === slug);

  if (!article) {
    // Fallback to third article (Eximbank one) or ec-markets if slug doesn't match
    const fallbackArticle = articlesData.find(a => a.slug === "thay-doi-can-bo-cap-cao-tai-eximbank") || articlesData[0]!;
    return <CMSArticleRender article={fallbackArticle} allArticles={articlesData} />;
  }

  return <CMSArticleRender article={article} allArticles={articlesData} />;
}

function CMSArticleRender({ article, allArticles }: { article: Article; allArticles: Article[] }) {
  // Find related articles (same category, different slug, up to 3)
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C] min-h-screen text-zinc-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

          {/* Breadcrumbs */}
          <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
            <span>›</span>
            <Link href="/cms" className="hover:text-orange-300 transition">Tin tức &amp; phân tích</Link>
            <span>›</span>
            <span className="text-zinc-300 truncate max-w-[300px]">{article.title}</span>
          </nav>

          {/* Hero Article Card */}
          <article className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden p-6 lg:p-10 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4">
                <span className="rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 px-3 py-1 font-semibold">
                  {article.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.timeLabel || article.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                {article.title}
              </h1>

              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-4xl mb-8">
                {article.snippet}
              </p>

              {/* Share actions bar */}
              <div className="flex flex-wrap items-center gap-4 justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                  <span>Chia sẻ bài viết:</span>
                </div>
                <ShareButtons slug={article.slug} title={article.title} />
              </div>
            </div>

            {/* Cover image */}
            <div className="mt-8 rounded overflow-hidden aspect-video max-h-[480px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 relative">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </article>

          {/* Grid Content and TOC layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Desktop TOC Sidebar */}
            {article.toc && article.toc.length > 0 && (
              <aside className="lg:col-span-4 sticky top-24 hidden lg:block order-last lg:order-first">
                <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-orange-300">
                    Mục lục nội dung
                  </h3>
                  <nav className="space-y-3">
                    {article.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-start gap-3 group text-sm text-zinc-400 hover:text-orange-300 transition duration-150"
                      >
                        <span className="flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 group-hover:bg-orange-500/20 group-hover:border-orange-400/40 group-hover:text-orange-300 transition duration-150">
                          {item.num}
                        </span>
                        <span className="leading-tight">{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Main content rail */}
            <div className={`${article.toc && article.toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} space-y-8`}>

              {/* Mobile TOC Accordion */}
              {article.toc && article.toc.length > 0 && (
                <div className="lg:hidden rounded border border-white/10 bg-white/[0.03] overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02] transition">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Mục lục nội dung</span>
                        <span className="text-sm font-extrabold text-white mt-0.5">{article.toc.length} phần chính</span>
                      </div>
                      <svg className="h-4 w-4 text-zinc-400 group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-white/[0.01] space-y-3">
                      {article.toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-center gap-3 text-sm text-zinc-300 hover:text-orange-300 transition"
                        >
                          <span className="flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400">
                            {item.num}
                          </span>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </details>
                </div>
              )}

              {/* Rich Body Content */}
              <article className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 md:p-8">
                <div
                  className="prose prose-invert max-w-none prose-orange leading-relaxed space-y-6 text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: article.contentHtml || "" }}
                />
              </article>

              {/* Action conversions CTA block */}
              <div className="rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-8 text-center relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-extrabold text-white">
                    Khám phá thêm trên{" "}
                    <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">HieuNTHUB</span>
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
                    So sánh broker, xem cơ chế IB và tìm đối tác giao dịch phù hợp nhất.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link href="/brokers" className="rounded bg-gradient-to-r from-orange-400 to-amber-600 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg">
                      So sánh Broker
                    </Link>
                    <Link href="/cms" className="rounded border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/20 transition">
                      Xem thêm bài viết
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {relatedArticles.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
                    Bài viết liên quan
                  </h3>
                  <div className="grid gap-5 md:grid-cols-3">
                    {relatedArticles.map((art) => (
                      <Link
                        key={art.slug}
                        href={`/cms/${art.slug}`}
                        className="group flex flex-col rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden hover:border-orange-400/40 hover:shadow-md transition h-full"
                      >
                        <div className="relative aspect-video overflow-hidden border-b border-white/5">
                          <img src={art.cover} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                          <span className="absolute top-2 left-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-orange-300 px-2 py-0.5 text-[9px] font-semibold">
                            {art.categoryLabel}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <h4 className="font-bold text-white text-sm group-hover:text-orange-300 transition line-clamp-2 leading-snug">
                            {art.title}
                          </h4>
                          <span className="text-[10px] text-zinc-500 mt-3 flex items-center justify-between">
                            <span>{art.date}</span>
                            <span className="text-orange-300 group-hover:translate-x-0.5 transition font-bold">→</span>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Return link */}
              <div className="pt-4 border-t border-white/5 flex justify-center">
                <Link href="/cms" className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 hover:border-orange-400/40 hover:text-orange-300 hover:bg-orange-500/5 transition">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Quay lại danh sách bài viết
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
