const AWS = require('aws-sdk');
const fs = require('fs');

// Update the lambda function code
const lambda = new AWS.Lambda({ region: 'us-east-1' });
lambda.updateFunctionCode(
  {
    FunctionName: process.argv[2],
    Publish: true,
    ZipFile: fs.readFileSync('dist.zip')
  },
  err => {
    if (err) {
      throw err;
    }
    process.exit();
  }
);
