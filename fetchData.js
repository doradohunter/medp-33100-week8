class Character{
    constructor(element, name, house, wizard, imgURL){
        this.element = element;
        this.name = name;
        this.house = house;
        this.wizard = wizard;
        this.imgURL = imgURL;
    }

    setBackgroundColor() {
        const houseColors = {
            Gryffindor: '#740001',
            Hufflepuff: '#a69016',
            Ravenclaw: '#0E1A40',
            Slytherin: '#1A472A',
            default: '#424240'
        };

        this.element.style.backgroundColor = houseColors[this.house] || houseColors.default;
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
        this.setBackgroundColor();
    }
}

//filter characters by house
async function fetchCharacterData(house = ''){
    const response = await fetch('https://hp-api.herokuapp.com/api/characters');
    if (!response.ok){
        throw new Error('Failed to fetch characters');
    }
    const data = await response.json();

    if(house){
        return data.filter(character => character.house === house);
    }
    return data;
}

//event listener
const houseButtons = document.querySelectorAll('.filter');
const charactersContainer = document.querySelector('.characters');

function clearCharacters(){
    const charactersContainer = document.querySelector('.characters');
    charactersContainer.innerHTML = '';
}

houseButtons.forEach(button =>{
    button.addEventListener('click', async () =>{
        let house = '';
        if(!button.classList.contains('all')){
            //access the second class of the button
            house = button.classList[1];
        }

        clearCharacters();

        try{
            const chars = await fetchCharacterData(house);
            chars.forEach(data =>{
                const characterEl = document.createElement('div');
                characterEl.classList.add('character');

                const character = new Character(characterEl, data.name, data.house, data.wizard, data.image);
                character.createCharacter();
                charactersContainer.appendChild(characterEl);
            })
        }catch(error){
            console.error(error);
        }
    })
})


fetchCharacterData()
    .then(data =>{
        data.forEach(data =>{
            const characterEl = document.createElement('div');
            characterEl.classList.add('character');

            const character = new Character(characterEl, data.name, data.house || 'None', data.wizard, data.image);
            character.createCharacter();
            charactersContainer.appendChild(characterEl);
        });
    })
    .catch(error => console.error(error));



