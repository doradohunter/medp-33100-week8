class Digimon {
    constructor(element, name, img, level) {
        this.element = element;
        this.name = name;
        this.img = img;
        this.level = level;
        let setLevel = level.toLowerCase();
        if (setLevel != 'in training') {
            this.element.setAttribute('class', `digimon ${setLevel}`)
        } else {
            this.element.setAttribute('class', 'digimon fresh')
        }
    }

    renderElement() {
        this.element.innerHTML = '';

        const nameElement = document.createElement('p');
        nameElement.classList.add('digimon_name');
        nameElement.innerText = this.name;

        const imgElement = document.createElement('img');
        imgElement.src = this.img

        const levelElement = document.createElement('p');
        levelElement.classList.add('level');
        levelElement.innerText = 'Level: ' + this.level;

        this.element.appendChild(nameElement);
        this.element.appendChild(imgElement);
        this.element.appendChild(levelElement);
    }
}

async function fetchData() {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    if (response.ok) {
        const data = await response.json();
        return data
    }
    return [];
}

fetchData()
    .then((data) => {
        const holder = document.querySelector('.holder');
        holder.innerHTML = '  ';
        for (let i = 0; i < data.length; i++) {
            const digimonEl = document.createElement('div');
            const digimonElement = new Digimon(digimonEl, data[i].name, data[i].img, data[i].level);
            digimonElement.renderElement();
            holder.appendChild(digimonEl);
        }
    })

async function PassName(name) {
    let setname = name.toLowerCase();
    const response = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${setname}`);
    if (response.ok) {
        const data = await response.json();
        return data
    }
    return [];
}

document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); //default behavior isn't compatible
    const name = document.getElementById('diginame').value;
    const holder = document.querySelector('.holder');
    holder.innerHTML = ' ';
    //on click it gets values and passes to function like default api request
    PassName(name)
        .then((data) => {
            if (data.length > 0) { //checks for valid response
                const digimonEl = document.createElement('div');
                const digimonData = data[0]; //only 1 value 
                const digimonElement = new Digimon(digimonEl, digimonData.name, digimonData.img, digimonData.level);
                digimonElement.renderElement();
                holder.appendChild(digimonEl);
            } else {
                holder.innerHTML = 'Invalid Response.';
            }
        });
});

async function PassLevel(level) {
    let setlevel = level.toLowerCase();
    const response = await fetch(`https://digimon-api.vercel.app/api/digimon/level/${setlevel}`);
    if (response.ok) {
        const data = await response.json();
        return data
    }
    return [];
}

document.getElementById('levelForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const level = document.getElementById('digilevel').value;
    const holder = document.querySelector('.holder');
    holder.innerHTML = ' ';
    PassLevel(level)
        .then((data) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const digimonEl = document.createElement('div');
                    const digimonElement = new Digimon(digimonEl, data[i].name, data[i].img, data[i].level);
                    digimonElement.renderElement();
                    holder.appendChild(digimonEl);
                }
            } else {
                holder.innerHTML = 'Invalid Response.';
            }
        });
});
