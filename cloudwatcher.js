var spotify = require("spotify-node-applescript");
var https = require("https");

var refreshInterval = 1000; // Milliseconds between refresh
var projectID = "93077193";

// __TODO__ check if you can use log-prefix to signal success and fail

// Any console logs with have a timestamp prefix now
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

function check() {
	var opts = {
		host: "scratch.mit.edu",
		path: "/varserver/" + projectID
	};
	var request = https.get(opts, function(response) {
		res.on("data", function (data) {
			console.log(data);
		});
	});
	request.end();
}

setInterval(check, refreshInterval);




// var spotify = require("spotify-node-applescript")
// var colors = require("colors")
// var https = require("https")
//
// var oldVars = {}
// var interval = 1500 // Milliseconds between refresh
// var projectID = "93077193"
//
// var spotifyMsg = ""
// var spotifyCallback = function() {
//   log("Spotify", spotifyMsg)
// }
//
// // Logging
// function error(err) {
//   if (err) {
//     console.log("[%s] %s", "Error".red.underline, err)
//     return true
//   }
//   return false
// }
//
// function log(event, msg) {
//   console.log("[%s] %s", event.green.underline, msg)
//
// }
//
// function success(msg) {
//   log("Success", msg)
// }
//
// // Handle commands
// function changeSpotifyPosition(change) {
//   spotify.getState(function (err, state) {
//     var pos = state["position"]
//     spotifyMsg = "Track Jump: " + change
//     spotify.jumpTo(pos + change, spotifyCallback)
//   })
// }
//
// function lamo() {
//   require("child_process").exec("osascript ~/Desktop/Scratchify/easteregg.scpt", null)
//   log("AppleScript", "Sent Message")
// }
//
// function newCommand(command) {
//   command = command * 1 // convert to int
//   switch(command) {
//     case 0:
//       spotifyMsg = "Play"
//       spotify.play(spotifyCallback)
//       break
//     case 1:
//       changeSpotifyPosition(10)
//       break
//     case 2:
//       spotifyMsg = "Next"
//       spotify.next(spotifyCallback)
//       break
//     case 3:
//       changeSpotifyPosition(-10)
//       break
//     case 4:
//       spotifyMsg = "Previous"
//       spotify.previous(spotifyCallback)
//       break
//     case 5:
//       spotifyMsg = "Pause"
//       spotify.pause(spotifyCallback)
//       break
//     case 6:
//       lamo()
//       break
//   }
// }
//
// function newVolume(volume) {
//   spotifyMsg = "Set Volume: " + volume
//   spotify.setVolume(volume, spotifyCallback)
// }
//
// // Scratch API
// function whatDoesThisMean(newVars) {
//   if (oldVars["id"] != newVars["id"]) {
//     newCommand(newVars["command"])
//   }
//   else if (oldVars["volume"] != newVars["volume"]) {
//     newVolume(newVars["volume"])
//   }
//   oldVars = newVars
// }
//
// function parseCloudHTML(body) {
//   var result = {}
//   try {
//     var json = JSON.parse(body)["variables"]
//     for (var object in json) {
//       object = json[object]
//       result[object["name"].substring(2)] = object["value"] // Substring to remove cloud icon
//     }
//   }
//   catch(err) {
//     error(err)
//   }
//   return result
// }
//
// function refresh() {
//   var opts = {
//     host: "scratch.mit.edu",
//     path: "/varserver/" + projectID
//   }
//   var request = https.get(opts, function (response) {
//     var body = ""
//     response.on("data", function(d) {
//       body += d
//     })
//     response.on("end", function() {
//       whatDoesThisMean(parseCloudHTML(body))
//     })
//   })
//   request.on("error", function (err) {
//     error(err)
//   })
// }
//
// success("Beginning refresh cycle with interval of " + interval + " milliseconds")
// setInterval(refresh, 1000)
