import * as express from 'express';
import { DecisionTableController } from './decisionTable.controller';
import { RuleController } from './rule.controller';
import { SurveyController } from './survey.controller';

const decisionTableCtrl = new DecisionTableController();
const ruleCtrl = new RuleController();
const questionCtrl = new SurveyController();

//TODO: refactor this to require less typing.
export function get() : express.Router {

    const ctrlRouter = express();

    ctrlRouter.use(decisionTableCtrl.path, decisionTableCtrl.getRouter());
    ctrlRouter.use(ruleCtrl.path, ruleCtrl.getRouter());
    ctrlRouter.use(questionCtrl.path, questionCtrl.getRouter());

    return ctrlRouter;
}
