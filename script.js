class Sprite {
    constructor(data) {
        this.name = data.name;
        this.image = data.img;
        this.level = data.level;
        this.isFavorite = false;
    }

    render() {
        const container = document.getElementById('sprite-container');
        const spriteElement = document.createElement('div');
        spriteElement.className = 'sprite';

        const imgElement = document.createElement('img');
        imgElement.src = this.image;
        imgElement.alt = this.name;

        // Name element
        const nameElement = document.createElement('p');
        nameElement.className = 'sprite-name';
        nameElement.textContent = this.name;

        // Level element
        const levelElement = document.createElement('p');
        levelElement.className = 'sprite-level';
        levelElement.textContent = `Level: ${this.level}`;

        // Favorite button
        const favoriteButton = document.createElement('span');
        favoriteButton.innerHTML = '🤍';
        favoriteButton.className = 'favorite-btn';
        favoriteButton.onclick = () => this.toggleFavorite(spriteElement, favoriteButton);

        spriteElement.appendChild(imgElement);
        spriteElement.appendChild(nameElement);
        spriteElement.appendChild(levelElement);
        spriteElement.appendChild(favoriteButton);
        container.appendChild(spriteElement);

        gsap.from(spriteElement, { duration: 1, y: 50, opacity: 0, ease: 'power2.out' });
    }

    toggleFavorite(spriteElement, favoriteButton) {
        this.isFavorite = !this.isFavorite;
        favoriteButton.innerHTML = this.isFavorite ? '💙' : '🤍';
        spriteElement.classList.toggle('favorite', this.isFavorite);

        // Simulated POST request
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: this.name,
                favorite: this.isFavorite
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('POST response:', data);
        })
        .catch(error => console.log('Error with POST request:', error));
    }
}

// Fetch and Render Data
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(data => {
        data.forEach(digimon => {
            const sprite = new Sprite(digimon);
            sprite.render();
        });
    })
    .catch(error => console.log('Error fetching data:', error));
