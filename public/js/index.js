let socket = io();
socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('newMessage', function(message){
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a);

  jQuery('#messages').append(li);
});

socket.on('disconnect', function(){
  console.log('Disconnected form server');
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){
    jQuery('[name=message]').val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not support by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fatch location');
  });
});