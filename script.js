// constant declaration
const mainSpace = document.getElementById("mainSpace");
const num_playerSelector = document.getElementById("num_playerSelector");
const scoreSpace = document.getElementById("scoreSpace");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const infoLabel = document.getElementById("infoLabel");

// constants that can be changed...
const rowCount = 6;
const columnCount = 5;

// variable declaration
let currentTurn = 1;
let flippedTiles;
let numPlayers;
let playerScores = [];



// game initialisation
function initGame(){
    makeTiles();
    
    numPlayers = Number(num_playerSelector.value);
    for (let counter = 1; counter <= numPlayers; counter++){
        playerScores.push(0);
    }
    
    infoLabel.style.display = "block";
    initScoreSpace(numPlayers);
    fillUpTiles();
    num_playerSelector.disabled = true;
    playBtn.style.display = "none";
    restartBtn.style.display = "block";
}

mainSpace.addEventListener("click", event => {
    mainGame(event, getFlippedTiles());
})

//-------------------reqd. functions-----------------------------

function fillUpTiles(){
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let selectedChars = [];
    let randInd;
    let randTile;

    while (selectedChars.length < (rowCount * columnCount)){
        randInd = Math.floor(Math.random() * allowedChars.length);
        let randChar = allowedChars[randInd];
        selectedChars.push(randChar);
        selectedChars.push(randChar);
    }

    for (tile of mainSpace.children){
        randTile = Math.floor(Math.random() * allowedChars.length);
        tile.textContent = selectedChars[randTile];
    }
}

function makeTiles(){
    for (let i = 0; i < (rowCount * columnCount); i++){
        const button = document.createElement("button");
        button.type = "button";
        button.className = "mainBtn";
        button.id = `btn${i+1}`;
        mainSpace.appendChild(button);
    }

    mainSpace.style.display = "grid";
    let sideLength = 480 / rowCount;
    mainSpace.style.gridTemplateRows = `repeat(${rowCount}, ${sideLength}px)`;
    mainSpace.style.gridTemplateColumns = `repeat(${columnCount}, ${sideLength}px)`;

}

function initScoreSpace(numPlayers){
    for (let i = 0; i < numPlayers; i++){
        scoreSpace.style.display = "flex";
        child = document.createElement("label");
        child.classList.add("scoreLabel");
        scoreSpace.append(child);
        child.style.display = "block";
        child.textContent = `Player ${i+1}: 0`;
    }
}



// game mechanics
function mainGame(event, flippedTiles){
    if (flippedTiles === 0){
        event.target.classList.add("flipBtn");
    }
    else if (flippedTiles === 1){
        event.target.classList.add("flipBtn");
        compareTiles(mainSpace.children);
        setTimeout(unflipTiles, 1222);
    }
}

function compareTiles(array){
    let flippedTileArray = [];
    for (child of array){
        if (child.classList.contains("flipBtn")){
            flippedTileArray.push(child);
        }
    }
    
    if (flippedTileArray[0].textContent === flippedTileArray[1].textContent){
        updateScore(currentTurn);
        disableTiles(flippedTileArray);
    }
    else{
        changeTurn(numPlayers);
    }
}

function changeTurn(numPlayers){
    currentTurn = (currentTurn === numPlayers) ? 1 : currentTurn + 1;
    infoLabel.textContent = `Player ${currentTurn}'s turn`;
}

function disableTiles(array){
    array.forEach(child => {
        child.disabled = true;
        child.textContent = "!";
        child.style.color = "black";
        child.style.fontWeight = "bold";
        child.style.background = "lavenderblush";
    });
}

function updateScore(currentTurn){
    playerScores[currentTurn - 1] += 1;
    scoreSpace.children[currentTurn - 1].textContent = `Player ${currentTurn}: ${playerScores[currentTurn - 1]}`;
}

function unflipTiles(){
    for (tile of mainSpace.children){
        if (tile.classList.contains("flipBtn")){
            tile.classList.remove("flipBtn");
        }
    }
}

function getFlippedTiles(){
    flippedTiles = 0;
    for (tile of mainSpace.children){
        if (tile.classList.contains("flipBtn")){
            flippedTiles += 1;
        }
    }
    return flippedTiles;
}


// restart function
function restartBtnClicked(){
    mainSpace.replaceChildren();
    scoreSpace.replaceChildren();
    infoLabel.style.display = "none";
    playBtn.style.display = "block";
    restartBtn.style.display = "none";
    scoreSpace.style.display = "none";
    num_playerSelector.disabled = false;
}







