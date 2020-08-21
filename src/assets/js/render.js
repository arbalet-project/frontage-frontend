function render() {
	var grey = '#2c3e50';
	//'#bdc3c7';
	if (gameState === 0) {
		grey = "rgb(44,62,80)";
			//220, 223, 225)";
	}

	ctx.clearRect(0, 0, trueCanvas.width, trueCanvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
	clearGameBoard();
	if (gameState === 1 || gameState === 2 || gameState === -1 || gameState === 0) {
		if (op < 1) {
			op += 0.01;
		}
		ctx.globalAlpha = op;
		drawPolygon(trueCanvas.width / 2 , trueCanvas.height / 2 , 6, (settings.rows * settings.blockHeight) * (2/Math.sqrt(3)) + settings.hexWidth, 30, grey, false,6);
		drawTimer();
		ctx.globalAlpha = 1;
	}

	var i;
	for (i = 0; i < MainHex.blocks.length; i++) {
		for (var j = 0; j < MainHex.blocks[i].length; j++) {
			var block = MainHex.blocks[i][j];
			block.draw(true, j);
		}
	}
	for (i = 0; i < blocks.length; i++) {
		blocks[i].draw();
	}

	MainHex.draw();
	if (gameState ==1 || gameState ==-1 || gameState === 0) {
		drawScoreboard();
	}

	for (i = 0; i < MainHex.texts.length; i++) {
		var alive = MainHex.texts[i].draw();
		if(!alive){
			MainHex.texts.splice(i,1);
			i--;
		}
	}

	if ((MainHex.ct < 650 && (gameState !== 0) && !MainHex.playThrough)) {
		if (MainHex.ct > (650 - 50)) {
			ctx.globalAlpha = (50 - (MainHex.ct - (650 - 50)))/50;
		}

		if (MainHex.ct < 50) {
			ctx.globalAlpha = (MainHex.ct)/50;
		}

		renderBeginningText();
		ctx.globalAlpha = 1;
	}

	settings.prevScale = settings.scale;
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	settings.blockHeight = settings.baseBlockHeight * settings.scale;
}

function renderBeginningText() {
	var upperheight = (trueCanvas.height/2) - ((settings.rows * settings.blockHeight) * (2/Math.sqrt(3))) * (5/6) - 100;
	var lowerheight = (trueCanvas.height/2) + ((settings.rows * settings.blockHeight) * (2/Math.sqrt(3))) * (11/16) + 100;
	var text = '';
	var mob, fontSize;
	if(/mobile|Mobile|iOS|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		mob = true;
		input_text = settings.messages.short_howto_play_1
		action_text = settings.messages.short_howto_play_2
		fontSize = 35
	} else {
		mob = false
		input_text = settings.messages.short_howto_play_1_keyboard
		action_text = settings.messages.short_howto_play_2_keyboard
		fontSize = 27
	}
	score_text = settings.messages.short_howto_play_3
	//#2c3e50
	renderText((trueCanvas.width)/2 + 2 * settings.scale,upperheight-0*settings.scale, fontSize, '#c6e2ff', input_text);
	renderText((trueCanvas.width)/2 + 2 * settings.scale,upperheight+33*settings.scale, fontSize, '#c6e2ff', action_text);
	if (!mob) {
		drawKey("",(trueCanvas.width)/2 + 2 * settings.scale-2.5,upperheight+38*settings.scale);
	}

	renderText((trueCanvas.width)/2 + 2 * settings.scale,lowerheight,fontSize, '#c6e2ff', score_text);
}

function drawKey(key, x, y) {
	ctx.save();
	switch (key) {
		case "left":
			ctx.translate(x, y + settings.scale * 13);
			ctx.rotate(3.14159);
			ctx.font = "20px Fontawesome";
			ctx.scale(settings.scale, settings.scale);
			ctx.fillText(String.fromCharCode("0xf04b"), 0, 0);
			break;
		case "right":
			ctx.font = "20px Fontawesome";
			ctx.translate(x , y + settings.scale * 27.5);
			ctx.scale(settings.scale, settings.scale);
			ctx.fillText(String.fromCharCode("0xf04b"), 0, 0);
			break;

		default:
			drawKey("left", x - 5, y);
			drawKey("right", x + 5, y);
	}
	ctx.restore();
}
