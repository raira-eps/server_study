var express = require('express');
var ejs = require('ejs');

var app = express();
app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var data = {
    'taro':'taro@dotcom',
    'sati':'sati@google',
    'kiyo':'tomato@yahoo',
    'imiwa':'karann@ejs',
};

//top page
app.get("/", (req, res) => {
    var msg = "this is Index page<br>"
                + "※メッセージを書いて送信してください";
    //index.ejsをレンダリングする
    res.render('index.ejs', {
        title:'Index',
        content: msg,
        data:data,
    });
});

//POST送信の処理
app.post('/', (req, res) => {
    var msg = "This is posted page<br>"
            + "あなたは<b>" + req.body.message + "</b>と書いて送りました";
    res.render('index.ejs',{
        title:'Posted page',
        content:msg,
        data:data,
    });
});
//other page
app.get("/other", (req, res) => {
    var name = req.query.name;
    var pass = req.query.pass;
    var msg = "あなたの名前は「"+ name +"」<br>パスワードは「"+ pass +"」です。";
    //index.ejs をレンダリングする
    res.render("index.ejs", {
        title:"Other",
        content: msg,
        link:{href:"/", text:"※トップページへ移動"}
    })
})
var server = app.listen(4500, () => {
    console.log('Start server port:4500');
});