const starterPokemonUrls = [
    { url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
    { url: 'https://pokeapi.co/api/v2/pokemon/charmander' },
    { url: 'https://pokeapi.co/api/v2/pokemon/squirtle' },
    { url: 'https://pokeapi.co/api/v2/pokemon/torchic' },
    { url: 'https://pokeapi.co/api/v2/pokemon/treecko' },
    { url: 'https://pokeapi.co/api/v2/pokemon/piplup' },
    { url: 'https://pokeapi.co/api/v2/pokemon/snivy' },
    { url: 'https://pokeapi.co/api/v2/pokemon/oshawott' },
    { url: 'https://pokeapi.co/api/v2/pokemon/rowlet' },
    { url: 'https://pokeapi.co/api/v2/pokemon/scorbunny' },
    { url: 'https://pokeapi.co/api/v2/pokemon/sobble' }
];

const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const evolveButton = document.getElementById('evolve');
const pokemonType = document.getElementById('pokemon-type');

let currentPokemon = starterPokemonUrls[Math.floor(Math.random() * starterPokemonUrls.length)];
let evolutionChain = [];
let currentStage = 1;

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        evolutionChain = await fetchEvolutionChain(data.species.url);
        updatePokemonDisplay(data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

async function fetchEvolutionChain(speciesUrl) {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        return evolutionData.chain;
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return [];
    }
}

async function fetchEvolvedPokemonData(speciesUrl) {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
        const pokemonData = await pokemonResponse.json();
        updatePokemonDisplay(pokemonData);
    } catch (error) {
        console.error('Error fetching evolved Pokémon data:', error);
    }
}
function updatePokemonDisplay(pokemon) {
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    pokemonType.innerHTML = ''; 
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    
    types.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        button.className = `type-button ${type}`;
        pokemonType.appendChild(button);
    });
}

evolveButton.addEventListener('click', () => {
    evolve(currentStage);
    currentStage++;
});

async function evolve(stage) {
    let currentEvolution = evolutionChain;
    if (stage === 1) {
        const firstEvolution = currentEvolution.evolves_to[0];
        if (firstEvolution) {
            await fetchEvolvedPokemonData(firstEvolution.species.url);    
        }
    } 
    else if (stage === 2) {
        const firstEvolution = currentEvolution.evolves_to[0];
        const secondEvolution = firstEvolution?.evolves_to[0];
        if (secondEvolution) {
            await fetchEvolvedPokemonData(secondEvolution.species.url);
            evolveButton.textContent = "Generate a starter"; 
        }
    }
    else if (stage === 3) {
        currentPokemon = starterPokemonUrls[Math.floor(Math.random() * starterPokemonUrls.length)];
        await fetchPokemonData(currentPokemon.url);
        evolveButton.textContent = "Evolve"; 
        currentStage = 1;
    }
}

fetchPokemonData(currentPokemon.url);