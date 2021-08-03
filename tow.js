const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'


const cellElaments = document.querySelectorAll('[data-cell]')
const board = document.getElementById("board")


let circleTurn

const winningMsgelement = document.getElementById('winningMsgs')

const winningMsgtxtelement  = document.querySelector('[deta-winning-msg-text]')

const restartBtn = document.getElementById("restartBtn")

const winningCombinations = [ 
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [6,7,8],
    [3,4,5]
]

restartBtn.addEventListener('click' , startGame)

function startGame(){

    circleTurn = false
    cellElaments.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click', handleclick, { once: true })
    })
    hoverClass()
    winningMsgelement.classList.remove('show')
}




function handleclick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell , currentClass)
    if(checkWin(currentClass)){
        console.log('winner')
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    }
    else {
        swapTurns()
        hoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMsgtxtelement.innerText = `Match Draw!!`

    } else {
    winningMsgtxtelement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!`
    }
    winningMsgelement.classList.add('show')
}


function placeMark(cell , currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn =!circleTurn
}

function hoverClass() {

    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cellElaments[index].classList.contains(currentClass)
        })
    })
}
function isDraw(){
    return [...cellElaments].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

startGame()