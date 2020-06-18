// t: current time, b: begInnIng value, c: change In value, d: duration
function easeOutCubic(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}

function renderText(x, y, fontSize, color, text, font) {
	ctx.save();
	fontSize = parseFloat(fontSize*settings.scale).toFixed(2);

	if (!font) {
		var font = '20px Roboto';
	}

	ctx.font = fontSize + font;
	ctx.textAlign = 'center';
	ctx.fillStyle = color;
	ctx.fillText(text, x, y + (fontSize / 2) - 9 * settings.scale);
	ctx.restore();
}

function drawScoreboard() {
	if (scoreOpacity < 1) {
		scoreOpacity += 0.01;
		textOpacity += 0.01;
	}
	ctx.globalAlpha = textOpacity;
	var scoreSize = 50;
	var scoreString = String(score);
	if (scoreString.length == 6) {
		scoreSize = 43;
	} else if (scoreString.length == 7) {
		scoreSize = 35;
	} else if (scoreString.length == 8) {
		scoreSize = 31;
	} else if (scoreString.length == 9) {
		scoreSize = 27;
	}
	if (rush ==1){
		var color = "rgb(236, 240, 241)";
	}
    var fontSize = settings.platform == 'mobile' ? 35 : 30;
    var h = trueCanvas.height / 2 + gdy + 100 * settings.scale;
	if (gameState === 0) {
		renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
		renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, 35, 75, "#ffffff", "Tetris Blocks");
		renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, h, fontSize, "#ffffff", settings.messages.play);
	} else if (gameState != 0 && textOpacity > 0) {
		textOpacity -= 0.05;
		renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
		renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, 35, 75, "#ffffff", "Tetris Blocks");
		renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, h, fontSize, "#ffffff", settings.messages.play);
		ctx.globalAlpha = scoreOpacity;
		renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
	} else {
		ctx.globalAlpha = scoreOpacity;
		renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
	}

	ctx.globalAlpha = 1;
}
function clearGameBoard() {
	drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, trueCanvas.width / 2, 30, hexagonBackgroundColor, 0, 'rgba(0,0,0,0)');
}

function drawPolygon(x, y, sides, radius, theta, fillColor, lineWidth, lineColor) {
	ctx.fillStyle = fillColor;
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;

	ctx.beginPath();
	var coords = rotatePoint(0, radius, theta);
	ctx.moveTo(coords.x + x, coords.y + y);
	var oldX = coords.x;
	var oldY = coords.y;
	for (var i = 0; i < sides; i++) {
		coords = rotatePoint(oldX, oldY, 360 / sides);
		ctx.lineTo(coords.x + x, coords.y + y);
		oldX = coords.x;
		oldY = coords.y;
	}

	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.strokeStyle = 'rgba(0,0,0,0)';
}

function toggleClass(element, active) {
	if ($(element).hasClass(active)) {
		$(element).removeClass(active);
	} else {
		$(element).addClass(active);
	}
}

function showText(text) {
	if (text == 'gameover') {
	   //Clay('client.share.any', {text: 'Think you can beat my score of '+ score + ' in Super Cool Game?'})
		$("#gameoverscreen").fadeIn();
    	}
}

function gameOverDisplay() {
	settings.ending_block=false;
	var c = document.getElementById("canvas");

	$("#gameoverscreen").fadeIn();
	$("#container").fadeIn();
	$("#restartBtn").fadeIn();
	$("#helpBtn").fadeIn();
  set_score_pos();
}

function showPause() { 
	$("#pause_main_body").html("<div id = 'instructions_head'>" + settings.messages.paused + "</div>");
    $('#pauseScreen').fadeIn(150, "linear");
}

var pausable = true;
function pause(o) {
    if (gameState == 0 || gameState == 2 || !pausable) {
        return;
    }

	pausable = false;
	var message;
	if (o) {
		message = '';
	} else {
		message = 'paused';
	}

	var c = document.getElementById("canvas");
	if (gameState == -1) {
        // RESUMING
		$('#restartBtn').fadeOut(300, "linear");
		$('#helpScreen').fadeOut(300, "linear");
		$('#pauseScreen').fadeOut(300, "linear");

		$("#pauseBtn").attr("src", "./assets/img/offline-tetris/btn_pause.png");
		$('.helpText').fadeOut(300, 'linear');

		setTimeout(function() {
			gameState = prevGameState;
			pausable = true;
		}, 400);

	} else if (gameState != -2 && gameState !== 0 && gameState !== 2) {
        // PAUSING
		$('#restartBtn').fadeIn(300, "linear");
		$('.helpText').fadeIn(300, 'linear');
		if (message == 'paused') {
			showText(message);
		}
		$("#pauseBtn").attr("src","./assets/img/offline-tetris/btn_resume.png");

		prevGameState = gameState;
		setTimeout(function() {
		    pausable = true;
		}, 400);
		gameState = -1;
        showPause();
	}
}
