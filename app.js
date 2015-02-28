var express = require('express')
var socketio = require('socket.io')
var app = express()

var firebase = require('firebase')
var rootRef = new firebase('https://amber-heat-5574.firebaseio.com/');
var postItRef = rootRef.child('post-its')

// Get post with post id
app.get('/api/post-it/:id', function (req, res) {
	console.log("GET req to get post-it")
	var id = req.params.id
	postItRef.child(id).on("value", function(snapshot) {
		res.status(200)
		res.send(snapshot.val())
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
})

// Create post-it
app.post('/api/post-it', function (req, res) {
	console.log("POST req to create post-it")
	var domElement = req.query.dom
	var url = req.query.url
	postItRef.push({
		domElement: domElement,
		url: url
	});
	res.status(200)
	res.send()
})

// Create comment on post-it
app.post('/api/comment', function (req, res) {
	console.log("POST req to create comment")
	var username = req.query.username
	var comment = req.query.comment
	var postId = req.query.postId
	var date = new Date()
	var newPostItRef = postItRef.child(postId).child('comments').push({
		username: username,
		comment: comment,
		date: date.getTime()
	});
	res.status(200)
	res.send()
})

// Delete post-it
app.delete('/api/post-it/:id', function (req, res) {
	console.log("DELETE req to delete post-it")		
	var id = req.params.id
	postItRef.child(id).remove()
	res.status(200)
	res.send()
})

// Delete comment
app.delete('/api/comment/', function (req, res) {
	console.log("DELETE req to delete comment")	
	var id = req.query.id
	var postId = req.query.postId
	postItRef.child(postId).child('comments').child(id).remove()
	res.status(200)
	res.send()
})

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Hack Illinois Backend app listening at http://%s:%s', host, port)
})