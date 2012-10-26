var sys = require("sys")
  , fs = require("fs")
  , path = require("path")
  , http = require("http")
  , io = require('socket.io').listen(process.env.port); //Azure port

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>I am a server. Watch me serve.</h1>');
    var addr = io.address();
    res.write('<p>App listening on http://' + addr.address + ':' + addr.port +'</p>');
    res.end();
});

//server.listen(8082);

//var socket = io.listen(server);

io.sockets.on('connection', function(socket){
  socket.send('This is your server. Thanks for connecting to me.');

  socket.on('message', function(msg){
    sys.log('Message Received: ' + msg);
    socket.broadcast.send(msg);
  });

  socket.on('newTask', function(msg){
	sys.log('New Task Received: '+ msg);
	socket.broadcast.emit('newTask', msg)
});

socket.on('rmTask', function(msg){
	sys.log('Delete Task Received with ID: '+ msg);
	socket.broadcast.emit('rmTask', msg)
});

  sys.log('Client Connected');
});

//sys.puts('Server running at http://127.0.0.1:8082/');