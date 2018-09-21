let Vehicle = function(x, y, rad, ctx)
{
    // this.refAngle = 0
    this.ctx = ctx
    this.x = x
    this.y = y

    this.vx = 0
    this.vy = 0
    this.az = 0
    // this.angle = 0
    this.rad = rad
    this.move = () =>{
        this.x += this.vx
        this.y += this.vy
    }
    this.drawMarker = () =>{
        //core marker
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.rad, Math.PI*2, false)
        this.ctx.fillStyle = 'blue'
        this.ctx.fill()
        this.ctx.closePath()
        
        //halo marker
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.rad*3/2, Math.PI*2, false)
        this.ctx.fillStyle = "rgba(.5, 0, 1, .5)"
        this.ctx.fill()
        this.ctx.closePath()
    }
    this.scale = (cnv) =>{
        this.rad = cnv.width/50
        this.drawMarker()
    }
}

