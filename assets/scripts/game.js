let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,


    techs: ["bootstrap", "css", "electron", "firebase", "html", "javascript", "jquery", "mongo", "node", "react"],

    //VERIFICA AS CARTAS SELECIONADAS 
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    //VERIFICA SE AS CARTAS SELECIONADAS SÃO IGUAIS 
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    //RESET DAS CARTAS SELECIONADAS
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    //RESET DE CARTAS DIFERENTES 
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    //VERIFICA FIM DE JOGO 
    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    cards: null,

    // CRIAR DADOS DAS CARTAS 
    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    //CRIAR PARES DAS CARTAS
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    //CRIAR IDS DAS CARTAS
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    //EMBARALHAR CARTAS
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}