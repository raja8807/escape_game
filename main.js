let btn = document.querySelector(".btn")
let player = document.querySelector(".player")
let opponent = document.querySelector(".opponent")
let inner = document.querySelector(".inner")

let scoreOut = document.querySelector(".score")
// let bullet = document.querySelector(".bullet")

// console.log(bullet);


player.style.top = "0px"
player.style.left = "0px"
opponent.style.top = "170px"
opponent.style.left = "170px"

var playerInt;

let score = 0

document.body.addEventListener("keydown", (event) => {
    if (gameStarted) {
        if (event.key == "ArrowDown") {
            clearInterval(playerInt)
            let positionTop = parseInt(player.style.top.slice(0, -2))
            playerInt = setInterval(() => {
                chkWin()
                if (positionTop <= 380) {
                    player.style.top = `${positionTop}px`;
                    // bullet.style.top = `${positionTop+20}px`;
                    positionTop = positionTop + 1
                }
            }, 6)
        }

        if (event.key == "ArrowUp") {
            clearInterval(playerInt)
            let positionTop = parseInt(player.style.top.slice(0, -2))
            playerInt = setInterval(() => {
                chkWin()
                if (positionTop >= 0) {
                    player.style.top = `${positionTop}px`;
                    positionTop = positionTop - 1
                }
            }, 6)
        }

        if (event.key == "ArrowRight") {
            clearInterval(playerInt)
            let positionLeft = parseInt(player.style.left.slice(0, -2))
            playerInt = setInterval(() => {
                if (positionLeft < 380) {
                    player.style.left = `${positionLeft}px`;
                    positionLeft = positionLeft + 1

                    chkWin()

                }
            }, 6)
            // console.log(positionLeft);
        }


        if (event.key == "ArrowLeft") {
            clearInterval(playerInt)
            let positionLeft = parseInt(player.style.left.slice(0, -2))
            playerInt = setInterval(() => {
                chkWin()
                if (positionLeft >= 0) {
                    player.style.left = `${positionLeft}px`;
                    positionLeft = positionLeft - 1
                }
            }, 6)
        }
    }
})


var oppInt;

function moveOpponent(dir) {
    let opponentPositionTop = parseInt(opponent.style.top.slice(0, -2))
    let opponentPositionLeft = parseInt(opponent.style.left.slice(0, -2))

    if (!gameStarted) {
        clearInterval(oppInt)
        clearInterval(i)
        clearInterval(playerInt)
    } else {
        clearInterval(i)
        clearInterval(oppInt)
        

        if (dir == 0) {
            oppInt = setInterval(() => {
                opponent.style.top = opponentPositionTop + "px"
                opponentPositionTop -= 2
                if (opponentPositionTop < -20) {
                    clearInterval(oppInt)
                    clearInterval(i)
                    start()
                }
            }, 2)
        }

        if (dir == 1) {
            oppInt = setInterval(() => {
                opponent.style.top = opponentPositionTop + "px"
                opponentPositionTop += 2
                if (opponentPositionTop > 360) {
                    clearInterval(oppInt)
                    clearInterval(i)
                    start()
                }
            }, 2)
        }

        if (dir == 2) {
            oppInt = setInterval(() => {
                opponent.style.left = opponentPositionLeft + "px"
                opponentPositionLeft -= 2
                if (opponentPositionLeft < -20) {
                    clearInterval(oppInt)
                    clearInterval(i)
                    start()
                }
            }, 2)
        }
        if (dir == 3) {
            oppInt = setInterval(() => {
                opponent.style.left = opponentPositionLeft + "px"
                opponentPositionLeft += 2
                if (opponentPositionLeft > 360) {
                    clearInterval(oppInt)
                    clearInterval(i)
                    start()
                }
            }, 2)
        }
    }
}

function chkWin() {
    let playerPositionTop = parseInt(player.style.top.slice(0, -2))
    let playerPositionLeft = parseInt(player.style.left.slice(0, -2))
    let opponentPositionTop = parseInt(opponent.style.top.slice(0, -2))
    let opponentPositionLeft = parseInt(opponent.style.left.slice(0, -2))

    let topDistance = playerPositionTop - opponentPositionTop
    let leftDistance = playerPositionLeft - opponentPositionLeft

    // console.log(leftDistance);

    if (topDistance > 0 && topDistance < 40) {
        if (leftDistance > 0 && leftDistance < 40) {
            clearInterval(playerInt)
            clearInterval(oppInt)
            score++
            scoreOut.innerText = score
            stop()
            start()
        }
    }
}

var i;
let gameStarted = false


function start() {
    clearInterval(i)
    i = setInterval(() => {
        let direction = Math.floor(Math.random() * 4)
        clearInterval(oppInt)
        moveOpponent(direction)
    }, 300)
}

function stop() {
    clearInterval(playerInt)
    clearInterval(oppInt)
    clearInterval(i)
    player.style.top = "0px"
    player.style.left = "0px"
    opponent.style.top = `${Math.floor(Math.random() * 361)}px`
    opponent.style.left = `${Math.floor(Math.random() * 361)}px`
}

document.addEventListener("keypress", (event) => {
    if (event.key == " ") {
        gameStarted = !gameStarted

        start()
    }
})


