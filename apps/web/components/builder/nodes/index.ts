import { StartNode } from './StartNode';
import { IndicatorNode } from './IndicatorNode';
import { PriceSourceNode } from './PriceSourceNode';
import { SmartAnalysisNode } from './SmartAnalysisNode';
import { ConditionNode } from './ConditionNode';
import { RiskNode } from './RiskNode';
import { OrderNode } from './OrderNode';
import { FinishNode } from './FinishNode';

export const nodeTypes = {
  start: StartNode,
  indicator: IndicatorNode,
  priceSource: PriceSourceNode,
  smc: SmartAnalysisNode,
  condition: ConditionNode,
  risk: RiskNode,
  order: OrderNode,
  finish: FinishNode,
};
