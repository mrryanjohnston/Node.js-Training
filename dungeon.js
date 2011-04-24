var http = require("http"),
    util = require("util"),
    fs   = require("fs"),
    io   = require("socket.io");

var connections = [];

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
    'Content-Type': 'text/html'
    });

    var rs = fs.createReadStream(__dirname + '/dungeontest.html');
    util.pump(rs, response);

});

server.listen(4000);



var socket = io.listen(server);
//connections.push();
socket.on('connection', function(client){
  // new client is here!
  console.log(client.sessionId + " has joined");
  connections.push(client.sessionId);
  var pos = connections.indexOf(client.sessionId);
  connections[pos] = {x: 0, y: 0};
  //client.on('message', function(){ … })
  //client.on('disconnect', function(){ … })
  client.send('Welcome to THE DUNGEON!');

  client.on('message', function(msg) {
    var action = 'test';
    switch(msg) {
        case "37": action  = "left";
                   //Only decrease the x if the user is not already at (0, y)
                   if (connections[pos].x!=0) {
                       connections[pos].x-=1;
                   }
                 break;
        case "40": action = "down";
                   //Only decrease the y if the user is not already at (x, 0)
                   if (connections[pos].y!=0) {
                       connections[pos].y-=1;
                   }
                 break;
        case "39": action = "right";
                   //Only increase the x if the user is not already at (5,y)
                   if (connections[pos].x!=5) {
                       connections[pos].x+=1;
                   }
                 break;
        case "38": action = "up";
                   //Only increase the x if the user is not already at (5,y)
                   if (connections[pos].y!=5) {
                       connections[pos].y+=1;
                   }
                 break;
    }
    //action = action.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    console.log(client.sessionId + ' is at position ' + connections[pos].x + ', ' + connections[pos].y);
    socket.broadcast(JSON.stringify(connections[pos]));
  });

});

