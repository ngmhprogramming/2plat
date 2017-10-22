var level1screen = [
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
};

function ready(screen){
	var start = [];
	for(i in screen){
		if(screen[i].includes("E")){
			start[0] = parseInt(i);
			start[1] = screen[i].indexOf("E");
		}
	}
	if(start.length == 0){
		alert("Bad level layout");
		throw "Bad level layout";
	}
	player.posX = start[0];
	player.posY = start[1];
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
	console.log(canvas.width, canvas.height);
	if(!player.movement){
		context.font = "32px Arial";
		context.fillText("Paused. P to resume.", 450, 350);
		context.textAlign="center"; 
	}
}

function handleKey(keycode){
	if(keycode == 87 || keycode == 38 || keycode == 32){
		a = "a";
	} else if(keycode == 83 || keycode == 40){
		a = "a";
	} else if(keycode == 65 || keycode == 37){
		a = "a";
	} else if(keycode == 68 || keycode == 39){
		a = "a";
	} else if(keycode == 112){
		player.movement = !player.movement;
	}
	console.log(keycode);
	updateScreen(screen, 100, 100);
}

document.onkeypress = function(event){
	event = event || window.event;
	handleKey(event.keyCode); 
}

screen = level1screen;
updateScreen(screen, 100, 100);
ready(screen);