const cells = document.querySelectorAll(".cell");
const text = document.querySelector(".status");
const btn = document.querySelector(".btn");

const winCondition = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X"
let running = false; 

startGame();

function startGame (){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    btn.addEventListener("click", restartGame);
    text.textContent = `${currentPlayer}'s turn :)`;
    running = true;

}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !="" || !running){
        return
    }

    updateCell(this, cellIndex);
    cheackWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    text.textContent = `${currentPlayer}'s turn :)`

}

function cheackWinner(){
    let roundWon = false;

    for(let i = 0; i < winCondition.length; i ++){
        const condition = winCondition[i];

        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" ||cellB == ""|cellC == ""){
            continue
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        text.textContent = `${currentPlayer} wins!`
        running = false;
    }
    else if(!options.includes("")){
        text.textContent = `The game is draw!`
        running = false;

    } else {
        changePlayer();
    }
}

function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X"
    text.textContent = `${currentPlayer}'s turn :)`;

    cells.forEach(cell => cell.textContent = "");
    running = true;
}