# NodeJS_ROS_Test
This repository is intended to be a minimal guide to basic NodeJS App, web sockets minimal App, and web sockets with ROS publisher.

## Files
- client.js: Websocket test client.
- frontendWithSocket.js: Web server with web socket implementation.
- hello-world.js: Basic nodeJS web server.
- rosAndServer.js: Web socket server with ROS implementation.
- rosPublisher.js: ROS publisher on NodeJS.
- server.js: Web socket server.

## How to run

In order to run files you need to move into _src_ folder, run installs and select which NodeJS App to run.

Move to _src_ folder: (from repository root)
```
cd src
```

Install libraries:
```
npm install
```

Run desired App: (use a different Terminal tab per App)

### Run basic NodeJS App
The following command will run a basic web server on http://127.0.0.1:3000
```
node hello-world.js
```
After running go to http://127.0.0.1:3000

A _Hello, World!_ message should appear in the browser.

### Run basic web socket server an client
The following command will run a basic web socket server on ws://localhost:8081/
```
node server.js
```

Then in another tab run the client to connect to ws://localhost:8081/
```
node client.js
```

Now the server will be accepting messages and printing them on the console, while the client also receives back responses and prints them to the console.

### Run only ROS node with publisher (no web servers or web sockets)
The following is the minimal example of a ROS node in NodeJS that has a publisher which writes with an interval to _my\_topic_ ROS topic.
```
node rosPublisher.js
```

### Run basic web socket server with ROS publish
The following command will run a ROS node in NodeJS with a basic web socket server on ws://localhost:8081/ that will listen to connection and publish the received message to _my\_topic_ ROS topic.
```
node rosAndServer.js
```

Then you have to write from a client, in this repository there are two examples of clients, the one used in *Run basic web socket server an client* and the following one that also has a web server.
```
node frontendWithSocket.js
```