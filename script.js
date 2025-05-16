function ToggleD(){
    let html = document.getElementsByTagName("html") 
    html[0].classList.toggle("theme-dark")
    document.getElementById("sol").style.display = "none"
    document.getElementById("måne").style.display = "block"
}

function ToggleL(){
    let html = document.getElementsByTagName("html") 
    html[0].classList.toggle("theme-dark")
    document.getElementById("sol").style.display = "block"
    document.getElementById("måne").style.display = "none"
}

let drop = false

function Nav(){
    if(!drop){
        document.getElementById("dropdown").style.display = "block"
        drop = true
    }
    else{
        document.getElementById("dropdown").style.display = "none"
        drop = false
    }
}

let a = 0
function Spelplan(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "grey"
    for (let index = 0; index < 16; index++) {
        ctx.moveTo(40*index,0)
        ctx.lineTo(40*index, 640)
        ctx.stroke()
    }
    for (let index = 0; index < 16; index++) {
        ctx.moveTo(0,40*index)
        ctx.lineTo(640, index*40)
        ctx.stroke()
    }
    canvas.addEventListener('click', function(event){
        a++
        console.log(event)
        let x = event.offsetX
        let y = event.offsetY
        console.log(x + ", " + y + ", " + a)
    }
    )
}

setTimeout(Spelplan, 100)