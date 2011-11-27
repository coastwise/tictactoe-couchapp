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
				$("#board").click(clickHandler);
				
				// store the player info
				for (p in gameDocument.players) {
					// TODO: is this the best way to discover the logged in user?
					// see jquery.couchLogin.js line 80
					if (gameDocument.players[p].name == $('a.name').text()) {
						player = gameDocument.players[p];
					}
				}
			}
		});
	}
	$('#game').bind('loadGame', loadGame);
	
	var context;
	var width, height;
	
	function drawBoard() {
		// insert the canvas
		$('#game').html($("#board-template").html());
		
		var canvas = document.getElementById('board');
		width = canvas.width;
		height = canvas.height;
		
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
			}
		})
	}
});