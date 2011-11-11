function(data) {
	$.log(data)
	var p;
	return {
		games : data.rows.map(function(r) {
			p = {};
			p.player = r.key.player;
			for (player in r.value.players) {
				if (r.value.players[player].name != r.key.player) {
					p.opponent = r.value.players[player].name;
				}
			}
			p.gameid = r.value._id;
			p.turn = r.value.turn;
			return p;
		})
	}
};