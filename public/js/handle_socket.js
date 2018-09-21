const text = document.getElementById("text");
    const send = document.getElementById("send");    
    //const socket = io.connect('http://localhost:80');
    var socket = io.connect('http://192.168.100.18');

    send.addEventListener('click', ()=>{
        //let sensor = new Accelerometer();
        //sensor.start();
        //text.value = sensor.x +"";
        socket.emit('msg', {msg:text.value});
        console.log(text.value.toString());
        text.value = "";
    });

    
window.addEventListener('devicemotion', (event)=>{
    let x = event.acceleration.y;
    let y =event.acceleration.x;
    let xy = [x,y];
    socket.emit('msg', {msg:xy});
}, true)
// window.addEventListener("resize", handleResize)
