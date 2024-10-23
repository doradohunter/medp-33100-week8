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
    constructor(element, value, suit, image) {
        this.element = element; //creates the overall element
        this.value = value; //creates the name 
        this.suit = suit;
        this.image = image; //creates gpa

        this.element.classList.add('placedCard');
        // console.log(this);
    }

    displayID() {
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

let deckID = '';

async function createDeck() {
    contentElement.innerHTML = ''; //resets inner html every time
    const newResponse = await fetch(API_URL); //creates call
    const newData = await newResponse.json(); //creates object that stores call
    deckID = await newData.deck_id; //creates an object with the deck id
    const deckURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=5" //creates a url with new deck id
    console.log(deckURL);

    const otherResponse = await fetch(deckURL); //fetches 3 cards from this deck
    const newSet = await otherResponse.json(); //creates js object of the three cards

    const cardArray = newSet.cards; //short name
    buildCards(cardArray);

    return deckURL;
}

async function drawCard() {
    contentElement.innerHTML = ''; //resets inner html every time
    const newUrl = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=5';
    const newResponse = await fetch(newUrl); //creates call
    const newData = await newResponse.json();
    const cardArray = newData.cards;
    buildCards(cardArray);

    if (newData.remaining === 0) {
        reshuffle(); //I needed chatGPT to understand how to build this function
    }
    //     const cardArray = newSet.cards; //short name
    //     for (let i = 0; i < cardArray.length; i++){ //goes through every card in the array
    //     const idEl = document.createElement('div');
    //     contentElement.appendChild(idEl);
    //     const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
    //     newCard.displayID();
    // }
    //     return newData;
}
function buildCards(cardArray) {
    for (let i = 0; i < cardArray.length; i++) { //goes through every card in the array
        const idEl = document.createElement('div');
        contentElement.appendChild(idEl);
        const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
        newCard.displayID();
    }
}

async function reshuffle() {
    const newUrl = 'https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/';
    const newResponse = await fetch(newUrl); //creates call
    const newData = await newResponse.json();
    console.log(newData); //just so it has somewhere to go
}


// async function reDraw() {
//     // const newResponse = await fetch(deckURL); //creates call
//     // console.log(deckURL)
//     // const newData = await newResponse.json();
//     // console.log(newData);

//     // const cardArray = newData.cards; //short name
//     //     for (let i = 0; i < cardArray.length; i++){ //goes through every card in the array
//     //     const idEl = document.createElement('div');
//     //     contentElement.appendChild(idEl);
//     //     const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
//     //     newCard.displayID();
//     // }



//     // for (let i = 0; i < cardArray.length; i++){
//     //     const idEl = document.createElement('div');
//     //     contentElement.appendChild(idEl);
//     //     const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
//     //     newCard.displayID();
//     // }

//     // if(newData.remaining == 0){
//     //     const resetDeck = await fetch("https://deckofcardsapi.com/api/deck/m08ljrwjejmm/return/"); 
//     //     const resetResponse = await resetDeck.json();
//     //     console.log(resetResponse);

//     //     const reDraw = await fetch("https://deckofcardsapi.com/api/deck/m08ljrwjejmm/draw/?count=1");
//     //     const newResponse = await reDraw.json();

//     //     for (let i = 0; i < newResponse.length; i++){
//     //         const idEl = document.createElement('div');
//     //         contentElement.appendChild(idEl);
//     //         const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
//     //         newCard.displayID();
//     //     }
//     // }
// }

const drawbutton = document.querySelector('#drawButton')

//These are asynchronous eventListeners now
const reDrawButton = document.querySelector('#reDraw')
drawbutton.addEventListener('click', async () => {
    await createDeck(); 
});

reDrawButton.addEventListener('click', async () => {
    await drawCard();
});


//For transparency, this is the entire conversation that I had with chatGPT
//https://chatgpt.com/share/67197eb0-891c-8013-b5fd-15d88b5d3307
//I got frustrated because I could not progress any further until I could redraw using the same deck ID

// Things chatGTP helped me with:
//The biggest help I received from chatGPT was that it told me that I needed to declare the URL as a global variable
//It helped me turn my eventListeners into asynchronous functions so that the click would work.

//BELOW IS CHATGPT"S VERSION. I DID NOT STEAL THE SOLUTIONS, BUT I LOOKED AT IT TO UNDERSTAND BETTER WHAT WAS WRONG WITH MY CODE


// // Function to draw 5 cards using the existing deckID, reshuffle if needed
// async function drawCard() {
//     if (!deckID) {
//         console.error("No deck available. Please create a deck first.");
//         return;
//     }

//     const drawURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`; // Draw 5 cards from the existing deck
//     const newResponse = await fetch(drawURL);
//     const newData = await newResponse.json();

//     // If there are no more cards in the deck, reshuffle
//     if (newData.remaining === 0) {
//         console.log("No more cards left. Reshuffling the deck...");
//         await reshuffleDeck();
//     }

//     const cardArray = newData.cards; // Array of drawn cards

//     // Display the newly drawn cards
//     cardArray.forEach(card => {
//         const idEl = document.createElement('div');
//         contentElement.appendChild(idEl);
//         const newCard = new Card(idEl, card.value, card.suit, card.image);
//         newCard.displayID();
//     });
// }

// // Function to reshuffle the existing deck
// async function reshuffleDeck() {
//     const reshuffleURL = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`;
//     const reshuffleResponse = await fetch(reshuffleURL);
//     const reshuffleData = await reshuffleResponse.json();
//     console.log("Deck reshuffled:", reshuffleData);
// }

// // Event listeners for buttons
// const drawbutton = document.querySelector('#drawButton');
// const reDrawButton = document.querySelector('#reDraw');

// // When clicking the draw button, shuffle a new deck and draw cards
// drawbutton.addEventListener('click', async () => {
//     await createDeck();
// });

// // When clicking redraw, draw more cards from the same deck
// reDrawButton.addEventListener('click', async () => {
//     await drawCard();
// });