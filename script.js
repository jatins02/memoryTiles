// constant declaration
const mainSpace = document.getElementById("mainSpace");
const num_playerSelector = document.getElementById("num_playerSelector");
const scoreSpace = document.getElementById("scoreSpace");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const infoLabel = document.getElementById("infoLabel");

// constants that can be changed...
const rowCount = 7;
const columnCount = 8;

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

function mainGame(event, flippedTiles){
    if (event.target.id != "mainSpace"){
        if (flippedTiles === 0){
            event.target.classList.add("flipBtn");
        }
        else if (flippedTiles === 1){
            event.target.classList.add("flipBtn");
            compareTiles(mainSpace.children);
            setTimeout(unflipTiles, 1222);
        }
    }   
}

// utility functions
function makeTiles(){
    for (let i = 0; i < (rowCount * columnCount); i++){
        const button = document.createElement("button");
        button.type = "button";
        button.className = "mainBtn";
        button.id = `btn${i+1}`;
        mainSpace.appendChild(button);
    }
    let viewportWidth = window.innerWidth;
    mainSpace.style.display = "grid";
    let sideLength = viewportWidth / columnCount;
    mainSpace.style.gridTemplateRows = `repeat(${rowCount}, ${sideLength}px)`;
    mainSpace.style.gridTemplateColumns = `repeat(${columnCount}, ${sideLength}px)`;
}

function fillUpTiles(){
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let selectedChars = [];
    let randInd;
    let randChar;

    while (selectedChars.length < (rowCount * columnCount)){
        randInd = Math.floor(Math.random() * allowedChars.length);
        let randChar = allowedChars[randInd];
        selectedChars.push(randChar);
        selectedChars.push(randChar);
    }

    for (tile of mainSpace.children){
        randInd = Math.floor(Math.random() * selectedChars.length);
        randChar = selectedChars.splice(randInd, 1);
        tile.textContent = randChar;
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
        checkGameEnded();
    }
    else{
        changeTurn(numPlayers);
    }
}

function disableTiles(array){
    array.forEach(child => {
        child.disabled = true;
        child.textContent = "!";
        child.classList.add("disableTile");
    });
}

function changeTurn(numPlayers){
    currentTurn = (currentTurn === numPlayers) ? 1 : currentTurn + 1;
    infoLabel.textContent = `Player ${currentTurn}'s turn`;
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

function checkGameEnded(){
    tempCollection = mainSpace.children;
    numChildren = tempCollection.length;
    let counter = 0;

    for (element of tempCollection){
        if (element.classList.contains("disableTile")){
            counter += 1;
        }
    }

    if (counter === numChildren){
        gameEnded();
    }
}

function gameEnded(){
    let highestScorer;
    let maxScore = 0;
    let indx = 0;
    for (score of playerScores){
        if (score >= maxScore){
            maxScore = score;
            highestScorer = indx + 1;
        }
        indx+=1;
    }
    infoLabel.textContent = `Player ${highestScorer} has won.`;
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







