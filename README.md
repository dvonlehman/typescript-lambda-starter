# typescript-lambda-starter

This is a starter template for Lambda functions written in TypeScript.

## What's Included

- Solution file system skeleton
- Basic eslint/prettier setup
- Jest test setup
- Set of npm scripts for common operations (`test`, `deploy`, `runlocal`)
- Bash deploy script that creates new Lambda version
- Travis config that auto-deploys master builds (can easily be adapted to other CI services)
- Logging via winston

### Scheduling via cron, jenkins, etc

If the Lambda function is to be invoked as a batch job via cron or Jenkins, the following shell script can be used. Make sure the `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` environment variables are available in the cron context. The IAM user these creds identify must have the `Lambda:Invoke` permissions for the function being executed.

In order to show the log output in the scheduler output, we pass the `--log-type Tail` argument. However rather than simply printing out the log output, the `aws-cli` returns a response JSON object with a `LogResult` string (which is base64 encoded no less!). Using some command-line fu, we can extract the base64 string and decode it so the actual log output is visible in Jenkins. Special thanks to this [Stack Overflow answer](https://stackoverflow.com/questions/36073695/how-to-retrieve-single-value-with-grep-from-json/36075904#36075904).

```sh
# If the AWS CLI is not available on the machine, grab a Docker image and alias the "aws" command.
# https://hub.docker.com/r/mesosphere/aws-cli/
docker pull mesosphere/aws-cli
alias aws='docker run --rm -t $(tty &>/dev/null && echo "-i") -e "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" -e "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" -e "AWS_DEFAULT_REGION=us-east-1" -v "$(pwd):/project" mesosphere/aws-cli'

# Replace the payload JSON with the appropriate event arguments expected by the Lambda function.
aws lambda invoke --function-name function-name --payload "{\"appId\": \"${APP_ID}\"}" --log-type Tail foo.txt | grep -o '"LogResult": "[^"]*' | grep -o '[^"]*$' | base64 --decode
```
