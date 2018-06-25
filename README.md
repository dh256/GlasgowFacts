# Alexa Skill - Glasgow Facts

An Alexa skill: Glasgow Facts

- User can ask for a random fact
- User can ask for a random fact from a particular century
- User can ask for a fact from a particular year

## Pre-Reqs:
- An Amazon Developer account (See: https://developer.amazon.com)
- An AWS account (See: https://console.aws.amazon.com)

## Files:

- _skilldefintion.json_ - JSON that defines the skill's invocation statement, intents and slots. 
- _lambdafunction.js_ - Node.js code that processes an Alexa Skill Request and returns an Alexa Skill Response
- _alexaskillrequest.json_ - Sample Alexa Skill Request, useful for testing Lambda function
- _alexaskillresponse.json_ - Sample Alexa Skill Response
- _facts.json_ - list of facts
- _S3CORSConfig.xml_ - The CORS Configuration for S3 bucket holding card images. Allows Alexa to access the images
- _deployFromLocal.md_ - Describes a method to develop Lambda functions locally and deploy through a ZIP file via S3.-

Links:
- Alexa SDK (Node): https://www.npmjs.com/package/alexa-sdk#skill-and-list-events 
- SSML: https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#amazon-effect 
- Glasgow Facts source: https://en.wikipedia.org/wiki/Timeline_of_Glasgow_history

