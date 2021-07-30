var canva = document.getElementById("canva")
canva.width = window.innerWidth; 
canva.height = window.innerHeight;
var c = canva.getContext('2d');

var mouse = {
    x: undefined, y:undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

function Dots()
{
    this.x = Math.random()*innerWidth;
    this.y = Math.random()*innerHeight;
    this.dx = (Math.random()-0.5);
    this.dy = (Math.random()-0.5);
    this.radius = 5;

    this.dx = 1.5*(this.dx/Math.abs(this.dx));
    this.dy = 1.5*(this.dy/Math.abs(this.dy));
    this.distance = undefined;
    this.inter = [];

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        // c.strokeStyle = "gray";
        c.fill();
        this.distance = Math.sqrt((mouse.x - this.x)*(mouse.x - this.x) + (mouse.y - this.y)*(mouse.y - this.y));
        if (this.distance <=400)
        {
            c.beginPath();
            c.moveTo(mouse.x,mouse.y);
            c.lineTo(this.x,this.y);
            c.stroke();
        }
    }
    this.update = function()
    {
        if (this.x+this.radius>innerWidth||this.x+this.radius<0)
        {
            this.dx = -this.dx;
        }
        if (this.y+this.radius>innerHeight||this.y+this.radius<0)
        {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}

var dotArray = [];
var i = 0,j = 0;

for (i=0;i<30;i++)
{
    dotArray.push(new Dots());
}

function connect(dotA, dotB)
{
    c.beginPath();
    c.moveTo(dotA.x, dotA.y);
    c.lineTo(dotB.x, dotB.y);
    c.stroke();
}

var dist = undefined;

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (i=0;i<dotArray.length;i++)
    {
        dotArray[i].update();
        console.log(dotArray[i]);
    }
    for (i=0;i<dotArray.length;i++)
    {
        for (j=0;j<dotArray.length;j++)
        {
            // connect(dotArray[i],dotArray[j]);
            dist = Math.sqrt((dotArray[i].x - dotArray[j].x)*(dotArray[i].x - dotArray[j].x) + (dotArray[i].y - dotArray[j].y)*(dotArray[i].y - dotArray[j].y));
            if (dist<=200)
            {
                connect(dotArray[i],dotArray[j]);
            }
        }
    }
}

animate();
