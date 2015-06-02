var socketio = require('socket.io');

var downloader = require('../youtube-dl');

module.exports = function(server){

  var io = socketio(server);

  io.on('connection', function(socket){

    console.log('new connection, time: %s', new Date().toTimeString());

    socket.on('download', function(id){

        downloader(id, function(err, result){
          console.log('result: %s', result);
          if(err){
            socket.emit("result", "Error, Please check your URL");
          }
          else{
            var song = result.replace("music/",'');
            socket.emit("result", { "link" : result, "name" : song });
          }
        });    
    })

  });

};


