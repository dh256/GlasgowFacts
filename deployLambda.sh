# deployLambda.sh
# David Hanley
#
# Zips a Lambda function developed locally and copies (and all supporting files) to S3
# Updates Lambda function and, optionally runs runs a test:
#
#  . deployLambda.sh            # deploy and update Lambda  
#  . deployLambda.sh test       # deploy, update and test Lambda
#
# Lambda functions on AWS must be configured to read from ZIP file held in AWS S3
# Requires AWS command line tools configured and setup with an appropriate AWS subscription
# Developed to aid building Lambda functions for processing Alexa Skills Requests

# variables - change to meet your requirements
zipFile='glasgowFacts.zip'
s3BucketName='alexaglasgowfacts'
testFile='test.json'
functionName='alexaGlasgowFacts'
testOutputFile='testOutputFile.json'

# tidy up
if [ -e $zipFile ]
then
    rm -rf $zipFile
fi

if [ -e $testOutputFile ]
then
    rm -rf $testOutputFile
fi

# deploy - modify zip contents to meet your requirements
echo 'Zipping ..'
zip -r $zipFile node_modules/ index.js package.json

echo 'Copying ..'
aws s3 cp $zipFile s3://$s3BucketName/$zipFile

echo 'Update Lambda ..'
aws lambda update-function-code --function-name $functionName --s3-key $zipFile --s3-bucket $s3BucketName

if [ "$1" == "test" ]
then
    echo 'Test Lambda ..'
    aws lambda invoke --invocation-type RequestResponse --function-name $functionName --payload file://$testFile --log-type Tail $testOutputFile

    echo 'Output ..'
    echo
    cat $testOutputFile
fi

echo 'Complete'
