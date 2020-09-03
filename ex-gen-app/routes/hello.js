var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
    host    :'localhost',
    user    :'root',
    password:'',
    database:'my-nodeapp-db'
}

router.get('/', (req, res, next) => {
    //コネクションの用意
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('SELECT * from mydata', function(error, results, fields){
        //データベースアクセス完了時の処理
        if (error == null) {
            var data = {title:'mysql', 
                        cintent:results,
                       };
            res.render('hello', data);
        }
    });
    //接続を解除
    connection.end();
});

router.post('/post', (req, res, next) => {
    var msg = req.body['message'];
    req.session.message = msg;
    var data = {
        title:"Hello",
        content:"Last message: " + req.session.message,
    };
    res.render('hello', data);
})

module.exports = router;