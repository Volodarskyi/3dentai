import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { connect } from 'mongoose';
import morgan from 'morgan';
import { generateRes } from './utils/api.js';
import CONFIG from './config/config.js';
import routes from './routes/index.js';
import limiter from './middlewares/requestLimiter.js';
import path from "path";
import {fileURLToPath} from "url";

const app = express();

// Manually define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.set('trust proxy', 1);
app.use(limiter);
app.use(morgan('tiny'));

app.use('/api', routes);

// Set static folder for public access
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
