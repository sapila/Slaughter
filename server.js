var express = require ('express');

var app = express();
var server  = app.listen(3000);
var io      = require('socket.io').listen(server);

//app.use(express.static('./client'));
//app.use(bodyParser.json());
// var sessionMidleware = session({
//     secret: 'Ult1mAteC00ck1e!!!!',
//     resave: true,
//     saveUninitialized: true
// });
// app.use(sessionMidleware);
app.get("/",function(req,res){
	res.send("Alooooo2222");
})
console.log("Server started at localhost:" + server.address().port );