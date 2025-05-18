import express from 'express';
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes';
import {AppError, errorHandler} from "@/utils/errorUtils";
import rateLimit from "express-rate-limit";

const app = express();
const endpointsDoc = YAML.load("./swagger.yaml");

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet());
app.set('trust proxy', 1);
app.use(morgan('tiny'));

// Security
app.use(helmet());
app.use(helmet.hsts()); // HTTP Strict Transport Security
app.use(helmet.noSniff()); // Prevent browsers from sniffing MIME types
app.use(helmet.xssFilter()); // Prevent XSS attacks
app.use(helmet.frameguard()); // Prevent clickjacking

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
});

app.use(limiter);

// API Routes
app.use('/api', routes);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(endpointsDoc));

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Global error handler
app.use(errorHandler);

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
