class Character{
    constructor(element, name, house, wizard, imgURL){
        this.element = element;
        this.name = name;
        this.house = house;
        this.wizard = wizard;
        this.imgURL = imgURL;
    }

    createCharacter(){
        this.innerHTML = '';

        const imgElement = document.createElement('img');
        imgElement.src = this.imgURL;
        imgElement.alt = this.name;
        imgElement.style.width = '150px';
        imgElement.style.height = 'auto';
        imgElement.style.marginRight = '20px';

        const text = document.createElement('div');

        const nameElement = document.createElement('p');
        nameElement.classList.add('character_name');
        nameElement.innerHTML = 'Name: '+ this.name;

        const houseElement = document.createElement('p');
        houseElement.classList.add('character_house');
        houseElement.innerText = 'House: ' + this.house;

        const wizardElement = document.createElement('p');
        wizardElement.classList.add('character_wizard');
        wizardElement.innerText = 'Is A Wizard: '+ this.wizard;

        text.appendChild(nameElement);
        text.appendChild(houseElement);
        text.appendChild(wizardElement);

        this.element.appendChild(imgElement);
        this.element.appendChild(text);
    }
}

async function fetchCharacterData(){
    const response = await fetch('https://hp-api.herokuapp.com/api/characters');
    if (response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
    return [];
}

fetchCharacterData()
    .then((data) =>{
        const characters = document.querySelector('.characters');

        for(let i = 0; i < data.length; i++){
            const characterEl = document.createElement('div');
            characterEl.classList.add('character');
            const character = new Character(characterEl, data[i].name, data[i].house, data[i].wizard, data[i].image);
            character.createCharacter();
            characters.appendChild(characterEl);
        }
    })