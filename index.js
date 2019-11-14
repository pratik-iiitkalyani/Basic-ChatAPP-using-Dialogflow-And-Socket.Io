const App = require('express')();
const Http = require('http').createServer(App);
const Io = require('socket.io')(Http);
const cors = require('cors');


const Dialogflow = require("./dialogflow")

App.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

Io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
      console.log(message);
    });
});

Io.on('connection', function(socket){
  console.log('a user connected');
});

Http.listen(3000, function(){
  console.log('listening on *:3000');
});

Io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


// Io.on('connection', function(socket){
//   	socket.on('chat message', function(msg){
//       console.log('message:'+ msg);
//       socket.emit('reply', msg);
//   });
// });

// send messag
Io.on('connection', function(socket){
  socket.on('chat message', async function(msg){
    Io.emit('chat message', msg);
    console.log(msg)
    const res = await Dialogflow.dig(msg);
    socket.emit('reply', res)
  });
});


