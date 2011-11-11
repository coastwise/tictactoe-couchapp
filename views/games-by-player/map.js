function(doc) {
	var key;
	if (doc.players) {
		for (player in doc.players) {
			key = {
				"player" : doc.players[player].name,
				"turn" : doc.players[player].turn
			}
			emit(key, doc);
		}
	}
};