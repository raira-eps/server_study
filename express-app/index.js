var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Express')
})

app.listen(4500, () => {
    console.log('Start server port:4500')
})