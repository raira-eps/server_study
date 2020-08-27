//メインプログラムファイル
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const login_page = fs.readFileSync('./login/ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const max_num = 10; //最大保管数
const filename = 'mydata.txt'; //データファイル名
var message_data; //データ
readFromFile(filename);

var server = http.createServer(getFromClient);

server.listen(4500);
console.log('Server Start...');


function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        
        case '/login' : //ログインページ
            response_login(request, response);
            break;

        case '/style.css' :
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();

        default:
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('No pages ....');
            break;
    }
}

//ログインのアクセス処理
function response_login(request, response){
    var content = ejs.render(login_page, {});
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

//Indexのアクセス処理
function response_index(request, response){
    //POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理

    }
}