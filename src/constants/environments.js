export const EnvironmentsEnum = {
  DEV: 'DEV',
  PROD: 'PROD',
  STAGE: 'STAGE',
};

export const { ENV, PORT, MONGO_URI } = process.env;

export default {
  ENV,
  EnvironmentsEnum,
  MONGO_URI,
  PORT,
};
