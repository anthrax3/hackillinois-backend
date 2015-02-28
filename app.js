var express = require('express')
var socketio = require('socket.io')
var app = express()

var firebase = require('firebase')
var rootRef = new firebase('https://amber-heat-5574.firebaseio.com/')
var postItRef = rootRef.child('post-its')

app.get('/tjena', function(req, res){
	res.status(200)
  res.send('hello world');
})

var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Hack Illinois Backend app listening at http://%s:%s', host, port)
})

var io = socketio.listen(server)
io.on('connection', function(socket){

	// GET POST-IT
	socket.on('GetPostIt', function(data){
		console.log("GET req to get post-it")
		var id = data.id
		postItRef.child(id).on("value", function(snapshot) {
			io.emit('GetPostIt', snapshot.val())
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code)
		})	
	})	

		// GET ALL POST-IT ON URL
	socket.on('GetAllPostItUrl', function(data){
		console.log("GET req to get all post-it with url")
		var postItList = []
		var i = 0
		postItRef.on("value", function(snapshot) {
			var listLenght = snapshot.numChildren()
			snapshot.forEach(function(childSnapshot) {
			  var postIt = childSnapshot.val();
			  if (postIt.url == data.url) {
			  	postItList.push(postIt)
			  }
			  if (i == listLenght - 1) {
				  console.log('ASDASDASDASDASDASD' + postItList)
					io.emit('GetAllPostItUrl', postItList)
			  } else {
		  		i++	
			  }
			});
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code)
		})	
	})

	// POST-IT CREATION
	socket.on('CreatePostIt', function(data){
  	console.log("POST req to create post-it")
		var domElement = data.dom
		var url = data.url
		postItRef.push({
			domElement: domElement,
			url: url
		})
	})

	// COMMENT CREATION
	socket.on('CreateComment', function(data){
		console.log("POST req to create comment")
		var username = data.username
		var comment = data.comment
		var postId = data.postId
		var date = new Date()
		var newPostItRef = postItRef.child(postId).child('comments').push({
			username: username,
			comment: comment,
			date: date.getTime()
		})
	})

	// POST-IT DELETION
	socket.on('DeletePostIt', function(data){
		console.log("DELETE req to delete post-it")		
		var id = data.id
		postItRef.child(id).remove()
	})

	// COMMENT DELETION
	socket.on('DeleteComment', function(data){
		console.log("DELETE req to delete comment")	
		var id = data.id
		var postId = data.postId
		postItRef.child(postId).child('comments').child(id).remove()
	})
})