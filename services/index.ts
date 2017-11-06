import { DecisionTableService } from './decisionTable.service';
import { RuleService } from './rule.service';
import { SurveyService } from './survey.service';

export function getDefault<T>(type: new () => T) : T {
  return new type();
}

export { 
  DecisionTableService,
  RuleService,
  SurveyService
};