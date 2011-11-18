function(e, r) {
	var widget = $(this);
	$$(widget).profile = null;
	widget.trigger("clearGames");
}