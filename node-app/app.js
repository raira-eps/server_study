const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(4500);
console.log('Server start!');

function getFromClient(request,response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){
        case '/' :
            resopnse_index(request, response);
            break;
        
        case '/other':
            response_other(request, response);
            break;

        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(style_css);
            response.end();
            break;
        
        default:
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('no page....');
            break;
    }
}

//Index access process
function resopnse_index(request, response){
    var msg = "this is index page."
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

//other access process
function response_other(request, response){
    var msg = "this is other page."
    if (request.method == 'POST'){
        var body = '';

        //event processing for data reception
        request.on('data', (data) => {
            body +=data;
        });
        //event processing for the end of data reception
        request.on('end', ()=> {
            var post_data = qs.parse(body);
            msg += 'you wrote '+ post_data.msg +'';
            var content = ejs.render(other_page, {
                title: "Other",
                content:msg,
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
        });
    //Processing at GET access
    }else{
        var msg = 'There are no pages.'
        var content = ejs.render(other_page, {
            title:"Other",
            content:msg,
        });
        response.writeHead(200, {'Content-Type': "text/html"});
        response.write(content);
        response.end();
    }

}

function writeToResponse(error,data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
}