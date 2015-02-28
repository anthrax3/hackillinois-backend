var express = require('express')
var app = express()

var firebase = require('firebase')
var rootRef = new firebase('https://amber-heat-5574.firebaseio.com/');

// Get all post-its with url
app.get('/api/post-it/:id', function (req, res) {
		console.log("GET req to get post-it")
	var id = req.params.id
	var postItRef = rootRef.child('post-its').child(id)
	postItRef.on("value", function(snapshot) {
		res.status(200)
		res.send(snapshot.val())
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
})

// Get all comments that have post-it id
app.get('/api/comment/:id', function (req, res) {
	console.log("GET req to get comment")
	var id = req.params.id
	var postItRef = rootRef.child('comments').child(id)
	postItRef.on("value", function(snapshot) {
		res.status(200)
		res.send(snapshot.val())
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}) 

// Create post-it
app.post('/api/post-it', function (req, res) {
	console.log("POST req to create post-it")
	var postItRef = rootRef.child('post-its')
	// var domElement = req.param.dom
	// var url = req.param.url
	postItRef.push({
		domElement: 'dom',
		url: 'url'
	});
	var postID = postItRef.key();
	res.status(200)
	res.send()
})

// Create comment on post-it
app.post('/api/comment', function (req, res) {
	console.log("POST req to create comment")
	var commentsRef = rootRef.child('comments')
	// var username = req.param.username
	// var comment = req.param.comment
	commentsRef.push({
		username: 'username',
		comment: 'comment'
	});
	var commentID = commentsRef.key();
	res.status(200)
	res.send()
})

// Delete post-it
app.delete('/api/post-it/:id', function (req, res) {
	console.log("DELETE req to delete post-it")	
	var id = req.params.id
	var postItRef = rootRef.child('post-its').child(id).remove()
	res.status(200)
	res.send()
})

// Delete comment
app.delete('/api/comment/:id', function (req, res) {
	console.log("DELETE req to delete comment")	
	var id = req.params.id
	var postItRef = rootRef.child('comments').child(id).remove()
	res.status(200)
	res.send()
})

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Hack Illinois Backend app listening at http://%s:%s', host, port)
})