"use client";

import { Header } from "../../../../../components/layout/Header";
import { Footer } from "../../../../../components/layout/Footer";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  videoUrl: string;
  isPreview: boolean;
}

interface CourseSyllabus {
  slug: string;
  title: string;
  lessons: Lesson[];
}

const syllabusDb: Record<string, CourseSyllabus> = {
  "chon-broker-101": {
    slug: "chon-broker-101",
    title: "Chọn Broker 101",
    lessons: [
      { id: "01", slug: "chon-broker-101-01-tai-sao-chon-broker-dung-quan-trong", title: "Bài 1: Tại sao chọn broker đúng quan trọng?", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: true },
      { id: "02", slug: "chon-broker-101-02-cac-loai-giay-phep-broker-dau-la-uy-tin", title: "Bài 2: Các loại giấy phép broker — đâu là uy tín?", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: true },
      { id: "03", slug: "chon-broker-101-03-spread-commission-va-phi-an", title: "Bài 3: Spread, commission và phí ẩn", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: false },
      { id: "04", slug: "chon-broker-101-04-leverage-va-margin-call", title: "Bài 4: Leverage và margin call", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false },
      { id: "05", slug: "chon-broker-101-05-stp-ecn-market-maker-khac-nhau-the-nao", title: "Bài 5: STP, ECN, Market Maker — khác nhau thế nào?", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: false },
      { id: "06", slug: "chon-broker-101-06-bay-bonus-va-withdrawal-cach-nhan-biet", title: "Bài 6: Bẫy bonus và withdrawal — cách nhận biết", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false },
      { id: "07", slug: "chon-broker-101-07-top-10-dau-hieu-broker-scam", title: "Bài 7: Top 10 dấu hiệu broker scam", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: false },
      { id: "08", slug: "chon-broker-101-08-cach-kiem-tra-broker-tren-forexpeacearmy-wikifx", title: "Bài 8: Cách kiểm tra broker trên ForexPeaceArmy + WikiFX", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false },
      { id: "09", slug: "chon-broker-101-09-quy-trinh-mo-tai-khoan-an-toan", title: "Bài 9: Quy trình mở tài khoản an toàn", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: false },
      { id: "10", slug: "chon-broker-101-10-checklist-cuoi-cung-tu-danh-gia-broker", title: "Bài 10: Checklist cuối cùng — tự đánh giá broker", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false }
    ]
  },
  "fibo-matrix-101": {
    slug: "fibo-matrix-101",
    title: "Fibo Matrix 101",
    lessons: [
      { id: "01", slug: "fibo-matrix-101-01-tong-quan", title: "Bài 1: Tổng quan Fibonacci & Ma trận hợp lưu", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: true },
      { id: "02", slug: "fibo-matrix-101-02-retracement", title: "Bài 2: Fibonacci Retracement trong xu hướng mạnh", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false },
      { id: "03", slug: "fibo-matrix-101-03-extension", title: "Bài 3: Fibonacci Extension & Các vùng chốt lời ma trận", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreview: false },
      { id: "04", slug: "fibo-matrix-101-04-setup", title: "Bài 4: Xây dựng Setup thực chiến Matrix Confluence", videoUrl: "https://www.w3schools.com/html/movie.mp4", isPreview: false }
    ]
  }
};

export default function CourseLessonPage() {
  const params = useParams();
  const router = useRouter();

  const courseSlug = (params?.slug as string) || "chon-broker-101";
  const lessonSlug = (params?.lessonSlug as string) || "";

  const courseSyllabus = useMemo<CourseSyllabus>(() => {
    return syllabusDb[courseSlug] || syllabusDb["chon-broker-101"]!;
  }, [courseSlug]);

  const activeLessonIndex = useMemo(() => {
    const idx = courseSyllabus.lessons.findIndex(l => l.slug === lessonSlug);
    return idx !== -1 ? idx : 0;
  }, [courseSyllabus, lessonSlug]);

  const activeLesson = useMemo<Lesson>(() => {
    return courseSyllabus.lessons[activeLessonIndex] || courseSyllabus.lessons[0]!;
  }, [courseSyllabus, activeLessonIndex]);

  // Track completed lessons to calculate completion percentage dynamically
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  const completionPercentage = useMemo(() => {
    const completedCount = Object.keys(completedLessons).filter(k => k.startsWith(courseSlug)).length;
    return Math.round((completedCount / courseSyllabus.lessons.length) * 100);
  }, [completedLessons, courseSyllabus, courseSlug]);

  const handleNextLesson = () => {
    // Mark current lesson as completed
    setCompletedLessons(prev => ({ ...prev, [`${courseSlug}-${activeLesson.slug}`]: true }));

    // Jump to next lesson if available
    if (activeLessonIndex < courseSyllabus.lessons.length - 1) {
      const nextLesson = courseSyllabus.lessons[activeLessonIndex + 1]!;
      router.push(`/courses/${courseSlug}/lessons/${nextLesson.slug}`);
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    router.push(`/courses/${courseSlug}/lessons/${lesson.slug}`);
  };

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C]">

        {/* Navigation Breadcrumbs */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-3">
            <nav className="text-xs text-zinc-500 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
              <span>›</span>
              <Link href="/courses" className="hover:text-orange-300 transition">Khoá học</Link>
              <span>›</span>
              <Link href={`/courses/${courseSyllabus.slug}`} className="hover:text-orange-300 transition truncate max-w-[280px]">
                {courseSyllabus.title}
              </Link>
              <span>›</span>
              <span className="text-zinc-300 truncate max-w-[280px]">{activeLesson.title}</span>
            </nav>
          </div>
        </section>

        {/* Video Player & Lessons Syllabus layout */}
        <section>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <div className="grid lg:grid-cols-12 gap-6 items-start">

              {/* Left Column: Player and Lesson Details */}
              <div className="lg:col-span-8">

                {/* HTML5 video container */}
                <div className="rounded border border-white/10 bg-zinc-950 overflow-hidden shadow-xl shadow-black/40">
                  <div className="aspect-video relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                    <video
                      key={activeLesson.slug}
                      controls
                      preload="metadata"
                      aria-label={activeLesson.title}
                      playsInline
                      className="w-full h-full"
                    >
                      <source src={activeLesson.videoUrl} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  </div>
                </div>

                {/* Lesson Description and Actions */}
                <div className="mt-5 rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 md:p-6">
                  <div className="flex items-center gap-2 flex-wrap text-xs mb-3">
                    <span className="rounded-full bg-orange-400/15 border border-orange-400/30 text-orange-300 px-2.5 py-0.5 font-bold">
                      Bài {activeLessonIndex + 1} / {courseSyllabus.lessons.length}
                    </span>
                    {activeLesson.isPreview && (
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px]">Xem trước</span>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">{activeLesson.title}</h1>

                  <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-3 flex-wrap">
                    {activeLessonIndex < courseSyllabus.lessons.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextLesson}
                        className="ml-auto inline-flex items-center gap-1.5 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-5 py-2.5 text-sm font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-md shadow-orange-500/25 cursor-pointer"
                      >
                        Tiếp tục bài tiếp theo →
                      </button>
                    ) : (
                      <Link
                        href={`/courses/${courseSyllabus.slug}`}
                        className="ml-auto inline-flex items-center gap-1.5 rounded bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-extrabold text-zinc-950 hover:from-emerald-300 hover:to-teal-500 transition shadow-md"
                      >
                        Hoàn thành khoá học! 🎓
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column Sticky Sidebar */}
              <aside className="lg:col-span-4" aria-label="Các bài trong khoá">
                <div className="sticky top-24 rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden">

                  {/* Progress Header */}
                  <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-orange-500/8 to-transparent">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-orange-300 font-bold">Các bài trong khoá</div>
                      <span className="text-[11px] text-zinc-400 font-bold tabular-nums">
                        {Object.keys(completedLessons).filter(k => k.startsWith(courseSlug)).length}/{courseSyllabus.lessons.length}
                      </span>
                    </div>
                    <h2 className="text-sm font-extrabold text-white truncate" title={courseSyllabus.title}>{courseSyllabus.title}</h2>
                    <div className="mt-2.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    <div className="mt-1.5 text-[10px] text-zinc-500">{completionPercentage}% hoàn thành</div>
                  </div>

                  {/* List of lessons */}
                  <div className="max-h-[calc(100vh-260px)] overflow-y-auto divide-y divide-white/5">
                    {courseSyllabus.lessons.map((lesson, idx) => {
                      const isActive = lesson.slug === lessonSlug || (lessonSlug === "" && idx === 0);
                      const isCompleted = completedLessons[`${courseSlug}-${lesson.slug}`];

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson)}
                          className={`flex items-center gap-3 px-4 py-3 transition group cursor-pointer border-l-2 ${isActive
                              ? "bg-orange-500/10 border-l-orange-400"
                              : "border-l-transparent hover:bg-orange-500/5"
                            }`}
                        >
                          <div className="font-mono text-[10px] font-bold text-zinc-500 tabular-nums w-6 shrink-0 text-right">{lesson.id}</div>

                          <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border transition ${isActive
                              ? "bg-orange-500/20 border-orange-400/50 text-orange-300"
                              : isCompleted
                                ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                                : "bg-white/[0.04] border-white/10 text-zinc-400 group-hover:border-orange-400/30 group-hover:text-orange-300"
                            }`}>
                            {isCompleted ? (
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg>
                            ) : (
                              <svg className="h-3 w-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4l10 6-10 6V4z"></path></svg>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-[13px] leading-snug font-semibold line-clamp-2 ${isActive ? "text-orange-200" : "text-zinc-200 group-hover:text-white"}`}>
                              {lesson.title}
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-zinc-500">
                              {lesson.isPreview && (
                                <span className="text-emerald-300/80 font-bold uppercase tracking-wider">· Preview</span>
                              )}
                              {isCompleted && (
                                <span className="text-emerald-400 font-bold uppercase tracking-wider">· Đã xong</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar Footer Link */}
                  <Link href={`/courses/${courseSyllabus.slug}`} className="block px-5 py-3 text-xs font-semibold text-zinc-400 hover:text-orange-300 hover:bg-orange-500/5 transition border-t border-white/5">
                    ← Quay lại trang khoá học
                  </Link>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
