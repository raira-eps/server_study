var express = require('express');
var ejs = require('ejs');

var app = express();

app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) => {
    //index.ejsをレンダリングする
    res.render('index.ejs', {
        title:'Index',
        content:'This is Express-app Top page'
    });
});

var server = app.listen(4500, () => {
    console.log('Start server port:4500');
});