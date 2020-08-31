var express = require('express');
var router = express.Router();

var data = [
    {name:'taro', age:39, mail:'taro@nameko.jp'},
    {name:'yosi', age:22, mail:'hannin@yasu.jp'},
    {name:'tanaka', age:34, mail:'hanzawa@tom.ea'},
];

router.get('/', (req, res, next) => {
    var n = req.query.id;
    res.json(data[n]);
});

module.exports = router;