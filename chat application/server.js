const io = require('socket.io')(3000)
const users={};
io.on('connection',socket => {
    //socket.emit('chat-message','Hello world')
    socket.on('new-user', name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-connected',name);
    })
    socket.on('send-chat-message',message=>{
    //What if we want to send to other client
    //It will broadcast to every client that are connected to the server except who sends it
        socket.broadcast.emit('chat-message',{message:message,
            name:users[socket.id]
        });
    })
    socket.on('disconnect', ()=>{
       socket.broadcast.emit('user-disconnected',users[socket.id]);
       delete users[socket.id];
    })
})
