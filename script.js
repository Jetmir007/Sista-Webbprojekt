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

//Minesweeper

let rows, cols, totalmines, blocksize;
let board = []
let revealed = []
let flagged = []
let firstclick = true
let gameover = false

function Level(level){
    if(level === "easy"){
        rows = 8
        cols = 8
        totalmines = 10
        blocksize = 80
    }
    else if(level === "medium"){
        rows = 16
        cols = 16
        totalmines = 40
        blocksize = 40
    }
    else if (level === "hard"){
        rows = 24
        cols = 24
        totalmines = 99
        blocksize = 26.67
    }


    Reset()
    Spelplan()
}

function placeMine(excludeX, excludeY){
    board = Array.from({length:rows}, () => Array(cols).fill(0))
    revealed = Array.from({length:rows}, () => Array(cols).fill(false))
    flagged = Array.from({length:rows}, () => Array(cols).fill(false))

    let minesplaced = 0
    while(minesplaced<totalmines){
        let r = Math.floor(Math.random()*cols)
        let c = Math.floor(Math.random() *rows)

        if((r!==excludeY||c!==excludeX) && board[r][c]!== -1){
            board[r][c] = -1
            minesplaced++

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let nr = r+i
                    let nc =c+j
                    if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&board[nr][nc]!==-1){
                        board[nr][nc]++
                    }
                }                
            }
        }
    }
}

function Reveal(x, y){
    if(x<0 || x>= cols|| y<0 || y>= rows || revealed[y][x]) return;
    revealed[y][x] = true

    if(board[y][x]===-1){
        gameover = true
        revealAll()
        GameOver("YOU LOSE")
        return;
    }

    if(board[y][x]===0){
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if(i!==0||j!==0){
                    Reveal(x+i, y+j)
                }
            }
        }
    }
}

function DrawBoard(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "gray"
    ctx.font = "Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let xPos = j*blocksize
            let yPos = i*blocksize

            if(revealed[i][j]){
                ctx.fillStyle = "#eee"
            }
            else{
                ctx.fillStyle = "green"
            }

            ctx.fillRect(xPos, yPos, blocksize, blocksize)
            ctx.strokeRect(xPos, yPos, blocksize, blocksize)

            if(flagged[i][j]&&!revealed[i][j]){
                ctx.fillStyle = "red"
                ctx.fillText("🚩", xPos+blocksize/2, yPos+blocksize/2)
            }

            if(revealed[i][j]){
                if(board[i][j]===-1){
                    ctx.fillStyle = "red"
                    ctx.fillText("💣", xPos+blocksize/2, yPos+blocksize/2)
                }
                else if(board[i][j]>0){
                    ctx.fillStyle = "black"
                    ctx.fillText(board[i][j], xPos+blocksize/2, yPos+blocksize/2)
                }
            }
        }        
    }
}

function Win(){
    if(gameover){
        return
    }

    let safe = 0
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if(!revealed[y][x]&&board[y][x] !== -1){
                safe++
            }
        }
    }
    if(safe===0){
        gameover = true
        GameOver("YOU WIN")
        revealAll()
    }
}

function revealAll(){
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            revealed[y][x]=true
        }
    }
    DrawBoard()
}

function Spelplan(){
    const canvas = document.getElementById("myCanvas");
    canvas.addEventListener('click', function(event){
        if(gameover) return;
        let x = Math.floor((event.clientX-this.getBoundingClientRect().left)/blocksize)
        let y = Math.floor((event.clientY-this.getBoundingClientRect().top)/blocksize)

        if(firstclick){
            placeMine(x, y)
            firstclick = false
        }

        Reveal(x, y)
        DrawBoard()
        if(!gameover){
            Win()
        }
    })

    canvas.addEventListener('contextmenu', function(event){
        event.preventDefault()
        if(gameover) return;

        let x = Math.floor((event.clientX-this.getBoundingClientRect().left)/blocksize)
        let y = Math.floor((event.clientY-this.getBoundingClientRect().top)/blocksize)

        if(!revealed[y][x]){
            flagged[y][x] = !flagged[y][x]
        }
        DrawBoard()
    })
}

function Reset(){
    firstclick = true
    gameover = false
    board = Array.from({length:rows}, () => Array(cols).fill(0))
    revealed = Array.from({length:rows}, () => Array(cols).fill(false))
    flagged = Array.from({length:rows}, () => Array(cols).fill(false))  
    DrawBoard()
}

function GameOver(message){
    const overlay = document.createElement('div')
    overlay.id = "gameover-overlay"

    overlay.style.position = "fixed"
    overlay.style.top = "0"
    overlay.style.left = "0"
    overlay.style.width = "100vw"
    overlay.style.height = "100vh"
    overlay.style.background = "rgba(0, 0, 0, 0.7)"
    overlay.style.display = "flex"
    overlay.style.justifyContent = "center"
    overlay.style.alignItems = "center"
    overlay.style.flexDirection = "column"
    overlay.style.color = "white"
    overlay.style.zIndex = "1000"

    const container = document.createElement("div")
    const msg = document.createElement("h1")
    msg.innerText = message

    const restart = document.createElement("button")
    restart.className = "button is-light"
    restart.innerText = "Reset"
    restart.style.marginTop = "1rem"
    restart.onclick = () => {
        document.body.removeChild(overlay)
        Reset();
        Spelplan()
    }

    container.appendChild(msg)
    container.appendChild(restart)
    overlay.appendChild(container)
    document.body.appendChild(overlay)
}

window.onload = () => {
    Spelplan()
    Level("medium")
    DrawBoard()
}
