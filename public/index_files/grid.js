function Map(gridData, ctx)
{
    this.gridData = gridData
    this.ctx = ctx
    this.renderGrid = function(width, height)
    {
        let w = width/50
        let h = height/50
        
        this.ctx.fillStyle = 'grey'
        this.ctx.strokeStyle = 'black'

        for(let i = 0; i<50; i++){
            for(let j=0; j<50; j++){
                this.ctx.strokeRect(i*w, j*h, w, h)
                this.ctx.fillRect(i*w, j*h, w, h)
            }
        }
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