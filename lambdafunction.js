/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
var Alexa=require('alexa-sdk');
let APP_ID='amzn1.ask.skill.d33412b6-b686-4eb5-9eef-a5703a0c9529';          // put your skill id here
var aws = requestAnimationFrame('aws-sdk');
var s3= new AWS.S3();

// card images (large and small)
const imageObj = {
    smallImageUrl: 'https://s3.amazonaws.com/alexaskilimages/glasgowlogosmall.jpg',
    largeImageUrl: 'https://s3.amazonaws.com/alexaskilimages/glasgowlogolarge.jpg'
};

// Glasgow facts JSON
let facts = {};   // put JSON here or load in from somewhere e.g. S3

// handlers
var handlers = {
    'TellMeAFact': function() {
        const cardTitle = "Fact";
        var speechResponse = "I will now tell you a fact";
        var cardContent = "I will now tell you a fact";

        let century = this.event.request.intent.slots.century;
        if(century && century.value) {
            // now get canonical value
            let centCanVal = century.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            speechResponse = `A ${century.value} century fact`;
            cardContent = `A ${century.value} century fact ${centCanVal}`;
        }

        let year = this.event.request.intent.slots.year;
        if(year && year.value) {
            if(year.value < 1799) {
                speechResponse = `<emphasis><say-as interpret-as='date' format='y'>${year.value}</say-as></emphasis> My records don't go back that far`;
                cardContent = `${year.value} My records don't go back that far`;
            }
            else if (year.value > 2018) {
                speechResponse = `<emphasis><say-as interpret-as='date' format='y'>${year.value}</say-as></emphasis> I would need a DeLorean to tell you that`;
                cardContent = `${year.value} I can't predict the future`;
            }
            else {
                speechResponse = `A fact from <say-as interpret-as='date' format='y'>${year.value}</say-as>`;
                cardContent = `A fact from <say-as interpret-as='date' format='y'>${year.value}</say-as>`;
            }
        }

        this.response.speak(speechResponse).cardRenderer(cardTitle,cardContent,imageObj).listen('');
        this.emit(':responseReady');
    },
    
    'LaunchRequest': function() {
        const cardTitle = "Hello";
        const speechResponse = "Welcome to Glasgow facts";
        const cardContent = "Welcome to Glasgow facts";
        this.response.speak(speechResponse).listen('').cardRenderer(cardTitle,cardContent,imageObj);
        this.emit(':responseReady');
    },    
    
    'AMAZON.StopIntent': function () {
        const cardTitle = "Goodbye";
        const speechResponse = "Thanks for using Glasgow facts";
        const cardContent = "Thanks for using Glasgow facts";
        this.response.speak(speechResponse).cardRenderer(cardTitle,cardContent,imageObj);
        this.emit(':responseReady');
    },
    
    'AMAZON.HelpIntent': function () {
        const cardTitle = "Help"
        const speechResponse = "You can ask me for a random fact, facts from a particular century or a particular year";
        const cardContent = "You can ask me for a random fact, facts from a particular century or a particular year";
        this.response.speak(speechResponse).listen().cardRenderer(cardTitle,cardContent,imageObj);
        this.emit(':responseReady');
    }
};

// Lambda entry point
// event holds the Alexa Skill Request JSON
exports.handler = async (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};