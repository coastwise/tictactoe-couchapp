function(doc, req) {
	
	if (doc.type != "tictactoe-game") return false;
	
	if (req.query.id && doc._id != req.query.id) return false;
	
	return true;
}