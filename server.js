var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {

    if(req.url === '/') {
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
        
        <!doctype html>
        <html>
            <meta charset="UTF-8">
            <title>Node - Timestamp Microservice</title>
        <head>
        </head>
        
        
        <body>
            <h1>Timestamp Microservice</h1>
        
            <ul>
                <li>Pass a date string as a url paramater after the homepage url and a natural date timestamp and a unix date will be returned</li>
                <li>Returns null if date string is not properly formated</li>
            </ul>
            
            <h2>Example usage:</h2>
            <code>https://timestamp-ms.herokuapp.com/December%2015,%202015</code>
            <code>https://timestamp-ms.herokuapp.com/1450137600</code>
            
            <h2>Example output:</h2>
            <code>{ Unix: 1450137600000, Natural: December 2, 2015 }</code>
        </body>
        </html>
        
        `);
        
    } else {
        
        res.writeHead(200, {'content-Type': 'text/html'});
        res.end(`{ Unix: ${unixTime(req.url)}, Natural: ${naturalTime(req.url)} }`);
        
    }
    
});

server.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');

function naturalTime(stamp) {
    
    if(new Date(stamp.substr(1) * 1000) === 'Invalid Date' || !(new Date(stamp))){
        
        return null;
        
    } else {
        
        console.log(isNaN(stamp));
        
        if(!isNaN(stamp.substr(1))) {
            var monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            
            var date = new Date(stamp.substr(1) * 1000);
            
            var month = date.getMonth();
            var day = date.getDay();
            var year = date.getFullYear();
            
            return `${monthString[month]} ${day}, ${year}`;
        } else {
            var date = new Date(stamp.replace(/%20/g, ' '));
            return date;
        }
        
    }
}

function unixTime(stamp) {
    if(new Date(stamp) === 'Invalid Date' || !(new Date(stamp))) {
        
        return null;
        
    } else {
        
        if (!isNaN(stamp.substr(1))) {
            var date = new Date(stamp.substr(1) * 1000);
            console.log(date);
            return date.getTime();
        } else {
            var date = new Date(stamp.replace(/%20/g, ' '));
            
            return date.getTime();
        }
        
        
    }
}