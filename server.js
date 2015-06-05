var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var io = require('./realtime');
var favicon = require('serve-favicon');
var morgan = require('morgan');


var port = process.env.PORT || 3000;

  app.use(favicon(__dirname + '/public/favicon.ico'));

  //view engine
  app.engine('.html', require('ejs').__express);

  //configuration
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/music'));
  app.use(express.static(__dirname + '/public/dist'));
  app.use(morgan('combined'))

  //Routes
  var routes = require('./routes')(app);
  
  //Listen
   var server = https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(port, onListen);


  io(server);


function onListen(){
  console.log('Server running on port %s', port);
}