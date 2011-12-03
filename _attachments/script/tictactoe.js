$(function() {

	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);
	
	var gameDocument;
	var player;
	
	function loadGame(e, gameDocId) {
		console.log("loading game " + gameDocId);
		db.openDoc(gameDocId, {
			success : function(gameDoc) {
				console.log("successfully loaded game " + gameDocId);
				gameDocument = gameDoc;
				drawBoard();
				drawMoves();
				$("#board").click(clickHandler);
				
				// store the player info
				for (p in gameDocument.players) {
					// TODO: is this the best way to discover the logged in user?
					// see jquery.couchLogin.js line 80
					if (gameDocument.players[p].name == $('a.name').text()) {
						player = gameDocument.players[p];
					}
				}
				
				// setup changes feed
				setupGameChanges(gameDoc._id);
			}
		});
	}
	$('#game').bind('loadGame', loadGame);
	
	
	var changesFeed;
	function setupGameChanges(gameId) {
		console.log("setupChanges for game " + gameId);
		
		// TODO: don't get changes since zero, this will cause an extra fetch
		var since = 0;
		changesFeed = db.changes(since, {
			filter : "tictactoe/games",
			id : gameId
		});
		changesFeed.onChange(function(r){
			console.log("game onChange");
			reloadGame(gameId);
		});
	}
	
	
	// when update is notified in changes feed
	function reloadGame(gameDocId) {
		db.openDoc(gameDocId, {
			success : function(gameDoc) {
				gameDocument = gameDoc;
				drawBoard();
				drawMoves();
				$("#board").click(clickHandler);
			}
		});
	}
	
	
	var context;
	var width, height;
	var offsetX, offsetY;
	
	function drawBoard() {
		// insert the canvas
		$('#game').html($("#board-template").html());
		
		var canvas = document.getElementById('board');
		width = canvas.width;
		height = canvas.height;
		
		offsetX = (width / 3) * 0.1;
		offsetY = (height / 3) * 0.1;
		
		context = canvas.getContext('2d');
		
		context.beginPath();
		context.strokeStyle = '#000';
		context.lineWidth   = 4;

		context.moveTo((width / 3), 0);
		context.lineTo((width / 3), height);

		context.moveTo((width / 3) * 2, 0);
		context.lineTo((width / 3) * 2, height);

		context.moveTo(0, (height / 3));
		context.lineTo(width, (height / 3));

		context.moveTo(0, (height / 3) * 2);
		context.lineTo(width, (height / 3) * 2);

		context.stroke();
		context.closePath();
	}
	
	function drawMove(move) {
		if (move.player.token == "X") {
			drawX(move.x, move.y);
		} else if (move.player.token == "O") {
			drawO(move.x, move.y);
		}
	}
	
	function drawMoves() {
		for (m in gameDocument.moves) drawMove(gameDocument.moves[m]);
	}
	
	function drawX(x, y) {
		var beginX = x * (width / 3) + offsetX;
		var beginY = y * (height / 3) + offsetY;
		
		var endX = (x + 1) * (width / 3) - offsetX * 2;
		var endY = (y + 1) * (height / 3) - offsetY * 2;
		
		context.beginPath();
		
		context.moveTo(beginX, beginY);
		context.lineTo(endX, endY);
		
		context.moveTo(beginX, endY);
		context.lineTo(endX, beginY);
		
		context.stroke();
		context.closePath();
	}
	
	function drawO(x, y) {
		var beginX = x * (width / 3) + offsetX;
		var beginY = y * (height / 3) + offsetY;

		var endX = (x + 1) * (width / 3) - offsetX * 2;
		var endY = (y + 1) * (height / 3) - offsetY * 2;

		context.beginPath();
		
		context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2 , 0, Math.PI * 2, true);

		context.stroke();
		context.closePath();
	}
	
	function clickHandler(e) {
		var move = {
			"x" : Math.floor(e.offsetX / (width/3)),
			"y" : Math.floor(e.offsetY / (height / 3)),
			"player" : player
		};
		gameDocument.moves.push(move);
		
		// turn loops through list of players
		gameDocument.whosturn = gameDocument.whosturn + 1;
		if (gameDocument.whosturn == gameDocument.players.length)
			gameDocument.whosturn = 0;
		
		db.saveDoc(gameDocument, {
			success : function (result) {
				console.log("turn saved");
				drawMove(move);
			}
		})
	}
});