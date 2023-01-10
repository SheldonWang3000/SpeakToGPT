module.exports = async function (context) {
  const axios = require("axios");
  const speechKey = process.env.SpeechKey;
  const speechRegion = process.env.SpeechRegion;
  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: { token: tokenResponse.data, region: speechRegion },
    };
  } catch (err) {
    context.res = {
      status: 401,
      body: "There was an error authorizing your speech key.",
    };
  }
};
