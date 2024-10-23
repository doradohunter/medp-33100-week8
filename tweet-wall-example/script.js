const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const container = document.querySelector('.container');

const DrawCards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=10';
const contentElement = document.querySelector('.content');

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

async function drawCards() {
    const newResponse = await fetch(DrawCards);
    const newData = await newResponse.json();
    const cardArray = newData.cards; //shorter, more descriptive
    console.log(newData);

    // for (let i = 0; i < cardArray.length; i++){
    //     console.log(cardArray[i].value)
    //     console.log(cardArray[i].suit)
    //     console.log(cardArray[i].image)
    // }


    for (let i = 0; i < cardArray.length; i++){
        const idEl = document.createElement('div');
        contentElement.appendChild(idEl);
        const newCard = new Card(idEl, cardArray[i].value, cardArray[i].suit, cardArray[i].image)
        newCard.displayID();
    }
    return newData;
}

drawCards();




// drawCards();

// const API_URL = 'https://fake-twitter-api.glitch.me/';
// const container = document.querySelector('.container');

// function randomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Part 1: Get tweets using the endpoint /tweets from the API and display them on the screen
// async function getTweets() {
//     const response = await fetch(`${API_URL}/tweets`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch tweets');
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
// }

// async function getUser(id) {
//     const response = await fetch(`${API_URL}/users/${id}`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch user');
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
// }

// async function renderTweet(tweet) {
//     const tweetEl = document.createElement('div');
//     tweetEl.classList.add('post-it');

//     const tweetContentEl = document.createElement('p');
//     tweetContentEl.innerHTML = tweet.content;
//     tweetEl.appendChild(tweetContentEl);

//     const user = await getUser(tweet.userId);
//     const tweetAuthorEl = document.createElement('p');
//     tweetAuthorEl.innerHTML = `@${user.username}`;
//     tweetEl.appendChild(tweetAuthorEl);

//     const deleteButton = document.createElement('button');
//     deleteButton.innerHTML = 'Delete';
//     deleteButton.addEventListener('click', async () => {
//         await deleteTweet(tweet.id);
//         const tweets = await getTweets();
//         displayTweets(tweets);
//     });
//     tweetEl.appendChild(deleteButton);

//     tweetEl.style.left = randomInt(0, window.innerWidth - 200) + 'px';
//     tweetEl.style.top = randomInt(0, window.innerHeight - 200) + 'px';

//     container.appendChild(tweetEl);
// }

// async function displayTweets(tweets) {
//     container.innerHTML = '';
//     tweets.forEach((tweet) => {
//         renderTweet(tweet);
//     });
// }

// // Part 2: Get tweets that only have a specific hashtag using &q=
// const hashtagButtons = document.querySelectorAll('.hashtag-button');
// hashtagButtons.forEach(button => {
//     button.addEventListener('click', async () => {
//         const hashtag = button.innerText;
//         const tweets = await getTweetsByHashtag(hashtag);
//         displayTweets(tweets);
//     });
// });

// async function getTweetsByHashtag(hashtag) {
//     const url = `${API_URL}/tweets?q=${encodeURIComponent(hashtag)}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

// // Part 3: Update the GET calls to handle when errors occur from the server.
// getTweets()
//     .then(displayTweets)
//     .catch((error) => {
//         console.error('Error fetching tweets:', error);
//     });

// // Part 4: Add an input and a button that creates a new tweet
// const createTweetButton = document.querySelector('.create-tweet-button');
// const tweetInput = document.querySelector('.tweet-input');

// createTweetButton.addEventListener('click', async () => {
//     const content = tweetInput.value;
//     if (content) {
//         const tweet = await createTweet(1, content, new Date().toISOString());
//     }
//     getTweets()
//         .then(displayTweets)
//         .catch((error) => {
//             console.error('Error fetching tweets:', error);
//         });
// });

// async function createTweet(userId, content, createdAt) {
//     const response = await fetch(`${API_URL}/tweets`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             userId,
//             content,
//             createdAt
//         })
//     });
//     if (!response.ok) {
//         throw new Error('Failed to create tweet');
//     }
//     const data = await response.json();
//     return data;
// }

// // Part 5: Add a button to each post-it note that allows you to delete them
// async function deleteTweet(tweetId) {
//     const response = await fetch(`${API_URL}/tweets/${tweetId}`, {
//         method: 'DELETE'
//     });
//     if (!response.ok) {
//         throw new Error('Failed to delete tweet');
//     }
// }
