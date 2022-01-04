//route library
const axios = require("axios");
const { value } = require("pb-util");

//code calls dialgogflow api to get response from dialogflow in order to query requested by node js
const projectId = "arty-bot-dev";
const location = "us-central1";
const agentId = "a9ef8e65-f0b1-4d1c-8163-975328ee8e80";
const languageCode = "en";
// Imports the Google Cloud Some API library
const { SessionsClient } = require("@google-cloud/dialogflow-cx");

//SessisonClient Object
const client = new SessionsClient({
  apiEndpoint: "us-central1-dialogflow.googleapis.com",
  // keyFilename: "./arty-bot-dev-29c4e1e9a1c3.json",
});
function intelAPIdata(req, res) {
  let queryText, sessionId;
  let params = [];

  if (req.query.message === undefined)
    return res.send("Message cannot be empty");
  else {
    queryText = JSON.stringify(req.query.message);
  }

  if (req.query.sessionId === undefined)
    return res.send("Session ID cannot be empty");
  else {
    sessionId = JSON.stringify(req.query.sessionId);
  }

  axios
    .get("http://forms.intellcreative.ca/api-demo/v1/users/a435B9382sCs")
    .then(function (response) {
      const user_firstName = response.data.user.first_name;
      const user_lastName = response.data.user.last_name;
      const userFirstName = value.encode(user_firstName);
      const userLastName = value.encode(user_lastName);

      // console.log("message recieved from React query =>", req.query);
      // console.log("data fetched from session Api=>", response.data.user);

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
          },
          languageCode,
        },
      };

      client
        .detectIntent(request)
        .then((response) => {
          // console.log("response", response);

          // console.log(
          //   "session Api vatriables send to DF==>",
          //   request.queryParams.parameters.fields
          // );
          // console.log(
          //   "message text send to DF==>",
          //   request.queryInput.text.text
          // );
          res.send(response);
          for (const message of response[0]?.queryResult?.responseMessages) {
            if (message?.text) {
              console.log(`Agent Response: ${message?.text?.text}`);
            }
          }
          if (response[0]?.queryResult?.match?.intent) {
            console.log(
              `Matched Intent: ${response[0]?.queryResult?.match?.intent?.displayName}`
            );
          }
          console.log(
            `Current Page: ${response[0]?.queryResult?.currentPage?.displayName}`
          );
          //send to axios post to session API
          console.log(
            "resonse parameters from DF",
            response[0].queryResult.parameters.fields
          );
          params = response[0]?.queryResult?.parameters?.fields;
          console.log("paramsList==>", params);
          axios
            .post(
              "http://forms.intellcreative.ca/api-demo/v1/users/a435B9382sCs",
              {
                params,
              }
            )
            .then(function (response) {
              console.log("post response==>", response);
            })
            .catch(function (error) {
              console.log("psot req error", error);
            });
        })
        .catch((error) => {
          console.log("some error occurred => ", error);
        });
    });
}

// check port

function checkPort(req, res) {
  console.log("Port listening");
  res?.send("Port listening");
}

module.exports = {
  // detectIntentText: detectIntentText,
  checkPort: checkPort,
  intelAPIdata: intelAPIdata,
};
