var socketio = require('socket.io');
var downloader = require('../youtube-dl');

module.exports = function(server){

  var io = socketio(server);

  io.on('connection', function(socket){
    console.log('new connection!');

    socket.on('download', function(id){
        downloader(id, function(err, result){
          if(err){
            socket.emit("result", "Error, Please check your URL");
          }
          else 
            socket.emit("result", result);
        });    
    })

  });

};


