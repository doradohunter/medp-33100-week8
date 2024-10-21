const api_url = 'https://genshin.jmp.blue/';
const collection = document.querySelector('.collection');
const nations = document.querySelector('.nations');

async function getAllCharacters() {
    const response = await fetch(api_url + 'characters/all');
    const data = await response.json();
    return data;
}

async function getNations() {
    const response = await fetch(api_url + 'nations/all')
    const data = await response.json();
    return data;
}

getAllCharacters()
    .then((data)=>{
        data.forEach(chara => {
            showAllCharacters(chara);
        });
    })

function showAllCharacters(chara){
    const element = document.createElement('div');
    collection.appendChild(element);
    const character = new Character(element, chara.id, chara.name, chara.rarity, chara.vision, chara.weapon, chara.nation);
    character.showCharacter();
}

function showNations(nat){
    const element = document.createElement('div');
    nations.appendChild(element);
    const nation = new Nation (element, nat.id, nat.name, nat.element, nat.archon, nat.controllingEntity)
    nation.showNation();
}

const natButton = document.querySelector('#nationButton');

natButton.addEventListener('click', async () => {
    getNations()
        .then((data)=>{
            data.forEach(nation=>{
                showNations(nation);
            })
        })
})

class Nation {
    constructor(element, id, name, ele, archon, control){
        this.element = element;
        this.id = id;
        this.name = name;
        this.ele = ele;
        this.archon = archon;
        this.control = control;

        this.element.classList.add('box', this.ele);
    }

    showNation(){
        this.element.innerHTML = '';

        const iconElement = document.createElement('img');
        iconElement.classList.add('icon');
        iconElement.src = api_url + 'nations/' + this.id + '/icon';

        const nameElement = document.createElement('p');
        nameElement.classList.add('name');
        nameElement.innerText = this.name;

        const eleElement = document.createElement('p');
        eleElement.classList.add('ele');
        eleElement.innerText = 'Element: ' + this.ele;

        const archonElement = document.createElement('p');
        archonElement.classList.add('archon');
        archonElement.innerText = 'Archon: ' + this.archon;

        const controlElement = document.createElement('p');
        controlElement.classList.add('control');
        controlElement.innerText = 'Control­ling En­ti­ty: ' + this.control;

        this.element.appendChild(iconElement);
        this.element.appendChild(nameElement);
        this.element.appendChild(eleElement);
        this.element.appendChild(archonElement);
        this.element.appendChild(controlElement);
    }
}

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

        this.element.classList.add('box', this.vision);

    }

    showCharacter() {
        this.element.innerHTML = '';

        const iconElement = document.createElement('img');
        const id = this.icon.toLowerCase();
        iconElement.classList.add('icon');
        iconElement.src = api_url + 'characters/' + id + '/icon-big';

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