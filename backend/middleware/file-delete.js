const aws = require('aws-sdk');
require('dotenv').config();

// unable to use .env variables in s3 object
// const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

aws.config.update(
    {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        secretKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
    }
);

const s3 = new aws.S3();

const fileDelete = async (imagePath) => {
    const filename = imagePath.split('/').pop();
    const params = { 
        Bucket: process.env.AWS_BUCKET_NAME ?? 'mern-menu-creator-images', 
        Key: filename 
    };

    s3.headObject(params)
        .promise()
        .then(
            (data) => {
                console.log('File Found in S3');
                s3.deleteObject(params)
                    .promise()
                    .then(
                        () => console.log('file deleted successfully'),
                        () => console.log('Error in file deletion: ' + JSON.stringify(err))
                    );
            },
            (err) => console.log('File not found ERROR: ' + err.code)
    );
};

module.exports = fileDelete;