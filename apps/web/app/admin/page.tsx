'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, Bot, BookOpen, FileText, 
  ArrowRight, Sparkles, TrendingUp 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    brokers: 0,
    posts: 0,
    indicators: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const getCount = (key: string, defaultVal: number) => {
          if (typeof window === 'undefined') return defaultVal;
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored).length : defaultVal;
        };

        setStats({
          brokers: getCount('vt_brokers_v2', 7),
          posts: getCount('vt_posts_v2', 4),
          indicators: getCount('vt_indicators_v2', 9),
          courses: getCount('vt_courses_v2', 4),
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-[#00C2FF]/30 bg-gradient-to-r from-[#08152B] via-[#050D1A] to-[#020712] p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00C2FF]/15 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trung Tâm Điều Hành VT Rewards Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Chào mừng trở lại, <span className="text-[#00C2FF]">Quản trị viên VT Rewards Hub!</span>
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
            Hệ thống quản lý nội dung của VT Rewards Hub đã sẵn sàng. Bạn có thể kiểm tra hiệu năng, quản lý chương trình hoàn phí Backcom, đăng tải tin tức, khóa học hoặc cập nhật bộ 9 Bot EA MT5 một cách dễ dàng.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            name: 'Bộ 9 EA MT5',
            value: stats.indicators,
            link: '/admin/indicators',
            icon: Bot,
            subtitle: 'Apex Oracle & Suite'
          },
          {
            name: 'Bài Viết & Phân Tích',
            value: stats.posts,
            link: '/admin/posts',
            icon: FileText,
            subtitle: 'Tin tức thị trường'
          },
          {
            name: 'Khóa Học Academy',
            value: stats.courses,
            link: '/admin/courses',
            icon: BookOpen,
            subtitle: 'Đào tạo MQL5 & SMC'
          },
          {
            name: 'Sàn Đối Tác & WikiFX',
            value: stats.brokers,
            link: '/admin/brokers',
            icon: Building2,
            subtitle: 'So sánh & Đánh giá'
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.link}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#050D1A] p-6 shadow-xl transition-all duration-300 hover:border-[#00C2FF]/50 hover:bg-[#08152B] flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.name}</span>
                <div className="p-2 rounded-xl bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black tracking-tight text-white font-mono">
                    {loading ? '...' : item.value}
                  </span>
                  <div className="text-[11px] text-slate-500 font-medium">{item.subtitle}</div>
                </div>
                <span className="text-xs text-[#00C2FF] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Quản lý
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Activity Log & Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Logs */}
        <div className="lg:col-span-2 bg-[#050D1A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00C2FF] animate-pulse"></span>
              Nhật ký hệ thống &amp; Hoạt động gần đây
            </h2>
            <span className="text-xs text-slate-500 font-mono">Live Đồng Bộ</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {[
              {
                time: 'Vừa xong',
                type: 'EA VTM',
                desc: 'Đã tải lên bộ 9 Bot EA MT5 (.ex5) chính thức vào thư mục tải về',
                color: 'bg-[#00C2FF]/15 border-[#00C2FF]/30 text-[#00C2FF]',
              },
              {
                time: '15 phút trước',
                type: 'BACKCOM',
                desc: 'Đồng bộ chính sách hoàn phí Backcom tự động trực tiếp theo khối lượng giao dịch',
                color: 'bg-[#0052FF]/20 border-[#0052FF]/40 text-blue-300',
              },
              {
                time: '2 giờ trước',
                type: 'GOLD LIVE',
                desc: 'Kích hoạt bảng theo dõi 12 loại giá vàng Việt Nam & US Stocks realtime',
                color: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
              },
              {
                time: 'Hôm nay',
                type: 'WIKIFX',
                desc: 'Cập nhật bảng so sánh 7 sàn Forex TOP 1 với VT Markets điểm 8.94/10',
                color: 'bg-[#00C2FF]/15 border-[#00C2FF]/30 text-[#00C2FF]',
              },
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded-2xl border border-slate-800/80 bg-[#020712] hover:border-[#00C2FF]/30 transition"
              >
                <div className="flex gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border tracking-wider h-fit ${log.color}`}>
                    {log.type}
                  </span>
                  <p className="text-slate-300 text-xs md:text-sm font-medium">{log.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-4">Lối Tắt Nhanh</h2>
            <div className="space-y-2.5">
              <Link
                href="/admin/indicators"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#020712] border border-slate-800 text-slate-300 hover:text-white hover:border-[#00C2FF]/40 hover:bg-[#08152B] transition group text-xs font-semibold"
              >
                <span>🤖 Quản lý bộ 9 Bot EA MT5</span>
              </Link>
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#020712] border border-slate-800 text-slate-300 hover:text-white hover:border-[#00C2FF]/40 hover:bg-[#08152B] transition group text-xs font-semibold"
              >
                <span>📰 Đăng bài viết / Tin tức mới</span>
              </Link>
              <Link
                href="/admin/courses"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#020712] border border-slate-800 text-slate-300 hover:text-white hover:border-[#00C2FF]/40 hover:bg-[#08152B] transition group text-xs font-semibold"
              >
                <span>🎓 Quản lý khóa học Academy</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link href="/" className="text-xs font-bold text-[#00C2FF] hover:underline flex items-center justify-center gap-1">
              <span>Xem trang người dùng</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
