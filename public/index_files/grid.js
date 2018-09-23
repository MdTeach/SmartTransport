function Map(gridData, ctx)
{
    this.gridData = gridData
    this.ctx = ctx
    this.cracks = []
    this.draw = (width, height) =>
    {
        let w = width, h = height
        
        this.ctx.fillStyle = '#222'
        this.ctx.fillRect(0, (h/2 -h/25 - h/5), w, 2*h/25 + 2*h/5)

        this.ctx.fillStyle = '#444'
        this.ctx.fillRect(0, (h/2 - h/5), w, 2*h/5)
    }
    this.renderGrid = function(width, height)
    {
        let w = width/50
        let h = height/50
        
        this.strokeWidth = 1
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        this.ctx.strokeStyle = '#555'

        for(let i = 0; i<50; i++){
            for(let j=0; j<50; j++){
                this.ctx.strokeRect(i*w, j*h, w, h)
                this.ctx.fillRect(i*w, j*h, w, h)
            }
        }
        this.ctx.fillStyle = 'white'
        if(this.cracks.length){
            let coord = this.cracks[this.cracks.length-1]
            coord = coord.map(e => Math.floor(e))
            this.ctx.fillText(`Crack last detected at (${coord[0]}, ${coord[1]})`, cnv.width/6, cnv.height/10)
        }
    }
    this.drawCracks = () =>{
            this.ctx.fillStyle = 'red'
            this.ctx.save()
            if(this.cracks.length){
                this.cracks.forEach(el =>{
                this.ctx.beginPath()
                this.ctx.arc(el[0], el[1], 25, 2*Math.PI, false)
                this.ctx.fill()
            })
        }
    }
    this.addCrack = (x, y) =>{
        this.cracks.push([x, y])
    }
}
function getGridData(){
    let gridData = new Array(50, 50)
    gridData.fill(0)
    for(let i=0; i<50; i++){
        for(let j=0; j<50; j++){
            gridData[i, j] = [i, j]
        }
    }
    return gridData
}

function background(ctx){
    ctx.fillStyle = '#cc9900'
    ctx.fillRect(0, 0, cnv.width, cnv.height)
}
