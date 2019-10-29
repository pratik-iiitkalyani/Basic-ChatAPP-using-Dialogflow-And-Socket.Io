// const fetch = require('node-fetch');

const Config = require("./config");
// const msg = require("./index.html")

// You can find your project ID in your Dialogflow agent settings
const ProjectId = 'hotel-search-iubkcx'; //https://dialogflow.com/docs/agents#settings
const SessionId = '123456';
const LanguageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: Config.DIALOGFLOW_PRIVATE_KEY,
        client_email: Config.DIALOGFLOW_CLIENT_EMAIL
    }
};


// Create a new session

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(ProjectId, SessionId);

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.

exports.dig = async (msg) => {
    console.log('Client Email', Config.DIALOGFLOW_CLIENT_EMAIL)
    var responseMsg ;

    // The text query request.

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg,
                languageCode: LanguageCode,
            },
        },
    };

    // Send request and log result 

    // sessionClient
    //     .detectIntent(request)
    //     .then(responses => {
    //         const result = responses[0].queryResult;
    //         console.log(result.fulfillmentText)
    //         responseMsg = result.fulfillmentText
    //     })
    //     .catch(err => {
    //         console.error('ERROR:', err);
    //     });
    //     return responseMsg

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
    return result.fulfillmentText
}