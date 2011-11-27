// Apache 2.0 J Chris Anderson 2011
$(function() {   
	// friendly helper http://tinyurl.com/6aow6yn
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);
	
	function drawGameList(r) {
		if (!r.userCtx || !r.userCtx.name) {
			console.log("ERROR: cannot draw games list for null player");
			return;
		}
		var username = r.userCtx.name;
		
		db.view(design + "/games-by-player", {
			startkey : {
				player : username
			},
			endkey : {
				player : username,
				turn : true
			},
			limit : 50,
			update_seq : true,
			
			success : function(data) {
				// TODO: setup _changes
				//setupChanges(data.update_seq);
				var them = $.mustache($("#mygames-template").html(), {
					games : data.rows.map(function(r) {
						p = {};
						p.player = r.key.player;
						for (player in r.value.players) {
							if (r.value.players[player].name != r.key.player) {
								p.opponent = r.value.players[player].name;
							}
						}
						p.gameid = r.value._id;
						p.turn = r.value.moves.length;
						return p;
					})
				});
				$("#mygames").html(them);
			}
		});
	};
	
	var changesRunning = false;
	function setupChanges(since) {
		if (!changesRunning) {
			var changeHandler = db.changes(since);
			changesRunning = true;
			changeHandler.onChange(drawItems);
		}
	}
	
	$("#account").couchLogin({
		loggedIn : function(r) {
			$("#profile").couchProfile(r, {
				profileReady : function(profile) {
					$("#create-message").submit(function(e){
						e.preventDefault();
						var form = this, doc = $(form).serializeObject();
						doc.created_at = new Date();
						doc.profile = profile;
						db.saveDoc(doc, {success : function() {form.reset();}});
						return false;
					}).find("input").focus();
				}
			});
			
			drawGameList(r);
		},
		loggedOut : function() {
			$("#profile").html('<p>Please log in to see your profile.</p>');
			$("#mygames").html('<p>Please log in to see your games.</p>')
		}
	});
 });