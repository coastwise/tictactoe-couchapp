function(newDoc, oldDoc, userCtx) {
	if (newDoc.type == "tictactoe") {
		
		if (oldDoc.players[oldDoc.whosturn].name != userCtx.name) {
			throw({forbidden : "it's not your turn!"});
		}
		
		if (newDoc.turn != oldDoc.turn + 1) {
			throw({forbidden : 'invalid turn number'});
		}
		
		
	}
	//throw({forbidden : 'no way'});
}