var express = require('express')
var socketio = require('socket.io')
var bodyParser = require('body-parser');
var multer = require('multer'); 

var app = express()

app.use("/js", express.static(__dirname + "/web/js"));
app.use("/css", express.static(__dirname + "/web/css"));
app.use("/html", express.static(__dirname + "/web/html"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var WORKERS = process.env.WEB_CONCURRENCY || 1;

var firebase = require('firebase')
var rootRef = new firebase('https://amber-heat-5574.firebaseio.com/')
var postItRef = rootRef.child('post-its')
var userRef = rootRef.child('users')
var groupRef = rootRef.child('groups')

// STATIC CONTENT
app.all("/", function(req, res, next) {
	res.sendfile("index.html", { root: __dirname + "/web" });
});

	// TEST PING
app.get('/tjena', function(req, res){
	res.status(200)
  res.send('hello world');
})

// GET ALL POST-IT ON URL	
app.get('/api/post-it/', function(req, res) {
	console.log('GET req to get all post-it with url')
	var postItList = []
	var i = 0
	postItRef.once('value', function(snapshot) {
		var listLenght = snapshot.numChildren()
		if (listLenght != 0) {
			snapshot.forEach(function(childSnapshot) {
			  var postIt = {
			  	post: childSnapshot.val(),
			  	id: childSnapshot.key()
			  }
			  if (postIt.post.url == req.query.url) {
			  	postItList.push(postIt)
			  }
			  if (i == listLenght - 1) {
					res.status(200)
					res.send(postItList)
			  }
	  		i++		
			})
		} else {
			res.status(200)
			res.send(postItList)
		}
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code)	
	})	
})

// GET USER FROM USERID
app.get('/api/users/:userId', function(req, res) {
	var userId = req.params.userId
	userRef.child(userId).once('value', function(snapshot) {
		if (snapshot.val() == null) {
			res.status(400)
		} else {
			res.status(200)
		}
		res.send(snapshot.val())
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code)	
	})	
})

// GROUP CREATION
app.post('/api/group/', function(req, res) {
	console.log('POST req to create group')
	var name = req.body.name
	var firstMember = req.body.firstMember

  var members = {};
  members[firstMember] = firstMember;
	var newGroup = {
		name: name
	}  
	newGroup['members'] = members;
	var newGroupRef = groupRef.push(newGroup)
	var key = newGroupRef.key()
	userRef.child(firstMember).child('groups').child(key).set(key)
	res.status(200)
	res.send(key)
})

// POST-IT CREATION
app.post('/api/post-it/', function(req, res) {
	console.log('POST req to create post-it')
	var dom = req.body.dom
	var url = req.body.url
	var newPostIt = {
		domElement: dom,
		url: url
	}
	var newPostItRef = postItRef.push(newPostIt)
	var sendData = {
		post: newPostIt,
		id: newPostItRef.key()
	}
	io.sockets.in(url).emit('NewPostItCreated', sendData)
	res.status(200)
	res.send(sendData)
})

// ADD GROUP MEMBER
app.post('/api/group/add-member/', function(req, res) {
	console.log('POST req to add member to group')
	var groupId = req.body.groupId
	var userId = req.body.userId
	groupRef.child(groupId).child('members').child(userId).set(userId)
	res.status(200)
	res.send()
})

// COMMENT CREATION
app.post('/api/comment/', function(req, res) {
	console.log('POST req to create comment')
	var username = req.body.username
	var comment = req.body.comment
	var postId = req.body.postId
	var date = new Date()
	var newComment = {
		username: username,
		comment: comment,
		date: date.getTime()
	}
	postItRef.child(postId).child('comments').push(newComment)
	var sendData = {
		comment: newComment,
		postId: postId
	}
	postItRef.child(postId).once('value', function(snapshot) {
		io.sockets.in(snapshot.val().url).emit('NewCommentCreated', sendData)
		res.status(200)
		res.send()	
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code)	
	})	
})

var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Hack Illinois Backend app listening at http://%s:%s', host, port)
})

var io = socketio.listen(server)
io.on('connection', function(socket){

	socket.on('joinRoom', function(data){
	  console.log(socket.id + ' joining room ' + data.url); // prints on every other request
	  socket.join(data.url);
  }); 

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