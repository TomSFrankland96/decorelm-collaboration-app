require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentDisposition: 'inline',
    ContentType: 'application/pdf'
  };

  const upload = await s3.upload(uploadParams).promise();

  return upload;
};

exports.uploadFile = uploadFile;
