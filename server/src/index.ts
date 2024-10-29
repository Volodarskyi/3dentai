import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { connect } from 'mongoose';
import morgan from 'morgan';

import dotenv from 'dotenv';

import routes from './routes';

const app = express();
dotenv.config();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.set('trust proxy', 1);
app.use(morgan('tiny'));

app.use('/api', routes);

async function start() {
  if (typeof process.env.MONGO_URI === 'string') {
    await connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
  });
}

start().catch(err => {
  console.log('Server Error:', err.message);
  process.exit(1);
});
