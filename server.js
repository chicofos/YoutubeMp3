var express = require('express');
var app = express();
var routes = require('./routes')(app);
var io = require('./realtime');
var cluster = require('cluster');

var port = process.env.PORT || 3000;

if(cluster.isMaster){
    var i = 0;
    //2 extra clusters
    for (i; i < 3; i++){
        console.log('Cluster %s running', ++i);
     cluster.fork();
    }

    //if the worker dies, restart it.
   cluster.on('exit', function(worker){
      console.log('Worker ' + worker.id + ' died..');
      cluster.fork();
   });

}
else{

  //view engine
  app.engine('.html', require('ejs').__express);

  //configuration
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/music'));

  //Listen
  var server = app.listen(port, onListen);

  io(server);


  process.on('uncaughtException', function(err){
      console.log(err);
      //Send some notification about the error  
      process.exit(1);
  });

}

function onListen(){
  console.log('Server running on port %s', port);
}