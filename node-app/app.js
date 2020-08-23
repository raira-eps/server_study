const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen(4500);
console.log('Server start!');


function getFromClient(req,res){
    request = req;
    response = res;
    fs.readFile('./note.html', 'UTF-8', writeToResponse);
}

function writeToResponse(error,data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
}