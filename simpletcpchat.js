var net = require('net');
var carrier = require('carrier');


var connections = [];

net.createServer(function(conn) {

    connections.push(conn);

    conn.on('close', function() {

        var pos = connections.indexOf(conn);
        if (post >= 0) {
            connections.splice(pos, 1);
        }
    });

    conn.write("Hello, welcome to this chat server\n");
    conn.write("Please input your user name:\n");

    var username;

    carrier.carry(conn, function(line) {
        if (!username) {
            username = line;
            conn.write("Hello" + username + "!\n");
            return;
        }

        if (line == 'quit') {
            conn.end();
            return;
        }

        connections.forEach(function(one_connection){
            one_connection.write(line);
        });
    });

}).listen(4000);

