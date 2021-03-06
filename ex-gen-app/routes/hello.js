var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var { check , validationResult} = require('express-validator');

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

//------------------------------------------------------------------------------//

//新規作成ページへのアクセス
router.get('/add', (req, res, next) => {
    var data = {
        title:'Hello/add',
        content:'新しいレコードを追加',
        form: {name:'', mail:'', age:0}
    }
    res.render('hello/add', data);
});

//新規作成フォーム送信の処理
router.post('/add', (req, res, next) => {
    check('name', 'Be sure to fill out the NAME').not().notEmpty();
    check('mail', 'Be sure to fill out the MAIL').isEmail();
    check('age', 'Be sure to fill out the AGE').isInt();

    validationResult(req).then((resutl) => {
        if (!result.isEmpty()){
            var re = '<ul class="error">';
            var result_arr = result_array();
            for (var n in result_arr ) {
                re += '<li>' + result_arr[n].msg + '</li>'
            }
            re += '</ul>';
            var data = {
                taitle: 'hello/add',
                content: re,
                form: req.body,
            }
            res.render('hello/add', data);

        } else {
            var nm = req.body.name;
        var ml = req.body.mail;
        var ag = req.body.age;
        var data = {'name': nm, 'mail': ml, 'age': ag,};
    
        //データベースの設定情報
        var connection = mysql.createConnection(mysql_setting);
        //データベースに接続
        connection.connect();
        //データを取り出す
        connection.query('insert into mydata set ?', data, function(error, results, fields){
            res.redirect('/hello');
        });
        //接続を解除
        connection.end();
        }
    })
});

//------------------------------------------------------------------------------//

//指定IDのレコードを表示する
router.get('/show', (req, res, next) => {
    var id = req.query.id;

    //データベースの設定情報    
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('SELECT * from mydata where id=?', id, function(error, results, fields){
        //データベースアクセス完了時の処理
        if (error == null) {
            var data = {
                title: 'hello/show',
                content: 'id = ' + id + ' のレコード',
                mydata: results[0],
            }
            res.render('hello/show', data);
        }
    });

    //接続を解除
    connection.end();
});

//------------------------------------------------------------------------------//

router.get('/edit', (req, res, next) => {
    var id = req.query.id;

    //データベースの設定情報  
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('SELECT * from mydata where id=?', id, 
                    function(error, results, fields){
        //データベースアクセス完了時の処理
        if ( error == null) {
            var data = {
                title: 'hello/edit',
                content: 'id = ' + id + ' のレコード',
                mydata: results[0],
            }
            res.render('hello/edit', data);
        }
    });

    //接続を解除
    connection.end();
});

//編集フォーム送信の処理
router.post('/edit', (req, res, next) => {
    var id = req.body.id;
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var data = {'name':nm, 'mail':ml, 'age':ag};

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('update mydata set ? where id = ?', 
                    [data, id], function(error, results, fields) {
                        res.redirect('/hello');
                    });
    
    //接続を解除
    connection.end();
});

//------------------------------------------------------------------------------//

//指定レコードを削除
router.get('/delete', (req, res, next) => {
    var id = req.query.id;

    //データベースの設定情報  
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('SELECT * from mydata where id=?', id, 
                    function(error, results, fields){
        //データベースアクセス完了時の処理
        if ( error == null) {
            var data = {
                title: 'hello/delete',
                content: 'id = ' + id + ' のレコード',
                mydata: results[0],
            }
            res.render('hello/delete', data);
        }
    });

    //接続を解除
    connection.end();
});

//削除フォーム送信の処理
router.post('/delete', (req, res, next) => {
    var id = req.body.id;
    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();
    //データを取り出す
    connection.query('delete from mydata where id=?', id, function(error, results, fields) {
        res.redirect('/hello');
    })
    //接続を解除
    connection.end();
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