let cnv = initCanvas()
document.body.appendChild(cnv)
let ctx = cnv.getContext('2d')
ctx.font = '40px ariel'
let gridData = getGridData()

let map = new Map(gridData, ctx)
let testArr = []

let vehicle1 = new Vehicle(cnv.width/2, cnv.height/2, cnv.width/50, ctx)

background(ctx)
map.draw(cnv.height, cnv.width)
map.renderGrid(cnv.width, cnv.height)
vehicle1.drawMarker()

const socket = io.connect('http://192.168.10.67');
window.addEventListener('devicemotion', (event)=>{
    let x = event.acceleration.y;
    let y =event.acceleration.x;
    let xy = [x,y];
    socket.emit('msg', {msg:xy});
}, true);

window.addEventListener('deviceorientation', (event)=>{
    let z = event.alpha;
    let y = event.gamma;
    let x = event.beta;
    let xyz = [x,y,z];
    //console.log("It was called");
    socket.emit('msg1', {msg1:xyz});
}, true);

socket.on('data', (data)=>{
     let message = data["msg"];
     let aX = message.msg[0];
     let aY = message.msg[1];
     vehicle1.vx = aX;
     vehicle1.vy = aY;
     background(ctx)
     map.draw(cnv.width, cnv.height)
     map.drawCracks()
     map.renderGrid(cnv.width, cnv.height)
     vehicle1.move();
     vehicle1.drawMarker();
});

socket.on('data1', (data)=>{
    // apha=>z beta=>x
    let rotData = (data["msg1"].msg1);
    let rotX = rotData[0];
    let rotY = rotData[1];
    let rotZ = rotData[2];

    event.preventDefault()
    vehicle1.az = -90-rotZ
    testArr.push([rotX, rotY])
    background(ctx)
    map.draw(cnv.width, cnv.height)
    map.drawCracks()
    map.renderGrid(cnv.width, cnv.height)
    vehicle1.move()
    vehicle1.drawMarker()
    console.log(`array length ${testArr.length}`)
    if(testArr.length==2)
    {
        if(Math.abs(testArr[1][0]-testArr[0][0])>20 | Math.abs(testArr[1][1]-testArr[0][1])>20)
        {
            ctx.fillStyle = 'red';
            // setInterval(()=>ctx.fillRect(0, 0, cnv.height, cnv.width), 100)
            map.addCrack(vehicle1.x, vehicle1.y)
            console.log('difference:\n')
            console.log(testArr[1][0]-testArr[0][0])
            console.log('\n')
            console.log(testArr[1][1]-testArr[0][1])
        }
        testArr = []
    }
})


