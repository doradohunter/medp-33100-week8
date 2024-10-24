const caughtPokemon = [];

async function getRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    document.getElementById("currentPokemon").classList.add("loading");

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const pokemon = await response.json();

    document.getElementById("pokemonName").textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById("pokemonImage").src =
      pokemon.sprites.other["official-artwork"].front_default;

    const statsDiv = document.getElementById("pokemonStats");
    statsDiv.innerHTML = pokemon.stats
      .slice(0, 3)
      .map(
        (stat) => `
                <div class="stat">
                    ${stat.stat.name}: ${stat.base_stat}
                </div>
            `
      )
      .join("");

    document.getElementById("currentPokemon").classList.remove("loading");
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    document.getElementById("pokemonName").textContent =
      "Error loading Pokémon";
  }
}

async function catchPokemon() {
  const pokemonName = document.getElementById("pokemonName").textContent;
  const pokemonImage = document.getElementById("pokemonImage").src;

  caughtPokemon.push({
    name: pokemonName,
    image: pokemonImage,
  });

  updateCaughtGrid();

  await getRandomPokemon();
}

async function skipPokemon() {
  await getRandomPokemon();
}

function updateCaughtGrid() {
  const caughtGrid = document.getElementById("caughtGrid");
  caughtGrid.innerHTML = caughtPokemon
    .map(
      (pokemon) => `
        <div class="caught-card">
            <img class="caught-image" src="${pokemon.image}" alt="${pokemon.name}">
            <h4 class="caught-name">${pokemon.name}</h4>
        </div>
    `
    )
    .join("");
}

getRandomPokemon();
