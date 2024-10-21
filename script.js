// /*fetch data from json file*/
// function getData() {
//     fetch('characters.json')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             const collection = document.querySelector('.collection');
//             for (let i = 0; i < data.length; i++) {
//                 const element = document.createElement('div');
//                 collection.appendChild(element);
//                 const character = new Character(element, data[i].icon, data[i].name, data[i].rarity, data[i].vision, data[i].weapon, data[i].nation);
//                 character.showCharacter();
//             }
//         })
// }
const api_url = 'https://genshin.jmp.blue/characters'
async function getAllCharacters() {
    const response = await fetch(api_url + '/all');
    const data = await response.json();
    const collection = document.querySelector('.collection');
    for (let i = 0; i < data.length; i++) {
        const element = document.createElement('div');
        collection.appendChild(element);
        const character = new Character(element, data[i].id, data[i].name, data[i].rarity, data[i].vision, data[i].weapon, data[i].nation);
        console.log(data[i].id)
        character.showCharacter();
    }
    return data;
}

getAllCharacters();


/*Class for Character*/
class Character {
    constructor(element, icon, name, rarity, vision, weapon, nation) {
        this.element = element;
        this.icon = icon;
        this.name = name;
        this.rarity = rarity;
        this.vision = vision;
        this.weapon = weapon;
        this.nation = nation;

        this.element.classList.add('character', this.vision);

    }

    showCharacter() {
        this.element.innerHTML = '';

        const iconElement = document.createElement('img');
        const id = this.icon.toLowerCase();
        iconElement.classList.add('icon');
        iconElement.src = api_url + '/' + id + '/icon-big';

        const nameElement = document.createElement('p');
        nameElement.classList.add('name');
        nameElement.innerText = this.name;

        const rareElement = document.createElement('p');
        rareElement.classList.add('rarity');
        switch (this.rarity) {
            case 5:
                rareElement.innerText = 'Rarity: ★★★★★';
                break;
            case 4:
                rareElement.innerText = 'Rarity: ★★★★';
                break;
            default:
                break;
        }
        //rareElement.innerText = 'Rarity: ' + this.rarity;

        const visionElement = document.createElement('p');
        visionElement.classList.add('vision');
        if (this.name == 'Neuvillette' || this.name == 'Traveler (Lumine/Aether)') {
            visionElement.innerText = 'Element: ' + this.vision;
        } else {
            visionElement.innerText = 'Vision: ' + this.vision;
        }

        const weaponElement = document.createElement('p');
        weaponElement.classList.add('weapon');
        weaponElement.innerText = 'Weapon: ' + this.weapon;

        const nationElement = document.createElement('p');
        nationElement.classList.add('nation');
        nationElement.innerText = 'Nation: ' + this.nation;

        this.element.appendChild(iconElement);
        this.element.appendChild(nameElement);
        this.element.appendChild(rareElement);
        this.element.appendChild(visionElement);
        this.element.appendChild(weaponElement);
        this.element.appendChild(nationElement);
    };
};

