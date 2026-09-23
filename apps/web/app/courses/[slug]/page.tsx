import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dynamic database of course details
const coursesDb: Record<string, any> = {
  "chon-broker-101": {
    slug: "chon-broker-101",
    title: "Chọn Broker 101",
    cover: "https://hieunthub.co/uploads/courses/covers/01KQ29N864HEECZBHMMK30AA1Q.webp",
    difficulty: "Beginner",
    difficultyLabel: "Cơ bản",
    category: "broker-selection",
    priceLabel: "Miễn phí",
    priceAmount: "Miễn phí",
    isFree: true,
    lessonsCount: 10,
    previewsCount: 2,
    duration: "1h",
    author: "HieuNTHUB Academy",
    description: "Hướng dẫn chọn broker phù hợp — từ giấy phép, spread đến cách tránh broker scam",
    benefits: [
      "Khoá học miễn phí giúp trader mới chọn được broker uy tín ngay từ ngày đầu. Theo thống kê, 80% trader thua không phải vì kỹ thuật yếu — mà vì chọn sai broker, gửi tiền vào nơi không an toàn, hoặc bị spread + phí ẩn ăn mòn lợi nhuận.",
      "Khoá này dành cho ai?",
      "Trader mới hoàn toàn, chưa từng mở tài khoản broker",
      "Người đang dùng broker không rõ giấy phép, hay bị nuốt lệnh, rút tiền chậm",
      "Trader muốn đa dạng hoá tài khoản trên nhiều broker uy tín",
      "Bạn sẽ học được gì sau 10 bài?",
      "Broker là gì — vai trò trung gian giữa bạn và thị trường",
      "Các loại giấy phép broker — đâu là uy tín (FCA, ASIC, CySEC...)"
    ],
    lessons: [
      { id: "01", title: "Bài 1: Tại sao chọn broker đúng quan trọng?", isPreview: true },
      { id: "02", title: "Bài 2: Các loại giấy phép broker — đâu là uy tín?", isPreview: true },
      { id: "03", title: "Bài 3: Spread, commission và phí ẩn", isPreview: false },
      { id: "04", title: "Bài 4: Leverage và margin call", isPreview: false },
      { id: "05", title: "Bài 5: STP, ECN, Market Maker — khác nhau thế nào?", isPreview: false },
      { id: "06", title: "Bài 6: Bẫy bonus và withdrawal — cách nhận biết", isPreview: false },
      { id: "07", title: "Bài 7: Top 10 dấu hiệu broker scam", isPreview: false },
      { id: "08", title: "Bài 8: Cách kiểm tra broker trên ForexPeaceArmy + WikiFX", isPreview: false },
      { id: "09", title: "Bài 9: Quy trình mở tài khoản an toàn", isPreview: false },
      { id: "10", title: "Bài 10: Checklist cuối cùng — tự đánh giá broker", isPreview: false }
    ]
  },
  "fibo-matrix-101": {
    slug: "fibo-matrix-101",
    title: "Fibo Matrix 101",
    cover: "https://hieunthub.co/uploads/courses/covers/01KQ29MRVFV72D2Q2C54X3G4K2.webp",
    difficulty: "Advanced",
    difficultyLabel: "Nâng cao",
    category: "technical-analysis",
    priceLabel: "$100",
    priceAmount: "$100",
    isFree: false,
    lessonsCount: 17,
    previewsCount: 1,
    duration: "3h",
    author: "HieuNTHUB Academy",
    description: "Hệ thống giao dịch Fibonacci kết hợp Matrix — từ cơ bản đến thực chiến",
    benefits: [
      "Làm chủ tỷ lệ vàng Fibonacci Retracement & Extension trong thực tế.",
      "Thiết lập ma trận hợp lưu (confluence matrix) tăng xác suất thắng tối đa.",
      "Kế hoạch quản lý vốn chặt chẽ dựa trên R:R tối thiểu 1:2.",
      "Phù hợp với swing trader và scalper trên thị trường vàng, Forex."
    ],
    lessons: [
      { id: "01", title: "Bài 1: Tổng quan Fibonacci & Ma trận hợp lưu", isPreview: true },
      { id: "02", title: "Bài 2: Fibonacci Retracement trong xu hướng mạnh", isPreview: false },
      { id: "03", title: "Bài 3: Fibonacci Extension & Các vùng chốt lời ma trận", isPreview: false },
      { id: "04", title: "Bài 4: Xây dựng Setup thực chiến Matrix Confluence", isPreview: false }
    ]
  }
};

export default async function CourseDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";

  const course = coursesDb[rawSlug] || coursesDb["chon-broker-101"]; // Fallback to Chọn Broker 101

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C]">

        {/* Course Detail Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-10 lg:pb-14">
            {/* Breadcrumbs */}
            <nav className="text-xs text-zinc-500 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
              <span>›</span>
              <Link href="/courses" className="hover:text-orange-300 transition">Khoá học</Link>
              <span>›</span>
              <span className="text-zinc-300 truncate">{course.title}</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

              <div className="lg:col-span-7">

                {/* Course Banner Image Box */}
                <div className="relative rounded overflow-hidden border border-white/10 bg-gradient-to-br from-orange-500/10 to-zinc-900 aspect-video shadow-xl shadow-black/30 mb-6">
                  <img src={course.cover} alt={course.title} className="w-full h-full object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent"></div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md ring-2 ring-white/20 flex items-center justify-center shadow-2xl">
                      <svg className="h-9 w-9 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4l10 6-10 6V4z"></path></svg>
                    </div>
                  </div>

                  {course.previewsCount > 0 && (
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/70 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                      ▶ Có bài học miễn phí
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">⭐ FEATURED</span>
                  </div>
                </div>

                {/* Categories & badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-xs font-semibold">
                    {course.difficulty === "Beginner" ? "🌱 Cơ bản" : course.difficulty === "Intermediate" ? "⚡ Trung cấp" : "🚀 Nâng cao"}
                  </span>
                  <span className="rounded-full bg-white/[0.06] border border-white/15 text-zinc-200 px-2.5 py-0.5 text-xs font-semibold">{course.category}</span>
                  <span className="rounded-full bg-white/[0.06] border border-white/15 text-zinc-200 px-2.5 py-0.5 text-xs font-semibold">🌐 VI</span>
                </div>

                {/* Course Titles */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">{course.title}</h1>
                <p className="mt-3 text-lg text-zinc-300 leading-relaxed">{course.description}</p>

                {/* Stats Panel */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">📚</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Bài học</span>
                    </div>
                    <div className="font-extrabold text-blue-300 text-base">{course.lessonsCount} bài</div>
                    {course.previewsCount > 0 && (
                      <div className="text-[10px] text-emerald-300 mt-0.5">{course.previewsCount} preview</div>
                    )}
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">⏱️</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Thời lượng</span>
                    </div>
                    <div className="font-extrabold text-amber-300 text-base">{course.duration}</div>
                  </div>
                  <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">🧠</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Trình độ</span>
                    </div>
                    <div className="font-extrabold text-emerald-300 text-base truncate">{course.difficultyLabel}</div>
                  </div>
                </div>

                {/* Author Card */}
                <div className="mt-5 flex items-center gap-3 rounded border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-zinc-950 font-extrabold text-sm shrink-0">
                    BR
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Giảng viên</div>
                    <div className="font-bold text-white truncate">{course.author}</div>
                  </div>
                </div>
              </div>

              {/* Right Column Sticky Call to Action */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 rounded border border-orange-400/30 bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent p-5 md:p-6 shadow-2xl shadow-orange-500/10">
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-300 font-bold mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {course.isFree ? "MIỄN PHÍ" : "PREMIUM"}
                    </div>
                    <div className="text-4xl font-extrabold text-emerald-300">{course.priceAmount}</div>
                    <div className="mt-1 text-sm text-zinc-400">
                      {course.isFree ? "Học toàn bộ không cần thanh toán" : "Thanh toán một lần, sở hữu trọn đời"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/courses/${course.slug}`} className="block w-full rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-4 text-center font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30 text-base">
                      ▶ Vào học
                    </Link>
                  </div>

                  <ul className="mt-5 pt-5 border-t border-white/5 space-y-2.5 text-sm text-zinc-300">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                      {course.lessonsCount} bài học chi tiết
                    </li>
                    {course.previewsCount > 0 && (
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        {course.previewsCount} bài học miễn phí xem trước
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">🎯 KIẾN THỨC</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Bạn sẽ học được gì</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {course.benefits.map((benefit: string, idx: number) => {
                const isHeading = benefit.startsWith("**") && benefit.endsWith("**");
                const cleanText = benefit.replace(/\*\*/g, "");
                return (
                  <div key={idx} className={`flex items-start gap-3 rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 ${isHeading ? "md:col-span-2 border-orange-500/20 bg-orange-500/[0.02]" : ""}`}>
                    {!isHeading && (
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded bg-emerald-500/15 border border-emerald-400/30 shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                      </span>
                    )}
                    <span className={`text-sm leading-relaxed ${isHeading ? "text-orange-300 font-bold text-base" : "text-zinc-200"}`}>{cleanText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Outline Syllabus Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">📚 CHƯƠNG TRÌNH</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Nội dung khoá học</h2>
              </div>
              <div className="text-sm text-zinc-400">
                <strong className="text-white">{course.lessonsCount}</strong> bài
                {course.previewsCount > 0 && (
                  <> · <strong className="text-emerald-300">{course.previewsCount} preview</strong></>
                )}
              </div>
            </div>

            <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] overflow-hidden divide-y divide-white/5">
              {course.lessons.map((lesson: any) => (
                <div key={lesson.id} className="flex items-center gap-4 px-4 md:px-6 py-4 transition group hover:bg-orange-500/5">
                  <div className="font-mono text-xs font-bold text-zinc-500 tabular-nums w-8 shrink-0">{lesson.id}</div>
                  <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition bg-orange-500/10 border border-orange-400/30 text-orange-300 group-hover:bg-orange-500/20">
                    <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4l10 6-10 6V4z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white group-hover:text-orange-200 transition truncate">{lesson.title}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    {lesson.isPreview && (
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Preview</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic bottom call to action banner */}
        <section>
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
            <div className="rounded border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  Sẵn sàng bắt đầu{" "}
                  <span className="bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">{course.title}</span>?
                </h3>
                <p className="text-zinc-400 mb-6 max-w-xl mx-auto">Truy cập trọn đời, học mọi lúc, có chứng chỉ hoàn thành.</p>
                <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-8 py-4 font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-xl shadow-orange-500/30 text-base">
                  ▶ Bắt đầu học miễn phí →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
