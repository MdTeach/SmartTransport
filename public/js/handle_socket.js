const socket = io.connect('http://192.168.100.25');    
window.addEventListener('devicemotion', (event)=>{
    let x = event.acceleration.y;
    let y =event.acceleration.x;
    let xy = [x,y];
    socket.emit('msg', {msg:xy});
}, true)

socket.on('data', (data)=>{
     console.log(data);
     
})

