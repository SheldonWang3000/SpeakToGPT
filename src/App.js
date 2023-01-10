import "./App.css";
import { useState, useEffect } from "react";
import getTokenOrRefresh from "./getTokenOrRefresh";

function App() {
  const [authObj, setAuthObj] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const auth = await getTokenOrRefresh();
      setAuthObj(auth);
    };
    fetch();
  }, []);
  return <div className="App">Welcome to SpeakToGPT: {authObj.authToken}</div>;
}

export default App;
