var express = require('express');
var ejs = require('ejs');

var app = express();

app.engine('ejs', ejs.renderFile);

app.use(express.static('public'));

//top page
app.get("/", (req, res) => {
    var msg = "Top page";
    var url = "/other?name=taro&pass=yamada";
    //index.ejsをレンダリングする
    res.render('index.ejs', {
        title:'Index',
        content: msg,
        link:{href:url, text:'※別のページに移動'},
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