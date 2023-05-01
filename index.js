//This is the Node Server, serving mainPage 'index.html' (index.html must be in same folder as of index.js thus the line=>  res.sendFile(__dirname + '/index,html') works, otherwise routing problem occurs and the page is not served.)
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
//Integrating socket.io with NodeServer created above
const io = require('socket.io')(server);
/* Along with above step do two more things, to connect socket.io stuff of backend.node_server with frontend:
1) <script src="/socket.io/socket.io.js"></script> include in index.html(the main page served) , it includes everything needed to load the socket.io-client and then connect
2) in js file of frontend (here frontend/frontend_js/client.js) write : var socket = io(); no URL is passed when io() called, becoz by default it will try to connect to the host that serves the page.
 */

const users = {};

const hostname = '127.0.0.1'
const port = 3000

//must to use for static Files loading like frontend css, js and images other files used.
app.use('/frontend', express.static('frontend'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Whenever a user connects(means a socket connected via frontend js file var socket=io();), 'connection' (pre-defined/inbuilt) event is listened and log in to console. 
io.on('connection', (socket) => {

  // (1) => A new user joined and sent 'new_user_joined' event to server from (frontend browser side script i.e. client.js) and ...
  socket.on('new_user_joined', name_=>{
    console.log("New User",name_, "connected");                                                                           //print in server terminal
    users[socket.id] = name_;                                                                                             //that user included in users{} object.
    socket.broadcast.emit('user_joined', name_);                                                                          // ...in reponse to this, server will broadcast.emit means send 'user_joined' event to all users(socket connections i.e. to browser/client side i.e. client.js) except this user...
  })

  // (2) => A user(socket connection) when clicks send button the it sends 'send_message' event to server from (frontend browser side script i.e. client.js) ...
  socket.on('send_message', message=>{
    console.log("Message sent by ",users[socket.id])                                                                      //print in server terminal
    socket.broadcast.emit('receive_message', {message: message, name_: users[socket.id]})                                 // ...in reponse to this, server will broadcast.emit means send 'receive_message' event to all users(socket connections i.e. to browser/client side i.e. client.js) except this user...
  })

  // (3) => for particular socket if tab closed means disconnected, so like 'connection' their is predefined/inbuilt 'disconnect' event will be AUTOMATICALLy sent to server from that user(socket) just before leaving(tab closing)
  socket.on('disconnect', message=>{
    console.log(users[socket.id], "Dis-connected");                                                                       //print in server terminal
    socket.broadcast.emit('a_user_left', users[socket.id]);                                                               // ...in reponse to this, server will broadcast.emit means send 'a_user_left' event to all users(socket connections i.e. to browser/client side i.e. client.js) except this user...
    delete users[socket.id];                                                                                              //that user deleted from users{} object.
  })

})

server.listen(port, () => {
  console.log(`App server listening on http://${hostname}:${port}/`);
});