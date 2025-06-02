//Light-Dark Mode
function ToggleD(){
    let html = document.getElementsByTagName("html") 
    html[0].classList.toggle("theme-dark")
    document.getElementById("sol").style.display = "none"
    document.getElementById("måne").style.display = "block"
}

function ToggleL(){
    let html = document.getElementsByTagName("html") 
    html[0].classList.remove("theme-dark")
    document.getElementById("sol").style.display = "block"
    document.getElementById("måne").style.display = "none"
}

//Dropdown
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

