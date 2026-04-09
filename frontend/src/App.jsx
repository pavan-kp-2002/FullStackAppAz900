import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [env, setEnv] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

  const callApi = async (endpoint, setter, isJson = false) => {
    try {
      setLoading(true);
      setter(""); // Clear previous result
      if (isJson) setEnv(null);

      const response = await fetch(`${API_BASE_URL}/api/status/${endpoint}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = isJson ? await response.json() : await response.text();
      setter(data);
    } catch (error) {
      console.error(error);
      setter("Error calling API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Status Dashboard</h1>

      <div className="api-section">
        <button
          className="button-80s"
          onClick={() => callApi("hello", setMessage)}
        >
          Get Hello
        </button>
        <p className="result-text">{message}</p>
      </div>

      <div className="api-section">
        <button className="button-80s" onClick={() => callApi("time", setTime)}>
          Get Time
        </button>
        <p className="result-text">{time}</p>
      </div>

      <div className="api-section">
        <button
          className="button-80s"
          onClick={() => callApi("env", setEnv, true)}
        >
          Get Environment
        </button>
        {env && typeof env === "object" && (
          <div className="env-info">
            <p>
              <strong>Machine:</strong> {env.machineName}
            </p>
            <p>
              <strong>OS:</strong> {env.os}
            </p>
          </div>
        )}
      </div>

      {loading && <p className="loading-text">Loading...v3</p>}
    </div>
  );
}

export default App;
