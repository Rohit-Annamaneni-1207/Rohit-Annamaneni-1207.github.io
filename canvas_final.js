var canva = document.getElementById("canva");
var nav = document.getElementById("navbar");
canva.width = window.innerWidth; 
canva.height = window.innerHeight;
var c = canva.getContext('2d');

var mouse = {
    x: undefined, y:undefined
}

// console.log(innerWidth);
// console.log(nav.offsetHeight);

var choice = ["red", "green", "blue", "yellow"];
var selected;


var factor,factor_B, factor_c;
if (innerWidth>1000 && innerHeight>600)
{
    factor_B = 1;
    factor = 1;
    factor_c = 1;
}
else if (innerWidth<420)
{
    factor_B = 0.8;
    factor = 0.5;
    factor_c = 0.5;
}
else
{
    factor_B = 0.8;
    factor = 0.5;
    factor_c = 0.8;
}

console.log(factor);

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y-nav.offsetHeight;
    // console.log(mouse);
})

function Dots()
{
    this.x = Math.random()*canva.width;
    this.y = Math.random()*canva.height;
    this.dx = (Math.random()-0.5);
    this.dy = (Math.random()-0.5);
    this.radius = 4;

    this.dx = 2*(this.dx/Math.abs(this.dx));
    this.dy = 2*(this.dy/Math.abs(this.dy));
    this.distance = undefined;
    this.inter = [];
    this.fillSelect = Math.floor(Math.random() * choice.length);

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.strokeStyle = "black";
        c.fillStyle = "black";
        c.fill();
        this.distance = Math.sqrt((mouse.x - this.x)*(mouse.x - this.x) + (mouse.y - this.y)*(mouse.y - this.y));
        if (this.distance <=factor_B*400)
        {
            c.beginPath();
            c.moveTo(mouse.x,mouse.y+60);
            c.lineTo(this.x,this.y);
            c.strokeStyle = "rgba(90, 90, 90, 0.705)";
            c.stroke();
        }
    }
    this.update = function()
    {
        if (this.x+this.radius>canva.width||this.x+this.radius<0)
        {
            this.dx = -this.dx;
        }
        if (this.y+this.radius>canva.height||this.y+this.radius<0)
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

for (i=0;i<factor*40;i++)
{
    dotArray.push(new Dots());
}

function connect(dotA, dotB)
{
    c.beginPath();
    c.moveTo(dotA.x, dotA.y);
    c.lineTo(dotB.x, dotB.y);
    c.strokeStyle = "rgba(151, 150, 150, 0.705)";
    c.stroke();
}

var dist = undefined;
var lineBreak = undefined;

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0,canva.width,canva.height);
    for (i=0;i<dotArray.length;i++)
    {
        dotArray[i].update();
        // console.log(dotArray[i]);
    }
    for (i=0;i<dotArray.length;i++)
    {
        for (j=0;j<dotArray.length;j++)
        {
            // connect(dotArray[i],dotArray[j]);
            dist = Math.sqrt((dotArray[i].x - dotArray[j].x)*(dotArray[i].x - dotArray[j].x) + (dotArray[i].y - dotArray[j].y)*(dotArray[i].y - dotArray[j].y));
            if (dist<=factor_B*200)
            {
                connect(dotArray[i],dotArray[j]);
            }
        }
    }

    // c.fillStyle = "rgba(36, 130, 252, 1)";
    // if (factor_c==1)
    // {
    //     c.font = "bold 30px Time new roman";
    //     lineBreak = 50;
    // }
    // else if (factor_c == 0.5)
    // {
    //     c.font = "bold 8px Time new roman";
    //     lineBreak = 18;
    // }
    // else
    // {
    //     c.font = "bold 15px Time new roman";
    //     lineBreak = 20;
    // }
    // c.textAlign = "center";
    // c.fillText("International Conference on Strategic Models in Computing Applications (SMCA)", canva.width/2, canva.height/2-80);
    // c.fillText("Date: 16-19 January 2022", canva.width/2, canva.height/2-80+lineBreak);
    // c.fillText("Location: Virtual", canva.width/2, canva.height/2-80 + 2*lineBreak);
}

animate();
