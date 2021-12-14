// observer/ server who will recieve the incoming connections from all the users(listners/subscribers)

// emit -> sends request 
//.on -> detects event sent by client
module.exports.chatSockets =function(socketServer){
    let io = require("socket.io")(socketServer, {
        cors: {
          origin: "http://35.173.198.224:8080",
          methods: ["GET", "POST"]
        }
      });

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected ');
        })

        socket.on('join_room',function(data){
            console.log('joining request received : ',data);
            // data.chatroom is the name of chatroom( if it exist it joins the user, if it doesnt exist it creates)
            socket.join(data.chatroom);

            // sends a notification to all the other users in the room that a new user has joined the chatroom
            io.in(data.chatroom).emit('user_joined',data);

        });
        //on message received
        socket.on('send_message',function(data){
            // send acknowledgment
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
    
};