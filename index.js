var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

var clients = 0;
io.on('connection', function(socket){
    /* console.log('A user is connected!');
    setTimeout(function(){
        //socket.send('Thanks for Joining Us!'); // server to client
        socket.emit('testEvent', 'This is a Test Event'); //client to server 
    },5000) */

    
    clients++;
    //for broadcast to connected clients
    //io.sockets.emit('broadcast', {message: clients + 'clients are connected with us!'});
    socket.emit('newConnectedClient', {message: 'Hello new client!!'}) //for new join
    socket.broadcast.emit('newConnectedClient', {message: clients + 'clients are connected with us!'}); // for already joined
    socket.on('disconnect', function(){
        clients--;
        //io.sockets.emit('broadcast', {message: clients + 'clients are connected with us!'});
        socket.broadcast.emit('newConnectedClient', {message: clients + 'clients are connected with us!'});
    })
})
http.listen(3000, function(){
    console.log("The server is running at port 3000");
});
