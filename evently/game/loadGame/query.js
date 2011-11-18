function(e, r) {
	$.log("load game " + r);
	return {
		view : "games-by-id",
		startkey : r,
		endkey : r
	};
};