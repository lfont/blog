I have recently heard of [AppJS](http://appjs.org), an SDK to build cross-platform desktop application with HTML, CSS and Javascript. It is in an early stage of development but I decided to go one step behind the [30 Second Quickstart](http://appjs.org/#download) and here is what I found.

AppJS is build around Node.js and Chromium
------------------------------------------

AppJS is bundled has a node module. It creates a file server that serve your HTML files and allow you to build your UI with HTML 5 and CSS 3 by using the rendering engine of Chromium. This is really nice because you also get all the Javascript API that come with it.   
On the server side (I don't kown if server is appropried for such an architecture) you have all the standard node API (Node.js => 0.8 is required) to make filesytem access, network communication, etc.
The approch is a bit different from other alternative like [node-webkit](https://github.com/rogerwang/node-webkit) but I like the fact the development is very similiar to what you do when you develop a standard Web app.

Until recently, the "hello, world" example that was on the homepage of the project does not reflect the latest version of the API. I think is preferable to look at [the source of the examples](https://github.com/appjs/appjs/tree/master/examples) to track the API change, since the project is being under active development.

Even if the API are cross-platform is found a little difference between Ubuntu and Windows with the rendering of the example code. On Windows, the default background and font color are both black, so if you like to see the text, you must include these css rules:

    <!-- Content of the style.css file. -->
    body {
        background-color: white;
        color: black;
    }

It is the same with the post handler. The response is just plain text but to see a contrasted UI, you may like to send:

    app.router.post('/', function (req, res, next) {
        res.send('<html>' +
                 '<head><link rel="stylesheet" href="style.css" /></head>'+
                 '<body>Hey! How are you ' + req.post('firstname') + '</body>' +
                 '</html>');
    });

AppJS API
---------

There are no a lot of documentation of the API at this time but the code is very informative about some of the features. The [native_window.cpp](https://github.com/appjs/appjs/blob/master/src/native_window/native_window.cpp) source code list all the properties which you can defined when you call the `app.createWindow()` method and the properties which are used by the `window.frame.openDialog()` method.

The `window.frame.openDialog()` method allow you to call some native dialog of the system. For example, if you which to open a dialog to let the user choose a file to read, you can write something like this:

    window.frame.openDialog({
            type: "open", // The type of dialog (open|save|font|color)
            initialValue: "/home/", // The initial folder
            acceptTypes: [ // The type of file to open
                "*.log"
            ],
            multiSelect: false, // Allow the user to select multiple files
            dirSelect: false // Allow the user to select a directory
        },
        // The method is async. The callback is call whith an error object and
        // an array of the files path.
        function (err, files) {
            if (err) {
                throw err;
            }

            if (files.length === 0) {
                console.log("no file chosen");
                return;
            }

            fs.readFile(files[0], 'UTF8', function (err, data) {
                if (err) {
                    throw err;
                }

                // Update the element with the text readed from the file.
                window.document.getElementById('fileContent').innerText = data;
            });
        });

Note how we can update the UI. The window object returned by the `app.createWindow()` method is an extended version of the window DOM object that you have access on the UI side. So you can do DOM manipulation easily on both side.

### Attachments

You can download a zip of the [file reader example](/making-a-desktop-app-with-node/reading-a-file.zip).
