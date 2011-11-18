function(e, r) {
	var widget = $(this);
	if ($$(widget).profile) {
		$.log("game _init got the profile!");
		var name = $$(widget).profile.name;
		return {
			view : "games-by-player",
			startkey : {
				player : name
			},
			endkey : {
				player : name,
				turn : true
			}
		};
	} else { $.log("fuck"); 
		return {
			view : "games-by-player"
		};
	}
};