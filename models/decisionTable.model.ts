

export interface iDecisionTable {
  inputExpressionList: string[];
  inputValuesList: string[];
  outputs: string[];
  outputValues: string[][];
  ruleList: string[][];
  hitPolicy: string;
  context: string;
}

export class DecisionTable implements iDecisionTable {
  inputExpressionList: string[];
  inputValuesList: string[];
  outputs: string[];
  outputValues: string[][];
  ruleList: string[][];
  hitPolicy: string;
  context: string;  
}