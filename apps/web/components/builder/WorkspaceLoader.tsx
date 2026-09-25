'use client';

import React, { useEffect, useState } from 'react';
import { Bot, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const WorkspaceLoader = ({
  onComplete,
  minDurationMs = 900,
}: {
  onComplete: () => void;
  minDurationMs?: number;
}) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, minDurationMs / 5);

    return () => clearInterval(timer);
  }, [minDurationMs, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050c12]/95 backdrop-blur-2xl text-slate-100 font-sans">
      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Glowing Logo Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-teal-500/20 blur-xl animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-teal-500/40 bg-teal-950/80 text-teal-300 shadow-2xl shadow-teal-500/30">
            <Bot className="h-10 w-10 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black tracking-tight text-white mb-1">
          VT Markets EA Quant Studio
        </h2>
        <p className="text-xs text-teal-400/80 mb-6 flex items-center gap-1.5 font-medium">
          <Cpu className="h-3.5 w-3.5" /> Khởi tạo Trình thiết kế Bot MT5 Visual Flow...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 border border-teal-500/20 rounded-full h-2 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-teal-300">
            <ShieldCheck className="h-3 w-3 text-teal-400" /> MT5 CTrade Pure 0-Error Engine
          </span>
          <span className="font-bold text-white">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
