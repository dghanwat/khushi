#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as http from "http";
import { app } from "../app";
import { serverPort } from "../config";
const WebSocket = require('ws');
const HashMap = require('hashmap');
let map = new HashMap();

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || serverPort);
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val): boolean | number {

  const normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      // tslint:disable-next-line
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
}

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
      console.log('Login Message received: %s', message);
      let msgObj = JSON.parse(message);

      // Check if the message is userAccessToken
      if (msgObj.token) {
          map.set(msgObj.token, ws) // Store the connection for each User token
      }
  });
  ws.on('error', () => console.log('errored'));
  var msgObj = {
      "author": "Coeus-Server",
      "message": {
          "type": "Welcome",
          "deviceId": "",
          "data": "Connected successfully",
          "category": "Info"
      },
      "newDate": new Date().toLocaleTimeString()
  }
  var newMsg = JSON.stringify(msgObj);
});

function sendRefreshNotification(message) {
    console.log("Sending refresh notification",message);
  var data = {
      "author": "Coeus-Server",
      "message": {
          "type": "REFRESH",
          "deviceId": message.deviceId,
          "data": message,
          "category": "Info"
      },
      "newDate": new Date().toLocaleTimeString()
  }
  sendUserNotification(data)
}

function sendAlertNotification(message) {
  var data = {
      "author": "Coeus-Server",
      "message": {
          "type": "NOTIFY",
          "deviceId": message.deviceId,
          "data": message.data,
          "category": message.category
      },
      "newDate": new Date().toLocaleTimeString()
  }
  sendUserNotification(data)
}

function sendUserNotification(data) {
  var counter = 1;
  map.forEach(function (client, token) {
      // For each token check if the user is interested in this device ID
      // notification. if yes then only send notification to this client
      //console.log(client);
      let userInterested = true;// change this to a REST Call
      console.log('Sending message to client ', counter++);
      if (userInterested) {
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
          }
      }
  });
}

