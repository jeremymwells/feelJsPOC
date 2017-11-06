//imports ->
import * as express from 'express';
import * as feel from 'js-feel';
import * as services from '../services';
import * as es6 from 'es6-promise';
import { Survey } from '../services/survey.service';
//instances ->
const decisionTable = feel.decisionTable;

export class SurveyController implements iController {
    
  public path = '/survey';

  constructor(
    private decisionTableService: services.DecisionTableService = services.getDefault(services.DecisionTableService),
    private surveyService: services.SurveyService = services.getDefault(services.SurveyService)
  ){ }

  
  getRouter(): express.Router {

    let router = express.Router();

    router.get('/generate', (req, resp) => {
      return this.getSurvey(req.query.path)
        .then((survey) => {
          resp.status(200).send(survey);
        }, (error) => {
          resp.status(500).send(error.message);
        });
    });

    router.get('/generate/questions', (req, resp) => {
      return this.getSurvey(req.query.path)
        .then((survey) => {
          resp.status(200).send(survey.questionList);
        }, (error) => {
          resp.status(500).send(error.message);
        });
    });

    return router;
  }

  private getSurvey(path) : es6.Promise<Survey> {
    return this.decisionTableService.getDecisionTable(path)
      .then((decisionTable) => {
        return this.surveyService.generate(decisionTable);
      });
  }
}

export interface iController {
  path: string;
  getRouter(): express.Router;
}
  