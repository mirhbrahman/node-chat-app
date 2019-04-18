let socket = io();
socket.on('connect',function(){
  console.log('Connected to server');

  // socket.emit('createMessage',{
  //   from: 'john',
  //   text: 'This is test'
  // });
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});

socket.on('disconnect', function(){
  console.log('Disconnected form server');
});
