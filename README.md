# NodeJS_ROS_Test
This repository is intended to be a minimal guide to basic NodeJS App, web sockets minimal App, and web sockets with ROS publisher.

## Files
- index.js: Main program. (IN PROGRESS. Empty at the moment)
- src/client.js: Websocket test client.
- src/frontendWithSocket.js: Web server with web socket implementation.
- src/hello-world.js: Basic nodeJS web server.
- src/rosAndServer.js: Web socket server with ROS implementation.
- src/rosPublisher.js: ROS publisher on NodeJS.
- src/server.js: Web socket server.

## How to run

In order to run files you need to run installs and then select which NodeJS App to run.

Install libraries:
```
npm install
```

Run desired App: (use a different Terminal tab per App)

### Run basic NodeJS App
The following command will run a basic web server on http://127.0.0.1:3000
```
node src/hello-world.js
```
After running go to http://127.0.0.1:3000

A _Hello, World!_ message should appear in the browser.

### Run basic web socket server an client
The following command will run a basic web socket server on ws://localhost:8081/
```
node src/server.js
```

Then in another tab run the client to connect to ws://localhost:8081/
```
node src/client.js
```

Now the server will be accepting messages and printing them on the console, while the client also receives back responses and prints them to the console.

### Run only ROS node with publisher (no web servers or web sockets)
The following is the minimal example of a ROS node in NodeJS that has a publisher which writes with an interval to _my\_topic_ ROS topic.
```
node src/rosPublisher.js
```

### Run basic web socket server with ROS publish
The following command will run a ROS node in NodeJS with a basic web socket server on ws://localhost:8081/ that will listen to connection and publish the received message to _my\_topic_ ROS topic.
```
node src/rosAndServer.js
```

Then you have to write from a client, in this repository there are two examples of clients, the one used in *Run basic web socket server an client* and the following one that also has a web server.
```
node src/frontendWithSocket.js
```