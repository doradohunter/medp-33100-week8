class Jokes {
  constructor(type, setup, punchline) {
    this.type = type;
    this.setup = setup;
    this.punchline = punchline;
  }

  announceType() {
    return `Joke type: ${this.type}`;
  }
}

async function getJoke() {
  const getJoke = await fetch(
    'https://official-joke-api.appspot.com/jokes/random'
  );

  const response = await getJoke.json();

  try {
    return response;
  } catch (error) {
    console.error('Error fetching random joke:', error);
    return 'error';
  }
}

async function changeJoke(type) {
  const changeJoke = await fetch(
    `https://official-joke-api.appspot.com/jokes/${type}/random`
  );

  const response = await changeJoke.json();

  try {
    return response;
  } catch (error) {
    console.error(`Error fetching ${type} joke:`, error);
    return 'error';
  }
}

function displayFirstJoke() {
  const type = document.querySelector('.type');
  const setup = document.querySelector('.setup');
  const punchline = document.querySelector('.punchline');

  type.textContent = 'loading...';

  getJoke().then((data) => {
    const grabJoke = new Jokes(data.type, data.setup, data.punchline);

    type.textContent = grabJoke.announceType();
    setup.textContent = grabJoke.setup;
    punchline.textContent = grabJoke.punchline;
  });

  changeJokes(type, setup, punchline);
}

function changeJokes(type, setup, punchline) {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      type.textContent = 'loading...';
      setup.textContent = '';
      punchline.textContent = '';

      changeJoke(button.textContent).then((data) => {
        const grabNewJoke = new Jokes(
          data[0].type,
          data[0].setup,
          data[0].punchline
        );

        type.textContent = grabNewJoke.announceType();
        setup.textContent = grabNewJoke.setup;
        punchline.textContent = grabNewJoke.punchline;
      });
    });
  });
}

displayFirstJoke();
