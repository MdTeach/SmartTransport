const socket = io.connect('http://192.168.100.18:80');
socket.on('data', (data)=>{
     console.log(data);
 })