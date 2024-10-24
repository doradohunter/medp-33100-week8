const levels_url = "https://digimon-api.vercel.app/api/digimon/";

class Character {
  constructor(element, name, level, imagChar) {
    this.element = element;
    this.name = name;
    this.level = level;
    this.imagChar = imagChar;
  }

  displayCharacter() {
    const imagElement = document.createElement("img");
    imagElement.src = this.imagChar;
    imagElement.alt = this.name;
    imagElement.style.borderRadius = "10% 10% 10% 10%";
    imagElement.style.width = "75%";
    imagElement.style.border = "solid";

    const nameElement = document.createElement("p");
    nameElement.classList.add("digi_name");
    nameElement.innerText = "Name: " + this.name;
    nameElement.style.textShadow = "2px 2px #ffffff";

    const levelElement = document.createElement("p");
    levelElement.classList.add("digi_level");
    levelElement.innerText = "Level: " + this.level;
    levelElement.style.textShadow = "2px 2px #ffffff";

    this.element.appendChild(nameElement);
    this.element.appendChild(levelElement);
    this.element.appendChild(imagElement);

    console.log(this.element);
  }
}
async function getCharacterData() {
  const response = await fetch("https://digimon-api.vercel.app/api/digimon");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
  return [];
}

getCharacterData().then((data) => {
  const library = document.querySelector(".library");
  for (let i = 0; i < 209; i++) {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[data[i].level] || "#edccff";
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";

    const character = new Character(
      digiEl,
      data[i].name,
      data[i].level,
      data[i].img
    );
    character.displayCharacter();
    library.appendChild(digiEl);
  }
});

//function for colored levels 
const levelColors = {
    "Mega": "#D84315",
    "Ultimate": "#CE93D8",
    "Champion": "#F4A259",
    "Rookie": "#A9D2AA",
    "Training": "#F2DC76",
    "Fresh": "#B7BFC3",
    "In Training": "#90CAF9"
  };

//Get level when clicking on button
async function getLevelByButton(button) {
  const response = await fetch(levels_url + "level/" + button);
  const data = await response.json();
  return data;
  // console.log(data);
}

const rookieButton = document.querySelector(".rookie_btn");
rookieButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("rookie");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; //if it doesn't fit in any of the categories, change the color to a lavender
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const inTrainingButton = document.querySelector(".intraining_btn");
inTrainingButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("intraining");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const trainingButton = document.querySelector(".training_btn");
trainingButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("training");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const championButton = document.querySelector(".champion_btn");
championButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("champion");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const ultimateButton = document.querySelector(".ultimate_btn");
ultimateButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("ultimate");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const freshButton = document.querySelector(".fresh_btn");
freshButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("fresh");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const megaButton = document.querySelector(".mega_btn");
megaButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getLevelByButton("mega");
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});

const allButton = document.querySelector(".all_btn");
allButton.addEventListener("click", async () => {
  libraryElement.innerHTML = ""; //where it resets
  const levels = await getCharacterData();
  console.log(levels);
  levels.forEach((levelData) => {
    const digiEl = document.createElement("div");
    digiEl.classList.add("character");
    digiEl.style.backgroundColor = levelColors[levelData.level] || "#edccff"; 
    digiEl.style.textAlign = "center";
    digiEl.style.borderRadius = "10%";
    digiEl.style.height = "25em";
    digiEl.style.boxShadow = "10px 10px #262627";
    digiEl.style.border = "solid";
    const character = new Character(
      digiEl,
      levelData.name,
      levelData.level,
      levelData.img
    );
    character.displayCharacter(levelData);
    libraryElement.appendChild(digiEl);
  });
});


// const rookieButton = document.querySelector('.rookie_btn');
// rookieButton.addEventListener('click', async () => {
//     const levels = await getLevelByButton('rookie');
//     console.log(levels);
//     levels.forEach(level => {
//         const digiEl = document.createElement('div');
//         digiEl.classList.add('character');
//         const character = new Character(digiEl, data[i].name, data[i].level, data[i].img);
//         character.displayCharacter(level);
//         libraryElement.appendChild(digiEl);
//     })
// })

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
const libraryElement = document.querySelector(".library");
