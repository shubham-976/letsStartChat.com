=> Name of Project : "LSC:Lets Start Chat"
=> What it is : A Real-time MultiUser Chat Application.

---------------------------------Running DEMO of the Project-----------------------------------
Here 3 USERS named Rohan, Mohan and Shubham have joined the chat and are able to communicate live with each other. See the image below : 
![project_demo](https://user-images.githubusercontent.com/97439744/178131936-9bf8e858-03dc-4557-882c-ece93358e1d3.png)
--------------------------------------------------------------
=> How to run :
 i) Download complete folder.
 ii) open terminal in that folder, and run the command :
	a) node index.js (if something changed manually need to restart the sever, using same command)
		OR
	b) nodemon index.js (if something changed then on saving nodemon will AUTOMATICALLY restart the server itself no need to write this command in terminal again, just refresh the webApp page)
 	   (before using nodemon, make sure that nodemone is install in the main folder as: npm install nodemon)
 iii) After above step done, Just click on the link appearing in terminal or type localhost:3000 or 127.0.0.1:3000 in browser, the app will be opened.(Remember port is 3000 becoz i used it in server file index.js if ther that port changed then in this link also that new port is to be typed).
 iv) Repeat the iii) step and open 2-3 Tabs/Windows of this same app.
 v) Then start Chatting, via those different tabs/windows as differnet users.

=> Tools Used:
 i) Html, Css, Javascript to make frontend.
 ii) Nodejs, express, Javascript to make server and backend stuff.
 iii) socket.io for web socket connection for message transer (client(s)----->server----->client(s)).
 iv) Nodemon (a nodejs package/module/dependency) just for running server. 

=> Brief idea about Development steps (for reference and basic idea):
->BASIC STUFF for website initialization and hosting on server: 
 i) Use the socket.io official documentation and a littlebit of YT/Google.
 ii) In one folder just make a project by : npm init
     install needed dependencies/modules/libraries : npm init nodemon, npm init express, npm init socket.io, after this nodemodules folder, package-lock, package-json will be automatically there.
 iii) Make a simple frontend html page (index.html) in same folder.
 iv) in the same folder,make (index.js) then a classical express app and a backend server in the same, and serve the above made html page (can take ref. of socket.io documentation for that)
 v) Also make a folder named (frontend) in the same folder and it will have corresponding sub folders as frontend_css(contains style.css), frontend_js(contains client.js), frontend_medias(contains images, audio, backgroundImages).
 vi) In index.js also include : app.use('/frontend', express.static('frontend')) ;must to use for static Files loading like frontend css, js and images other files used when included/imported in index.html(which is rendered through index.js) will start its path searching from folder 'frontend'
 vii)Till here our webpage is served on the Node server (and all css and js files of frontend are included in index.html after above steps as For eg : <scipt defer src="frontend/frontend_js/client.js"></script>; <link rel="stylesheet" href="frontend/frontend_css/style.css> etc
->NOW integrating THE socket.io with NODE-SERVER created above:
 viii) In index.js(our backend) write const io = require('socket.io')(server_name); server_name is the variable name of Nodeserver created above. After this two imp steps:
	a) write <script defer src="/socket.io/socket.io.js"></script> in frontend_html file i.e. index.js, so that that it will inlude all the socket.io stuff needed at client side i.e. socket.io-client.
	b) write const socket = io(); in frontend_js (i.e. browser/client side i.e. client.js) whenever a new user joins(new tab/window opened) a new socket connection is made due to this line from the browser_side to the viii) line of ServerSide.
	Thus every user( tab/window) will have its unique socket connection with the Server i.e. connected due to above (b)pint(client_side cliet.js)with the (viii)point(ServerSide i.e. index.js)
 ix)Then, a)whenever client want to send some event to server it , via client.js it invokes socket.emit(to all socket connections) or socket.broadcast.emit(to all socket connections except this calling one) and sends event to server .
	 b)Server listens the above event sent , using socket.on() in index.js and thus responds back, so sends back some event socket.emits() or socket.broadcast.emits() from index.js to the client.js of all connections(if emit used) or all connection except one(if broadcast.emut used)
	 c)Now again client.js of all socket-connections or all except one(acc to above step) gets that event from server using socket.on() in client.js and thus do the required task like DOM manipulation etc. to the various users/tabs/windows/socket-connections.
 This is how the Web sockets part is accomplished in above Project.
 Rest is the Styling of this WebApp using css which depends on individual choice.
	
=> References Used : 
 i) Socket.io Official docs step by step. (https://socket.io/get-started/chat)
 ii) Youtube and Google for little bug fixes.
