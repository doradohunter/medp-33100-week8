// const API_URL = 'https://bible-api.com/?random=verse';
const API_URL = 'https://bible-api.com/'; //Book + Chapter : Verse

// URL Encoding Functions
// encodeURLComponent ie. #

async function getRandomBible(){
    try{
        const response = await fetch(API_URL + '?random=verse');
        if (!response.ok){  //All of the fetches (API calls) should have a catch
            throw new Error('Something wrong with getting the Bible' + error);
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Something wrong with getting the Bible', error);
    }
}

async function getBible(verse){
    try{
        const response = await fetch(API_URL + 'john ' + verse);
        if (!response.ok){  //All of the fetches (API calls) should have a catch
            throw new Error('Something wrong with getting the Bible' + error);
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Something wrong with getting the Bible', error);
    }
}

const prayButton = document.querySelector('.prayButton');
const userSection = document.querySelector('.userInfo');
const holySection = document.querySelector('.holyInfo');
const verse = document.querySelector('.verse');
const text = document.querySelector('.text');
const dailyText = document.querySelector('.dailyText');

let userVerse = "";

holySection.style.display = 'none';

function buttonClick(){
    if (holySection.style.display == 'none'){
        userSection.style.display = 'none';
        holySection.style.display = 'flex';
        prayButton.innerHTML = '✞ Try Another Name ✞';
    }else{
        userSection.style.display = 'flex';
        holySection.style.display = 'none';
        prayButton.innerHTML = '✞ Amen ✞';
    }
}


function holyCalc(){
    let input = document.querySelectorAll('.user input');
    let name = '';
    let year = '';
    for (let [index, inputElement] of input.entries()) {
        if (index == 0){
        name = inputElement.value;
        }else{
        year = inputElement.value;
        }
    }
    holyVerse(name,year)
}

function holyVerse(name, year){
    let chpt = name.length;
    let vrs = 1
    if(chpt >= 12){
        chpt = name.length/2
    }
    if(year%2 == 0){
        vrs = chpt*2
    }else{
        vrs = chpt+2
    }
    userVerse = `${chpt}:${vrs}`
}

async function renderHoliness(){
    const bibleText = await getBible(userVerse)

    verse.innerText = bibleText["verses"][0]["book_name"] + ' ' + bibleText["verses"][0]["chapter"] + ':' + bibleText["verses"][0]["verse"];
    text.innerText = bibleText["verses"][0]["text"];    
}

prayButton.addEventListener('click', async () => {
    buttonClick();
    await renderHoliness();
});

async function randomHoliness(){
    const bibleRandom = await getRandomBible()

    dailyText.innerText = bibleRandom["verses"][0]["text"];    
}
randomHoliness()