// ---- DOCUMENT ELEMENTS ---- //
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
const restartButton = document.getElementById("restart-button");
const gameResultModal = document.getElementById("modal");
const gameResultText1 = document.getElementById("game-result-text-1");
const gameResultText2 = document.getElementById("game-result-text-2");
const gameResultIcon = document.getElementById("game-result-icon");
const modalButton1 = document.getElementById("modal-button-1");
const modalButton2 = document.getElementById("modal-button-2");
const modalButton1Text = document.getElementById("modal-button-1-text");
const modalButton2Text = document.getElementById("modal-button-2-text");
// ---- GLOBAL VARIABLES ---- //
let p1IsX = true;
let isP1Turn = true;
let vsAi = false;
let vsP2 = false;
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// ---- GENERIC FUNCTIONS ---- //
const startGame = () => {
  newGamePage.classList.add("hidden");
  gameBoardPage.classList.remove("hidden");
  turnIndicator.src = "assets/icon-x.svg";
  for (let i = 0; i < board.length; i++) {
    board[i] = i;
  }
  for (const slot of slots) {
    slot.innerHTML = "";
    slot.style.pointerEvents = "auto";
    slot.classList.remove("slot--blue");
    slot.classList.remove("slot--yellow");
  }
  isP1Turn = p1IsX ? true : false;
  if (!p1IsX && vsAi) {
    aiAction();
    isP1Turn = !isP1Turn;
  }
};

const getAvailableActions = () => {
  return board.filter((slot) => slot !== "x" && slot !== "o");
};
// ---- WINNING CONDITIONS ---- //
const gameWon = (mark) => {
  const className = mark === "x" ? "slot--blue" : "slot--yellow";
  if (board[0] === mark && board[1] === mark && board[2] === mark) {
    slots[0].classList.add(className);
    slots[1].classList.add(className);
    slots[2].classList.add(className);
    return true;
  }
  if (board[3] === mark && board[4] === mark && board[5] === mark) {
    slots[3].classList.add(className);
    slots[4].classList.add(className);
    slots[5].classList.add(className);
    return true;
  }
  if (board[6] === mark && board[7] === mark && board[8] === mark) {
    slots[6].classList.add(className);
    slots[7].classList.add(className);
    slots[8].classList.add(className);
    return true;
  }
  if (board[0] === mark && board[3] === mark && board[6] === mark) {
    slots[0].classList.add(className);
    slots[3].classList.add(className);
    slots[6].classList.add(className);
    return true;
  }
  if (board[1] === mark && board[4] === mark && board[7] === mark) {
    slots[1].classList.add(className);
    slots[4].classList.add(className);
    slots[7].classList.add(className);
    return true;
  }
  if (board[2] === mark && board[5] === mark && board[8] === mark) {
    slots[2].classList.add(className);
    slots[5].classList.add(className);
    slots[8].classList.add(className);
    return true;
  }
  if (board[0] === mark && board[4] === mark && board[8] === mark) {
    slots[0].classList.add(className);
    slots[4].classList.add(className);
    slots[8].classList.add(className);
    return true;
  }
  if (board[2] === mark && board[4] === mark && board[6] === mark) {
    slots[2].classList.add(className);
    slots[4].classList.add(className);
    slots[6].classList.add(className);
    return true;
  }
};

const gameWonSim = (mark, simBoard = board) => {
  return (
    (simBoard[0] == mark && simBoard[1] == mark && simBoard[2] == mark) ||
    (simBoard[3] == mark && simBoard[4] == mark && simBoard[5] == mark) ||
    (simBoard[6] == mark && simBoard[7] == mark && simBoard[8] == mark) ||
    (simBoard[0] == mark && simBoard[3] == mark && simBoard[6] == mark) ||
    (simBoard[1] == mark && simBoard[4] == mark && simBoard[7] == mark) ||
    (simBoard[2] == mark && simBoard[5] == mark && simBoard[8] == mark) ||
    (simBoard[0] == mark && simBoard[4] == mark && simBoard[8] == mark) ||
    (simBoard[2] == mark && simBoard[4] == mark && simBoard[6] == mark)
  );
};

const checkCondition = (mark) => {
  if (gameWon(mark)) {
    if (((p1IsX && mark === "x") || (!p1IsX && mark !== "x")) && vsAi) {
      gameResultText1.textContent = "YOU WON!";
      score1.textContent = parseInt(score1.textContent) + 1;
    }
    if (((p1IsX && mark !== "x") || (!p1IsX && mark === "x")) && vsAi) {
      gameResultText1.textContent = "OH NO, YOU LOST...";
      score2.textContent = parseInt(score2.textContent) + 1;
    }
    if (((p1IsX && mark === "x") || (!p1IsX && mark !== "x")) && vsP2) {
      gameResultText1.textContent = "PLAYER 1 WINS!";
      score1.textContent = parseInt(score1.textContent) + 1;
    }
    if (((p1IsX && mark !== "x") || (!p1IsX && mark === "x")) && vsP2) {
      gameResultText1.textContent = "PLAYER 2 WINS!";
      score2.textContent = parseInt(score2.textContent) + 1;
    }
    gameResultIcon.style.display = "block";
    gameResultText1.style.display = "block";
    gameResultIcon.src = `assets/icon-${mark}.svg`;
    gameResultText2.className =
      mark === "x" ? "heading--lg color--blue" : "heading--lg color--yellow";
    gameResultText2.innerText = "TAKES THE ROUND";
    modalButton1Text.textContent = "QUIT";
    modalButton2Text.textContent = "NEXT ROUND";
    gameResultModal.showModal();
  }
  const availableActions = getAvailableActions();
  if (availableActions.length === 0) {
    gameResultIcon.style.display = "none";
    gameResultText1.style.display = "none";
    gameResultText2.className = "heading--lg color--silver";
    gameResultText2.innerText = "ROUND TIED";
    modalButton1Text.textContent = "QUIT";
    modalButton2Text.textContent = "NEXT ROUND";
    ties.textContent = parseInt(ties.textContent) + 1;
    gameResultModal.showModal();
  }
};
// ---- AI ---- //
const minimax = (newBoard, player) => {
  const availableActions = getAvailableActions(newBoard);
  let playerMark = p1IsX ? "x" : "o";
  let aiMark = p1IsX ? "o" : "x";
  if (gameWonSim(playerMark, newBoard)) {
    return { score: -10 };
  } else if (gameWonSim(aiMark, newBoard)) {
    return { score: 10 };
  } else if (availableActions.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  for (let i = 0; i < availableActions.length; i++) {
    const move = {};
    move.index = newBoard[availableActions[i]];
    newBoard[availableActions[i]] = player;
    if (player == aiMark) {
      const result = minimax(newBoard, playerMark);
      move.score = result.score;
    } else {
      const result = minimax(newBoard, aiMark);
      move.score = result.score;
    }
    newBoard[availableActions[i]] = move.index;
    moves.push(move);
  }
  let bestMove;
  if (player === aiMark) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};

const aiAction = () => {
  if (!modal.open) {
    const aiMark = p1IsX ? "o" : "x";
    const bestMoveIndex = minimax(board, aiMark).index;
    if (aiMark === "x") {
      const xIcon = document.createElement("img");
      xIcon.src = "assets/icon-x.svg";
      xIcon.className = "x";
      slots[bestMoveIndex].appendChild(xIcon);
      turnIndicator.src = "assets/icon-o.svg";
      board[bestMoveIndex] = "x";
      checkCondition("x");
    }
    if (aiMark === "o") {
      const xIcon = document.createElement("img");
      xIcon.src = "assets/icon-o.svg";
      xIcon.className = "o";
      slots[bestMoveIndex].appendChild(xIcon);
      turnIndicator.src = "assets/icon-x.svg";
      board[bestMoveIndex] = "o";
      checkCondition("o");
    }
    slots[bestMoveIndex].style.pointerEvents = "none";
  }
};
// ---- EVENT HANDLERS ---- //
const handleToggleClickX = () => {
  toggleButtonX.classList.add("active");
  toggleXIcon.className = "icon--md icon--navy";
  toggleButtonO.classList.remove("active");
  toggleOIcon.className = "icon--md icon--silver";
  p1IsX = true;
};

const handleToggleClickO = () => {
  toggleButtonO.classList.add("active");
  toggleOIcon.className = "icon--md icon--navy";
  toggleButtonX.classList.remove("active");
  toggleXIcon.className = "icon--md icon--silver";
  p1IsX = false;
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
    if (vsAi) aiAction();
    else isP1Turn = !isP1Turn;
  }
};

const handleRestartClick = () => {
  gameResultIcon.style.display = "none";
  gameResultText1.style.display = "none";
  gameResultText2.className = "heading--lg color--silver";
  gameResultText2.innerText = "RESTART GAME?";
  modalButton1Text.textContent = "NO, CANCEL";
  modalButton2Text.textContent = "YES, RESTART";
  gameResultModal.showModal();
};

const handleButton1Click = () => {
  if (modalButton1.children[0].textContent === "NO, CANCEL") {
    gameResultModal.close();
  }
  if (modalButton1.children[0].textContent === "QUIT") {
    score1.textContent = 0;
    score2.textContent = 0;
    ties.textContent = 0;
    gameResultModal.close();
    gameBoardPage.classList.add("hidden");
    newGamePage.classList.remove("hidden");
  }
};

const handleButton2Click = () => {
  gameResultModal.close();
  startGame();
};
// ---- EVENT LISTENERS ---- //
toggleButtonX.addEventListener("click", handleToggleClickX);
toggleButtonO.addEventListener("click", handleToggleClickO);
vsAiButton.addEventListener("click", handleVsAiClick);
vsP2Button.addEventListener("click", handleVsP2Click);
restartButton.addEventListener("click", handleRestartClick);
modalButton1.addEventListener("click", handleButton1Click);
modalButton2.addEventListener("click", handleButton2Click);
for (const slot of slots) {
  slot.addEventListener("mouseenter", handleSlotEnter);
  slot.addEventListener("mouseleave", handleSlotLeave);
  slot.addEventListener("click", handleSlotClick);
}
