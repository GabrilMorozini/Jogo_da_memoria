// CLASSES DE ESTILIZAÇÃO
const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

//CONTROLE DE PONTUAÇÃO DO JOGO
const scored = document.getElementById("scored");
let score = 0;
const bestScore = document.getElementById("bestScore")
let maxScore = "-";

if(localStorage.getItem('bestScore')){
    maxScore = localStorage.getItem('bestScore');
}

bestScore.innerText = maxScore;

function setScore(){    
    if(maxScore > score || !localStorage.getItem('bestScore')){
        localStorage.setItem("bestScore", score);
        bestScore.innerText = score;    
        maxScore = score;    
    }
    score = 0;
    scored.innerText = "-";
}

// INICIO DO JOGO
startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

// DIV QUE CONTÉM AS CARTAS
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";

    //CRIAR CARTAS 
    game.cards.forEach((card) => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

//CRIAR FRONT E BACK DAS CARTAS
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

//CRIAR FACE DA CARTA 
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if (face == FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/img/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}


// VERIFICA SE CARTA FOI CLICADA/DESVIRA CARTA 
function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");

        if (game.secondCard) {
            score++;
            scored.innerText = score;
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = "flex";
                    setScore()
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();

                }, 1000);
            }
        }
    }
}

//REINICIA JOGO
const button = document.getElementById("restart");
button.addEventListener("click", restart);
function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}