// communicating from client side/ user 
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        //fires io.connection in chat_sockets(sends connection request)
        this.socket=io('http://3.95.30.226:5000/rooms', { transports: ['websocket'] });
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    //runs when io.connection is executed
    connectionHandler(){

        let self=this;


        this.socket.on('connect',function(){
            console.log('connection established using socket');

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'PersonalRoom'
            })

            self.socket.on('user_joined',function(data){
                console.log('a user joined ',data);
            })

        });

        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'PersonalRoom'
                });
            }
        });
        
        self.socket.on('receive_message',function(data){
            console.log('message received ',data.message);

            let newMessage=$('<li>');// create a li
            
            // identify what class it will have depending on who wrote the message
            let messageType='other-message';

            // if its a self message i.e i only wrote it
            // My message coming back to me is an indication that everyone else has recieved the message
            if(data.user_email==self.userEmail){
                messageType='self-message';
            }

            // add a span
            newMessage.append($('<span>',{
                'html':data.message
            }));
            // add user_email to make it easy to identify who wrote the message
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            // add the class 
            newMessage.addClass(messageType);

            // finally append it to message list
            $('#chat-messages-list').append(newMessage);
        })
    }

}
