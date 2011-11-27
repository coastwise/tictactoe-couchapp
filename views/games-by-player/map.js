function(doc) {
	var key;
	if (doc.type == "tictactoe-game") {
		for (player in doc.players) {
			key = {
				"player" : doc.players[player].name,
				"turn" : doc.players[player].turn
			}
			emit(key, doc);
		}
	}
};