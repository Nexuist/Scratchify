var spotify = require("spotify-node-applescript");
var https = require("https");
var exec = require("child_process").exec;

/* Constants */
var refreshInterval = 1000; // Milliseconds between refresh
var projectID = "93077193";
var opts = {
	host: "scratch.mit.edu",
	path: "/varserver/" + projectID
};
var easterEggPath = "easteregg.applescript"; // Path to the AppleScript file to execute if the "lol" button is pressed

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
			console.log("Spotify state:", JSON.stringify(state));
		}
		else {
			console.error("Spotify error:", err);
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

function jump(by) {
	spotify.getState(function (err, state) {
		if (!err) {
			spotify.jumpTo(state.position + by, callback);
		}
		else {
			console.error("Couldn't complete jump:", err);
		}
	});
}

/* Check if id or volume has changed and proxy that info to Spotify */
function parse(vars) {
	if (!parse.oldVars) {
		parse.oldVars = vars;
	}
	if (parse.oldVars.id != vars.id) {
		var command = vars.command * 1; // Convert string to int
		switch(command) {
			case 0:
				console.log("Beginning playback");
				spotify.play(callback);
				break;
			case 1:
				console.log("Jumping forward by 10 seconds");
				jump(10);
				break;
			case 2:
				console.log("Skipping track");
				spotify.next(callback);
				break;
			case 3:
				console.log("Jumping backwards by 10 seconds");
				jump(-10);
				break;
			case 4:
				console.log("Reverting to previous track");
				spotify.previous(callback);
				break;
			case 5:
				console.log("Pausing");
				spotify.pause(callback);
				break;
			case 6:
				// Special easter egg (see easteregg.applescript for more details)
				console.log("Easter egg activated");
				exec("osascript " + easterEggPath, null);
				break;
			default:
				console.log("Unknown command", command);
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
