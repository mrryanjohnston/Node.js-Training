var http = require("http"),
    util = require("util"),
    fs   = require("fs"),
    io   = require("socket.io");

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
    'Content-Type': 'text/html'
    });

    var rs = fs.createReadStream(__dirname + '/chattemplate.html');
    util.pump(rs, response);

});

server.listen(4000);

var socket = io.listen(server);
socket.on('connection', function(client){
  var username;
  // new client is here!
  console.log("New user has joined");
  //client.on('message', function(){ … })
  //client.on('disconnect', function(){ … })
  client.send('Welcome to my chat server!');
  client.send('Please input your username: ');

  client.on('message', function(msg) {
    console.log('message received');
    if(!username) {
        username = msg;
        client.send('Welcome, ' + username + '!');
        return;
    }
    socket.broadcast(username + ": " + msg);
  });
});

