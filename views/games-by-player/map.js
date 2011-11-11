function(doc) {
	if (doc.players) {
		emit([doc.players[0], doc.players[1]], doc);
	}
};