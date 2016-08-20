### Introduction

Another one of the projects for our Exploring Computer Science class was to develop some type of project using [Scratch](https://scratch.mit.edu). Scratchify was my submission - a frontend Scratch project that uses a node.js server running on my laptop to control Spotify. It was developed January 13-14 of 2016.

### Architecture

Scratch introduced [cloud variables]() in __TODO__. These variables can be set through the Scratch project using __TODO__ blocks and update in real time (no need to refresh the page). They were originally intended for __TODO__. After some research, I discovered that these variables could be retrieved from the endpoint `https://scratch.mit.edu/varserver/ID` where `ID` is the [project ID](). The response is encoded in JSON and looks like this:

```
TODO
```

The [Spotify OS X app](), like many other OS X apps, can be controlled programmatically through [AppleScript](). The package [spotify-node-applescript]() provides a node.js bridge to this functionality, so we can control the Spotify app from node.js.

###### Bringing It Together

Here's a screenshot of the interface:
__TODO__

1. The Scratch project has three cloud variables: `id`, `command`, and `volume`. When a button is pressed, `command` is changed to reflect what button is pressed and `id` is incremented by 1. `volume` can be manipulated directly by the user as it is presented as a UI component.

2. The script requests the JSON endpoint every 1.5 seconds, and compares the new response to the old response to see if the user has changed anything.

3. The script will work with spotify-node-applescript to proxy events such as "play", "previous track", etc. to the Spotify app.

### License
```
MIT License

Copyright (c) 2015 Andi Andreas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
