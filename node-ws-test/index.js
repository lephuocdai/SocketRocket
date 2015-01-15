var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 443


var CLIENTS = [];

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")



wss.on("connection", function(ws) {
  	// var id = setInterval(function() {
   //  	ws.send(JSON.stringify(new Date()), function() {  })
  	// }, 1000);
	CLIENTS.push(ws);

	ws.on('message', function(message) {
        console.log('received: %s', message);
        // ws.send(message, function() {  });
        sendAllExecptSender(message, ws);
    });

  	// ws.on("close", function() {
   //  	console.log("websocket connection close");
   //  	clearInterval(id);
  	// });
});

function sendAll(message) {
	for(var i=0;i<CLIENTS.length;i++) {
    	CLIENTS[i].send(message);
    }
}

function sendAllExecptSender(message, ws) {
	for(var i=0;i<CLIENTS.length;i++) {
		if (CLIENTS[i] != ws) {
			CLIENTS[i].send(message);
		}
    }
}

// WebSocket server
// wsServer.on('request', function(request) {
//     var connection = request.accept(null, request.origin);

//     // This is the most important callback for us, we'll handle
//     // all messages from users here.
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             connection.sendUTF(JSON.stringify(message.utf8Data));
//         }
//     });

//     connection.on('close', function(connection) {
//         // close user connection
//     });
// });


// wsServer.on('request', function(request) {
//     console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
 
//     // accept connection - you should check 'request.origin' to make sure that
//     // client is connecting from your website
//     // (http://en.wikipedia.org/wiki/Same_origin_policy)
//     var connection = request.accept(null, request.origin); 
//     // we need to know client index to remove them on 'close' event
//     var index = clients.push(connection) - 1;
//     var userName = false;
//     var userColor = false;
 
//     console.log((new Date()) + ' Connection accepted.');
 
//     // send back chat history
//     if (history.length > 0) {
//         connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
//     }
 
//     // user sent some message
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') { // accept only text
//             if (userName === false) { // first message sent by user is their name
//                 // remember user name
//                 userName = htmlEntities(message.utf8Data);
//                 // get random color and send it back to the user
//                 userColor = colors.shift();
//                 connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
//                 console.log((new Date()) + ' User is known as: ' + userName
//                             + ' with ' + userColor + ' color.');
 
//             } else { // log and broadcast the message
//                 console.log((new Date()) + ' Received Message from '
//                             + userName + ': ' + message.utf8Data);
                
//                 // we want to keep history of all sent messages
//                 var obj = {
//                     time: (new Date()).getTime(),
//                     text: htmlEntities(message.utf8Data),
//                     author: userName,
//                     color: userColor
//                 };
//                 history.push(obj);
//                 history = history.slice(-100);
 
//                 // broadcast message to all connected clients
//                 var json = JSON.stringify({ type:'message', data: obj });
//                 for (var i=0; i < clients.length; i++) {
//                     clients[i].sendUTF(json);
//                 }
//             }
//         }
//     });
 
//     // user disconnected
//     connection.on('close', function(connection) {
//         if (userName !== false && userColor !== false) {
//             console.log((new Date()) + " Peer "
//                 + connection.remoteAddress + " disconnected.");
//             // remove user from the list of connected clients
//             clients.splice(index, 1);
//             // push back user's color to be reused by another user
//             colors.push(userColor);
//         }
//     });
 
// });


