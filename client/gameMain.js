var socket = io();

function possitionUpdate(player){
    socket.emit('possitionUpdate',player);
   }
function addPlayer(player){
   socket.emit('addPlayer',player);
}

   socket.on('localUpdatePossition', function(players){
	localPlayers = players; 
	//console.log(localPlayers.length);
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
  x: 150,
  y: 10,
  width: 16,
  height: 16,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};
addPlayer(player);


var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

var r;
function update() {


	textX += 1;
	textY += 1;
   if (keyState[37] || keyState[65]){
        player.x -= 5;
    }    
    if (keyState[39] || keyState[68]){
        player.x += 5;
    }
      if (keyState[38] || keyState[87]){
        player.y -= 5;
    }    
    if (keyState[40] || keyState[83]){
        player.y += 5;
    }
    console.log(mouseX + "  " + mouseY);

     var dx=mouseX-(player.x);
      var dy=mouseY-(player.y);
      r=Math.atan2(dy,dx);

      console.log(r);

possitionUpdate(player)
 }
function draw() {  

	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.fillStyle = "red"; // Set color to black
	canvas.fillText("Sup Bro!", textX, textY); 


 
//	player.draw();
	// for(var i=0;i<localPlayers.length;i++){
 //     canvas.save();
 //     //canvas.translate(player.x +player.width/2, player.y  +player.height/2);

	// 	canvas.fillStyle = localPlayers[i].color;
 //    canvas.rotate(45);
 //    canvas.fillRect(localPlayers[i].x, localPlayers[i].y, localPlayers[i].width, localPlayers[i].height);
 //    canvas.restore();
	// } 
  canvas.fillStyle = player.color;
    // canvas.fillRect(player.x, player.y, player.width, player.height);
canvas.save();
    canvas.translate(player.x + player.width/2, player.y +player.height/2);

   
    canvas.rotate(r);
    canvas.fillRect(-player.width/2, -player.height/2, player.width, player.height);
    canvas.restore();
}


window.addEventListener('mousemove', mouseMove);
    var mouseX, mouseY;

function mouseMove(e)
{

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }


    /* do something with mouseX/mouseY */
}
var FPS = 40;
setInterval(function() {
  update();
  draw();
}, 1000/FPS);


