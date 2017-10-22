var level1Screen = [
	["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
	["B", "A", "A", "A", "A", "D", "C", "A", "A", "A", "A", "B"],
	["B", "A", "A", "A", "A", "B", "B", "A", "A", "A", "A", "B"],
	["B", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B"],
	["B", "A", "B", "B", "A", "A", "A", "A", "B", "B", "A", "B"],
	["B", "E", "D", "D", "A", "A", "A", "A", "D", "D", "A", "B"],
	["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"]
];

var screen = [
	["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
	["B", "C", "C", "C", "C", "C", "A", "C", "C", "A", "C", "B"],
	["B", "C", "A", "A", "A", "C", "C", "A", "C", "C", "A", "B"],
	["B", "C", "C", "C", "C", "C", "A", "A", "C", "A", "A", "B"],
	["B", "C", "A", "A", "A", "C", "A", "A", "C", "A", "A", "B"],
	["B", "C", "C", "C", "C", "C", "A", "A", "C", "A", "A", "B"],
	["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"]
];

var selectedScreen = screen;

var player = {
	posX: 0,
	posY: 0,
	speed: 0,
	maxSpeed: 5,
	movementTime: 0,
	jump: 0,
	maxJump: 3,
	health: 100,
	coins: 0,
	maxCoins: 1,
	movement: true
};

var textures = {
	A: "skyblue",
	B: "firebrick",
	C: "gold",
	D: "black",
	E: "green",
	P: "white"
};

function ready(screen){
	var start = [];
	for(i in screen){
		if(screen[i].includes("E")){
			start[0] = screen[i].indexOf("E");
			start[1] = parseInt(i);
		}
	}
	if(start.length == 0){
		alert("Bad level layout");
		throw "Bad level layout";
	}
	player.posX = start[0];
	player.posY = start[1];
	screen[player.posY][player.posX] = "P";
}

function updateScreen(screen, pixelWidth, pixelHeight){
	var canvas = document.getElementById("screen");
	context = canvas.getContext("2d");
	canvas.width = screen[0].length * pixelWidth;
	canvas.height = screen.length * pixelHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	var x = 0;
	var y = 0;
	for(i in screen){
		for(j in screen[i]){
			var colour = textures[screen[i][j]];
			context.fillStyle = colour;
			context.fillRect(x, y, 100, 100);
			x += pixelWidth;
		}
		x = 0;
		y += pixelHeight;
	}
	if(!player.movement){
		context.font = "32px Arial";
		context.fillText("Paused. P to resume.", 450, 350);
		context.textAlign="center"; 
	}
}

document.onkeydown = function(event){
	event = event || window.event;
	if(player.movement && (event.keyCode == 87 || event.keyCode == 38 || event.keyCode == 32)){
		event.preventDefault();
		console.log(selectedScreen[player.posY][player.posX]);
		screen[player.posY][player.posX] = selectedScreen[player.posY][player.posX];
		if(screen[player.posY - 1] != "B"){
			player.posY -= 1;
			alert("JUMP");
		}
	} else if(player.movement && (event.keyCode == 83 || event.keyCode == 40)){
		event.preventDefault();
		screen[player.posY][player.posX] = selectedScreen[player.posY][player.posX];
		if(screen[player.posY + 1] != "B"){
			player.posY += 1;
			alert("DUCK");
		}
	} else if(player.movement && (event.keyCode == 65 || event.keyCode == 37)){
		event.preventDefault();
		screen[player.posY][player.posX] = selectedScreen[player.posY][player.posX];
		if(screen[player.posX - 1] != "B"){
			player.posX -= 1;
			alert("LEFT");
		}
	} else if(player.movement && (event.keyCode == 68 || event.keyCode == 39)){
		event.preventDefault();
		screen[player.posY][player.posX] = selectedScreen[player.posY][player.posX];
		if(screen[player.posX + 1] != "B"){
			player.posX += 1;
			alert("RIGHT");
		}
	} else if(event.keyCode == 80){
		player.movement = !player.movement;
	}
	screen[player.posY][player.posX] = "P";
	console.log(event.keyCode);
	updateScreen(screen, 100, 100);
}

screen = level1Screen;
selectedScreen = level1Screen;
updateScreen(screen, 100, 100);
ready(screen);