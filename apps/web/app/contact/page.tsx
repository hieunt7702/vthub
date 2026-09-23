"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

interface BrokerOption {
  id: string;
  name: string;
}

const brokerList: BrokerOption[] = [
  { id: "12", name: "ATFX" },
  { id: "3", name: "AvaTrade" },
  { id: "11", name: "Axi" },
  { id: "4", name: "BCR" },
  { id: "25", name: "CXM" },
  { id: "26", name: "DBG Markets" },
  { id: "27", name: "Decode FX" },
  { id: "30", name: "Dupoin" },
  { id: "5", name: "EC Markets" },
  { id: "16", name: "ETO Markets" },
  { id: "10", name: "Exness" },
  { id: "14", name: "FPG" },
  { id: "2", name: "FXTM" },
  { id: "24", name: "GTCFX" },
  { id: "19", name: "HFM" },
  { id: "9", name: "IC Markets Global" },
  { id: "29", name: "Infinox" },
  { id: "22", name: "Lite Finance" },
  { id: "18", name: "Markets4you" },
  { id: "13", name: "Mitrade" },
  { id: "23", name: "Moneta Markets" },
  { id: "17", name: "PU Prime" },
  { id: "7", name: "STARTRADER" },
  { id: "21", name: "ThinkMarkets" },
  { id: "15", name: "TMGM" },
  { id: "32", name: "Ultima Markets" },
  { id: "33", name: "Vantage" },
  { id: "34", name: "VT Markets" },
  { id: "8", name: "XM" }
];

interface BannerSlot {
  code: string;
  label: string;
  price: string;
  size: string;
  ratio: string;
}

const bannerSlots: BannerSlot[] = [
  { code: "home_hero_top", label: "Global Top Banner (all pages)", price: "USD 2,500.00 / month", size: "970x90 px hoặc 728x90 px", ratio: "Mảnh khảnh ngang (10.7:1)" },
  { code: "home_after_top_brokers", label: "Home: After Top Brokers", price: "USD 1,800.00 / month", size: "1200x120 px", ratio: "Ngang rộng (10:1)" },
  { code: "all_brokers_infeed_card", label: "All Brokers: In-feed Card", price: "USD 1,200.00 / month", size: "380x250 px", ratio: "Hình chữ nhật (1.5:1)" },
  { code: "home_before_footer", label: "Global Footer Banner (all pages)", price: "USD 2,000.00 / month", size: "970x90 px", ratio: "Mảnh khảnh ngang (10.7:1)" },
  { code: "broker_detail_after_allow_restricted", label: "Broker Detail: After Allow & Restricted", price: "USD 900.00 / month", size: "300x250 px", ratio: "Hình hộp (1.2:1)" }
];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");

  const [selectedRole, setSelectedRole] = useState<"trader" | "ib" | "broker">("trader");
  const [inquiryType, setInquiryType] = useState("");

  // Trader specific fields
  const [traderCapital, setTraderCapital] = useState("");
  const [tradingExperience, setTradingExperience] = useState("");
  const [traderPriorities, setTraderPriorities] = useState<string[]>([]);
  const [traderDescription, setTraderDescription] = useState("");

  // IB specific fields
  const [ibBrokerId, setIbBrokerId] = useState("");
  const [commissionModel, setCommissionModel] = useState("");
  const [trafficChannelType, setTrafficChannelType] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [ibModelDescription, setIbModelDescription] = useState("");
  const [cooperationGoal, setCooperationGoal] = useState("");

  // Broker specific fields
  const [brokerCooperationDesc, setBrokerCooperationDesc] = useState("");
  const [bannerBrokerName, setBannerBrokerName] = useState("");
  const [bannerBrokerWebsite, setBannerBrokerWebsite] = useState("");
  const [bannerSlotCode, setBannerSlotCode] = useState("");
  const [bannerLandingUrl, setBannerLandingUrl] = useState("");
  const [bannerStartsAt, setBannerStartsAt] = useState("");
  const [bannerEndsAt, setBannerEndsAt] = useState("");
  const [bannerAdsDescription, setBannerAdsDescription] = useState("");

  // Creative file state
  const [creativeFile, setCreativeFile] = useState<File | null>(null);
  const [creativePreviewUrl, setCreativePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formSent, setFormSent] = useState(false);

  const handleRoleChange = (role: "trader" | "ib" | "broker") => {
    setSelectedRole(role);
    setInquiryType("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCreativeFile(file);
      if (file.type.startsWith("image/")) {
        setCreativePreviewUrl(URL.createObjectURL(file));
      } else {
        setCreativePreviewUrl(null);
      }
    }
  };

  const clearCreativeFile = () => {
    setCreativeFile(null);
    setCreativePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setTraderPriorities(values);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    alert("Cảm ơn bạn đã gửi liên hệ! Đội ngũ hỗ trợ HieuNTHUB sẽ phản hồi bạn trong 1-2h.");
  };

  const selectedSlot = bannerSlots.find(s => s.code === bannerSlotCode);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C] min-h-screen text-zinc-300">

        {/* Banner Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-4 animate-pulse">
              💬 {t("contact.support_1v1")}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("contact.title")}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
              {t("contact.subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4" />
                </svg>
                <span className="font-bold">{t("contact.response_24h")}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-amber-300">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-bold">{t("contact.pro_consulting")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left form container */}
            <div className="lg:col-span-2">
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 lg:p-8">

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white">{t("contact.form_title")}</h2>
                  <p className="text-sm text-zinc-400 mt-1">{t("contact.form_subtitle")}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8" id="contact-form">

                  {/* Basic Contact Info Section */}
                  <section className="space-y-4">
                    <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-orange-400 rounded-full inline-block"></span>
                      {t("contact.section.info")}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {t("contact.label.name")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {t("contact.label.phone")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {t("contact.label.email")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {t("contact.label.telegram")}
                        </label>
                        <input
                          type="text"
                          value={telegram}
                          onChange={(e) => setTelegram(e.target.value)}
                          placeholder="@username"
                          className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Group Selector Cards Section */}
                  <section className="space-y-4">
                    <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-orange-400 rounded-full inline-block"></span>
                      {t("contact.section.role")}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Chọn nhóm liên hệ">

                      {/* Trader Card */}
                      <button
                        type="button"
                        onClick={() => handleRoleChange("trader")}
                        className={`flex flex-col items-start gap-1 text-left rounded border p-4 transition-all duration-200 ${selectedRole === "trader"
                            ? "border-orange-400/60 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent shadow-lg shadow-amber-500/10"
                            : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-orange-400/40 hover:bg-white/[0.06]"
                          }`}
                      >
                        <strong className={`font-extrabold text-sm ${selectedRole === "trader" ? "text-orange-300" : "text-white"}`}>
                          {t("contact.role.trader")}
                        </strong>
                        <span className="text-[11px] text-zinc-400 leading-normal">
                          {t("contact.role.trader.desc")}
                        </span>
                      </button>

                      {/* IB Card */}
                      <button
                        type="button"
                        onClick={() => handleRoleChange("ib")}
                        className={`flex flex-col items-start gap-1 text-left rounded border p-4 transition-all duration-200 ${selectedRole === "ib"
                            ? "border-orange-400/60 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent shadow-lg shadow-amber-500/10"
                            : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-orange-400/40 hover:bg-white/[0.06]"
                          }`}
                      >
                        <strong className={`font-extrabold text-sm ${selectedRole === "ib" ? "text-orange-300" : "text-white"}`}>
                          {t("contact.role.ib")}
                        </strong>
                        <span className="text-[11px] text-zinc-400 leading-normal">
                          {t("contact.role.ib.desc")}
                        </span>
                      </button>

                      {/* Broker Card */}
                      <button
                        type="button"
                        onClick={() => handleRoleChange("broker")}
                        className={`flex flex-col items-start gap-1 text-left rounded border p-4 transition-all duration-200 ${selectedRole === "broker"
                            ? "border-orange-400/60 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent shadow-lg shadow-amber-500/10"
                            : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-orange-400/40 hover:bg-white/[0.06]"
                          }`}
                      >
                        <strong className={`font-extrabold text-sm ${selectedRole === "broker" ? "text-orange-300" : "text-white"}`}>
                          {t("contact.role.broker")}
                        </strong>
                        <span className="text-[11px] text-zinc-400 leading-normal">
                          {t("contact.role.broker.desc")}
                        </span>
                      </button>

                    </div>
                  </section>


                  {/* Dynamic Topic inquiry and fields section */}
                  <section className="space-y-4">
                    <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-orange-400 rounded-full inline-block"></span>
                      Nội dung cần hỗ trợ
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Nội dung cần hỗ trợ
                      </label>
                      <select
                        required
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full rounded border border-white/10 bg-[#161719] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition"
                      >
                        <option value="">Chọn một mục</option>
                        {selectedRole === "trader" && (
                          <>
                            <option value="trader_consultation">Trader: Tư vấn chọn broker</option>
                            <option value="other">Khác</option>
                          </>
                        )}
                        {selectedRole === "ib" && (
                          <>
                            <option value="ib_commission">IB: Tư vấn cơ chế hoa hồng</option>
                            <option value="ib_cooperation">IB: Đề nghị hợp tác</option>
                            <option value="other">Khác</option>
                          </>
                        )}
                        {selectedRole === "broker" && (
                          <>
                            <option value="broker_cooperation">Broker: Đề nghị hợp tác</option>
                            <option value="broker_listing">Broker: Listing trên hệ thống</option>
                            <option value="banner_ads">Broker: Treo banner quảng cáo</option>
                            <option value="other">Khác</option>
                          </>
                        )}
                      </select>
                      <p className="text-[11px] text-zinc-500">Chọn nội dung để xem luồng xử lý sau khi gửi.</p>
                    </div>

                    {/* Trader consultation sub-section fields */}
                    {inquiryType === "trader_consultation" && (
                      <div className="rounded border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.06] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ Trader: Tư vấn chọn broker
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Vốn dự kiến</label>
                            <input
                              type="text"
                              value={traderCapital}
                              onChange={(e) => setTraderCapital(e.target.value)}
                              placeholder="Ví dụ: $1,000"
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Kinh nghiệm giao dịch</label>
                            <select
                              value={tradingExperience}
                              onChange={(e) => setTradingExperience(e.target.value)}
                              className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            >
                              <option value="">Chọn một mức</option>
                              <option value="beginner">Mới bắt đầu</option>
                              <option value="intermediate">Trung cấp</option>
                              <option value="advanced">Nâng cao</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Ưu tiên chính (Giữ Ctrl / Cmd để chọn nhiều)</label>
                          <select
                            multiple
                            value={traderPriorities}
                            onChange={handlePriorityChange}
                            className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[120px]"
                          >
                            <option value="deposit_withdrawal">Ưu tiên nạp/rút nhanh</option>
                            <option value="execution_speed">Ưu tiên tốc độ khớp lệnh</option>
                            <option value="promotions">Ưu tiên nhiều khuyến mãi</option>
                            <option value="spread_cost">Ưu tiên spread / chi phí giao dịch thấp</option>
                            <option value="support_quality">Ưu tiên hỗ trợ nhanh 24/7</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mô tả thêm nhu cầu của bạn</label>
                          <textarea
                            value={traderDescription}
                            onChange={(e) => setTraderDescription(e.target.value)}
                            rows={4}
                            placeholder="Mô tả các sản phẩm giao dịch yêu thích (Vàng, Forex...) hoặc yêu cầu đặc biệt..."
                            className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[110px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* IB commission fields */}
                    {inquiryType === "ib_commission" && (
                      <div className="rounded border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.06] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ IB: Tư vấn cơ chế hoa hồng
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Broker cần tư vấn</label>
                            <select
                              value={ibBrokerId}
                              onChange={(e) => setIbBrokerId(e.target.value)}
                              className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            >
                              <option value="">Chọn sàn broker</option>
                              {brokerList.map((broker) => (
                                <option key={broker.id} value={broker.id}>{broker.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mô hình hoa hồng mong muốn</label>
                            <select
                              value={commissionModel}
                              onChange={(e) => setCommissionModel(e.target.value)}
                              className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            >
                              <option value="">Chọn một mô hình</option>
                              <option value="cpa">CPA</option>
                              <option value="revshare">RevShare</option>
                              <option value="hybrid">Hybrid (CPA + Revshare)</option>
                              <option value="rebate">Rebate (Hoa hồng lót)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Kênh traffic chính</label>
                            <select
                              value={trafficChannelType}
                              onChange={(e) => setTrafficChannelType(e.target.value)}
                              className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            >
                              <option value="">Chọn loại kênh</option>
                              <option value="online">Online (Website, Telegram, Youtube...)</option>
                              <option value="offline">Offline (Hội thảo, Văn phòng đại diện...)</option>
                              <option value="hybrid">Kết hợp online + offline</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Net/Volume giao dịch mỗi tháng</label>
                            <input
                              type="text"
                              value={monthlyVolume}
                              onChange={(e) => setMonthlyVolume(e.target.value)}
                              placeholder="Ví dụ: 1000 lots / tháng"
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mô tả mô hình hoạt động hiện tại</label>
                          <textarea
                            value={ibModelDescription}
                            onChange={(e) => setIbModelDescription(e.target.value)}
                            rows={4}
                            placeholder="Mô tả kỹ hơn về team, tệp khách hàng hoặc yêu cầu cơ chế lót đặc biệt..."
                            className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[110px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* IB cooperation fields */}
                    {inquiryType === "ib_cooperation" && (
                      <div className="rounded border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.06] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ IB: Đề nghị hợp tác
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mục tiêu hợp tác</label>
                          <textarea
                            value={cooperationGoal}
                            onChange={(e) => setCooperationGoal(e.target.value)}
                            rows={4}
                            required
                            placeholder="Mô tả phương án hoặc kế hoạch phát triển thị trường..."
                            className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[110px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Broker cooperation fields */}
                    {inquiryType === "broker_cooperation" && (
                      <div className="rounded border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.06] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ Broker: Đề nghị hợp tác
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mô tả đề xuất hợp tác</label>
                          <textarea
                            value={brokerCooperationDesc}
                            onChange={(e) => setBrokerCooperationDesc(e.target.value)}
                            rows={4}
                            required
                            placeholder="Đề xuất các chương trình chiến dịch truyền thông hoặc hợp tác đại lý..."
                            className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[110px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Broker listing fields */}
                    {inquiryType === "broker_listing" && (
                      <div className="rounded border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.06] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ Broker: Listing trên hệ thống
                        </div>
                        <p className="text-sm text-zinc-400">
                          Để gửi hồ sơ và thông số listing đầy đủ của broker lên hệ thống HieuNTHUB, vui lòng gửi qua form standard request của chúng tôi.
                        </p>
                        <div className="pt-2">
                          <Link href="/brokers/submit-request" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 hover:border-orange-400/40 hover:bg-orange-500/10 text-xs font-bold text-white transition">
                            Đi tới Broker Standard Request →
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Banner Ads fields */}
                    {inquiryType === "banner_ads" && (
                      <div className="rounded border border-orange-400/30 bg-gradient-to-b from-orange-500/[0.08] to-amber-500/[0.01] p-5 space-y-4 animate-fadeIn">
                        <div className="text-sm font-extrabold text-orange-200 flex items-center gap-1.5">
                          ✨ Broker: Treo banner quảng cáo
                        </div>

                        <p className="text-[11px] text-zinc-400">
                          Chọn vị trí và lịch chạy trước. Giá được chốt theo slot, đội ngũ sales sẽ xác nhận lịch cuối cùng.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tên broker</label>
                            <input
                              type="text"
                              required
                              value={bannerBrokerName}
                              onChange={(e) => setBannerBrokerName(e.target.value)}
                              placeholder="Ví dụ: EC Markets"
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Website broker</label>
                            <input
                              type="url"
                              required
                              value={bannerBrokerWebsite}
                              onChange={(e) => setBannerBrokerWebsite(e.target.value)}
                              placeholder="https://example.com"
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Vị trí banner</label>
                            <select
                              required
                              value={bannerSlotCode}
                              onChange={(e) => setBannerSlotCode(e.target.value)}
                              className="w-full rounded border border-white/10 bg-[#161719] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            >
                              <option value="">Chọn một vị trí</option>
                              {bannerSlots.map((slot) => (
                                <option key={slot.code} value={slot.code}>
                                  {slot.label} ({slot.price})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Link đích (Landing URL)</label>
                            <input
                              type="url"
                              required
                              value={bannerLandingUrl}
                              onChange={(e) => setBannerLandingUrl(e.target.value)}
                              placeholder="https://example.com/promo"
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>
                        </div>

                        {/* Slot Preview Panel */}
                        {selectedSlot && (
                          <div className="rounded border border-blue-400/30 bg-blue-500/10 p-4 space-y-2 text-sm text-zinc-300">
                            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                              <strong className="text-white">Preview thông số vị trí</strong>
                              <span className="rounded-full px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase">
                                {selectedSlot.price}
                              </span>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 text-xs">
                              <div>
                                <span className="text-zinc-400">Kích thước đề xuất:</span>{" "}
                                <strong className="text-white">{selectedSlot.size}</strong>
                              </div>
                              <div>
                                <span className="text-zinc-400">Tỉ lệ:</span>{" "}
                                <strong className="text-white">{selectedSlot.ratio}</strong>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Ngày bắt đầu dự kiến</label>
                            <input
                              type="date"
                              required
                              value={bannerStartsAt}
                              onChange={(e) => setBannerStartsAt(e.target.value)}
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Ngày kết thúc dự kiến</label>
                            <input
                              type="date"
                              required
                              value={bannerEndsAt}
                              onChange={(e) => setBannerEndsAt(e.target.value)}
                              className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition"
                            />
                          </div>
                        </div>

                        {/* Calendar Slot Conflicts Preview */}
                        {bannerSlotCode && bannerStartsAt && bannerEndsAt ? (
                          <div className="rounded border border-emerald-400/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
                            <div className="font-bold text-white mb-0.5">✅ Slot lịch trống an toàn</div>
                            <div>Vị trí này đang trống từ {bannerStartsAt} đến {bannerEndsAt}. Đội ngũ hỗ trợ sẽ lock giữ chỗ sau khi nhận form.</div>
                          </div>
                        ) : (
                          <div className="rounded border border-white/10 bg-white/[0.04] p-3.5 text-xs text-zinc-400">
                            <div className="font-semibold text-white mb-0.5">Đang chờ bạn chọn thời gian để kiểm tra</div>
                            <div>Hãy chọn vị trí + ngày bắt đầu/kết thúc để kiểm tra lịch trống.</div>
                          </div>
                        )}

                        {/* File Creative Uploader */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tệp creative</label>
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition"
                            >
                              Chọn tệp
                            </button>

                            {creativeFile && (
                              <button
                                type="button"
                                onClick={clearCreativeFile}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 transition"
                              >
                                Xoá tệp
                              </button>
                            )}

                            <span className="text-xs text-zinc-400 truncate max-w-[200px]">
                              {creativeFile ? creativeFile.name : "Chưa chọn tệp"}
                            </span>
                          </div>

                          <p className="text-[10px] text-zinc-500">
                            Chấp nhận .jpg, .jpeg, .png, .webp, .pdf. Tối đa 5MB.
                          </p>

                          {creativePreviewUrl && (
                            <div className="mt-2 rounded overflow-hidden border border-white/10 max-w-[280px] bg-zinc-950 p-1">
                              <img src={creativePreviewUrl} alt="Creative Preview" className="w-full h-auto rounded object-contain" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mô tả yêu cầu banner ads</label>
                          <textarea
                            value={bannerAdsDescription}
                            onChange={(e) => setBannerAdsDescription(e.target.value)}
                            rows={4}
                            placeholder="Mô tả kỹ hơn về các đề xuất kích thước hoặc yêu cầu thiết kế nếu có..."
                            className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 transition min-h-[110px]"
                          />
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Standard Desktop Form Submit Button */}
                  <div className="pt-4 border-t border-white/5 contact-submit-row-desktop">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-orange-400 to-amber-600 px-6 py-3.5 font-extrabold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/30"
                    >
                      Gửi liên hệ
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                </form>
              </div>
            </div>

            {/* Sidebar direct connects */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sticky top-24 space-y-6">

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[10px] font-bold text-orange-300 mb-3 uppercase tracking-wider">
                    📞 Kênh liên hệ
                  </div>
                  <h3 className="text-lg font-bold text-white">Hoặc nhắn trực tiếp</h3>
                </div>

                <div className="space-y-3">
                  {/* Telegram */}
                  <a
                    href="https://t.me/hieunthubco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-blue-400/40 hover:bg-blue-500/5 transition group"
                  >
                    <span className="h-10 w-10 rounded bg-blue-500/15 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-blue-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36 0-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.9-1.26 4.83-2.1 5.79-2.5 2.75-1.14 3.32-1.34 3.7-1.34.08 0 .26.02.38.12.1.08.13.2.14.3.01.07.02.21 0 .34z" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Telegram</div>
                      <div className="font-extrabold text-white text-sm truncate group-hover:text-blue-300 transition">
                        @hieunthubco
                      </div>
                    </div>
                    <svg className="h-4 w-4 text-zinc-500 group-hover:text-blue-300 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:admin@hieunthub.co"
                    className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-amber-400/40 hover:bg-amber-500/5 transition group"
                  >
                    <span className="h-10 w-10 rounded bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Email</div>
                      <div className="font-extrabold text-white text-sm truncate group-hover:text-amber-300 transition">
                        admin@hieunthub.co
                      </div>
                    </div>
                    <svg className="h-4 w-4 text-zinc-500 group-hover:text-amber-300 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Team meta properties tags */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <svg className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-white">Phản hồi 1-2 giờ</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Trong giờ hành chính của team support.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <svg className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-white">Team support tiếng Việt</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Làm việc trực tiếp, không dùng AI bot/dịch máy.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <svg className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-white">Dữ liệu bảo mật</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Tuyệt đối bảo mật thông tin liên hệ và cơ chế của bạn.</div>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>

        {/* Sticky Mobile Submit Button Panel */}
        <div className="contact-submit-sticky fixed bottom-0 left-0 right-0 z-30 p-3 bg-zinc-950/95 backdrop-blur-md border-t border-white/10 sm:hidden">
          <button
            type="submit"
            form="contact-form"
            className="w-full rounded bg-gradient-to-r from-orange-400 to-amber-600 py-3.5 font-extrabold text-zinc-950 text-center hover:from-orange-300 hover:to-amber-500 transition shadow-lg"
          >
            Gửi liên hệ →
          </button>
        </div>

      </main>
      <Footer />
    </>
  );
}
