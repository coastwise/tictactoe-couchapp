function(e, r) {
	$.log("load game " + r);
	
	var path = unescape(document.location.pathname).split('/'),
        design = path[3],
        db = $.couch.db(path[1]);
	
	db.view(design + "/games-by-id", {
		startkey : r,
		endkey : r,
		success : function(data) {
			$.log("game");
			$.log(data.rows[0].value);
		}
	});
}