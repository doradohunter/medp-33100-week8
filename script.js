// Replace with your own API key from Spoonacular
const API_KEY = '1fbe1e25532448dfa8ce7a76bcec174e'; // Get your API key from Spoonacular
const RANDOM_RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;
const SEARCH_RECIPE_URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}`;

// Function to fetch and display a random recipe
async function fetchRandomRecipe() {
    try {
        const response = await fetch(RANDOM_RECIPE_URL);
        const data = await response.json();
        const recipe = data.recipes[0];

        // Display the recipe details
        document.getElementById('randomRecipeText').innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.summary}</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
        `;
        document.getElementById('randomRecipeImage').src = recipe.image;
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        document.getElementById('randomRecipeText').innerHTML = 'Failed to load random recipe.';
    }
}

// Function to search for recipes by ingredient
async function searchRecipesByIngredient(ingredient) {
    try {
        const response = await fetch(`${SEARCH_RECIPE_URL}&ingredients=${ingredient}`);
        const recipes = await response.json();
        
        // Clear previous results
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        // Display each recipe found
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe';
            recipeElement.innerHTML = `
                <h4>${recipe.title}</h4>
                <img src="${recipe.image}" alt="${recipe.title}">
                <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
            `;
            resultsContainer.appendChild(recipeElement);
        });

        if (recipes.length === 0) {
            resultsContainer.innerHTML = '<p>No recipes found for this ingredient.</p>';
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
        document.getElementById('searchResults').innerHTML = 'Failed to load search results.';
    }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const ingredient = document.getElementById('ingredientInput').value;
    if (ingredient) {
        searchRecipesByIngredient(ingredient);
    } else {
        alert('Please enter an ingredient.');
    }
});

// Fetch and display a random recipe on page load
fetchRandomRecipe();
