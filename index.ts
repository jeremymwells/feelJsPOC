import * as express from 'express';
import * as controllers from './controllers';
import * as bodyParser from 'body-parser';

var app = express();

//middleware -->
app.use(bodyParser.json());

app.use('/', controllers.get());

app.listen(4000, () => {
  console.log('api @ localhost:4000/');
});