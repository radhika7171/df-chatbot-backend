function webhook(request, response) {
  // console.log("request=====>", request);
  console.log("response=======>>> ", response);
  let tag = request.body.fulfillmentInfo.tag;
  console.log("tag==>", tag);
  let jsonResponse = {};
  if (tag === "testing") {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                "Getting hardcoded webhookmsLQSMLsm;l response from node service..!!!!!",
              ],
            },
          },
        ],
      },
    };
  } else {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `There are no fulfillment responses defined for "${tag}"" tag`,
              ],
            },
          },
        ],
      },
    };
  }
  response.json(jsonResponse);
}
module.exports = webhook;
