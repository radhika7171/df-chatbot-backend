//route library
const axios = require("axios");
const { value } = require("pb-util");

//code calls dialgogflow api to get response from dialogflow in order to query requested by node js
const projectId = "arty-bot-dev";
const location = "us-central1";
const agentId = "a9ef8e65-f0b1-4d1c-8163-975328ee8e80";
const languageCode = "en";
// const query = "loan a book";
// Imports the Google Cloud Some API library
const { SessionsClient } = require("@google-cloud/dialogflow-cx");

//SessisonClient Object
const client = new SessionsClient({
  apiEndpoint: "us-central1-dialogflow.googleapis.com",
  // keyFilename: "./arty-bot-dev-29c4e1e9a1c3.json",
});

function intelAPIdata(req, res) {
  axios
    .get("http://forms.intellcreative.ca/api-demo/v1/users/a435B9382sCs")
    .then(function (response) {
      const user_firstName = response.data.user.first_name;
      const user_lastName = response.data.user.last_name;
      const userFirstName = value.encode(user_firstName);
      const userLastName = value.encode(user_lastName);
      let queryText = JSON.stringify(req.query.message);
      const sessionId = JSON.stringify(req.query.sessionId);

      console.log("session id==>", sessionId);
      // if (/\d/.test(queryText)) {
      //   queryText = 4;
      // }
      // console.log("🚀 ~ file: get.js ~ line 29 ~ queryText", queryText);
      // console.log("🚀 ~ file: get.js ~ line 29 ~ queryText", typeof queryText);

      // const sessionId = "dfMessenger-9777522";
      // const sessionId = Math.random().toString(36).substring(7);
      const sessionPath = client.projectLocationAgentSessionPath(
        projectId,
        location,
        agentId,
        sessionId
      );

      const request = {
        session: sessionPath,
        queryParams: {
          parameters: {
            fields: { userFirstName, userLastName },
          },
        },
        queryInput: {
          text: {
            text: queryText,
            // text: query,
          },
          languageCode,
        },
      };

      client
        .detectIntent(request)
        .then((response) => {
          console.log("requset==>", request);
          console.log("DFResponse==>", response);
          console.log("requestText==>", request.queryInput.text.text);
          console.log(
            "typerequesttext==>",
            typeof request.queryInput.text.text
          );

          // console.log(
          //   "text type==>",
          //   typeof response[0]?.queryResult.responseMessages[0].text.text[0]
          // );
          // console.log("response==>", response);
          // console.log(
          //   "response ==>",
          //   JSON.stringify(response[0].queryResult.parameters.fields)
          // );
          res.send(response);
          for (const message of response[0].queryResult.responseMessages) {
            if (message.text) {
              console.log(`Agent Response: ${message.text.text}`);
            }
          }
          if (response[0].queryResult.match.intent) {
            console.log(
              `Matched Intent: ${response[0].queryResult.match.intent.displayName}`
            );
          }
          console.log(
            `Current Page: ${response[0].queryResult.currentPage.displayName}`
          );
        })
        .catch((error) => {
          console.log("some error occurred => ", error);
        });
    });
}

// check port

function checkPort(req, res) {
  console.log("test");
  res?.send("Port listening");
}

module.exports = {
  // detectIntentText: detectIntentText,
  checkPort: checkPort,
  intelAPIdata: intelAPIdata,
};
