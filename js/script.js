const toggleButtonX = document.getElementById("toggle-x");
const toggleXIcon = document.getElementById("toggle-x-icon");
const toggleButtonO = document.getElementById("toggle-o");
const toggleOIcon = document.getElementById("toggle-o-icon");
const vsAiButton = document.getElementById("vs-ai");
const vsP2Button = document.getElementById("vs-p2");
const newGamePage = document.getElementById("new-game-page");
const gameBoardPage = document.getElementById("game-board-page");
const slots = document.querySelectorAll(".card--lg");
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
const score1Text = document.getElementById("score-1-text");
const score2Text = document.getElementById("score-2-text");
const ties = document.getElementById("ties");
const turnIndicator = document.getElementById("turn-indicator");
const gameResultModal = document.getElementById("modal");
const gameResultText1 = document.getElementById("game-result-text-1");
const gameResultText2 = document.getElementById("game-result-text-2");
const gameResultIcon = document.getElementById("game-result-icon");

let p1IsX = true;
let vsAi = false;
let vsP2 = false;
let isP1Turn = true;
let turn = 1;
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const handleToggleClickX = () => {
  toggleButtonX.classList.add("active");
  toggleXIcon.className = "icon--md icon--navy";
  toggleButtonO.classList.remove("active");
  toggleOIcon.className = "icon--md icon--silver";
  p1IsX = true;
  isP1Turn = true;
};

const handleToggleClickO = () => {
  toggleButtonO.classList.add("active");
  toggleOIcon.className = "icon--md icon--navy";
  toggleButtonX.classList.remove("active");
  toggleXIcon.className = "icon--md icon--silver";
  p1IsX = false;
  isP1Turn = false;
};

const startGame = () => {
  newGamePage.classList.add("hidden");
  gameBoardPage.classList.remove("hidden");
  score1.innerHTML = 0;
  score2.innerHTML = 0;
  ties.innerHTML = 0;
  for (let i = 0; i < board.length; i++) {
    board[i] = i;
  }
  for (const slot of slots) {
    slot.innerHTML = "";
    slot.style.pointerEvents = "auto";
  }
};

const handleVsAiClick = () => {
  vsAi = true;
  score1Text.textContent = p1IsX ? "X (YOU)" : "X (CPU)";
  score2Text.textContent = p1IsX ? "O (CPU)" : "O (YOU)";
  startGame();
};

const handleVsP2Click = () => {
  vsP2 = true;
  score1Text.textContent = p1IsX ? "X (P1)" : "X (P2)";
  score2Text.textContent = p1IsX ? "O (P2)" : "O (P1)";
  startGame();
};

const getAvailableActions = (board) => {
  return board.filter((slot) => slot !== "x" && slot !== "o");
};

const gameWon = (mark) => {
  return (
    (board[0] === mark && board[1] === mark && board[2] === mark) ||
    (board[3] === mark && board[4] === mark && board[5] === mark) ||
    (board[6] === mark && board[7] === mark && board[8] === mark) ||
    (board[0] === mark && board[3] === mark && board[6] === mark) ||
    (board[1] === mark && board[4] === mark && board[7] === mark) ||
    (board[2] === mark && board[5] === mark && board[8] === mark) ||
    (board[0] === mark && board[4] === mark && board[8] === mark) ||
    (board[2] === mark && board[4] === mark && board[6] === mark)
  );
};

const checkCondition = (mark) => {
  if (gameWon(mark)) {
    if (((p1IsX && mark === "x") || (!p1IsX && mark !== "x")) && vsAi) {
      gameResultText1.textContent = "YOU WON!";
    }
    if (((p1IsX && mark !== "x") || (!p1IsX && mark === "x")) && vsAi) {
      gameResultText1.textContent = "OH NO, YOU LOST...";
    }
    if (((p1IsX && mark === "x") || (!p1IsX && mark !== "x")) && vsP2) {
      gameResultText1.textContent = "PLAYER 1 WINS!";
    }
    if (((p1IsX && mark !== "x") || (!p1IsX && mark === "x")) && vsP2) {
      gameResultText1.textContent = "PLAYER 2 WINS!";
    }
    gameResultIcon.src = `assets/icon-${mark}.svg`;
    gameResultText2.className =
      mark === "x" ? "heading--lg color--blue" : "heading--lg color--yellow";
    gameResultModal.showModal();
  }
  turn++;
  if (turn === 10) console.log("tie");
};

const handleSlotEnter = (event) => {
  if ((isP1Turn && p1IsX) || (!isP1Turn && !p1IsX)) {
    const xOutline = document.createElement("img");
    xOutline.src = "assets/icon-x-outline.svg";
    xOutline.id = "outline";
    xOutline.style.pointerEvents = "none";
    event.target.appendChild(xOutline);
  }
  if ((isP1Turn && !p1IsX) || (!isP1Turn && p1IsX)) {
    const oOutline = document.createElement("img");
    oOutline.src = "assets/icon-o-outline.svg";
    oOutline.id = "outline";
    oOutline.style.pointerEvents = "none";
    event.target.appendChild(oOutline);
  }
};

const handleSlotLeave = () => {
  document.querySelector("#outline").remove();
};

const handleSlotClick = (event) => {
  if (isP1Turn || (!isP1Turn && vsP2)) {
    if ((isP1Turn && p1IsX) || (!isP1Turn && !p1IsX)) {
      const xIcon = document.createElement("img");
      xIcon.src = "assets/icon-x.svg";
      xIcon.className = "x";
      event.target.appendChild(xIcon);
      turnIndicator.src = "assets/icon-o.svg";
      board[event.target.id] = "x";
      checkCondition("x");
    } else {
      const oIcon = document.createElement("img");
      oIcon.src = "assets/icon-o.svg";
      oIcon.className = "o";
      event.target.appendChild(oIcon);
      turnIndicator.src = "assets/icon-x.svg";
      board[event.target.id] = "o";
      checkCondition("o");
    }
    event.target.style.pointerEvents = "none";
    isP1Turn = !isP1Turn;
  }
};

toggleButtonX.addEventListener("click", handleToggleClickX);
toggleButtonO.addEventListener("click", handleToggleClickO);
vsAiButton.addEventListener("click", handleVsAiClick);
vsP2Button.addEventListener("click", handleVsP2Click);
for (const slot of slots) {
  slot.addEventListener("mouseenter", handleSlotEnter);
  slot.addEventListener("mouseleave", handleSlotLeave);
  slot.addEventListener("click", handleSlotClick);
}
