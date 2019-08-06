// Run the Lambda function locally passing through CLI args to the function.

require('./register');
const argv = require('yargs').argv;
const { handler } = require('../src');

async function main() {
  const event = { appId: argv.appId };

  await handler(event);
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    process.exit();
  });
