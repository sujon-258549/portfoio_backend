import { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';

export default async function (req: IncomingMessage, res: ServerResponse) {
  try {
    if (!config.database_url) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    if (mongoose.connection.readyState === 1) {
      return app(req, res);
    }
    await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000,
    });
    return app(req, res);
  } catch (error: any) {
    console.error('Database connection error:', error);
    res.statusCode = 500;
    res.end(`Internal Server Error: ${error.message}`);
  }
}
