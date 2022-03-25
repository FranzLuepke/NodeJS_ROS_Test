#!/usr/bin/env node
// IMPORTS
// HTTP imports
const http = require('http');
// Web socket imports
const WebSocketClient = require('websocket').client;

// Web socket object
var client = new WebSocketClient();
// Web server path
const hostname = '127.0.0.1';
const port = 3000;

// MAIN CODE
// Create web server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});
// Listen to web server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  // Web socket connection failed
  client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
  });
  // Web socket connection success
  client.on('connect', function(connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function(error) {
          console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function() {
          console.log('echo-protocol Connection Closed');
      });
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
              console.log("Received: '" + message.utf8Data + "'");
          }
      });
      
      function sendNumber() {
          if (connection.connected) {
              var number = Math.round(Math.random() * 0xFFFFFF);
              connection.sendUTF(number.toString());
              setTimeout(sendNumber, 1000);
          }
      }
      sendNumber();
  });
  // Connect web socker to port 8081 
  client.connect('ws://localhost:8081/', 'echo-protocol');
});