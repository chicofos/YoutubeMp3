var io = require('socket.io-client');
var sweetAlert = require('sweetalert');

var socket = io.connect();

var loader = document.getElementById("load");
var button = document.getElementById("btn");
var input = document.getElementById("input");
var message = document.getElementById("message");

//hide loader
loader.setAttribute("style", "display: none;");

button.addEventListener('click', function(e){

  e.preventDefault();

  var id;

  //TODO: we need more validations!

  if(input.value != "" && input.value.indexOf("youtube.com") != -1){
    id = input.value.split("=")[1];
    download(id);
  }
  //mobile stuff
  else if (input.value.indexOf("youtu.be") > -1){
    id = input.value.split("/")[3];
    download(id);
  }
  else{
    showError();
  }
}, null)


function download(id){
    socket.emit('download', id);
    loader.setAttribute("style", "display: inline;");
    btn.setAttribute("disabled", "true");
}

socket.on('result', function(data){

  loader.setAttribute("style", "display: none;");
  btn.removeAttribute("disabled");

  if(data == "error"){
    showError();
    return;
  }

  success(data);
});

function showError(){
  sweetAlert("Oops...", "Something went wrong! \n Please check your URL", "error");
  input.value = "";
};

function success(data){
  swal({  
    title: "Download Successfull!",
    type: "success",
    text: "<a href='"+data.link+"' download>"+data.name+"</a>",     
    html: true
  }, function(){
    input.value = "";
    socket.emit('delete',{ name : data.link });
  });
}