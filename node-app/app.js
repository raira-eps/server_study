const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(4500);
console.log('Server start!');

function getFromClient(request,respomse){
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname){
        case '/' :
            var content = ejs.render(index_page, {
                title:"Index",
                content:"This is a sample page using a template.",
            })
            respomse.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        
        case 'style.css':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(style_css);
            response.end();
            break;
        
        default:
            response.writeHead(200, 'Content-Type': 'text/html');
            response.write('no page....');
            break;
    }
}

//function getFromClient(request, response){
//    var content = ejs.render(index_page);
//   response.writeHead(200, {'Content-Type': 'text/html'});
//    response.write(content);
//    response.end();
//}

//function getFromClient(req,res){
//    request = req;
//    response = res;
//    fs.readFile('./note.html', 'UTF-8', writeToResponse);
//}

function writeToResponse(error,data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
}