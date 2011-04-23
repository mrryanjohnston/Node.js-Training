var http = require('http');

var server = http.createServer(function(request, response) {
  console.log('new request');
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('Hellow World!');
}).listen(8000);
