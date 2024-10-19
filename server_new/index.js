import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { connect } from 'mongoose';
import { generateRes } from './utils/api.js';
import CONFIG from './config/config.js';
import routes from './routes/index.js';
import limiter from './middlewares/requestLimiter.js';

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

app.use('/api', routes);

app.use((req, res) => {
  res.status(404);
  res.json(
    generateRes({ data: {}, message: 'Use not registered API', status: 404 }),
  );
});

async function start() {
  console.log('[CONFIG_MONGO]:', CONFIG.MONGO_URI);
  await connect(CONFIG.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(CONFIG.SERVER_PORT, () => {
    console.log(`Server is running on port: ${CONFIG.SERVER_PORT}`);
  });
}

start().catch(err => {
  console.log('Server Error:', err.message);
  process.exit(1);
});
