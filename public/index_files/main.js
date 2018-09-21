let cnv = initCanvas()
document.body.appendChild(cnv)
let ctx = cnv.getContext('2d')
let gridData = getGridData()
let map = new Map(gridData, ctx)
let vehicle1 = new Vehicle(cnv.width/2, cnv.height/2, cnv.width/50, ctx)
map.renderGrid(cnv.width, cnv.height)
vehicle1.drawMarker()

function handleMotion(event)
{
    // let ax = event.acceleration[1]
    vehicle1.vx += event.acceleration.y*2
    vehicle1.vy += event.acceleration.x*2
    map.renderGrid(cnv.width, cnv.height)
    vehicle1.move()
    vehicle1.drawMarker()
}

function handleResize()
{
    resizeCanvas()
}

window.addEventListener('devicemotion', handleMotion, true)
// window.addEventListener("resize", handleResize)


