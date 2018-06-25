## Write Lamda locally

There is an alternative way of deploying a Lambda - you write Lambda
locally, ZIP it up and deploy it to S3. You can also opt to run a test to validate deployment.

If using node this methid is mandatory if you want to use additional npm packages. You cannot add npm using the Lambda editor in AWS Console.

```bash
aws s3 cp glasgowFacts.zip s3://alexaglasgowfacts/glasgowFacts.zip

aws lambda update-function-code --function-name alexaGlasgowFacts --s3-key glasgowFacts.zip --s3-bucket alexaglasgowfacts

aws lambda invoke --invocation-type RequestResponse --function-name alexaGlasgowFacts --payload file://test.json --log-type Tail testOutputFile.json
```

### Notes:
- _test.json_ holds an Alexa Skill Request - the input to the Lambda function
- Testing locally before deploying to AWS. There is a BETA AWS service AWS SAM that allows you to run Lambda functions locally. See: https://docs.aws.amazon.com/lambda/latest/dg/test-sam-cli.html 





