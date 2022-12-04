const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');
const port = 3000;

const io = socketIO(server);

io.on('connection', socket => {
  console.log(socket.id + ' Da ket noi voi server');
  socket.on('chat-message', () => {
    io.emit('receiver', () => {});
  });

  socket.on('login', () => {
    io.emit('login-success', () => {});
  });

  socket.on('logout', () => {
    io.emit('logout-success', () => {});
  });

  socket.on('uploadProfile', () => {
    io.emit('profile-success', () => {});
  });
});

server.listen(port, () => console.log('server running on port: ' + port));
