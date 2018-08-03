var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('addCharacter', function(character){
    console.log('addCharacter', character);
    io.emit('addCharacter', character);
  });

  socket.on('updateCharacter', function(character){
    console.log('updateCharacter', character);
    io.emit('updateCharacter', character);
  });

  socket.on('updateInitiative', function(characterList){
    console.log('updateInitiative', characterList);
    io.emit('updateInitiative', characterList);
  });
});
