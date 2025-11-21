let totalScore = 0;
let roundScore = 0;
let turnsPlayed = 0;
let diceNumber = 0;

document.querySelector("#diceButton").addEventListener("click", pickDiceNumber);
document.querySelector("#freezeButton").addEventListener("click", freezeScore);
document.querySelector("#playAgainButton").addEventListener("click", resetGame);
document.querySelector("#nameForm").addEventListener("submit", changeName);

function changeTextOnElement(element, text) {
  document.querySelector(element).innerText = text;
}

function addAndRemoveShow(add, remove) {
  document.querySelector(add).classList.add("show");
  document.querySelector(remove).classList.remove("show");
}

function increase(variable, change, element) {
  variable += change;
  changeTextOnElement(element, variable.toString());
  return variable;
}

function changeName(event) {
  event.preventDefault();
  if (document.querySelector("#nameInput").value.length > 0) {
    changeTextOnElement(
      "#playerName",
      document.querySelector("#nameInput").value
    );
    document.querySelector("#nameInput").value = "";
    addAndRemoveShow("#game", "#nameForm");
  }
}

function pickDiceNumber() {
  diceNumber = Math.floor(Math.random() * 6) + 1;
  changeTextOnElement("#diceNumber", diceNumber.toString());

  if (diceNumber > 1) {
    roundScore = increase(roundScore, diceNumber, "#roundScore");
    console.log(roundScore);
  } else {
    resetRoundScore();
    turnsPlayed = increase(turnsPlayed, 1, "#turnsPlayed");
  }
}

function playerWon() {
  addAndRemoveShow("#winContainer", "#game");
  changeTextOnElement(
    "#winMessage",
    `You won! And it only took you ${turnsPlayed} turns.`
  );
}

function resetGame() {
  addAndRemoveShow("#game", "#winContainer");
  totalScore = 0;
  roundScore = 0;
  turnsPlayed = 0;
  diceNumber = 0;
  changeTextOnElement("#totalScore", "0");
  changeTextOnElement("#roundScore", "0");
  changeTextOnElement("#turnsPlayed", "0");
  changeTextOnElement("#diceNumber", "...");
}

function checkWinCondition() {
  if (totalScore >= 100) {
    playerWon();
  }
}

function freezeScore() {
  totalScore = increase(totalScore, roundScore, "#totalScore");
  checkWinCondition();
  turnsPlayed = increase(turnsPlayed, 1, "#turnsPlayed");
  resetRoundScore();
}

function resetRoundScore() {
  roundScore = 0;
  changeTextOnElement("#roundScore", roundScore.toString());
}
