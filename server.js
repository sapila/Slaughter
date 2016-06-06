var express = require ('express');

var app = express();
var server  = app.listen(3000);
var io      = require('socket.io').listen(server);

app.use(express.static('./client'));
//app.use(bodyParser.json());
// var sessionMidleware = session({
//     secret: 'Ult1mAteC00ck1e!!!!',
//     resave: true,
//     saveUninitialized: true
// });
// app.use(sessionMidleware);
app.get("/",function(req,res){
	res.sendFile(__dirname+'/client/index.html');
})

var players = [];

io.on('connection', function(socket){
	console.log("con");
	socket.on('addPlayer',function(player){
		players.push(player);
		console.log(players.length+ " "+player.id);
	});
	socket.on('disconnect', function(sock){
        	console.log('user disconnected');
        });
   	 socket.on('possitionUpdate', function(player){
		for(var i=0;i<players.length;i++){
			if(players[i].id === player.id){
				players[i] = player
			}	
		}
		io.emit('localUpdatePossition',players);
       
	});
});
console.log("Server started at localhost:" + server.address().port );
