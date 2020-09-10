var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
    host    :'127.0.0.1',
    user    :'root',
    password:'root',
    database:'my_nodeapp_db'
}

router.get('/', (req, res, next) => {
    //コネクションの用意
    var connection = mysql.createConnection(mysql_setting);
    console.log('Connection Order');
    //データベースに接続
    connection.connect();
    console.log('connecting...');
    //データを取り出す
    connection.query('SELECT * from mydata', function(error, results, fields){
        //データベースアクセス完了時の処理
        console.log('Connection complete');
        if (error == null) {
            console.log('connection error');
            var data = {title:'mysql', 
                        content:results,
                       };
            res.render('hello/index', data);
        }
    });
    //接続を解除
    connection.end();
    console.log('End of Conecction');
});

//router.post('/post', (req, res, next) => {
// var msg = req.body['message'];
//   req.session.message = msg;
//    var data = {
//        title:"Hello",
//        content:"Last message: " + req.session.message,
//    };
//    res.render('hello', data);
//})

module.exports = router;