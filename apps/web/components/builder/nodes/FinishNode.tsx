'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, RotateCw, Trash2 } from 'lucide-react';
import { NodeFinishData } from '@/types/builder';

export const FinishNode = memo(({ data, selected }: { data: NodeFinishData; selected?: boolean }) => {
  return (
    <div
      className={`relative min-w-[240px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-teal-400 bg-teal-950/80 shadow-teal-500/20 ring-2 ring-teal-500/40'
          : 'border-slate-800 bg-[#071318]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="finish_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-teal-400 !bg-slate-950"
      />

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Vòng Lặp Thực Thi</div>
            <div className="text-xs font-extrabold text-white">OnTick() Loop Engine</div>
          </div>
        </div>
        {data.onDelete && (
          <button onClick={data.onDelete} className="p-1 text-slate-400 hover:text-red-400">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="p-3.5 text-xs">
        <div className="flex items-center gap-2 text-teal-300 bg-teal-950/40 p-2 rounded-xl border border-teal-500/20">
          <RotateCw className="h-4 w-4 animate-spin text-teal-400" />
          <span>Tự động lặp lại kiểm tra mỗi Bar mới & Tick mới</span>
        </div>
      </div>
    </div>
  );
});

FinishNode.displayName = 'FinishNode';
