// Create web server
// node comments.js
// http://localhost:3000
// http://localhost:3000/comments

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.end('Page not found');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        });
    } else if (pathname === '/comments') {
        if (request.method === 'GET') {
            var str = JSON.stringify(comments);
            response.end(str);
        } else if (request.method === 'POST') {
            var str = '';
            request.on('data', function(chunk) {
                str += chunk;
            });
            request.on('end', function() {
                var comment = JSON.parse(str);
                comments.push(comment);
                response.end(JSON.stringify(comment));
            });
        }
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.end('Page not found');
    }
});

server.listen(3000, function() {
    console.log('Server is running');
});