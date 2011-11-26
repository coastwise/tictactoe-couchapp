$(function() {

	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);
	
	function loadGame(e, gameDocId) {
		console.log("loading game " + gameDocId);
		db.openDoc(gameDocId, {
			success : function(gameDoc) {
				console.log("successfully loaded game " + gameDocId);
				drawBoard();
			}
		});
	}
	$('#game').bind('loadGame', loadGame);
	
	function drawBoard() {
		// insert the canvas
		$('#game').html($("#board-template").html());
		
		var canvas = document.getElementById('board');
		var width = canvas.width;
		var height = canvas.height;
		
		var context = canvas.getContext('2d');
		
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
});