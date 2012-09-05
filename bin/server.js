var HTTPServer = require('http-server').HTTPServer,
    colors = require('colors'),

    httpServer = new HTTPServer({
        root: './public/'
    });

httpServer.listen(process.env.PORT || 80);

process.on('SIGINT', function () {
  console.log('http-server stopped.'.red);
  return process.exit();
});
