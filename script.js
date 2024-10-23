const api_url = 'https://genshin.jmp.blue/';
const collection = document.querySelector('.collection');
const nations = document.querySelector('.nations');
let idealText;
let runOnce = false;

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

function nationText(){
    const heading = document.createElement('h2');
    heading.innerText = 'Nations'
    const text = document.createElement('p');
    text.innerText = 'Click on the archon\'s name to scroll to their profile. But warning! Spoilers for some of their identities!';
    nations.appendChild(heading);
    nations.appendChild(text);
}

const natButton = document.querySelector('#nationButton');

natButton.addEventListener('click', async () => {
    if (!runOnce) {
        nationText();
        getNations()
            .then((data)=>{
                data.forEach(nation=>{
                    showNations(nation);
                })
            });
        runOnce = true;
    } else {
        console.log('Nations already added!');
    }
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
        const archonLink = document.createElement('a');
        archonLink.textContent = this.archon;
        switch (this.archon) {
            case 'Baal':
                archonLink.href = "#raiden"
                idealText = 'Eternity'
                break;
            case 'Focalors':
                archonLink.href = '#furina'
                idealText = 'Justice'
                break;
            case 'Lesser Lord Kusanali':
                archonLink.href = "#nahida"
                idealText = 'Wisdom'
                break;
            case 'Morax':
                archonLink.href = "#zhongli"
                idealText = 'Contracts'
                break;
            case 'Barbatos':
                archonLink.href = "#venti"
                idealText = 'Freedom'
                break;
            default:
                break;
        }
        archonElement.classList.add('archon');
        archonElement.innerHTML = 'Archon: ';

        const idealElement = document.createElement('p');
        
        idealElement.innerText = 'Ideal: ' + idealText;

        const controlElement = document.createElement('p');
        controlElement.classList.add('control');
        controlElement.innerText = 'Controlling Entity: ' + this.control;

        this.element.appendChild(iconElement);
        this.element.appendChild(nameElement);
        this.element.appendChild(eleElement);
        this.element.appendChild(archonElement);
        this.element.appendChild(archonLink);
        this.element.appendChild(idealElement);
        this.element.appendChild(controlElement);
    }
}

/*Class for Character*/
class Character {
    constructor(element, id, name, rarity, vision, weapon, nation) {
        this.element = element;
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.vision = vision;
        this.weapon = weapon;
        this.nation = nation;

        this.element.classList.add('box', this.vision);
        this.element.id = this.id;

    }

    showCharacter() {
        this.element.innerHTML = '';

        const iconElement = document.createElement('img');
        const id = this.id.toLowerCase();
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