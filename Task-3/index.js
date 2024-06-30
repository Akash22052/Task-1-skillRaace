const io=require('socket.io')(8080,{cors:{origin:"*"}});
const users={};
io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    socket.on("send",message=>{
        socket.broadcast.emit("received",message);
    });
    socket.on("disconnect",message=>{
        socket.broadcast.emit("leave",users[socket.id]);
    });
})