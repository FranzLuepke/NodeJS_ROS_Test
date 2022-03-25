#!/usr/bin/env node
// IMPORTS
// ROS libraries
const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs');
// Web socket libraries
var WebSocketServer = require('websocket').server;
var http = require('http');

// MAIN CODE
// Initialize ROS node
rosnodejs.initNode('my_node')
.then((nh) => {
  // Create publisher and ROS message definition
  const pub = nh.advertise('/my_topic', std_msgs.msg.String);
  const msg = new std_msgs.msg.String();
  // Create web server
  var server = http.createServer(function(request, response) {
      console.log((new Date()) + ' Received request for ' + request.url);
      response.writeHead(404);
      response.end();
  });
  // Server listening to requests
  server.listen(8081, function() {
      console.log((new Date()) + ' Server is listening on port 8081');
  });
  // Create web socket object
  wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false
  });
  // Define which origins to allow
  function originIsAllowed(origin) {
    // Put logic here to detect whether the specified origin is allowed.
    return true;
  }
  // Function to make when request is made
  wsServer.on('request', function(request) {
      // If origin is not allowed it will be rejected.
      if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }
      // Create connection
      var connection = request.accept('echo-protocol', request.origin);
      console.log((new Date()) + ' Connection accepted.');
      // Listen to changes in connection
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
              console.log('Received Message: ' + message.utf8Data);
              // Populate ROS message and publish
              msg.data = message.utf8Data;
              pub.publish(msg);
              rosnodejs.log.info('Publishing:', msg);
              // Send message
              connection.sendUTF(message.utf8Data);
          }
          else if (message.type === 'binary') {
              console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
              connection.sendBytes(message.binaryData);
          }
      });
      // Turn off connection
      connection.on('close', function(reasonCode, description) {
          console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      });
  });
});