var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on("connection",socket =>{
 
  console.log("a user connected");

})

app.get('/', function(req, res){
  res.send("HELLO")
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
