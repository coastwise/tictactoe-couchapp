function() {
	var gameWidget = $("#game");
	var gameId = $(this).attr('href').substring(1); // trim leading '#'
	gameWidget.trigger('loadGame', gameId);
}