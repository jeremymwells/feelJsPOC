//imports ->
import * as express from 'express';
import * as feel from 'js-feel';
import * as services from '../services';

//instances ->
const decisionTable = feel.decisionTable;

export class DecisionTableController implements iController {
    
  public path = '/table';

  constructor(
    private decisionTableService: services.DecisionTableService = services.getDefault(services.DecisionTableService),
  ){ }

  getRouter(): express.Router {

    let router = express.Router();

    router.get('/', (req, resp) => {
      this.decisionTableService.getDecisionTable(req.query.path)
        .then((table) => {
          resp.send(table);
        },(error) => {
          console.log(error);
          resp.status(500).send(error.message);
        });

    });
    
    router.post('/', (req,resp) => {
      this.decisionTableService.executeAgainstTable(req.query.path, req.body)
        .then((result) => {
          resp.send(result);
        }, (error) => {
          console.log(error);
          resp.status(500).send(error.message);
        });
    });

    router.get('/csv', (req, resp) => {
      this.decisionTableService.getCSV(req.query.path)
        .then((table) => {
          resp.send(table);
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
  