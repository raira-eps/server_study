const http = require('http');

var server = http.createServer(
    (request,response) => {
        response.end('Hello wprld');
    }
);

server.listen(4500);