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
	CLIENTS.push(ws);
	ws.on('message', function(message) {
        console.log('received: %s', message);
        sendAllExecptSender(message, ws);
    });
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


