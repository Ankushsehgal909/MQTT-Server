
const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS for all routes

// Create an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// MQTT Settings
const MQTT_BROKER = "mqtt://test.mosquitto.org";
const MQTT_TOPIC = "Data_SARDAR";

// MQTT Client Setup
const client_mqtt = mqtt.connect(MQTT_BROKER);

// Store WebSocket clients
const clients = new Set();

// WebSocket connection event
wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws);
    });
});

// MQTT Callbacks
client_mqtt.on('connect', () => {
    console.log('Connected to MQTT broker');
    client_mqtt.subscribe(MQTT_TOPIC, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
        } else {
            console.error('Subscription error:', err);
        }
    });
});

client_mqtt.on('message', (topic, message) => {
    try {
        // Parse the message payload as JSON
        const messageObject = JSON.parse(message.toString());
        console.log(`Topic: ${topic}, Message Object:`, messageObject);

        // Broadcast the messageObject to all connected WebSocket clients
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageObject));
            }
        });
    } catch (e) {
        console.error('Error parsing message:', e);
    }

    // Uncomment the following line if you want to unsubscribe after receiving the first message
    // client_mqtt.unsubscribe(MQTT_TOPIC);
});

// Root route to display server status message
app.get('/', (req, res) => {
    res.send('<h1>Server is running smoothly and there are no errors.</h1>');
});

// Start Express server
const PORT = 4000; // Changed port to avoid conflict with React app
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
