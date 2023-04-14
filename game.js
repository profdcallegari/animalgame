// Define a list of animals
const animals = ['cat', 'dog', 'elephant', 'mouse', 'hippo', 'lion', 'monkey', 'panda', 'pig', 'tiger'];

// Define functions for playing sounds
function playSound(filename) {
  const sound = document.getElementById('sound');
  sound.src = filename;
  sound.play();
}
function playVictorySound() {
  playSound('victory.mp3');
}
function playErrorSound() {
  playSound('error.mp3');
}

// Define a function for shuffling an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Define a function for generating a random animal
function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// Define a function for starting a new round
function newRound() {
	if (score < 0) return;

  // Choose a random animal
  const chosenAnimal = getRandomAnimal();

  // Generate four random animals, including the chosen one
  const options = [chosenAnimal];
  while (options.length < 4) {
    const animal = getRandomAnimal();
    if (!options.includes(animal)) {
      options.push(animal);
    }
  }
  shuffle(options);

  // Create the image elements and add them to the container
  const container = document.getElementById('animals');
  container.innerHTML = '';
  options.forEach(animal => {
    const img = document.createElement('img');
    img.src = `images/${animal}.jpg`;
    img.alt = '[' + animal + ']';
    img.height = 200;
    img.addEventListener('click', async () => {
      if (animal === chosenAnimal) {
        score++;
        scoreDisplay.textContent = score;
        playVictorySound();
        await delay(3000);
      } else {
        score--;
        scoreDisplay.textContent = score;
        playErrorSound();
        await delay(1000);

        if (score <= 0) {
          // Game over
          container.innerHTML = '<h2>Game over!</h2>';
          score = 0;
          scoreDisplay.textContent = score;
        }
      }

      newRound();
    });
    container.appendChild(img);
  });

  // Play the sound of the chosen animal
  playSound(`sounds/${chosenAnimal}.mp3`);
  console.log(`${chosenAnimal}`);
}

// Set up the game
let score = 0;
const scoreDisplay = document.getElementById('score');
scoreDisplay.textContent = score;
document.getElementById('restart').addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
	newRound();
});

//newRound();
