$(function() {

	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);
	
	function loadGame(e, gameDocId) {
		console.log("loading game " + gameDocId);
		db.openDoc(gameDocId, {
			success : function(gameDoc) {
				console.log("successfully loaded game " + gameDocId);
			}
		});
	}
	$('#game').bind('loadGame', loadGame);

});