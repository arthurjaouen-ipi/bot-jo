require("dotenv").config()

const AssistantV2 = require("ibm-watson/assistant/v2")
const {IamAuthenticator} = require("ibm-watson/auth")

const assistant = new AssistantV2({
  version: "2020-03-03",
  authenticator: new IamAuthenticator({
    apikey: process.env.WA_APIKEY
  }),
  serviceUrl: process.env.WA_URL
})

module.exports = async function(received) { 
  try {
    const res = await assistant.messageStateless({
      assistantId: process.env.WA_ID,
      input: {
        'message_type': 'text',
        'text': received,
      }
    })
    return res.result.output.generic[0].text
  } catch(err) {
    return "Error: "+JSON.stringify(err)
  }
}