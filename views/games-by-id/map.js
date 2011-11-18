function(doc) {
	var key;
	if (doc.players) {
		emit(doc._id, doc);
	}
};