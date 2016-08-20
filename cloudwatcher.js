var spotify = require("spotify-node-applescript");
var https = require("https");

/* Constants */
var refreshInterval = 1000; // Milliseconds between refresh
var projectID = "93077193";
var opts = {
	host: "scratch.mit.edu",
	path: "/varserver/" + projectID
};

/* Add timestamp prefix to console methods */
require("log-prefix")(function() {
	var d = new Date();
	return require("util").format("[%d/%d/%d %d:%d:%d] %%s",
		d.getMonth() + 1, // 0 is January
		d.getDate(),
		d.getFullYear(),
		d.getHours(),
		d.getMinutes(),
		d.getSeconds()
	);
});

/* Called whenever a spotify method is executed */
function callback() {
	spotify.getState(function(err, state) {
		if (!err) {
			console.log("Spotify response:", JSON.stringify(state));
		}
		else {
			console.error("Spotify error:", state);
		}
	});
}

/* Retrieve and strip response JSON */
function refresh() {
	var request = https.get(opts, function(res) {
		var body = "";
		res.on("data", function (chunk) {
			body += chunk;
		});
		res.on("end", function() {
			var failed = false;
			var vars = {};
			try {
				var json = JSON.parse(body).variables;
				json.forEach(function(obj) {
					vars[obj.name.substring(2)] = obj.value;
				});
				failed = false;
			}
			catch (err) {
				failed = true;
				console.error("Couldn't parse response JSON:", err);
			}
			if (!failed) {
				parse(vars);
			}
		});
	});
	request.on("error", function(err) {
		console.error(err);
	});
	request.end();
}

/* Check if id or volume has changed and proxy that info to Spotify */
function parse(vars) {
	if (!parse.oldVars) {
		parse.oldVars = vars;
	}
	if (parse.oldVars.id != vars.id) {
		switch(vars.command) {
			case 0:
				console.log("Beginning playback");
				spotify.play(callback);
				break;
			case 1:
				break;
			default:
				console.log("Unknown command", vars.command);
				break;
		}
	}
	else if (parse.oldVars.volume != vars.volume) {
		console.log("Setting volume to", vars.volume);
		spotify.setVolume(vars.volume, callback);

	}
	parse.oldVars = vars;
}


/* Start listening */
console.log("Client is ready.");
spotify.isRunning(function(err, isRunning) {
	if (isRunning) {
		console.log("Spotify ready.");
	}
	else {
		console.warn("Spotify is not running!");
	}
	console.log("Listening to project", projectID, "with", refreshInterval, "ms refresh interval.");
	setInterval(refresh, refreshInterval);
});
