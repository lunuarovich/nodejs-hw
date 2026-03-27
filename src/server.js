import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';

import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectMongoDB();
  const app = express();

  app.use(logger);
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use(notesRoutes);

  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
