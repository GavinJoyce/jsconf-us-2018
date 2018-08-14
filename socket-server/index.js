const app = require('express')();
const config = require('../config/environment')('production');
const SocketServer = require('ember-present/socket-server');

let socketServer = new SocketServer(app, config.emberPresent);
socketServer.start();