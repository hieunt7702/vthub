'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot, Clock, Hash, ShieldAlert, Trash2 } from 'lucide-react';
import { NodeStartData } from '@/types/builder';

export const StartNode = memo(({ data, selected }: { data: NodeStartData; selected?: boolean }) => {
  return (
    <div
      className={`relative min-w-[260px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-teal-400 bg-teal-950/80 shadow-teal-500/20 ring-2 ring-teal-500/40'
          : 'border-teal-500/30 bg-[#071318]/90 hover:border-teal-400/60 shadow-black/60'
      }`}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between border-b border-teal-500/20 bg-teal-900/40 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Khởi Tạo Expert Advisor</div>
            <div className="text-xs font-extrabold text-white truncate max-w-[140px]">
              {data.botName || 'VT_Quant_Bot'}
            </div>
          </div>
        </div>
        {data.onDelete && (
          <button
            onClick={data.onDelete}
            className="rounded p-1 text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            title="Xóa Node"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Node Content */}
      <div className="space-y-2.5 p-3.5 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-teal-500/20 bg-slate-950/60 p-2">
            <span className="text-[10px] font-semibold text-slate-400 block">Cặp Giao Dịch</span>
            <span className="text-xs font-bold text-teal-300">{data.symbol || 'XAUUSD'}</span>
          </div>
          <div className="rounded-xl border border-teal-500/20 bg-slate-950/60 p-2">
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 text-teal-400" /> Khung TF
            </span>
            <span className="text-xs font-bold text-emerald-300">{data.timeframe || 'M5'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-2.5 py-1.5 text-[11px] text-slate-300">
          <span className="flex items-center gap-1 text-slate-400">
            <Hash className="h-3 w-3 text-amber-400" /> Magic Number
          </span>
          <span className="font-mono font-bold text-amber-300">{data.magicNumber || 778899}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-teal-400/80 bg-teal-950/40 px-2 py-1 rounded-lg border border-teal-500/20">
          <ShieldAlert className="h-3 w-3 shrink-0" />
          <span>MetaTrader 5 CTrade Pure Engine</span>
        </div>
      </div>

      {/* Output Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="flow_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-teal-400 !bg-slate-950 hover:!scale-125 transition-transform"
      />
    </div>
  );
});

StartNode.displayName = 'StartNode';
