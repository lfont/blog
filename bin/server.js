var colors = require('colors'),
    connect = require('connect'),
    fs = require('fs'),

    // 15 minutes
    maxAge = 1000 * 60 * 15,

    app = connect()
        .use(connect.logger())
        .use(connect.favicon('public/images/favicon.png'))
        .use(connect.static('public'), { maxAge: maxAge })
        .use(function (req, res, next) {
            // The static middleware has not replyed so it's a 404 error.
            res.statusCode = 404;

            fs.readFile('public/404.html', function (e, html) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(html);
            });
        })
        .listen(process.env.PORT || 80);

process.on('SIGINT', function () {
  console.log('server.js stopped.'.red);
  return process.exit();
});
