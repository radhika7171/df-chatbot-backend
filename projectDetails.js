//code calls dialgogflow api to get response from dialogflow in order to query requested by node js
const projectId = "arty-bot-dev";
const location = "us-central1";
const agentId = "a9ef8e65-f0b1-4d1c-8163-975328ee8e80";
const query = "hello";
const languageCode = "en";

// Imports the Google Cloud Some API library
const { SessionsClient } = require("@google-cloud/dialogflow-cx");
// var structjson = require("./structjson");

//SessisonClient Object
const client = new SessionsClient({
  apiEndpoint: "us-central1-dialogflow.googleapis.com",
  // keyFilename: "./arty-bot-dev-29c4e1e9a1c3.json",
});
