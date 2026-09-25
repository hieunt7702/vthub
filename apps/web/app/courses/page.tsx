'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { 
  GraduationCap, Search, Sparkles, BookOpen, Clock, 
  Users, CheckCircle2, ArrowRight, PlayCircle, ShieldCheck
} from 'lucide-react';
import { 
  VTCourse, 
  STORAGE_KEYS, 
  INITIAL_COURSES, 
  useVTDataStore 
} from '../../lib/dataStore';

export default function CoursesPage() {
  const [courses] = useVTDataStore<VTCourse>(
    STORAGE_KEYS.COURSES,
    INITIAL_COURSES
  );

  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<VTCourse | null>(null);

  const filtered = courses.filter((c) => {
    const matchLvl = activeLevel === 'all' || c.level === activeLevel;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLvl && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-5 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <GraduationCap className="w-4 h-4 text-[#00C2FF]" />
              <span>Học Viện Đào Tạo Trading Bot & Thuật Toán Miễn Phí 100%</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Khóa Học & Giáo Trình{' '}
              <span className="text-[#00C2FF]">
                VT Rewards Academy
              </span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Lộ trình bài bản từ cơ bản đến nâng cao: Làm chủ MetaTrader 5, lập trình MQL5, tối ưu hóa thông số EA và kiểm soát rủi ro tài khoản khi giao dịch tại VT Markets.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            {/* Level Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất Cả Trình Độ' },
                { id: 'Cơ bản', label: '1. Cơ Bản' },
                { id: 'Nâng cao', label: '2. Nâng Cao' },
                { id: 'Chuyên sâu', label: '3. Chuyên Sâu' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevel(lvl.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeLevel === lvl.id
                      ? 'bg-[#00C2FF] text-slate-950 font-black shadow-md'
                      : 'bg-[#050D1A] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên khóa học, chủ đề..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#050D1A] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] font-medium"
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#050D1A] p-6 hover:border-[#00C2FF]/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] font-bold uppercase">
                      {course.level}
                    </span>
                    <span className="text-[#00C2FF] font-bold bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">
                      100% MIỄN PHÍ
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    <Link href={`/courses/${course.slug}`}>
                      {course.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00C2FF]" />
                      <span>Thời lượng: {course.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.lessonsCount} bài học</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.enrolledCount} học viên</span>
                  </span>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs uppercase shadow hover:brightness-110 transition-all"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Xem Bài Học</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
