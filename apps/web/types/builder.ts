export type NodeType = 
  | 'start' 
  | 'indicator' 
  | 'priceSource' 
  | 'smc' 
  | 'condition' 
  | 'risk' 
  | 'order' 
  | 'finish';

export interface NodeStartData {
  botName: string;
  symbol: string;
  timeframe: string;
  magicNumber: number;
  tradeComment: string;
  tradingSessions?: {
    useAsianSession: boolean;
    useLondonSession: boolean;
    useNewYorkSession: boolean;
  };
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeIndicatorData {
  indicator:
    | 'RSI' | 'EMA' | 'SMA' | 'MACD' | 'Bollinger' | 'ATR'
    | 'SuperTrend' | 'Stochastic' | 'Ichimoku'
    | 'WPR' | 'CCI' | 'ADX' | 'ParabolicSAR' | 'Envelopes' | 'MFI';
  period: number;
  periodFast?: number;   // MACD Fast EMA
  periodSlow?: number;   // MACD Slow EMA
  periodSignal?: number; // MACD Signal SMA
  periodK?: number;      // Stochastic %K
  periodD?: number;      // Stochastic %D
  tenkanPeriod?: number; // Ichimoku Tenkan-sen
  kijunPeriod?: number;  // Ichimoku Kijun-sen
  senkouPeriod?: number; // Ichimoku Senkou Span B
  appliedPrice: 'PRICE_CLOSE' | 'PRICE_OPEN' | 'PRICE_HIGH' | 'PRICE_LOW' | 'PRICE_TYPICAL';
  shift: number;
  deviation?: number;    // Bollinger / Envelopes deviation
  multiplier?: number;   // SuperTrend ATR multiplier
  sarStep?: number;      // Parabolic SAR step
  sarMaximum?: number;   // Parabolic SAR maximum
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodePriceSourceData {
  sourceType: 'OPEN' | 'HIGH' | 'LOW' | 'CLOSE' | 'ASK' | 'BID' | 'SPREAD';
  shift: number;
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeSmartAnalysisData {
  smcType: 'ORDER_BLOCK' | 'FAIR_VALUE_GAP' | 'LIQUIDITY_SWEEP' | 'BOS_CHOCH' | 'ENGULFING_CANDLE' | 'FIBONACCI_RETRACEMENT';
  zoneTimeframe: string;
  mitigationRequired: boolean;
  minPipsGap?: number;
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeConditionData {
  logicType: 'LESS_THAN' | 'GREATER_THAN' | 'CROSS_OVER' | 'CROSS_UNDER' | 'INSIDE_ZONE' | 'PRICE_ABOVE_INDICATOR' | 'PRICE_BELOW_INDICATOR';
  leftOperand: string;
  rightOperand: string;
  threshold: number;
  timeframe: string;
  isActive: boolean;
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeRiskData {
  riskMode: 'FIXED_LOT' | 'PERCENT_BALANCE' | 'VOLATILITY_ATR';
  lotSize: number;
  riskPercent: number;
  stopLossPips: number;
  takeProfitPips: number;
  trailingStopPips: number;
  breakEvenPips: number;
  maxDrawdownPercent: number;
  maxSpreadPoints: number;
  martingaleMultiplier?: number;
  useMartingale?: boolean;
  newsFilter: boolean;
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeOrderData {
  orderAction: 'BUY_MARKET' | 'SELL_MARKET' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP' | 'CLOSE_ALL' | 'CLOSE_OPPOSITE';
  partialClosePercent: number;
  slippagePoints: number;
  adminNote?: string;
  onDelete?: () => void;
}

export interface NodeFinishData {
  finishAction: 'ON_TICK_LOOP' | 'LOG_AND_NOTIFY' | 'SAVE_PROJECT';
  adminNote?: string;
  onDelete?: () => void;
}

export type CustomNodeData = 
  | ({ type: 'start' } & NodeStartData)
  | ({ type: 'indicator' } & NodeIndicatorData)
  | ({ type: 'priceSource' } & NodePriceSourceData)
  | ({ type: 'smc' } & NodeSmartAnalysisData)
  | ({ type: 'condition' } & NodeConditionData)
  | ({ type: 'risk' } & NodeRiskData)
  | ({ type: 'order' } & NodeOrderData)
  | ({ type: 'finish' } & NodeFinishData);

export interface FlowGraphPayload {
  botName: string;
  symbol: string;
  timeframe: string;
  nodes: {
    id: string;
    type: string;
    data: any;
    position: { x: number; y: number };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
  }[];
  targetPlatform?: 'mql5';
  notes?: string;
}

export interface StrategyTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  symbol: string;
  timeframe: string;
  nodes: any[];
  edges: any[];
}
