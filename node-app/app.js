const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var data = {
    'Taro' : '11111',
    'Hanko' : '22222',
    'Sachiko' : '333333',
    'Hiro' : '444444'
};

var data2 = {
    'taro': ['taro@yahoo', '1111', 'tokyo'],
    'hanako': ['hanako@google', '2222', 'tokyo'],
    'sachiko': ['sachiko@yahoo', '3333', 'usa'],
    'hiro': ['hiro@onion', '4444', 'ua'],
};

var data_msg = {
    msg:'no message...'
};

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
   if (request.method == 'POST'){
       var body = '';
       request.on('data', (data) =>{
        body += data;
       })
       request.on('end', () =>{
           data = qs.parse(body);
           //Saving cookies
            setCookie('msg', data.msg, response);
           write_index(request, response);
       });
   } else {
       write_index(request, response);
   }
}

function write_index(request, response){
    var msg = "Show Message"
    var cookie_data = getCookie('msg', request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data:data,
        cookie_data:cookie_data,
      //filename:'data_item'
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

//Set the value of the cookie
function setCookie(key, value, response){
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

//Get the value of the cookie
function getCookie(key, request){
    var cookie_data = request.headers.cookie != undefined ? 
        request.headers.cookie :'';
    var data  = cookie_data.split(';');
    for(var i in data) {
        if(data[i].trim().startsWith(key + '=')){
            var result = data[i].trim().substring(key.kength + 1);
            console.log(data);//test log
            return unescape(result);
        }
    }
    return '';
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
                data:data2,
                filename:'data_item'
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