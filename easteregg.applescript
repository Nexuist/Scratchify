(* 
	This is run when the "lol" button on the Scratch interface is pressed.
	It'll send the message "You suck" to my friend five times using the Messages.app API.
*)

tell application "Messages"
	set targetBuddy to buddy "Friend's phone number" of service ("E:user@gmail.com")
	repeat 5 times
		send "You suck" to targetBuddy
		delay 0.7
	end repeat
end tell
