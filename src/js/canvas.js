import util from './utils'



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#525258', '#818e85', '#adb8b2', '#c9d6cf', '#d997bb']

var gravity = 1
var friction = 0.99




addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click', function(){

    init()
})

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
}

    this.update = function() {
        if(this.y + this.radius + this.dy> canvas.height){
            this.dy = -this.dy * friction
        }else{
            this.dy += gravity
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius  <= 0){
            this.dx =  -this.dx
        }
        this.y += this.dy
        this.x += this.dx
        this.draw()
    
}
}
// Implementation
 var ball 
 var ballArray = []
function init() {
    ballArray = []
    
    for (let i = 0; i < 400; i++) {

        var radius = util.randomIntFromRange(8, 20)
        var x = util.randomIntFromRange(radius, canvas.width - radius)
        var y = util.randomIntFromRange(0, canvas.height - radius )
        var dx = util.randomIntFromRange(-2, 2)
        var dy = util.randomIntFromRange(-2, 2)
        var color = util.randomColor(colors)

        ballArray.push(new Ball(x, y, dx, dy, radius, color))
       
        
    }

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    ballArray.forEach(ball => {
      ball.update()
     })
}

init()
animate()
