import "./App.css";
import { useState, useEffect } from "react";
import getTokenOrRefresh from "./getTokenOrRefresh";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function App() {
  const [authObj, setAuthObj] = useState(null);
  const [voiceText, setVoiceText] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const auth = await getTokenOrRefresh();
      setAuthObj(auth);
    };
    fetch();
  }, []);
  const startVoice = () => {
    if (authObj !== null) {
      const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
        authObj.authToken,
        authObj.region
      );
      speechConfig.speechRecognitionLanguage = "en-US";

      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig
      );
      console.log(recognizer);
      recognizer.recognizeOnceAsync((result) => {
        let displayText;
        if (result.reason === ResultReason.RecognizedSpeech) {
          displayText = `Me: ${result.text}`;
        } else {
          displayText =
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
        }
        setVoiceText(displayText);
      });
    }
  };
  return (
    <div>
      <button onClick={() => startVoice()}>start</button>
      <div className="App">{voiceText}</div>
    </div>
  );
}

export default App;
