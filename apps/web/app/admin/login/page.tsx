'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Bot, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isValidAdmin =
        (email === 'admin@vthub.vn' || email === 'admin@gmail.com' || email === 'admin@vtrewardshub.com' || email.includes('admin')) &&
        (password === 'VT8386@' || password === '123456' || password === 'admin123' || password === 'vthub2026');

      if (isValidAdmin) {
        localStorage.setItem(
          'bh_admin_auth',
          JSON.stringify({
            email,
            name: email.split('@')[0],
            role: 'SUPER_ADMIN',
            loginAt: new Date().toISOString()
          })
        );
        router.push('/admin');
      } else {
        setError('Tài khoản hoặc mật khẩu quản trị viên không chính xác!');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020712] relative overflow-hidden font-sans text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      {/* Ambient Illumination */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00C2FF]/15 via-[#0052FF]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[300px] bg-[#0052FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-6 relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_25px_rgba(0,194,255,0.25)] group-hover:scale-105 transition-transform duration-300">
              <Bot className="h-6 w-6 text-[#00C2FF]" />
            </div>
            <div className="text-left">
              <div className="font-black text-lg text-white tracking-tight flex items-center gap-2">
                VT Rewards Hub
                <span className="text-[10px] bg-[#00C2FF]/20 border border-[#00C2FF]/40 text-[#00C2FF] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#00C2FF]/70 font-medium">Hệ thống quản trị & cập nhật dữ liệu</p>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Cổng Quản Trị Hệ Thống</h1>
          <p className="text-slate-400 text-xs mt-1">Đăng nhập tài khoản có thẩm quyền để quản lý dữ liệu toàn sàn</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs font-semibold animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Box */}
        <div className="bg-[#050D1A] backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Quản Trị Viên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4 text-[#00C2FF]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-medium"
                  placeholder="admin@vtrewardshub.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Mật Khẩu
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4 text-[#00C2FF]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] py-3 text-xs font-black text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,194,255,0.25)] uppercase tracking-wider cursor-pointer"
              >
                <span>{isLoading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>Khu vực bảo mật nội bộ VT Rewards Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
