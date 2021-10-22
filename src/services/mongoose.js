import mongoose from 'mongoose';

import { MONGO_URI, ENV, EnvironmentsEnum } from '../constants/environments';
import logger from '../utils/logger';

export const mongooseConnect = (mongoUri = MONGO_URI, cb) => {
  // mongoose.Promise = Promise;
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    logger.info(`MongoDB is connected to :-  ${mongoUri}`);
    if (cb) {
      cb();
    }
  });

  mongoose.connection.on('error', (err) => {
    logger.info(`Could not connect to MongoDB because of ${err}`);
    if (cb) {
      cb(err);
    }
    process.exit(1);
  });

  if (ENV === EnvironmentsEnum.DEV) {
    /** uncomment this to see logs for each mongo operation performed */
    mongoose.set('debug', true);
  }

  mongoose.connect(mongoUri, {
    keepAlive: 1,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

export const mongooseDisconnect = () => {
  mongoose.disconnect();
};

export default mongooseConnect;
