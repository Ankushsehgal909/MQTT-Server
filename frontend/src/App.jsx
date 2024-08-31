import React, { useEffect, useState } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { DataDisplay } from "./components/DataDisplay";
import { Gallery } from "./components/gallery";
import { Team } from "./components/Team";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const WEBSOCKET_SERVER_URL = "ws://localhost:4000"; // Adjust as needed

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [messageObject, setMessageObject] = useState(null);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket(WEBSOCKET_SERVER_URL);

    // Listen for messages from the server
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessageObject(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Clean up the connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // Default values if messageObject is null
  const defaultData = {
    temperature: "N/A",
    humidity: "N/A",
    distance: "N/A",
    acceleration: { x: "N/A", y: "N/A", z: "N/A" },
    gyroscope: { x: "N/A", y: "N/A", z: "N/A" },
    orientation: { roll: "N/A", pitch: "N/A", yaw: "N/A" },
    gps: { latitude: "N/A", longitude: "N/A" }
  };

  const sensorData = messageObject || defaultData;

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Features data={landingPageData.Features} />
      <DataDisplay
        temperature={sensorData.temperature}
        humidity={sensorData.humidity}
        distance={sensorData.distance}
        acceleration={sensorData.acceleration}
        gyroscope={sensorData.gyroscope}
        orientation={sensorData.orientation}
        gps={sensorData.gps}
      />
      <Gallery data={landingPageData.Gallery} />
     
      <Team data={landingPageData.Team} />
  
    </div>
  );
};

export default App;
