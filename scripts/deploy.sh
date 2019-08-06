#!/bin/bash

# Build, package, and deploy a new version of the Lambda function.

environment=$1
if [ "$environment" != "test" ] && [ "$environment" != "production" ]; then
  echo "First arg should be environment to deploy to (production or test)"
  exit
fi

echo $environment

functionName="function-name"
if [ "$environment" == "test" ]; then
  functionName="${functionName}-test"
fi

# On Travis, the deploy step takes place in a new container. Not the one
# where the unit tests have already run and npm install has run, so TypeScript
# is not present, so install it from scratch.
if [ ! -f "./node_modules/.bin/tsc" ]
then
  echo "Installing TypeScript"
  npm i typescript
fi

echo "Compiling TypeScript"
./node_modules/.bin/tsc

echo "packaging lambda, creating new zip..."
rm -rf dist.zip
rm -rf dist
mkdir dist
cp package.json package-lock.json ./dist/
cp -r build/* ./dist

echo "npm install production dependencies..."
(cd dist; npm install --production > /dev/null) || exit 1

echo "generating zip archive..."
(cd dist; zip -r ../dist.zip * > /dev/null) || exit 1

echo "uploading new zip to lambda..."

node scripts/update-lambda-code.js $functionName
