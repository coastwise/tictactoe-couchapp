function(data) {
	$.log(data)
	var p;
	return {
		games : data.rows.map(function(r) {
			p = {};
			p.opponent = r.key[1];
			p.gameid = r.value._id;
			p.turn = r.value._rev;
			return p;
		})
	}
};