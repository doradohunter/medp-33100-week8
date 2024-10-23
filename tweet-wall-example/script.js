const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const container = document.querySelector('.container');

const DrawCards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=10';
const contentElement = document.querySelector('.content');

const URL = 'https://deckofcardsapi.com/api/deck/';


// async function getCards() {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     console.log(data);
//     const deckID = data.deck_id;
//     return deckID;
// }

// const deckID = getCards();
class Card {
    constructor(element, value, suit, image){
        this.element = element; //creates the overall element
        this.value = value; //creates the name 
        this.suit = suit;
        this.image = image; //creates gpa

        this.element.classList.add('placedCard');
        // console.log(this);
    }

    displayID (){
        this.element.innerHTML = "";

        const imageElement = document.createElement('img');
        imageElement.classList.add('image');
        imageElement.src = this.image;
        imageElement.alt = 'image of the playing card';

        const valueElement = document.createElement('p');
        valueElement.classList.add('value');
        valueElement.innerText = this.value + " of " + this.suit;

        this.element.appendChild(imageElement);
        this.element.appendChild(valueElement);
    }
}


async function createDeck(){
    contentElement.innerHTML = '';
    const newResponse = await fetch(API_URL); //creates call
    const newData = await newResponse.json(); //creates object that stores call
    const deckID = newData.deck_id; //creates an object with the deck id
    const deckURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=5" //creates a url with new deck id
   
    const otherResponse = await fetch(deckURL); //fetches 3 cards from this deck
    const newSet = await otherResponse.json(); //creates js object of the three cards
    console.log(deckURL);
    console.log(newSet); //logs in console
   
    const cardArray = newSet.cards; //short name
        for (let i = 0; i < cardArray.length; i++){ //goes through every card in the array
        const idEl = document.createElement('div');
        contentElement.appendChild(idEl);
        const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
        newCard.displayID();
    }

    return deckURL;
}

const deckURL = createDeck();
console.log(deckURL)

async function reDraw() {
    const newResponse = await fetch(deckURL); //creates call
    console.log(deckURL)
    const newData = await newResponse.json();
    console.log(newData);

    const cardArray = newData.cards; //short name
        for (let i = 0; i < cardArray.length; i++){ //goes through every card in the array
        const idEl = document.createElement('div');
        contentElement.appendChild(idEl);
        const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
        newCard.displayID();
    }



    // for (let i = 0; i < cardArray.length; i++){
    //     const idEl = document.createElement('div');
    //     contentElement.appendChild(idEl);
    //     const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
    //     newCard.displayID();
    // }

    // if(newData.remaining == 0){
    //     const resetDeck = await fetch("https://deckofcardsapi.com/api/deck/m08ljrwjejmm/return/"); 
    //     const resetResponse = await resetDeck.json();
    //     console.log(resetResponse);

    //     const reDraw = await fetch("https://deckofcardsapi.com/api/deck/m08ljrwjejmm/draw/?count=1");
    //     const newResponse = await reDraw.json();

    //     for (let i = 0; i < newResponse.length; i++){
    //         const idEl = document.createElement('div');
    //         contentElement.appendChild(idEl);
    //         const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
    //         newCard.displayID();
    //     }
    // }
}
const drawbutton = document.querySelector('drawButton')
const reDrawButton = document.querySelector('reDraw')
reDraw();
drawButton.addEventListener('click', () => {
    createDeck();
});

reDrawButton.addEventListener('click', () => {
    reDraw();
});

// replaceCard.addEventListener('click',() => {

// })


// "https://deckofcardsapi.com/api/deck/m08ljrwjejmm/draw/?count=1"