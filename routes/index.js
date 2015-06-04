
var songs = require('../playlist');

module.exports = function(app){

  app.get('/', onRequest);
  app.get('/songs', updateList);
  app.get('*', notFound);

var playlist = [];

function updateList(req, res){

  songs(function(list){

    res.render('songs', {
      songs: list,
      title: "Playlist",
      header: "Downloaded Songs"
    });

  });
}

function notFound(req,res){
  res.render('notfound');
}

function onRequest(req, res){
    res.render('index',{
      title: 'Index',
      header : "Welcome"
    });
  }


}