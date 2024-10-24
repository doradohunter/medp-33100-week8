const apiUrl = "https://digimon-api.vercel.app/api/digimon";
let currentIndex = 0;
let digimonList = []; 

async function fetchAllDigimonNames() {
    try {
        const response = await fetch(apiUrl);
        const digimonData = await response.json();
        digimonList = digimonData.map(digimon => digimon.name);
        fetchDigimonByName(digimonList[currentIndex]);
    } catch (error) {
        console.error("Error fetching Digimon names:", error);
    }
}

async function fetchDigimonByName(name) {
    try {
        const response = await fetch(`${apiUrl}/name/${name}`);
        const digimonData = await response.json();
        if (digimonData && digimonData.length > 0) {
            displayDigimon(digimonData[0]);
        } else {
            console.error("Digimon not found");
        }
    } catch (error) {
        console.error("Error fetching Digimon data:", error);
    }
}

function displayDigimon(digimon) {
    document.getElementById("name").innerText = digimon.name;
    document.getElementById("level").innerText = digimon.level;
    document.getElementById("image").src = digimon.img;
}

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < digimonList.length - 1) {
        currentIndex++;
        fetchDigimonByName(digimonList[currentIndex]);
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        fetchDigimonByName(digimonList[currentIndex]);
    }
});

fetchAllDigimonNames();
