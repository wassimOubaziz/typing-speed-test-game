const arrWords = [
  "wordle",
  "girl",
  "world",
  "up",
  "strategy",
  "words",
  "cameo",
  "songs",
  "honor",
  "girl",
  "theme",
  "crimes",
  "town",
  "mo3",
  "game",
  "song",
  "word",
  "kevin",
  "gates",
  "hello",
];

const btnStart = document.querySelector(".start button");
const start = document.querySelector(".start");
const words = document.querySelector(".words");
const wordsP = words.querySelector("p");
const input = document.querySelector(".inp input");
const score = document.querySelector(".ss");
const from = document.querySelector(".from");
const winLose = document.querySelector(".winLose h1");
const timeLeft = document.querySelector(".timeLeft");
const lev = document.querySelector(".lev");
const speed = document.querySelector(".speed");
let level = 3;
let isTrue = false;
let counter = 0;
let firstElement = "";
let lent = arrWords.length;
let time;
from.textContent = lent;

// functions
const createElement = () => {
  let wordGenerator = "";
  words.textContent = "";
  arrWords.forEach((element) => {
    wordGenerator += `<button>${element}</button>`;
  });
  words.insertAdjacentHTML("afterbegin", wordGenerator);
};

const showWord = () => {
  start.innerHTML = `<p>${arrWords[0]}</p>`;
};

const doEveryThing = () => {
  if (arrWords.length >= 1) {
    showWord();
  }
  firstElement = arrWords[0];
  arrWords.shift();
  createElement();
};

const winLoseFunction = (len) => {
  if (len === 0) {
    winLose.textContent = "Congratz";
  } else {
    winLose.textContent = "Game Over";
    winLose.style.color = "red";
    setTimeout(() => {
      location.reload();
    }, 4000);
  }
  input.disabled = true;
};

const timeOut = (i, e) => {
  timeLeft.textContent = i--;
  time = setInterval(() => {
    timeLeft.textContent = i;
    if (timeLeft.textContent == "0") {
      winLoseFunction(1);
      clearInterval(time);
    } else if (firstElement == e) {
      clearInterval(time);
    }
    i--;
  }, 1000);
};

// End of functions

btnStart.addEventListener("click", function (e) {
  words.removeChild(wordsP);
  isTrue = true;
  input.value = "";
  input.focus();
  doEveryThing();
  timeOut(level + 3, "");
});

window.addEventListener("keypress", function (e) {
  if (isTrue) {
    if (e.key === "Enter" || e.code === "Space") {
      const val = input.value.replace(/ /g, "");
      if (firstElement === val) {
        counter++;
        lent--;
        score.textContent = counter;
        clearInterval(time);
        timeOut(level, val);
        doEveryThing();
        input.value = "";
      } else {
        winLoseFunction(1);
      }
      if (lent == 0) {
        winLoseFunction(0);
        clearInterval(time);
      } else if (lent === 1) {
        words.style.display = "none";
      }
    }
  }
});

//speed
speed.textContent = level;
lev.addEventListener("click", function () {
  if (!isTrue) {
    if (level === 4) {
      level = 2;
      speed.textContent = level;
      lev.textContent = "Hard";
    } else if (level == 3) {
      level++;
      speed.textContent = level;
      lev.textContent = "Easy";
    } else if (level == 2) {
      level++;
      speed.textContent = level;
      lev.textContent = "Normal";
    }
  }
});
