import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Application Routes
app.use('/api', router);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Portfolio Backend is running!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
