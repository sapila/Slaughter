var socket = io();

function possitionUpdate(player){
    socket.emit('possitionUpdate',player);
   }
function addPlayer(player){
   socket.emit('addPlayer',player);
}

   socket.on('localUpdatePossition', function(players){
	localPlayers = players; 
	console.log(localPlayers.length);
   });

var localPlayers = [];
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var textX = 50;
var textY = 50;
var player = {
  id:Math.random() * (10000 - 1) + 1,
  color: "#00A",
  x: 220,
  y: 270,
  width: 16,
  height: 16,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};
addPlayer(player);
var charCode;
document.onkeydown = function (e) { 
  e = e || window.event; 
  charCode = e.charCode || e.keyCode, 
      character = String.fromCharCode(charCode); 
console.log(charCode);
if (charCode==65) {
    player.x -= 10;
  }

  if (charCode==68) {
    player.x += 10;
  }
if (charCode==87) {
    player.y -= 10;
  }
  
  if (charCode==83) {
    player.y += 10;
  }

};

function update() {
	textX += 1;
	textY += 1;
possitionUpdate(player)
 }
function draw() {  

	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.fillStyle = "red"; // Set color to black
	canvas.fillText("Sup Bro!", textX, textY); 
//	player.draw();
	for(var i=0;i<localPlayers.length;i++){
		canvas.fillStyle = localPlayers[i].color;
    		canvas.fillRect(localPlayers[i].x, localPlayers[i].y, localPlayers[i].width, localPlayers[i].height);

	}
}

var FPS = 30;
setInterval(function() {
  update();
  draw();
}, 1000/FPS);


