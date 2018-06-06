var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {

  socket.emit('message', 'A new user has connected.')

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('userName', function(msg) {
    io.emit('new user', `${msg} connected`)
  });

  socket.on('disconnect', function(msg) {
    io.emit('msg', 'A user has disconnected');
  });

  socket.on('typing', function(msg) {
    socket.broadcast.emit('typing', msg)
  })

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});