// imports ->
import * as feel from 'js-feel';
import * as es6 from 'es6-promise';
import * as fs from 'fs';
import * as path from 'path';
import * as  _ from 'lodash';
import { iDecisionTable, DecisionTable } from '../models/decisionTable.model';

//hack-->
feel.parse = feel.feel.parse;

class Survey { 
  table: any;
  constructor(
    outputValues: any
  ) { }

  get questionList() {
    let questions = [];
    Object.keys(this).forEach((questionKey) => {
      if (questionKey === 'table') { return; }
      questions.push({
        question: `${questionKey}?`,
        responseEdges: this[questionKey].answers.domainOfValues
      })
    });
    return questions;
  }
}

class Question {

  constructor(
    public key: string
  ) { }

  answers: Answer
}

class Answer {
  constructor(
    public domainOfValues: any
  ) { }
  actual: any;
}

export class SurveyService {
  
  generate(decisionTable: iDecisionTable): es6.Promise<any> {
    return new es6.Promise((resolve, reject) => {
      try {
        let survey = new Survey(decisionTable.outputValues);
        survey.table = decisionTable;
        decisionTable.inputExpressionList.forEach((questionSuggestion, questionIndex) => {

          if (!survey[questionSuggestion]) {
            //initialize new Question
            let q = new Question(questionSuggestion);
            // q.answers = [];
            survey[questionSuggestion] = q;
          }

          //initialize Question answers
          survey[questionSuggestion].answers = new Answer(decisionTable.inputValuesList[questionIndex].split(','));
        });
        
        resolve(survey);
      } catch (z) {
        reject({message: `There was some error: ${z}`});
      }
      
    });
    
  }
}

export {
  Survey
}