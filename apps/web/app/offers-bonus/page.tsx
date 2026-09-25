'use client';

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";
import { Gift, Zap, ShieldCheck, ArrowRight, Percent, Sparkles, Bot, DollarSign } from "lucide-react";
import { useVTDataStore, STORAGE_KEYS, INITIAL_OFFERS, VTOffer } from "../../lib/dataStore";

export default function OffersBonusPage() {
  const [offers] = useVTDataStore<VTOffer>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);

  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 font-sans flex flex-col selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-14 px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative max-w-4xl mx-auto z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-3.5 py-1 text-xs font-bold text-[#00C2FF] mb-4 uppercase tracking-widest shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-[#00C2FF]" />
              <span>Hệ Thống Ưu Đãi & Hoàn Phí VT Markets</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 uppercase">
              Chương Trình Thưởng & <span className="text-[#00C2FF]">Hoàn Phí Backcom Tự Động</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Tổng hợp toàn bộ chương trình hoàn phí Rebate cao nhất thị trường, ưu đãi nạp tiền và quyền lợi độc quyền dành cho khách hàng giao dịch tại sàn VT Markets.
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-3xl border border-slate-800 bg-[#050D1A] p-6 sm:p-8 hover:border-[#00C2FF]/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-black tracking-wider uppercase ${offer.badgeColor || 'bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30'}`}>
                      {offer.tag || 'ƯU ĐÃI'}
                    </span>
                    {offer.hot && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00C2FF] text-slate-950 text-[10px] font-black uppercase">
                        Khuyên dùng số 1
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-white mb-2">{offer.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{offer.description}</p>

                  {offer.highlights && offer.highlights.length > 0 && (
                    <div className="space-y-2 mb-8">
                      {offer.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <ShieldCheck className="h-4 w-4 text-[#00C2FF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  {offer.actionLink && offer.actionLink.startsWith('http') ? (
                    <a
                      href={offer.actionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#0052FF] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{offer.actionText || 'Nhận Ưu Đãi'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={offer.actionLink || '/rewards'}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#08152B] hover:bg-[#0b1d3a] border border-slate-700 text-slate-200 font-black text-xs uppercase tracking-wider transition-all"
                    >
                      <span>{offer.actionText || 'Khám Phá Chi Tiết'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00C2FF]" />
                    </Link>
                  )}
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
