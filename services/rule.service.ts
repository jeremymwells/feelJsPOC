// imports ->
import * as feel from 'js-feel';
import * as es6 from 'es6-promise';
import * as fs from 'fs';
import * as path from 'path';

interface iActionableRule {
  rule: string, 
  context: any
}

//hack-->
feel.parse = feel.feel.parse;

export class RuleService {
  
  parse(actionableRule: iActionableRule): es6.Promise<any> {
    return new es6.Promise((resolve, reject) => {
      const grammar = feel.parse(actionableRule.rule);
      grammar.build(actionableRule.context)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject({ message: `feel parser error ${error}` });
        })
    })
    
  }

}