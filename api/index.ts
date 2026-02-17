import { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';

export default async function (req: IncomingMessage, res: ServerResponse) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.database_url as string);
    }
    return app(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
