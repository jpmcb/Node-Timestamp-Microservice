var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {

    console.log(req.url);
    
    if(req.url === '/') {
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello world!');
        
    } else {
        
        res.writeHead(200, {'content-Type': 'text/html'});
        res.end(`{ ${req.url} }`);
        
    }
    
});

server.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
