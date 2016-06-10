var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var io = require('./realtime');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');

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

  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Routes
  var routes = require('./routes')(app);
  
  // //Listen
  //  var server = https.createServer({
  //     key: fs.readFileSync('key.pem'),
  //     cert: fs.readFileSync('cert.pem')
  //   }, app).listen(port, onListen);

var server = http.createServer(app)
server.listen(port,onListen);

  io(server);


function onListen(){
  console.log('Server running on port %s', port);
}