function(newDoc, oldDoc, userCtx) {
	if (newDoc.type == "tictactoe-game") {
		
		if (oldDoc.players[oldDoc.whosturn].name != userCtx.name) {
			throw({forbidden : "it's not your turn!"});
		}
		
		for (var i = 0, l = oldDoc.moves.length; i < l; i++) {
			for (var prop in oldDoc.moves[i]) {
				if (newDoc.moves[i][prop] != oldDoc.moves[i][prop])
					throw({forbidden : "you can't change the past! " + i + "[" + prop + "]"});
			}
		}
		
		if (newDoc.moves.length > oldDoc.moves.length + 1) {
			throw({forbidden : "you're only allowed one move!"});
		}
		
		// TODO: validate newDoc.moves[newDoc.moves.length-1]
		
	}
	//throw({forbidden : 'no way'});
}