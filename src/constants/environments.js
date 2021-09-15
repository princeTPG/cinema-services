export const EnvironmentsEnum = {
  DEV: 'DEV',
  PROD: 'PROD',
  STAGE: 'STAGE',
};

export const {
  ENV,
  PORT,
  MONGO_URI,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_FOLDER_NAME,
  AWS_REGION,
} = process.env;

export default {
  AWS_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_FOLDER_NAME,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  ENV,
  EnvironmentsEnum,
  MONGO_URI,
  PORT,
};
