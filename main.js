// Generera ett random nummer mellan 0 och 100
let randomNumber = Math.floor(Math.random() * 100) + 0;
console.log(randomNumber);

// Välj element
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessList = document.querySelector(".guessList");
const guessSubmit = document.querySelector(".submitGuess");
const guessField = document.querySelector(".guessField");

// Starta räkna antal gissningar
let guessCount = 1;
guessField.focus();

// Event listener för inskickade gissningar
guessSubmit.addEventListener("click", checkGuess);

// Event listener för tangenten Enter i gissningsfältet
guessField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Funktion för att kolla spelarens gissning
function checkGuess() {
  const userGuess = Number(guessField.value);

  // Kolla om gissningen är giltig
  if (userGuess > 100 || userGuess < 0 || userGuess === "") {
    handleInvalidGuess();
    return;
  }

  // Uppdatera guesses display
  updateGuessesDisplay(userGuess);

  // Kolla om gissningen är korrekt, för låg eller för hög
  if (userGuess === randomNumber) {
    handleCorrectGuess();
  } else if (guessCount === 5) {
    handleGameOver();
  } else {
    handleIncorrectGuess(userGuess);
  }

  // Öka antal gissningar och återställ inmatningsfältet
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// Funktion för att hantera ogiltig gissning
function handleInvalidGuess() {
  lowOrHi.textContent = "You're not following the rules :(";
  lowOrHi.style.backgroundColor = "rgb(195, 46, 74, 0.4)";
}

// Funktion för att uppdatera guesses display
function updateGuessesDisplay(userGuess) {
  if (guessCount === 1) {
    guesses.textContent = "Your guesses so far:";
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;
}

// Funktion för att hantera korrekt gissning
function handleCorrectGuess() {
  lastResult.textContent = `WOW, number ${randomNumber} is correct. Congratulations!`;
  lastResult.style.backgroundColor = "rgb(98, 109, 74, 0.4)";
  lowOrHi.textContent = "";
  setGameOver();
}

// Funktion för att hantera game over
function handleGameOver() {
  lastResult.textContent = `GAME OVER. You should've chosen ${randomNumber} :(`;
  lowOrHi.textContent = "";
  setGameOver();
}

// Funktion för att hantera fel gissning
function handleIncorrectGuess(userGuess) {
  lastResult.textContent = "Oops :(";
  lastResult.style.backgroundColor = "rgb(195, 46, 74, 0.4)";

  if (userGuess < randomNumber) {
    lowOrHi.textContent = `${userGuess} was too low!`;
    lowOrHi.style.backgroundColor = "rgb(45, 111, 150, 0.4)";
  } else if (userGuess > randomNumber) {
    lowOrHi.textContent = `${userGuess} was too high!`;
    lowOrHi.style.backgroundColor = "rgb(195, 46, 74, 0.4)";
  }
}

// Funktion för att hantera Game Over
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  guessSubmit.classList.add("hidden");
  guessField.classList.add("hidden");

  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.querySelector(".container").append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

// Funktion för att återställa spelet
function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");

  // Rensa resultatparagrafer
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessSubmit.classList.remove("hidden");
  guessField.classList.remove("hidden");
  guessField.value = "";
  guessField.focus();
  guesses.textContent = "";
  lastResult.textContent = "";
  lastResult.style.backgroundColor = "white";
  // Generera ett nytt random nummer för nästa spel
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
}

//deklarera variabler
const snowmax = 100;
const snowcolor = ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.7)"];
const snowletter = ["*", "❆", "❅", "❄"];
const sinkspeed = 1.2;
const snowmaxsize = 30;
const snowminsize = 8;
let snow = [];
let marginbottom, marginright;
let crds = [];
let lftrght = [];
let x_mv = [];

//skapa snöflingor när sidan laddas
for (let i = 0; i <= snowmax; i++) {
  document.write(`
    <span id='s${i}' class='snowflake' style='pointer-events:none;z-index:9999;position:fixed;top:-${snowmaxsize}px'>
      ${snowletter[randommaker(snowletter.length)]}
    </span>
  `);
}

//hantera event
window.onload = () => {
  initsnow();
  handleResize();
};

window.onresize = handleResize;

//funktion för att generera ett random nummer
function randommaker(o) {
  return Math.floor(o * Math.random());
}

//hantera ändring av skärmens storlek för att justera snöflingorna positon -> göra dem responsiva
function handleResize() {
  marginbottom = document.body.scrollHeight;
  marginright = window.innerWidth - 15;

  for (let i = 0; i <= snowmax; i++) {
    snow[i].posx = Math.random() * marginright;
    snow[i].posy = Math.random() * marginbottom;
    snow[i].style.left = `${snow[i].posx}px`;
    snow[i].style.top = `${snow[i].posy}px`;
  }
}

//starta snöanimation
function initsnow() {
  marginbottom = document.body.scrollHeight;
  marginright = window.innerWidth - 15;
  const o = snowmaxsize - snowminsize;

  //starta varje snöflinga
  for (let i = 0; i <= snowmax; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random();
    x_mv[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById(`s${i}`);
    snow[i].size = randommaker(o) + snowminsize;
    snow[i].style.fontSize = `${snow[i].size}px`;
    snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
    snow[i].sink = sinkspeed * snow[i].size / 5;
    snow[i].posx = Math.random() * marginright;
    snow[i].posy = Math.random() * marginbottom;
    snow[i].style.left = `${snow[i].posx}px`;
    snow[i].style.top = `${snow[i].posy}px`;
  }

  //kalla på animationen och köra den! :)
  movesnow();
}

//flytta snöflingorna på skärmen
function movesnow() {
  for (let i = 0; i <= snowmax; i++) {
    crds[i] += x_mv[i];
    snow[i].posy += snow[i].sink;
    snow[i].style.left = `${snow[i].posx + lftrght[i] * Math.sin(crds[i])}px`;
    snow[i].style.top = `${snow[i].posy}px`;

    //återställa snöflingans position om den når botten av sidan eller hamnar utanför
    if (snow[i].posy >= marginbottom - snow[i].size || parseInt(snow[i].style.left) > marginright - snow[i].size) {
      snow[i].posx = Math.random() * marginright;
      snow[i].posy = 0;
    }
  }

  //kalla på movesnow med en fördröjning på animationen
  setTimeout(movesnow, 50);
}
