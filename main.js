console.log("Hello World")
var c = document.getElementById("myCanvas")
c.addEventListener("mousedown", doMouseDown, false)
c.addEventListener("mouseup", doMouseUp, false)
c.addEventListener("touchstart", doMouseDown, false)
c.addEventListener("touchend", doMouseUp, false)

var ctx = c.getContext("2d")

c.width = document.body.clientWidth //document.width is obsolete
c.height = document.body.clientHeight //document.height is obsolete

var radius = (Math.sqrt(Math.pow(c.width/2,2)+Math.pow(c.height,2)))

var point_number = 8
var polygon_angle = 2*Math.PI/point_number
var offset_minimum = (Math.PI-polygon_angle)/2

//generalize this!!
var offset_max = Math.PI/4

var offset = offset_max
//offset = 0

var mouseDown = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function background(){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.fillStyle = "black"
}

function drawLines(){

    var l = Math.sin(polygon_angle)*radius/Math.sin((Math.PI-polygon_angle)/2)
    var interior_angle = ((point_number-2)*Math.PI / point_number)

    var m = l*Math.sin(interior_angle-offset)/Math.sin(Math.PI-interior_angle)

    for (i = 0; i < point_number; i ++){
        var x = c.width/2 + radius*Math.cos(i*polygon_angle)
        var y = c.height/2 + radius*Math.sin(i*polygon_angle)

        var mAngle = Math.PI+offset_minimum+i*polygon_angle-offset
        var lineW = m*Math.cos(mAngle)
        var lineH = m*Math.sin(mAngle)

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+lineW,y+lineH)
        ctx.stroke()

    }
}

function drawRects(){
    ctx.translate(c.width/2,c.height/2)




    for (i = 0; i < point_number; i ++){
        ctx.translate(radius,0)
        ctx.rotate(offset_minimum-offset)
        ctx.beginPath()
        ctx.fillStyle = "#EE2C2C";
        ctx.fillRect(-c.width*2, -c.height*2, c.width*2, c.height*2)
        ctx.fill()
        ctx.lineWidth = 5;
        ctx.stroke()
        ctx.rotate(-offset_minimum+offset)
        ctx.translate(-radius,0)
        ctx.rotate(-polygon_angle)

    }
    ctx.translate(-c.width/2,-c.height/2)

    
}

function doMouseDown(e){
    mouseDown = true
}

function doMouseUp(e){
    mouseDown = false
}





function mainLoop() {
    background()


    drawRects()
    drawLines()
    if (mouseDown){
        if (offset <= offset_minimum - 0.01){
            offset+=0.01
        }
    }
    else{
        if (offset > offset_max){
            console.log('baban')
            offset-=0.01
        }
    }
    requestAnimationFrame(mainLoop)
}

requestAnimationFrame(mainLoop)