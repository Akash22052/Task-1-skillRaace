const socket=io("http://localhost:8080");
const form=document.getElementById("send-container");
const messageinp=document.getElementById("messageinp");
const messagecontainer=document.querySelector(".container");
var audio=new Audio('tap-notification-180637.mp3');
let name=prompt("enter your name to join");
socket.emit("new-user-joined",name);
const append=(message,position)=>{
     const messageElement=document.createElement('div');
     messageElement.innerText=message;
     messageElement.classList.add("message");
     messageElement.classList.add(position);
     messagecontainer.append(messageElement);
     if(position=="left"){
        audio.play();
     }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`you:${message}`,'right');
    socket.emit("send",message);
    messageinp.value='';
})

socket.on("user-joined",name=>{
   append(`${name} has joined chat`,"right");
});
socket.on("received",data=>{
        append(`${data.name}:${data.message}`,"left");
  });
  socket.on("leave",name=>{
        append(`${name} has left the chat`,"left");
  });

