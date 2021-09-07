import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { successHandler } from '../utils/responseHandlers';
import logger from '../utils/logger';
import { statusApi } from '../constants/api';
import { status as statusStrings } from '../locales';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

export const startServer = (apiRouter, port, processId) => {
  app.get(statusApi.CHECK_STATUS, async (req, res) => {
    successHandler(res, { message: statusStrings.okStatus(processId) });
  });
  app.use('/', apiRouter);

  app.listen(port, (err) => {
    if (err) {
      logger.info(`Error : ${err}`);
      process.exit(-1);
    }

    logger.info(
      `Node Server is up for cluster-worker ${processId} at http://localhost:${port} port`,
    );
  });
};

export default {
  app,
  startServer,
};
