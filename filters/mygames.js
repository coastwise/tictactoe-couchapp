function(doc, req) {
	
	if (!doc.players) return false;
	
	for (var i=0, l=doc.players.length; i<l; i++) {
		if (doc.players[i].name == req.userCtx.name)
			return true;
	}
	
	return false;
}