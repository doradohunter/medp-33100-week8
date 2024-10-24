document.addEventListener("DOMContentLoaded", () => {
    const factsContainer = document.getElementById("facts-container");
    const fetchFactsButton = document.getElementById("fetch-facts");

    // Function to fetch dog facts from the API
    async function fetchDogFacts(number = 5) {
        try {
            const response = await fetch(`https://dog-api.kinduff.com/api/facts?number=${number}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayFacts(data.facts);
        } catch (error) {
            console.error("Error fetching dog facts:", error);
        }
    }

    // Function to display the fetched facts
    function displayFacts(facts) {
        factsContainer.innerHTML = ""; // Clear previous facts
        facts.forEach(fact => {
            const factElement = document.createElement("p");
            factElement.textContent = fact;
            factsContainer.appendChild(factElement);
        });
    }

    // Event listener for button click
    fetchFactsButton.addEventListener("click", () => {
        fetchDogFacts(); // Fetch new dog facts
    });

    // Initial fetch of dog facts
    fetchDogFacts();
});
