var socketio = require('socket.io');
var fs = require('fs');
var downloader = require('../youtube-dl');
var path = require('path');

module.exports = function(server){

  var io = socketio(server);

  io.on('connection', function(socket){

    console.log('new connection, time: %s', new Date().toTimeString());

    socket.on('download', function(id){

        downloader(id, function(err, result){
          console.log('result: %s', result);
          if(err){
            console.log(err);
            socket.emit("result", "error");
          }
          else{
            var song = result.replace("/music/",'');
            socket.emit("result", { "link" : result, "name" : song });
          }
        });    
    });

    socket.on('delete', function(file){
      
      var filePath = path.dirname(__dirname)+ '/public' + file.name;
      console.log('deleting: ' + filePath);

        fs.unlink(filePath , function(err){
          if(err) 
            console.log(err);
          else
            console.log('File: %s Successfully deleted', filePath)
        });
    });

  });

};


