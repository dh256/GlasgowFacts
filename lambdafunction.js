/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
var Alexa=require('alexa-sdk');
let APP_ID='amzn1.ask.skill.5bfa4bca-389e-4435-b317-dfaddb2a0835';          // put your skill id here

// card images (large and small)
const imageObj = {
    smallImageUrl: 'https://s3.amazonaws.com/alexaglasgowfacts/glasgowlogosmall.jpeg',
    largeImageUrl: 'https://s3.amazonaws.com/alexaglasgowfacts/glasgowlogolarge.jpeg'
};


// Alexa Skill Request Handlers
var handlers = {
    'TellMeAFact': function() {
        var cardTitle = "Glasgow Facts";
        var speechResponse = null;
        var cardContent = null;
        
        let minMax = minMaximum();
        
        let century = this.event.request.intent.slots.century;
        if(century && century.value) {
            // now get canonical value
            let centCanVal = century.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            if(centCanVal < minMax.minCent) {
                speechResponse = `Facts only go back to ${minMax.minCent} century`;
                cardContent = `Facts only go back to ${minMax.minCent} cetnury`;
            }
            else if (centCanVal > minMax.maxCent) {
                speechResponse = `Facts only go up to ${minMax.maxCent} century`;
                cardContent = `Facts only go up to ${minMax.maxCent} century`;
            }
            else {
                let fact = getCenturyFact(centCanVal);
                if(fact) {
                    speechResponse = `<say-as interpret-as='date' format='y'>${fact.year}</say-as> ${fact.fact}`;
                    cardTitle = `A ${century.value} century fact`;
                    cardContent = `${fact.year} ${fact.fact}`;
                }
                else {
                    speechResponse = `I don't know any facts from ${century.value}`;
                    cardContent = `I don't know any facts from ${century.value}`;
                }
            }
        }

        let year = this.event.request.intent.slots.year;
        if(year && year.value) {
            if(year.value < minMax.minYear) {
                speechResponse = `Facts only go back to <emphasis><say-as interpret-as='date' format='y'>${minMax.minYear}</say-as>`;
                cardContent = `Facts only go back to ${minMax.minYear}`;
            }
            else if (year.value >  minMax.maxYear) {
                speechResponse = `Facts only go up to <emphasis><say-as interpret-as='date' format='y'>${minMax.minYear}</say-as>`;
                cardContent = `Facts only go up to ${minMax.minYear}`;
            }
            else {
                console.log(`getYearFact`);
                let fact = getYearFact(year.value);
                if(fact) {
                    speechResponse = `<say-as interpret-as='date' format='y'>${year.value}</say-as> ${fact.fact}`;
                    cardTitle = `${year.value}`;
                    cardContent = `${fact.fact}`;
                }
                else {
                    speechResponse = `I don't know have facts from <say-as interpret-as='date' format='y'>${year.value}</say-as>`;
                    cardContent = `I don't know any facts from ${year.value}`;
                }
            }
        }

        /* get random fact */
        if(speechResponse == null) {
            let fact = getRandomFact(facts.facts);
            speechResponse = `<say-as interpret-as='date' format='y'>${fact.year}</say-as> ${fact.fact}`;
            cardTitle = `A random fact`;
            cardContent = `${fact.year} ${fact.fact}`;
        } 

        /* create Alexa response and emit */
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
        const cardTitle = "Help";
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

/* Facts and supporting functions */

// Glasgow facts JSON
let facts = {
    "facts": 
    [
        {
            "year": 1904, 
            "fact": "The Kings and Pavillion theatres open"
        },
        {
            "year": 1678, 
            "fact": "First Stagecoach run to Edinburgh. Still faster than Scotrail?"
        },
        {
            "year": 1967, 
            "fact": "QE2 liner is launched from John Brown Shipbuilders in Clydebank. The last great liner built on the Clyde"
        },
        {
            "year": 1970, 
            "fact": "Kingston Bridge section of M8 opens"
        },
        {
            "year": 1935, 
            "fact": "Glasgow Subway is electrified. Previously worked by a cable pulley system"
        },
        {
            "year": 1983, 
            "fact": "Burrell Collection opens in Pollock Park"
        },
        {
            "year": 2014,	
            "fact": "Glasgow hosts the 20th Commonwealth Games"
        },
        {
            "year": 2014,	
            "fact": "A fire destroys much of the Mackintosh building at Glasgow School of Art"
        },
        {   "year": 2013,
            "fact":	"Police helicopter crashes onto roof of Clutha pub killing 10 people"
        },
        {
            "year": 2002,
            "fact": "Hosts the UEFA Champions League final at Hampden Park. Real Madrid win"
        },
        {
            "year": 2007,
            "fact": "Awarded rights to hold 20th Commonwealth Games in 2014"
        },
        {
            "year": 1988,	
            "fact": "Host the Glasgow Garden Festival. 4.3 million visitors attend in only 5 months"
        },
        {
            "year": 1997,	
            "fact": "The Clyde Audotorium, affectionally known as The Armadillo, opens"
        },
        {
            "year": 1962,	
            "fact": "The last Glasgow tram runs"
        },
        {
            "year": 1980,	
            "fact": "Subway, affectionally known as the Clockwork Orange, reopens after a 3 year upgrade"
        },
        {
            "year": 1990,	
            "fact": "The Glasgow Royal Concert Hall opens. Widely renowned as one of World's best halls"
        },
        {
            "year": 1990,	
            "fact": "Glasgow is European City of Culture"
        },
        {
            "year": 1971,	
            "fact": "66 people killed at Ibrox Stadium as a result of a crush. Second major disaster at Ibrox."
        },
        {
            "year": 1967,
            "fact":	"Celtic F.C. win the European Cup. First British club to do so"
        },
        {
            "year": 1972,
            "fact":	"Rangers F.C. win the European Cup Winners Cup"
        },
        {
            "year": 1941,	
            "fact": "German bombing raids decimate Clydebank and kill 528 people. Only 7 out of 12000 properties left undamaged."
        },
        {
            "year": 1919,	
            "fact": "Black Friday - Battle of George Square. Tanks deployed to quell rioting by workers striking for a 40-hour week"
        },
        {
            "year": 1859,	
            "fact": "A clean water supply carrying water in aquaducts from Loch Katrine in the Trossachs is completed. Today it supplies 230 million of litres of water a day to the city"
        },
        {
            "year": 1645,	
            "fact": "Plague hits the city, again!"
        },
        {
            "year": 1451,	
            "fact": "University of Glasgow is established in High Street"
        },
        {
            "year": 1471,	
            "fact": "Provan's Lordship (the oldest building in Glasgow) is built"
        },
        {
            "year": 1745,	
            "fact": "Tenents open a new brewery in Glasgow"
        },
        {
            "year": 1814,	
            "fact": "Glasgow Green becomes Europe's first public park"
        },
        {
            "year": 1851,
            "fact": "Population his 330000, an increase of 800 percent in just 70 years!"
        },
        {
            "year": 1870,
            "fact": "University of Glasgow opens new site at Gilmorehill"
        },
        {
            "year": 1872,
            "fact": "Rangers Football Club is founded"
        },
        {
            "year": 1887,
            "fact": "Celtic Football Club is founded"
        },
        {
            "year": 2018,
            "fact": "A fire decimates the Glasgow School of Art, 4 years after 2014 fire"
        }
        
    ]
};



function minMaximum() {
    var maxYear = Number.MIN_SAFE_INTEGER;;
    var minYear = Number.MAX_SAFE_INTEGER;
    for(var index = 0; index < facts.facts.length; index++) {
        if(facts.facts[index].year > maxYear) {
            maxYear = facts.facts[index].year;
        }
        
        if(facts.facts[index].year < minYear) {
            minYear = facts.facts[index].year;
        }
    }
    let minCent = Math.floor(minYear / 100) + 1;
    let maxCent = Math.floor(maxYear / 100) + 1;
    return {"minYear": minYear, "maxYear": maxYear, "minCent": minCent, "maxCent": maxCent};
 }

function getRandomFact(arr) {
    var randomIdx = 0;
    if(arr.length > 1) {
        randomIdx = Math.floor(Math.random() * arr.length);
    }
    return arr[randomIdx];
}

function yearFilter(fact) {
    return fact.year == this;
}

function centuryFilter(fact) {
    return Math.trunc(fact.year / 100) + 1  == this;
}

function getYearFact(year) {
    let yearFacts = facts.facts.filter(yearFilter, year);
    return getRandomFact(yearFacts);
}

function getCenturyFact(century) {
    let centFacts = facts.facts.filter(centuryFilter, century);
    return getRandomFact(centFacts);
}
