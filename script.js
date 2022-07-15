const input = document.getElementById("input");
const submit = document.querySelector(".submit-answer");
const restart = document.querySelector(".restart");
const message = document.querySelector(".message");
const prevGuess = document.querySelector(".prevGuess");

let targetNum;
let guess;
let count = 1;
let guesses = [];

const p = document.createElement("p");
prevGuess.appendChild(p);

const previousGuessesPrinter = () => {
  p.innerHTML = "Previous Guesses:";
  guesses.forEach((guess) => {
    let span = document.createElement("span");
    span.innerHTML = guess;
    p.appendChild(span);
  });
};

function numberGenerator() {
  targetNum = Math.floor(Math.random() * 100) + 1;
  console.log("numGenerator has run!", "The targetNum is: ", targetNum);
}

numberGenerator();
input.focus();

input.addEventListener("input", (e) => {
  guess = Number(e.target.value);
});

const updater = () => {
  if (guess !== "" || guess <= 100 || guess >= 0) {
    guesses.push(guess);
    previousGuessesPrinter();
    count++;
    input.value = "";
    guess = "";
  }
};

submit.addEventListener("click", (e) => {
  if (guess === "" || guess === undefined) {
    guess = 0;
  }
  if (count >= 1) {
    restart.classList = "restart";
  }

  e.preventDefault();
  if (guess > 100 || guess < 0) {
    message.innerHTML = `<h4 style="color:#f54343">Out of Range. <br/>Please choose a number between 1-100</h4>`;
  } else {
    if (guess === targetNum) {
      updater();
      message.classList.add("won");
      message.innerHTML = `You have found it in ${count -1}th attempt!!`;
      input.disabled = true;
      submit.disabled = true;
    } else if (guess > targetNum && count < 10) {
      updater();
      message.innerHTML = "Your guess is too high!";
    } else if (guess < targetNum && count < 10) {
      updater();
      message.innerHTML = "Your guess is too low!";
    } else if (guess !== targetNum && count > 9) {
      message.innerHTML = "Game Over!";
      message.classList = "message GameOver";
      input.setAttribute("disabled", "");
      submit.setAttribute("disabled", "");
      input.value = "";
    }
  }
});

restart.addEventListener("click", (e) => {
  e.preventDefault();
  restart.classList = "restart hidden";
  input.disabled = false;
  submit.disabled = false;
  message.innerHTML = "";
  message.classList = "message";
  input.value = "";
  count = 1;
  numberGenerator();
  p.innerHTML = "";
  guesses = [];
  guess = "";
  input.focus();
});
