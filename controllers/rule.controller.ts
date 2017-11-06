//imports ->
import * as express from 'express';
import * as feel from 'js-feel';
import * as services from '../services';

//instances ->
const decisionTable = feel.decisionTable;

export class RuleController implements iController {
    
  public path = '/rule';

  constructor(
    private ruleService: services.RuleService = services.getDefault(services.RuleService),
  ){ }

  getRouter(): express.Router {

    let router = express.Router();

    router.post('/evaluate', (req, resp) => {
      this.ruleService.parse(req.body)
        .then((result) => {
          resp.status(200).send(JSON.stringify(result));
        },(error) => {
          console.log(error);
          resp.status(500).send(error.message);
        });

    });

    return router;
  }
}

export interface iController {
  path: string;
  getRouter(): express.Router;
}
  