"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useState, useMemo } from "react";
import Link from "next/link";

interface PassviewAccount {
  id: string;
  brokerId: string;
  brokerName: string;
  brokerLogo: string;
  rating: string;
  accountType: string;
  platform: "MT4" | "MT5";
  status: string;
  server: string;
  login: string;
  passwordInvestor: string;
  registerLinks: {
    label: string;
    href: string;
    group: "Link khách lẻ" | "Link IB";
  }[];
  reviewUrl: string;
}

const passviewAccountsData: PassviewAccount[] = [
  {
    id: "10",
    brokerId: "27",
    brokerName: "Decode FX",
    brokerLogo: "https://hieunthub.co/uploads/brokers/logos/01KJRT63W817Z9E23DS8VB46F4.webp",
    rating: "4.4",
    accountType: "USD-STD-11X",
    platform: "MT4",
    status: "Ổn định",
    server: "DecodeGlobalLtd-Live02",
    login: "20005529",
    passwordInvestor: "HieuNTHub@123",
    registerLinks: [
      { label: "Primary Register Link", href: "/brokers/danh-gia-decode-fx", group: "Link khách lẻ" },
      { label: "Premium Level 1", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "Premium Level 2", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "Premium Level 3", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "VIP Partner", href: "/brokers/danh-gia-decode-fx", group: "Link IB" }
    ],
    reviewUrl: "/brokers/danh-gia-decode-fx"
  },
  {
    id: "6",
    brokerId: "27",
    brokerName: "Decode FX",
    brokerLogo: "https://hieunthub.co/uploads/brokers/logos/01KJRT63W817Z9E23DS8VB46F4.webp",
    rating: "4.4",
    accountType: "USD-PRO 4",
    platform: "MT4",
    status: "Ổn định",
    server: "DecodeGlobalLtd-Live02",
    login: "20005528",
    passwordInvestor: "HieuNTHub@123",
    registerLinks: [
      { label: "Primary Register Link", href: "/brokers/danh-gia-decode-fx", group: "Link khách lẻ" },
      { label: "Premium Level 1", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "Premium Level 2", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "Premium Level 3", href: "/brokers/danh-gia-decode-fx", group: "Link IB" },
      { label: "VIP Partner", href: "/brokers/danh-gia-decode-fx", group: "Link IB" }
    ],
    reviewUrl: "/brokers/danh-gia-decode-fx"
  },
  {
    id: "14",
    brokerId: "14",
    brokerName: "FPG",
    brokerLogo: "https://hieunthub.co/uploads/brokers/logos/01KJ4SZ9MX514MM28ZN1QY197E.webp",
    rating: "4.7",
    accountType: "PRO20",
    platform: "MT5",
    status: "Ổn định",
    server: "FortunePrime-Live2",
    login: "80039172",
    passwordInvestor: "HieuNTHub@123",
    registerLinks: [
      { label: "Primary Register Link", href: "/brokers/danh-gia-fortune-prime-global", group: "Link khách lẻ" },
      { label: "Premium Level 1", href: "/brokers/danh-gia-fortune-prime-global", group: "Link IB" }
    ],
    reviewUrl: "/brokers/danh-gia-fortune-prime-global"
  }
];

export default function PassviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"" | "MT4" | "MT5">("");

  // Clipboard copied status trackers
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  // Passwords reveal states
  const [revealedStates, setRevealedStates] = useState<Record<string, boolean>>({});

  // Report modal state
  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    accountId: string;
    brokerId: string;
    platform: string;
    title: string;
    note: string;
  }>({
    isOpen: false,
    accountId: "",
    brokerId: "",
    platform: "",
    title: "",
    note: ""
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const filteredAccounts = useMemo(() => {
    return passviewAccountsData.filter(account => {
      const matchPlatform = selectedPlatform === "" || account.platform === selectedPlatform;
      const matchQuery = searchQuery === "" ||
        account.brokerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.server.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.login.includes(searchQuery);
      return matchPlatform && matchQuery;
    });
  }, [searchQuery, selectedPlatform]);

  const openReport = (accountId: string, brokerId: string, platform: string, brokerName: string, accountLogin: string) => {
    setReportModal({
      isOpen: true,
      accountId,
      brokerId,
      platform,
      title: `${brokerName} • ${accountLogin}`,
      note: ""
    });
  };

  const closeReport = () => {
    setReportModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Đã gửi báo cáo lỗi thành công cho tài khoản ${reportModal.title}!`);
    setTimeout(() => setToastMessage(""), 4000);
    closeReport();
  };

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C] min-h-screen">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute -top-40 right-0 w-[700px] h-[500px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-12">
            {/* Breadcrumbs */}
            <nav className="text-xs text-zinc-500 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-orange-300 transition">Trang chủ</Link>
              <span>›</span>
              <span className="text-zinc-300">Passview</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  MINH BẠCH 100%
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
                  <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">Passview</span>
                  <span className="block mt-1">Theo dõi sàn live thực tế</span>
                </h1>
                <p className="mt-4 max-w-2xl text-zinc-300 text-base md:text-lg leading-relaxed">
                  Đăng nhập investor mode tài khoản thật của HieuNTHUB để xem giao dịch live, spread thật, slippage thật — ngay trên MT4/MT5. Không demo, không fake.
                </p>

                <div className="mt-5 flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span>Verified bởi HieuNTHUB</span>
                  </div>
                  <span className="text-zinc-700">·</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                    </svg>
                    <span>Investor mode (read-only)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 md:p-6">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-orange-300 font-bold mb-3">TRẠNG THÁI HIỆN TẠI</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-white/[0.04] border border-white/10 p-4">
                      <div className="text-3xl md:text-4xl font-extrabold text-orange-300 tabular-nums">10</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Tài khoản công khai</div>
                    </div>
                    <div className="rounded bg-white/[0.04] border border-white/10 p-4">
                      <div className="text-3xl md:text-4xl font-extrabold text-blue-300 tabular-nums">5</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Sàn covered</div>
                    </div>
                    <div className="rounded bg-white/[0.04] border border-white/10 p-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-extrabold text-emerald-300 tabular-nums">8</span>
                        <span className="text-xs text-zinc-500">/ 2</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">MT5 / MT4</div>
                    </div>
                    <div className="rounded bg-white/[0.04] border border-white/10 p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-3xl md:text-4xl font-extrabold text-emerald-300 tabular-nums">10</span>
                        <span className="text-xs text-emerald-400">●</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Khoẻ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-2">
                📖 CÁCH SỬ DỤNG
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">3 bước theo dõi sàn live</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 hover:border-orange-400/30 transition group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded bg-orange-500/15 border border-orange-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition">📋</div>
                  <div className="text-3xl font-extrabold text-orange-300/40 tabular-nums">01</div>
                </div>
                <h3 className="font-extrabold text-white text-base mb-1">Copy server + login + password</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Click nút copy ở từng tài khoản bên dưới — credentials sẽ vào clipboard.</p>
              </div>
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 hover:border-blue-400/30 transition group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition">💻</div>
                  <div className="text-3xl font-extrabold text-blue-300/40 tabular-nums">02</div>
                </div>
                <h3 className="font-extrabold text-white text-base mb-1">Mở MT4/MT5 (web hoặc app)</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Dùng app cài sẵn hoặc web terminal. Login → chọn server từ list → paste credentials.</p>
              </div>
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 hover:border-emerald-400/30 transition group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition">👁</div>
                  <div className="text-3xl font-extrabold text-emerald-300/40 tabular-nums">03</div>
                </div>
                <h3 className="font-extrabold text-white text-base mb-1">Quan sát live (read-only)</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">Xem lệnh đang chạy, history, P&L. Không thể đặt lệnh — đây là investor password an toàn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Sticky Search & Filter Panel */}
        <section className="border-b border-white/5 sticky top-16 z-20 backdrop-blur-md bg-[#090A0C]/90">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m21 21-4.3-4.3" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm theo tên broker, server, login..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-white/10 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition animate-none"
                />
              </div>

              <div className="flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.04] p-1 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform("")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition ${selectedPlatform === ""
                      ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 shadow-md shadow-orange-500/25"
                      : "text-zinc-300 hover:bg-white/5 hover:text-orange-300"
                    }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform("MT4")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition ${selectedPlatform === "MT4"
                      ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 shadow-md shadow-orange-500/25"
                      : "text-zinc-300 hover:bg-white/5 hover:text-orange-300"
                    }`}
                >
                  MT4
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform("MT5")}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition ${selectedPlatform === "MT5"
                      ? "bg-gradient-to-r from-orange-400 to-amber-600 text-zinc-950 shadow-md shadow-orange-500/25"
                      : "text-zinc-300 hover:bg-white/5 hover:text-orange-300"
                    }`}
                >
                  MT5
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Accounts List Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white">Toàn bộ tài khoản công khai</h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  <strong className="text-white">{filteredAccounts.length}</strong> tài khoản được tìm thấy
                </p>
              </div>
            </div>

            {filteredAccounts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded bg-white/[0.01]">
                <span className="text-4xl">🔍</span>
                <h3 className="mt-3 text-lg font-bold text-white">Không tìm thấy tài khoản phù hợp</h3>
                <p className="text-sm text-zinc-500 mt-1">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAccounts.map((account) => {
                  const serverCopied = copiedStates[`${account.id}-server`];
                  const loginCopied = copiedStates[`${account.id}-login`];
                  const pwdCopied = copiedStates[`${account.id}-pwd`];
                  const pwdRevealed = revealedStates[account.id];

                  // Group links
                  const retailLinks = account.registerLinks.filter(l => l.group === "Link khách lẻ");
                  const ibLinks = account.registerLinks.filter(l => l.group === "Link IB");

                  return (
                    <article key={account.id} className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-orange-400/25 transition">
                      <div className="grid lg:grid-cols-12 gap-0">

                        {/* Profile Info block */}
                        <div className="lg:col-span-4 p-5 lg:border-r border-white/5 flex flex-col gap-3">
                          <Link href={account.reviewUrl} className="flex items-start gap-3 group min-w-0">
                            <img src={account.brokerLogo} alt={account.brokerName} className="h-14 w-14 rounded object-cover shrink-0" loading="lazy" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <strong className="font-extrabold text-white text-base group-hover:text-orange-300 transition truncate">{account.brokerName}</strong>
                                <svg className="h-4 w-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="verified">
                                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                </svg>
                              </div>
                              <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                                <span className="text-amber-400">★</span>
                                <span className="font-bold text-white">{account.rating}</span>
                                <span className="text-zinc-500">/5</span>
                              </div>
                            </div>
                          </Link>

                          <div className="flex flex-wrap gap-1.5">
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">{account.accountType}</span>
                            <span className="rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">{account.platform}</span>
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <span className="text-emerald-400">●</span> {account.status}
                            </span>
                          </div>
                        </div>

                        {/* Credentials block */}
                        <div className="lg:col-span-5 p-5 lg:border-r border-white/5">
                          <div className="text-[10px] uppercase tracking-[0.12em] text-orange-300 font-bold mb-3">THÔNG TIN ĐĂNG NHẬP</div>
                          <div className="space-y-2">

                            {/* Server field */}
                            <div className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] hover:border-orange-400/25 hover:bg-orange-500/5 px-3 py-2.5 transition group">
                              <span className="h-7 w-7 rounded bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs shrink-0">🌐</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Server</div>
                                <div className="text-sm font-mono text-white truncate select-all">{account.server}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(`${account.id}-server`, account.server)}
                                className={`h-7 w-7 rounded border flex items-center justify-center transition ${serverCopied
                                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                                    : "border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 text-zinc-400"
                                  }`}
                                title={serverCopied ? "Đã sao chép" : "Sao chép"}
                              >
                                {serverCopied ? (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg>
                                ) : (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2" /><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></svg>
                                )}
                              </button>
                            </div>

                            {/* Login field */}
                            <div className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] hover:border-orange-400/25 hover:bg-orange-500/5 px-3 py-2.5 transition group">
                              <span className="h-7 w-7 rounded bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs shrink-0">#</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Login</div>
                                <div className="text-sm font-mono text-white truncate select-all">{account.login}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(`${account.id}-login`, account.login)}
                                className={`h-7 w-7 rounded border flex items-center justify-center transition ${loginCopied
                                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                                    : "border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 text-zinc-400"
                                  }`}
                                title={loginCopied ? "Đã sao chép" : "Sao chép"}
                              >
                                {loginCopied ? (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg>
                                ) : (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2" /><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></svg>
                                )}
                              </button>
                            </div>

                            {/* Password field */}
                            <div className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] hover:border-orange-400/25 hover:bg-orange-500/5 px-3 py-2.5 transition group">
                              <span className="h-7 w-7 rounded bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs shrink-0">🔑</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Mật khẩu investor</div>
                                <div className="text-sm font-mono text-white truncate">
                                  {pwdRevealed ? account.passwordInvestor : "••••••••••••"}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setRevealedStates(prev => ({ ...prev, [account.id]: !pwdRevealed }))}
                                className="h-7 w-7 rounded border border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 flex items-center justify-center text-zinc-400 transition"
                                title={pwdRevealed ? "Ẩn" : "Hiện"}
                              >
                                {pwdRevealed ? (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c4.477 0 8.268 2.943 9.542 7a10.5 10.5 0 0 1-1.84 2.86M6.61 6.61A13.526 13.526 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.66 0 3.234-.404 4.617-1.12M2 2l20 20" /></svg>
                                ) : (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopy(`${account.id}-pwd`, account.passwordInvestor)}
                                className={`h-7 w-7 rounded border flex items-center justify-center transition ${pwdCopied
                                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                                    : "border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300 text-zinc-400"
                                  }`}
                                title={pwdCopied ? "Đã sao chép" : "Sao chép"}
                              >
                                {pwdCopied ? (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg>
                                ) : (
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2" /><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></svg>
                                )}
                              </button>
                            </div>

                          </div>
                        </div>

                        {/* CTA / Actions block */}
                        <div className="lg:col-span-3 p-5 flex flex-col gap-2">
                          <details className="ref-link-menu relative" data-prefer-dropup="1">
                            <summary className="flex items-center justify-center gap-2 rounded border border-orange-400/30 bg-orange-500/10 hover:border-orange-400/50 hover:bg-orange-500/20 px-4 py-2.5 text-sm font-bold text-orange-200 transition ref-link-menu-summary cursor-pointer select-none">
                              <span>Đăng ký</span>
                              <span className="ref-link-menu-caret" aria-hidden="true">
                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                              </span>
                            </summary>

                            <div className="absolute right-0 bottom-full mb-1 w-56 rounded border border-white/10 bg-zinc-950 p-2 shadow-2xl z-30" role="menu">
                              {retailLinks.length > 0 && (
                                <>
                                  <div className="px-3 py-1 text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Link khách lẻ</div>
                                  {retailLinks.map((link, lIdx) => (
                                    <Link key={lIdx} href={link.href} className="block w-full text-left px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/5 hover:text-orange-300 rounded transition" role="menuitem">
                                      {link.label}
                                    </Link>
                                  ))}
                                </>
                              )}
                              {ibLinks.length > 0 && (
                                <>
                                  <div className="px-3 py-1 text-[9px] uppercase tracking-wider text-zinc-500 font-bold mt-2 pt-2 border-t border-white/5">Link IB</div>
                                  {ibLinks.map((link, lIdx) => (
                                    <Link key={lIdx} href={link.href} className="block w-full text-left px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/5 hover:text-orange-300 rounded transition" role="menuitem">
                                      {link.label}
                                    </Link>
                                  ))}
                                </>
                              )}
                            </div>
                          </details>

                          <Link href={account.reviewUrl} className="flex items-center justify-center gap-2 rounded border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition">
                            👁 Xem
                          </Link>

                          <button
                            type="button"
                            onClick={() => openReport(account.id, account.brokerId, account.platform, account.brokerName, account.login)}
                            className="flex items-center justify-center gap-2 rounded border border-white/10 bg-white/[0.02] hover:border-rose-400/30 hover:bg-rose-500/5 hover:text-rose-300 px-4 py-2 text-xs font-semibold text-zinc-400 transition mt-auto"
                            aria-label="Báo passview lỗi"
                          >
                            ⚠ Báo lỗi
                          </button>
                        </div>

                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Custom Glassmorphic Report Modal Overlay */}
        {reportModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded border border-white/10 bg-gradient-to-b from-[#131518] to-[#0A0B0D] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={closeReport}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <h3 className="text-xl font-extrabold text-white mb-2">Báo lỗi Passview</h3>
              <p className="text-xs text-zinc-400 mb-4">Mục tiêu: <strong className="text-orange-300">{reportModal.title}</strong></p>

              <form onSubmit={handleSendReport} className="space-y-4">
                <input type="hidden" name="accountId" value={reportModal.accountId} />
                <input type="hidden" name="brokerId" value={reportModal.brokerId} />
                <input type="hidden" name="platform" value={reportModal.platform} />

                <div>
                  <label htmlFor="issueNote" className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1.5">Mô tả chi tiết lỗi</label>
                  <textarea
                    id="issueNote"
                    rows={4}
                    required
                    placeholder="Mật khẩu sai, server không kết nối được, tài khoản bị khóa..."
                    value={reportModal.note}
                    onChange={(e) => setReportModal(prev => ({ ...prev, note: e.target.value }))}
                    className="w-full rounded border border-white/10 bg-white/[0.04] p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition resize-none"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={closeReport}
                    className="rounded border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-300 hover:to-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition shadow-lg shadow-orange-500/20"
                  >
                    Gửi báo cáo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Toast Success Message */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded border border-emerald-400/30 bg-[#0F1E19] px-4 py-3.5 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
            <span className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">✓</span>
            <p className="text-xs font-semibold text-emerald-200 leading-relaxed">{toastMessage}</p>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
