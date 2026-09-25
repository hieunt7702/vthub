'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VisualFlowBuilder } from '@/components/builder/VisualFlowBuilder';
import { CodeOutputModal } from '@/components/builder/CodeOutputModal';
import { WorkspaceLoader } from '@/components/builder/WorkspaceLoader';
import { FlowGraphPayload } from '@/types/builder';
import {
  ArrowLeft,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function BotBuilderPage() {
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [generatedResult, setGeneratedResult] = useState<{
    botName: string;
    mql5Code: string;
    summary: string;
    features: string[];
    provider: string;
  }>({
    botName: 'VT_Gold_Scalper_M5',
    mql5Code: '',
    summary: '',
    features: [],
    provider: 'VT Markets MT5 Engine',
  });

  const handleGenerateCode = async (graph: FlowGraphPayload) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/builder/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate',
          graph,
          targetPlatform: 'mql5',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedResult({
          botName: graph.botName || 'VT_Gold_Scalper_M5',
          mql5Code: data.mql5Code || data.code || '',
          summary: data.summary || 'Chiến lược Expert Advisor MT5 hoàn chỉnh.',
          features: data.features || ['MQL5 Pure Engine', 'CTrade Compatible'],
          provider: data.provider || 'VT Markets Pure MT5 Engine',
        });
        setIsModalOpen(true);
      } else {
        alert(data.error || 'Lỗi sinh mã nguồn từ hệ thống.');
      }
    } catch (err: any) {
      console.error('Error generating MT5 code:', err);
      alert('Không thể kết nối đến máy chủ sinh code. Vui lòng thử lại.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#03080e] text-slate-100 font-sans">
      {/* Workspace Loading Animation */}
      {isLoadingWorkspace && (
        <WorkspaceLoader onComplete={() => setIsLoadingWorkspace(false)} minDurationMs={900} />
      )}

      {/* Top Header Navigation */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-teal-500/20 bg-[#061118]/95 px-6 backdrop-blur-2xl z-30">
        {/* Left: Brand & Return link */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Trang Chủ</span>
          </Link>

          <div className="h-4 w-[1px] bg-teal-500/20" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-500/10">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm tracking-tight">Build EA Trading</span>
              <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[9px] font-black text-teal-300 border border-teal-500/30">
                VT Markets MQL5 Studio
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <Link
            href="/rewards"
            className="rounded-lg px-3 py-1.5 font-semibold text-slate-300 hover:bg-white/5 hover:text-teal-300 transition-colors"
          >
            🎁 Rewards & Thưởng
          </Link>
          <Link
            href="/indicators"
            className="rounded-lg px-3 py-1.5 font-semibold text-slate-300 hover:bg-white/5 hover:text-teal-300 transition-colors"
          >
            📊 Kho Chỉ Báo MT5
          </Link>
          <Link
            href="/ib-commission-overview"
            className="rounded-lg px-3 py-1.5 font-semibold text-slate-300 hover:bg-white/5 hover:text-teal-300 transition-colors"
          >
            💰 Cơ Chế IB & Rebate
          </Link>
        </div>

        {/* Right: Compiler Engine Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/60 px-3 py-1 text-xs text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="hidden sm:inline">Engine:</span>
            <strong className="text-white font-mono">Pure MQL5 0-Error</strong>
          </div>
        </div>
      </header>

      {/* Main Flow Studio Canvas */}
      <main className="relative flex-1 overflow-hidden">
        <VisualFlowBuilder
          onGenerateCode={handleGenerateCode}
          isGenerating={isGenerating}
        />
      </main>

      {/* Code Modal with Copy & Download */}
      <CodeOutputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        botName={generatedResult.botName}
        mql5Code={generatedResult.mql5Code}
        summary={generatedResult.summary}
        features={generatedResult.features}
        provider={generatedResult.provider}
      />
    </div>
  );
}
