import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { environments } from '../constants';

const {
  AWS_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_FOLDER_NAME,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} = environments;

export const AWS_S3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

export const uploadMiddleWare = multer({
  storage: multerS3({
    acl: 'public-read',
    bucket: AWS_BUCKET_NAME,
    key(req, file, cb) {
      const newFileName = `${AWS_FOLDER_NAME}/${Date.now().toString()}_${
        file.originalname
      }`;
      cb(null, newFileName);
    },
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    s3: AWS_S3,
  }),
});

export const deleteFile = function deleteFile(fileKey) {
  return new Promise((resolve) => {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Delete: {
        Objects: [
          {
            Key: fileKey,
          },
        ],
      },
    };
    AWS_S3.deleteObjects(params, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
