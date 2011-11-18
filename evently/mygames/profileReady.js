function(e, r) {
	var widget = $(this);
	$$(widget).profile = r;
	widget.trigger("loadGames");
}