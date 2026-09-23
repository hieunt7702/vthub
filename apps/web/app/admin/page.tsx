'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    brokers: 0,
    offers: 0,
    indicators: 0,
    passview: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load Brokers from API
        let brokersCount = 0;
        try {
          const res = await fetch('http://localhost:3005/brokers');
          if (res.ok) {
            const data = await res.json();
            brokersCount = data.length;
          }
        } catch (e) {
          // Graceful fallback
          const localB = localStorage.getItem('bh_brokers');
          brokersCount = localB ? JSON.parse(localB).length : 7;
        }

        // Load Offers, Indicators, Passview counts from LocalStorage or mocks
        const getCount = (key: string, defaultVal: number) => {
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored).length : defaultVal;
        };

        setStats({
          brokers: brokersCount,
          offers: getCount('bh_offers', 5),
          indicators: getCount('bh_indicators', 5),
          passview: getCount('bh_passview', 3),
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
      <div className="relative overflow-hidden rounded border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-zinc-950 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Chào mừng trở lại, <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Quản trị viên!</span>
          </h1>
          <p className="mt-2 text-zinc-400 text-sm md:text-base leading-relaxed">
            Hệ thống quản lý nội dung của HieuNTHUB đã sẵn sàng. Bạn có thể kiểm tra hiệu năng, thay đổi cấu hình sàn giao dịch, đăng tải khuyến mãi mới hoặc cập nhật chỉ báo kỹ thuật một cách dễ dàng.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            name: 'Tổng số Sàn',
            value: stats.brokers,
            link: '/admin/brokers',
            color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
            textColor: 'text-orange-400',
            icon: (
              <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
          },
          {
            name: 'Khuyến mãi đang chạy',
            value: stats.offers,
            link: '/admin/offers',
            color: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
            textColor: 'text-amber-400',
            icon: (
              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0H4m8 0h8m-8 0a2 2 0 102 2h-2zm0 0a2 2 0 11-2 2h2zm0 0h4m-4 0H4m-2 5h16" />
              </svg>
            ),
          },
          {
            name: 'Số lượng Chỉ báo',
            value: stats.indicators,
            link: '/admin/indicators',
            color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
            textColor: 'text-emerald-400',
            icon: (
              <svg className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-9a2 2 0 00-2-2h-2a2 2 0 00-2 2v9a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            ),
          },
          {
            name: 'Tài khoản Passview',
            value: stats.passview,
            link: '/admin/passview',
            color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
            textColor: 'text-blue-400',
            icon: (
              <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            ),
          },
        ].map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`group relative overflow-hidden rounded border bg-gradient-to-b ${item.color} p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between min-h-[140px]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm font-semibold tracking-wide">{item.name}</span>
              <div className="p-2 rounded bg-zinc-950/50 border border-white/5">{item.icon}</div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className={`text-4xl font-extrabold tracking-tight text-white ${item.textColor}`}>
                {loading ? (
                  <span className="inline-block w-8 h-8 rounded bg-zinc-800 animate-pulse"></span>
                ) : (
                  item.value
                )}
              </span>
              <span className="text-xs text-zinc-500 font-bold group-hover:text-zinc-300 transition flex items-center gap-1">
                Quản lý
                <svg className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid: Activity Log & Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Logs */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Nhật ký hệ thống &amp; Hoạt động gần đây
            </h2>
            <span className="text-xs text-zinc-500 font-mono">Live</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {[
              {
                time: 'Vừa xong',
                type: 'CREATE',
                desc: 'Đã thêm mới Broker Exness vào cơ sở dữ liệu',
                color: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
              },
              {
                time: '15 phút trước',
                type: 'UPDATE',
                desc: 'Cập nhật điều kiện XM Welcome Bonus hoạt động',
                color: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
              },
              {
                time: '2 giờ trước',
                type: 'SYSTEM',
                desc: 'Khởi động cổng NestJS API thành công trên port 3005',
                color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
              },
              {
                time: ' Hôm qua',
                type: 'INDICATOR',
                desc: 'Cập nhật file tải xuống cho chỉ báo RSI Divergence Hunter',
                color: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
              },
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-950/80 transition"
              >
                <div className="flex gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border tracking-wider h-fit ${log.color}`}>
                    {log.type}
                  </span>
                  <p className="text-zinc-300 text-xs md:text-sm font-medium">{log.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-zinc-900 border border-zinc-800 rounded p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Lối tắt nhanh</h2>
            <div className="space-y-2">
              <Link
                href="/admin/brokers"
                className="flex items-center gap-3 p-3 rounded bg-zinc-950/60 border border-zinc-800/50 text-zinc-300 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/[0.03] transition group text-sm font-semibold"
              >
                <span>➕ Thêm sàn giao dịch mới</span>
              </Link>
              <Link
                href="/admin/offers"
                className="flex items-center gap-3 p-3 rounded bg-zinc-950/60 border border-zinc-800/50 text-zinc-300 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition group text-sm font-semibold"
              >
                <span>🏷️ Đăng khuyến mãi mới</span>
              </Link>
              <Link
                href="/admin/indicators"
                className="flex items-center gap-3 p-3 rounded bg-zinc-950/60 border border-zinc-800/50 text-zinc-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition group text-sm font-semibold"
              >
                <span>📈 Tải lên chỉ báo kỹ thuật</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <Link href="/" className="text-xs font-bold text-orange-400 hover:text-orange-300 transition flex items-center justify-center gap-1">
              Xem trang giao diện người dùng
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
