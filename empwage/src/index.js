import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import database from './config/database';

import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

database();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);


app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}`);
});

export default app;
