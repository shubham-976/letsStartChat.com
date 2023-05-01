//This is FRONTEND/browser side js file

//this below line is for connecting frontend socket.io-client with socket.io stuff of server at backend(i.e. connection from each tab's client.js to one common server(where it is hosted) index.js )
var socket = io(); //this is 2nd step after declaring var io = require('socket.io')(server), 1st step is in index.html
//  I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page

const username = document.getElementById('username');
const formContainer = document.getElementById('formContainer')
const inputMessage = document.getElementById('inputMessage')
const messageContainer = document.querySelector('.messageContainer')                                    //if you use getElementbyClassName('messageContainer')[0] becoz this method will return all elements of that class name while query selector just returns first one.
var audio = new Audio('frontend/frontend_medias/ping.mp3')                                               //becoz static file searches start from frontend folder as declared in index.js

//function to appdend messages in messageContainer
const append = (message, whichside)=>{
    const ele = document.createElement('div');
    ele.innerText = message;
    ele.classList.add('messages');                                                                      //'messages' and 'left','left2','right' are classes in style.css
    ele.classList.add(whichside);
    messageContainer.append(ele);                                                                       //this is standard append() function different from the above defined append() function.
    if(whichside=='left' || whichside=='left2')                                                         //means message received from other
        audio.play();
}

// (1) => When new instance or tab opened, a new unique socket connection is built.
const name_ = prompt('Enter your name to Join the Chat : ');
username.innerText = `Username : ${name_}`;
socket.emit('new_user_joined', name_);                                                                  //...this user(browser-side) sends event 'new_user_joined' to server ....
socket.on('user_joined', name_=>{                                                                       //... in response to above, the event 'user_joined' is received by every other tab(socket-connection) due to broadcast.emit as a response FROM THE SERVER(index.js).
    append(`:) ${name_} joined the Chat.`, 'left2')
})


// (2) => When a user(a connection), clicks on send button 
formContainer.addEventListener('submit', (eve)=>{
    eve.preventDefault();                                                                               //to avoid the form from reloading just after cliclking submit button, otherwise page will reload and nothing will happen
    const message = inputMessage.value;
    append(`You : ${message}`, 'right');
    socket.emit('send_message', message);                                                               //...this user(browser-side) sends event 'send_message' to server ....
    inputMessage.value = "";                                                                            //so that input message box becomes empty after clicking send button
})
socket.on('receive_message', data=>{                                                                    //... in response to above, the event 'receive_message' is received by every other tab(socket-connection) due to broadcast.emit as a response FROM THE SERVER(index.js).
    append(`${data.name_} : ${data.message}`, 'left')                                           
})

// (3) => When a user closes tab, then just before leaving that user(tab/socket-connection) sends predefined/inbuilt event 'disconnect' to the server ...
socket.on('a_user_left', name_=>{                                                                       //... in response to above, the event 'a_user_left' is received by every other tab(socket-connection) due to broadcast.emit as a response FROM THE SERVER(index.js).
    append(`:( ${name_} left the chat.`, 'left2');
})
