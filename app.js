var express = require('express')
var app = express()

// Create post-it
app.post('/api/post-it', function (req, res) {
  console.log("POST req to create post-it")
  var domElement = req.param.dom
  var url = req.param.url

})

// Create comment on post-it
app.post('/api/comment', function (req, res) {
  res.send('POST request to the homepage')
})

// Delete post-it
app.delete('/api/post-it', function (req, res) {
  res.send('POST request to the homepage')
})

// Delete comment
app.delete('/api/comment', function (req, res) {
  res.send('POST request to the homepage')
})

// Get all post-its with url
app.get('/api/post-it', function (req, res) {
  var url = req.query.url;
  res.send('POST request to the homepage')
})

// Get all comments that have post-it id
app.get('/api/comment', function (req, res) {
  var url = req.query.url;
  res.send('POST request to the homepage')
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})