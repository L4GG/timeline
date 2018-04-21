// tslint:disable:no-any no-console
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'l4gg-timeline-event-images';
const REGION = 'us-west-2';
const IDENTITY_POOL_ID = process.env.REACT_APP_S3_IDENTITY_POOL_ID || '';

AWS.config.update({
  region: REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: BUCKET_NAME },
});

function syncFileToS3(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ACL: 'public-read',
        Bucket: BUCKET_NAME,
        Body: file,
        Key: encodeURIComponent(file.name),
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log('successful image upload:', data);
          resolve(data.Location);
        }
      },
    );
  });
}

export default syncFileToS3;
