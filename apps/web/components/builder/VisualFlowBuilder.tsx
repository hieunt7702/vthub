'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes';
import { NodePropertyDrawer } from './NodePropertyDrawer';
import { FlowGraphPayload, StrategyTemplate } from '@/types/builder';
import {
  Bot,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  Layers,
  Activity,
  ShieldAlert,
  ShoppingCart,
  CheckCircle2,
  FileCode2,
  ChevronDown,
  LayoutGrid,
  Zap,
} from 'lucide-react';

const INITIAL_NODES: Node[] = [
  {
    id: 'node_start_1',
    type: 'start',
    position: { x: 50, y: 150 },
    data: {
      botName: 'VT_Gold_Scalper_M5',
      symbol: 'XAUUSD',
      timeframe: 'M5',
      magicNumber: 778899,
      tradeComment: 'VT Rewards Hub AI',
    },
  },
  {
    id: 'node_ind_rsi',
    type: 'indicator',
    position: { x: 380, y: 50 },
    data: {
      indicator: 'RSI',
      period: 14,
      appliedPrice: 'PRICE_CLOSE',
      shift: 1,
    },
  },
  {
    id: 'node_ind_ema',
    type: 'indicator',
    position: { x: 380, y: 280 },
    data: {
      indicator: 'EMA',
      period: 50,
      appliedPrice: 'PRICE_CLOSE',
      shift: 0,
    },
  },
  {
    id: 'node_cond_buy',
    type: 'condition',
    position: { x: 720, y: 120 },
    data: {
      logicType: 'LESS_THAN',
      leftOperand: 'RSI(14)',
      threshold: 30,
      timeframe: 'M5',
      isActive: true,
    },
  },
  {
    id: 'node_risk_1',
    type: 'risk',
    position: { x: 1050, y: 100 },
    data: {
      riskMode: 'FIXED_LOT',
      lotSize: 0.05,
      riskPercent: 1.5,
      stopLossPips: 35,
      takeProfitPips: 60,
      trailingStopPips: 15,
      breakEvenPips: 20,
      maxDrawdownPercent: 10,
      maxSpreadPoints: 30,
      newsFilter: true,
    },
  },
  {
    id: 'node_order_buy',
    type: 'order',
    position: { x: 1390, y: 120 },
    data: {
      orderAction: 'BUY_MARKET',
      slippagePoints: 10,
      partialClosePercent: 0,
    },
  },
  {
    id: 'node_finish_1',
    type: 'finish',
    position: { x: 1720, y: 140 },
    data: {
      finishAction: 'ON_TICK_LOOP',
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  { id: 'e1', source: 'node_start_1', target: 'node_ind_rsi', animated: true },
  { id: 'e2', source: 'node_start_1', target: 'node_ind_ema', animated: true },
  { id: 'e3', source: 'node_ind_rsi', target: 'node_cond_buy', animated: true },
  { id: 'e4', source: 'node_cond_buy', target: 'node_risk_1', sourceHandle: 'true_out', animated: true },
  { id: 'e5', source: 'node_risk_1', target: 'node_order_buy', animated: true },
  { id: 'e6', source: 'node_order_buy', target: 'node_finish_1', animated: true },
];

const STRATEGY_TEMPLATES: StrategyTemplate[] = [
  {
    id: 'gold_scalp_m5',
    name: 'VT Gold Scalper (RSI + EMA 50)',
    badge: 'XAUUSD M5',
    description: 'Bắt đáy/đỉnh hồi quy của Vàng khi RSI chạm vùng quá bán/quá mua kết hợp theo xu hướng EMA.',
    symbol: 'XAUUSD',
    timeframe: 'M5',
    nodes: INITIAL_NODES,
    edges: INITIAL_EDGES,
  },
  {
    id: 'smc_orderblock_sniper',
    name: 'SMC Order Block Sniper Pro',
    badge: 'SMC H1/M5',
    description: 'Săn đón vùng Order Block chưa bị khai thác (Mitigation) kết hợp xác nhận cấu trúc BOS.',
    symbol: 'XAUUSD',
    timeframe: 'M5',
    nodes: [
      {
        id: 'node_start_smc',
        type: 'start',
        position: { x: 50, y: 150 },
        data: { botName: 'VT_SMC_Sniper_EA', symbol: 'XAUUSD', timeframe: 'M5', magicNumber: 998811 },
      },
      {
        id: 'node_smc_ob',
        type: 'smc',
        position: { x: 380, y: 140 },
        data: { smcType: 'ORDER_BLOCK', zoneTimeframe: 'H1', mitigationRequired: true },
      },
      {
        id: 'node_risk_smc',
        type: 'risk',
        position: { x: 740, y: 120 },
        data: { riskMode: 'PERCENT_BALANCE', riskPercent: 1.0, stopLossPips: 25, takeProfitPips: 75, trailingStopPips: 20, maxDrawdownPercent: 8 },
      },
      {
        id: 'node_order_smc',
        type: 'order',
        position: { x: 1100, y: 140 },
        data: { orderAction: 'BUY_MARKET', slippagePoints: 5 },
      },
      {
        id: 'node_finish_smc',
        type: 'finish',
        position: { x: 1440, y: 160 },
        data: { finishAction: 'ON_TICK_LOOP' },
      },
    ],
    edges: [
      { id: 'es1', source: 'node_start_smc', target: 'node_smc_ob', animated: true },
      { id: 'es2', source: 'node_smc_ob', target: 'node_risk_smc', animated: true },
      { id: 'es3', source: 'node_risk_smc', target: 'node_order_smc', animated: true },
      { id: 'es4', source: 'node_order_smc', target: 'node_finish_smc', animated: true },
    ],
  },
  {
    id: 'ema_crossover_trend',
    name: 'Double EMA Golden Cross (20 & 50)',
    badge: 'Trend Following',
    description: 'Chiến lược lướt sóng theo đà tăng trưởng khi đường EMA nhanh cắt lên EMA chậm.',
    symbol: 'EURUSD',
    timeframe: 'M15',
    nodes: [
      {
        id: 'node_start_ema',
        type: 'start',
        position: { x: 50, y: 150 },
        data: { botName: 'VT_EMA_Cross_EA', symbol: 'EURUSD', timeframe: 'M15', magicNumber: 554433 },
      },
      {
        id: 'node_ind_ema20',
        type: 'indicator',
        position: { x: 380, y: 50 },
        data: { indicator: 'EMA', period: 20, appliedPrice: 'PRICE_CLOSE' },
      },
      {
        id: 'node_ind_ema50',
        type: 'indicator',
        position: { x: 380, y: 250 },
        data: { indicator: 'EMA', period: 50, appliedPrice: 'PRICE_CLOSE' },
      },
      {
        id: 'node_cond_cross',
        type: 'condition',
        position: { x: 720, y: 130 },
        data: { logicType: 'CROSS_OVER', leftOperand: 'EMA(20)', rightOperand: 'EMA(50)', threshold: 0 },
      },
      {
        id: 'node_risk_ema',
        type: 'risk',
        position: { x: 1060, y: 110 },
        data: { riskMode: 'FIXED_LOT', lotSize: 0.1, stopLossPips: 30, takeProfitPips: 60, trailingStopPips: 15 },
      },
      {
        id: 'node_order_ema',
        type: 'order',
        position: { x: 1400, y: 130 },
        data: { orderAction: 'BUY_MARKET', slippagePoints: 10 },
      },
      {
        id: 'node_finish_ema',
        type: 'finish',
        position: { x: 1720, y: 150 },
        data: { finishAction: 'ON_TICK_LOOP' },
      },
    ],
    edges: [
      { id: 'ee1', source: 'node_start_ema', target: 'node_ind_ema20', animated: true },
      { id: 'ee2', source: 'node_start_ema', target: 'node_ind_ema50', animated: true },
      { id: 'ee3', source: 'node_ind_ema20', target: 'node_cond_cross', animated: true },
      { id: 'ee4', source: 'node_cond_cross', target: 'node_risk_ema', sourceHandle: 'true_out', animated: true },
      { id: 'ee5', source: 'node_risk_ema', target: 'node_order_ema', animated: true },
      { id: 'ee6', source: 'node_order_ema', target: 'node_finish_ema', animated: true },
    ],
  },
];

interface VisualFlowBuilderProps {
  onGenerateCode: (graph: FlowGraphPayload) => void;
  isGenerating: boolean;
}

export const VisualFlowBuilder: React.FC<VisualFlowBuilderProps> = ({
  onGenerateCode,
  isGenerating,
}) => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [nodeToolboxOpen, setNodeToolboxOpen] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Sync node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Sync edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Connect edges
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  // Select node
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Update node data from Property Drawer
  const handleUpdateNodeData = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === id) {
          // Preserve onDelete callback that may exist on the original node data
          return { ...n, data: { ...newData, onDelete: (n.data as any)?.onDelete } };
        }
        return n;
      })
    );
    if (selectedNode && selectedNode.id === id) {
      setSelectedNode((prev) => (prev ? { ...prev, data: newData } : null));
    }
  };

  // Add new Node
  const handleAddNode = (type: string, initialData: any = {}) => {
    const id = `node_${type}_${Date.now().toString().slice(-4)}`;
    const position = {
      x: 300 + Math.random() * 200,
      y: 150 + Math.random() * 150,
    };

    const newNode: Node = {
      id,
      type,
      position,
      data: {
        ...initialData,
        onDelete: () => {
          setNodes((nds) => nds.filter((n) => n.id !== id));
          setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
          setSelectedNode(null);
        },
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeToolboxOpen(false);
  };

  // Apply Template
  const handleApplyTemplate = (template: StrategyTemplate) => {
    setNodes(template.nodes);
    setEdges(template.edges);
    setSelectedNode(null);
    setTemplateDropdownOpen(false);
  };

  // Reset Canvas
  const handleResetCanvas = () => {
    if (confirm('Bạn có chắc chắn muốn làm mới toàn bộ sơ đồ Node?')) {
      setNodes(INITIAL_NODES);
      setEdges(INITIAL_EDGES);
      setSelectedNode(null);
    }
  };

  // Trigger Code Generation
  const handleTriggerGenerate = () => {
    const startNode = nodes.find((n) => n.type === 'start');
    const startData = (startNode?.data || {}) as Record<string, any>;
    const payload: FlowGraphPayload = {
      botName: (startData.botName as string) || 'VT_Quant_Bot',
      symbol: (startData.symbol as string) || 'XAUUSD',
      timeframe: (startData.timeframe as string) || 'M5',
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type || 'unknown',
        data: n.data,
        position: n.position,
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle,
      })),
      targetPlatform: 'mql5',
    };

    onGenerateCode(payload);
  };

  return (
    <div className="relative h-full w-full bg-[#03090e]" ref={reactFlowWrapper}>
      {/* Top Floating Control Toolbar */}
      <div className="absolute left-6 top-4 z-30 flex flex-wrap items-center gap-2 rounded-2xl border border-teal-500/25 bg-[#06141b]/90 p-2 shadow-2xl backdrop-blur-2xl">
        {/* Template Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-950/60 px-3 py-2 text-xs font-bold text-teal-300 hover:bg-teal-900/60 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Mẫu Bot Có Sẵn</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {templateDropdownOpen && (
            <div
              onMouseLeave={() => setTemplateDropdownOpen(false)}
              className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-teal-500/30 bg-[#07151e]/98 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in"
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-400 px-2 py-1">
                Chiến Lược Chuẩn VT Markets
              </div>
              <div className="space-y-1 mt-1">
                {STRATEGY_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleApplyTemplate(tpl)}
                    className="w-full text-left rounded-xl p-2.5 text-xs text-slate-200 hover:bg-teal-950/80 hover:text-white transition-colors border border-transparent hover:border-teal-500/20"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-white">{tpl.name}</span>
                      <span className="rounded bg-teal-500/20 px-1.5 py-0.5 text-[9px] font-bold text-teal-300">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{tpl.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Node Toolbox Button */}
        <div className="relative">
          <button
            onClick={() => setNodeToolboxOpen(!nodeToolboxOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-teal-400" />
            <span>Thêm Khối Node</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {nodeToolboxOpen && (
            <div
              onMouseLeave={() => setNodeToolboxOpen(false)}
              className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-slate-700 bg-[#07131b]/98 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in"
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                Danh Mục Khối MT5
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handleAddNode('indicator', { indicator: 'RSI', period: 14, appliedPrice: 'PRICE_CLOSE' })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-cyan-950/60 hover:text-cyan-300 transition-colors"
                >
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span>Chỉ Báo (Indicator)</span>
                </button>
                <button
                  onClick={() => handleAddNode('smc', { smcType: 'ORDER_BLOCK', zoneTimeframe: 'H1', mitigationRequired: true })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-indigo-950/60 hover:text-indigo-300 transition-colors"
                >
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span>SMC / Price Action</span>
                </button>
                <button
                  onClick={() => handleAddNode('condition', { logicType: 'LESS_THAN', leftOperand: 'RSI', threshold: 30, timeframe: 'M5' })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300 transition-colors"
                >
                  <Sliders className="h-4 w-4 text-emerald-400" />
                  <span>Điều Kiện Logic</span>
                </button>
                <button
                  onClick={() => handleAddNode('risk', { riskMode: 'FIXED_LOT', lotSize: 0.05, stopLossPips: 35, takeProfitPips: 50, trailingStopPips: 15 })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-amber-950/60 hover:text-amber-300 transition-colors"
                >
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                  <span>Quản Trị Vốn & Rủi Ro</span>
                </button>
                <button
                  onClick={() => handleAddNode('order', { orderAction: 'BUY_MARKET', slippagePoints: 10 })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-teal-950/60 hover:text-teal-300 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 text-teal-400" />
                  <span>Thực Thi Lệnh (CTrade)</span>
                </button>
                <div className="h-[1px] bg-slate-800/80 my-1" />
                <button
                  onClick={() => handleAddNode('start', { botName: 'VT_New_Bot', symbol: 'XAUUSD', timeframe: 'M5', magicNumber: Math.floor(100000 + Math.random() * 899999) })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-teal-950/60 hover:text-teal-300 transition-colors"
                >
                  <Bot className="h-4 w-4 text-teal-400" />
                  <span>Khởi Tạo Bot (Start)</span>
                </button>
                <button
                  onClick={() => handleAddNode('finish', { finishAction: 'ON_TICK_LOOP' })}
                  className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs text-slate-200 hover:bg-teal-950/60 hover:text-teal-300 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  <span>Kết Thúc Vòng Lặp (Finish)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reset Canvas Button */}
        <button
          onClick={handleResetCanvas}
          className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          title="Làm mới Canvas"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

        {/* PRIMARY ACTION: GENERATE MT5 CODE */}
        <button
          onClick={handleTriggerGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-xl border border-teal-400/40 bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 px-4 py-2 text-xs font-black text-slate-950 hover:brightness-110 hover:shadow-teal-500/40 hover:shadow-xl disabled:opacity-50 transition-all shadow-lg shadow-teal-500/25"
        >
          <Zap className="h-4 w-4 fill-slate-950" />
          <span>{isGenerating ? 'Đang Biên Dịch MT5...' : 'Sinh Mã Nguồn MT5 (.mq5)'}</span>
        </button>
      </div>

      {/* Main React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
        className="h-full w-full"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#0c3038" />
        <Controls className="!bg-[#07131b] !border-teal-500/30 !rounded-xl !shadow-xl [&>button]:!bg-[#07131b] [&>button]:!border-slate-800 [&>button]:!text-teal-300 hover:[&>button]:!text-white" />
      </ReactFlow>

      {/* Node Property Drawer */}
      <NodePropertyDrawer
        selectedNode={selectedNode}
        onUpdateNodeData={handleUpdateNodeData}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
