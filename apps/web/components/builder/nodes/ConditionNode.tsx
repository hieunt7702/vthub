'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { GitCompare, Trash2 } from 'lucide-react';
import { NodeConditionData } from '@/types/builder';

export const ConditionNode = memo(({ data, selected }: { data: NodeConditionData; selected?: boolean }) => {
  const formatLogic = (type: string) => {
    switch (type) {
      case 'LESS_THAN':
        return '< Nhỏ Hơn';
      case 'GREATER_THAN':
        return '> Lớn Hơn';
      case 'CROSS_OVER':
        return '▲ Cắt Lên (Cross Above)';
      case 'CROSS_UNDER':
        return '▼ Cắt Xuống (Cross Below)';
      case 'INSIDE_ZONE':
        return 'Trong Vùng Vị Thế';
      case 'PRICE_ABOVE_INDICATOR':
        return 'Giá Nằm Trên Chỉ Báo';
      case 'PRICE_BELOW_INDICATOR':
        return 'Giá Nằm Dưới Chỉ Báo';
      default:
        return type;
    }
  };

  return (
    <div
      className={`relative min-w-[260px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-emerald-400 bg-emerald-950/80 shadow-emerald-500/20 ring-2 ring-emerald-500/40'
          : 'border-slate-800 bg-[#061412]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="cond_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-emerald-400 !bg-slate-950"
      />

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <GitCompare className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Điều Kiện Logic (Trigger)</div>
            <div className="text-xs font-extrabold text-white truncate max-w-[140px]">
              {data.leftOperand || 'RSI'}
            </div>
          </div>
        </div>
        {data.onDelete && (
          <button onClick={data.onDelete} className="p-1 text-slate-400 hover:text-red-400">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-2 p-3.5 text-xs">
        <div className="rounded-xl border border-emerald-500/20 bg-slate-950/70 p-2 text-center">
          <span className="text-[11px] font-bold text-emerald-300 block">{formatLogic(data.logicType)}</span>
          {data.threshold !== undefined && (
            <span className="font-mono text-xs font-black text-amber-300 mt-0.5 block">
              Ngưỡng: {data.threshold}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Khung xác nhận:</span>
          <span className="font-mono text-slate-200 font-bold">{data.timeframe || 'M5'}</span>
        </div>
      </div>

      {/* True Out (Green) */}
      <Handle
        type="source"
        position={Position.Right}
        id="true_out"
        style={{ top: '35%' }}
        className="!h-3 !w-3 !rounded-full !border-2 !border-emerald-400 !bg-slate-950"
      />
      {/* False Out (Red) */}
      <Handle
        type="source"
        position={Position.Right}
        id="false_out"
        style={{ top: '70%' }}
        className="!h-3 !w-3 !rounded-full !border-2 !border-rose-400 !bg-slate-950"
      />
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode';
