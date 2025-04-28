import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
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

// MONGO DB CONNECTION
async function useMongoDB(mongoUri: string): Promise<void> {
  console.log('Connecting to MongoDB...');

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Successfully connected to MongoDB.');
  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }

  // Monitor MongoDB connection status
  mongoose.connection.on('connected', () => {
    console.log('🟢 MongoDB connection is active.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('🔴 MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('🟡 MongoDB disconnected.');
  });
}
//
// async function start() {
//   if (typeof process.env.MONGO_URI === 'string') {
//     await connect(process.env.MONGO_URI);
//   }
//
//   app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
//   });
// }

async function start() {
  try {
    if (typeof process.env.MONGO_URI === 'string') {
      await useMongoDB(process.env.MONGO_URI);
    } else {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`🚀 Server is running on port: ${process.env.SERVER_PORT}`);
    });

  } catch (err: any) {
    console.error('❌ Server Error:', err.message);
    process.exit(1);
  }
}

start();
