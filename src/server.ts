import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🚀`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

bootstrap();

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
