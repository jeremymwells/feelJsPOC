// imports ->
import * as feel from 'js-feel';
import * as es6 from 'es6-promise';
import * as fs from 'fs';
import * as path from 'path';

interface iFile {
  fullName: string, 
  extension: string, 
  baseName: string
}

export class DecisionTableService {
  
  verifiedFile(inputPath) : es6.Promise<iFile> {
    return new es6.Promise((resolve, reject) => {
      // if no path specified
      if (!inputPath){ 
        const error = { message: 'you must specify a path' };
        console.log(error);
        reject(error); 
      }
      
      //if file doesn't exist on server
      const fullName = path.resolve(path.relative(process.cwd(), inputPath));

      if (this.fileExists(fullName)) {
        const error = { message: `file does not exist: ${fullName}` };
        reject(error);
      }
      
      const extension = path.extname(fullName);
      const baseName = path.basename(fullName, extension);
      resolve({fullName, extension, baseName });

    })
  }

  getCSV(inputPath: string): es6.Promise<any> {
    return this.verifiedFile(inputPath)
      .then((file) => {
        return feel.decisionTable.xls_to_csv(file.fullName)
      });  
  }

  getDecisionTable(inputPath: string) : es6.Promise<any> {
    return this.getCSV(inputPath)
      .then((csv) => {
        return feel.decisionTable.csv_to_decision_table(csv[0]);
      });  
  }

  executeAgainstTable(inputPath: string, payload: any) : es6.Promise<any> {
    return this.verifiedFile(inputPath)
      .then((file: iFile) => {
        return this.getTableResult(file, payload);
      });
  }

  private fileExists(filePath) : boolean {
    let exists = false;
    try {
      if (fs.accessSync(filePath)){
        exists = true;
      }
    } catch(z) { }

    return exists;
  }

  private getTableResult(file: iFile, payload: any): es6.Promise<any> {
    return new es6.Promise((resolve, reject) => {
      feel.decisionTable.execute_decision_table(
        file.baseName,
        feel.decisionTable.csv_to_decision_table(feel.decisionTable.xls_to_csv(file.fullName)[0]),
        payload,
        (error, result) => {
          if (error) { 
            reject({ error });
            return;
          }
          resolve(result); 
        }
      );
    })
  }

}