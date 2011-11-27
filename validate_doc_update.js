function(newDoc, oldDoc, userCtx) {
	if (newDoc.type == "tictactoe") {
		var userOK = false;
		for (p in oldDoc.players) {
			if (oldDoc.players[p].name == userCtx.name) {
				if (!oldDoc.players[p].turn) {
					throw({forbidden : 'its not your turn!'});
				} else {
					userOK = true;
				}
			}
		}
		if (!userOK) {
			throw({forbidden : 'this is not your game!'});
		}
		
		if (newDoc.turn != oldDoc.turn + 1) {
			throw({forbidden : 'invalid turn number'});
		}
		
		
	}
	//throw({forbidden : 'no way'});
}