function(newDoc, oldDoc, userCtx) {
	if (newDoc.type == "tictactoe-game") {
		
		if (oldDoc.players[oldDoc.whosturn].name != userCtx.name) {
			throw({forbidden : "it's not your turn!"});
		}
		
		for (t in oldDoc.moves) {
			if (newDoc.moves[t] != oldDoc.moves[t]) {
				throw({forbidden : "you can't change the past!"});
			}
		}
		
		if (newDoc.moves.length > oldDoc.moves.length + 1) {
			throw({forbidden : "you're only allowed one move!"});
		}
		
		// TODO: validate newDoc.moves[newDoc.moves.length-1]
		
	}
	//throw({forbidden : 'no way'});
}