var express = require('express')
var socketio = require('socket.io')
var app = express()

// var bodyParser = require('bodyParser')

var firebase = require('firebase')
var rootRef = new firebase('https://amber-heat-5574.firebaseio.com/')
var postItRef = rootRef.child('post-its')

// TEST PING
app.get('/tjena', function(req, res){
	res.status(200)
  res.send('hello world');
})

// GET ALL POST-IT ON URL	
app.get('/api/post-it/:url', function(req, res) {
	console.log('GET req to get all post-it with url')
	var postItList = []
	var i = 0
	postItRef.on('value', function(snapshot) {
		var listLenght = snapshot.numChildren()
		if (listLenght != 0) {
			snapshot.forEach(function(childSnapshot) {
			  var postIt = childSnapshot.val();
			  if (postIt.url == req.params.url) {
			  	postItList.push(postIt)
			  }
			  if (i == listLenght - 1) {
					res.status(200)
					res.send(postItList)
			  }
	  		i++		
			});
		} else {
			res.status(200)
			res.send()
		}
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code)
	})	
})

// POST-IT CREATION
app.post('/api/post-it/', function(req, res) {
	console.log('POST req to create post-it')
	var domElement = req.query.dom
	var url = req.query.url
	var newPostIt = {
		domElement: domElement,
		url: url
	}
	postItRef.push(newPostIt)
	io.emit('NewPostItCreated', newPostIt)
	res.status(200)
	res.send()
})

var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Hack Illinois Backend app listening at http://%s:%s', host, port)
})

var io = socketio.listen(server)
io.on('connection', function(socket){

	// COMMENT CREATION
	socket.on('CreateComment', function(data){
		console.log('Socket.io broadcast for comment creation')
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
		console.log('Socket.io broadcast for post-it deletion')		
		var id = data.id
		postItRef.child(id).remove()
	})

	// COMMENT DELETION
	socket.on('DeleteComment', function(data){
		console.log('Socket.io broadcast for comment deletion')	
		var id = data.id
		var postId = data.postId
		postItRef.child(postId).child('comments').child(id).remove()
	})
})