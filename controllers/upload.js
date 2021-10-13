const fs = require('fs');
const AWS = require('aws-sdk');

// module.exports.uploadS3 = async (req, res) => {
//     const uploadFile = ('README.md') => {
//         // Read content from the file
//         const fileContent = fs.readFileSync('README.md');

//         // Setting up S3 upload parameters
//         const params = {
//             Bucket: BUCKET_NAME,
//             Key: 'README.md', // File name you want to save as in S3
//             Body: fileContent
//         };

//         // Uploading files to the bucket
//         s3.upload(params, function (err, data) {
//             if (err) {
//                 throw err;
//             }
//             console.log(`File uploaded successfully. ${data.Location}`);
//         });
//     };
// }