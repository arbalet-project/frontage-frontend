function scaleCanvas() {
    headerOverhead = document.getElementById("arbaHeader").clientHeight;
	canvas.width = $(window).width();
	canvas.height = $(window).height() - headerOverhead;

	if (canvas.height > canvas.width) {
		settings.scale = (canvas.width / 800) * settings.baseScale;
	} else {
		settings.scale = (canvas.height / 800) * settings.baseScale;
	}

	trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};

	if (window.devicePixelRatio) {
		var cw = $("#canvas").attr('width');
		var ch = $("#canvas").attr('height');

		$("#canvas").attr('width', cw * window.devicePixelRatio);
		$("#canvas").attr('height', ch * window.devicePixelRatio);
		$("#canvas").css('width', cw);
		$("#canvas").css('height', ch);

		trueCanvas = {
			width: cw,
			height: ch
		};

		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
	set_score_pos();
}

function set_score_pos() {
	$("#container").css('margin-top', '0');
	var middle_of_container = ($("#container").height() / 2 + $("#container").offset().top);
}

function toggleDevTools() {
	$('#devtools').toggle();
}

function resumeGame() {
	gameState = 1;
	hideUIElements();
	$('#pauseBtn').show();
	$('#restartBtn').hide();
	importing = 0;
	startTime = Date.now();
	checkVisualElements();
}

function checkVisualElements() {
	if ($('#helpBtn').is(":visible")) $('#helpBtn').fadeOut(150, "linear");
	if (!$('#pauseBtn').is(':visible')) $('#pauseBtn').fadeIn(150, "linear");
	if (!$('#restartBtn').is(':visible')) $('#restartBtn').fadeOut(150, "linear");
}

function hideUIElements() {
	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').hide();
}

function init(b) {
	if (settings.ending_block && b == 1) { return; }
	if (b) {
		$("#pauseBtn").attr('src', "./assets/img/offline-tetris/btn_pause.svg");
		checkVisualElements();
	}

	infobuttonfading = true;
	$("#pauseBtn").attr('src', "./assets/img/offline-tetris/btn_pause.svg");
	hideUIElements();
	document.getElementById("canvas").className = "";
	history = {};
	importedHistory = undefined;
	importing = 0;
	score = 0;
	prevScore = 0;
	spawnLane = 0;
	op = 0;
	tweetblock = false;
	scoreOpacity = 0;
	gameState = 1;
	$("#restartBtn").hide();
	$("#pauseBtn").show();

	settings.blockHeight = settings.baseBlockHeight * settings.scale;
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	MainHex = new Hex(settings.hexWidth);
	MainHex.sideLength = settings.hexWidth;

	var i;
	var block;
	blocks = [];


	gdx = 0;
	gdy = 0;
	comboTime = 0;

	for (i = 0; i < MainHex.blocks.length; i++) {
		for (var j = 0; j < MainHex.blocks[i].length; j++) {
			MainHex.blocks[i][j].height = settings.blockHeight;
			MainHex.blocks[i][j].settled = 0;
		}
	}

	MainHex.blocks.map(function (i) {
		i.map(function (o) {
			if (rgbToHex[o.color]) {
				o.color = rgbToHex[o.color];
			}
		});
	});

	MainHex.y = -100;

	startTime = Date.now();
	waveone = new waveGen(MainHex);

	MainHex.texts = []; //clear texts
	MainHex.delay = 15;
}

function addNewBlock(blocklane, color, iter, distFromHex, settled) { //last two are optional parameters
	iter *= settings.speedModifier;
	if (!history[MainHex.ct]) {
		history[MainHex.ct] = {};
	}

	history[MainHex.ct].block = {
		blocklane: blocklane,
		color: color,
		iter: iter
	};

	if (distFromHex) {
		history[MainHex.ct].distFromHex = distFromHex;
	}
	if (settled) {
		blockHist[MainHex.ct].settled = settled;
	}
	blocks.push(new Block(blocklane, color, iter, distFromHex, settled));
}

function exportHistory() {
	$('#devtoolsText').html(JSON.stringify(history));
	toggleDevTools();
}

function setStartScreen() {
	// $('#startBtn').show();
	init();
	importing = 1;

	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').show();

	gameState = 0;
	requestAnimFrame(animLoop);
}

var spd = 1;

function animLoop() {
	switch (gameState) {
		case 1:
			requestAnimFrame(animLoop);
			render();
			var now = Date.now();
			var dt = (now - lastTime) / 16.666 * rush;
			if (spd > 1) {
				dt *= spd;
			}

			if (gameState == 1) {
				if (!MainHex.delay) {
					update(dt);
				}
				else {
					MainHex.delay--;
				}
			}

			lastTime = now;

			if (checkGameOver() && !importing) {
				gameState = 2;

				setTimeout(function () {
					enableRestart();
				}, 150);

				$('#helpScreen').fadeOut(150, "linear");
				$('#pauseBtn').fadeOut(150, "linear");
				canRestart = 0;
			}
			break;

		case 0:
			requestAnimFrame(animLoop);
			render();
			break;

		case -1:
			requestAnimFrame(animLoop);
			render();
			break;

		case 2:
			var now = Date.now();
			var dt = (now - lastTime) / 16.666 * rush;
			requestAnimFrame(animLoop);
			update(dt);
			render();
			lastTime = now;
			break;

		case 3:
			requestAnimFrame(animLoop);
			fadeOutObjectsOnScreen();
			render();
			break;
		case 5:
			return;
		default:
			initialize(0, settings.messages);
			setStartScreen();
			break;
	}

	if (!(gameState == 1 || gameState == 2)) {
		lastTime = Date.now();
	}
}

function enableRestart() {
	canRestart = 1;
}

function isInfringing(hex) {
	for (var i = 0; i < hex.sides; i++) {
		var subTotal = 0;
		for (var j = 0; j < hex.blocks[i].length; j++) {
			subTotal += hex.blocks[i][j].deleted;
		}

		if (hex.blocks[i].length - subTotal > settings.rows) {
			return true;
		}
	}
	return false;
}

function checkGameOver() {
	for (var i = 0; i < MainHex.sides; i++) {
		if (isInfringing(MainHex)) {
			gameOverDisplay();
            gameState = 2;
			return true;
		}
	}
	return false;
}

function showHelp() { 
	$("#inst_main_body").html("<div id = 'instructions_head'>" + settings.messages.howto_play_title + "</div><p>" + settings.messages.howto_play_goal + "</p><p>" + (settings.platform != 'mobile' ? settings.messages.howto_play_tap_keyboard : settings.messages.howto_play_tap_screen) + "</p><p>" + settings.messages.howto_play_instructions_1 + "</p><p>" + settings.messages.howto_play_instructions_2 +"</p>");
	if (gameState == 1) {
		pause();
	}
	$('#helpScreen').fadeIn(150, "linear");
}
