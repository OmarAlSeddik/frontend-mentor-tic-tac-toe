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
let p1IsX = localStorage.getItem("p1-is-x")
  ? JSON.parse(localStorage.getItem("p1-is-x"))
  : true;
let isP1Turn = localStorage.getItem("is-p1-turn")
  ? JSON.parse(localStorage.getItem("is-p1-turn"))
  : true;
let vsAi = localStorage.getItem("vs-ai")
  ? JSON.parse(localStorage.getItem("vs-ai"))
  : false;
let vsP2 = localStorage.getItem("vs-p2")
  ? JSON.parse(localStorage.getItem("vs-p2"))
  : false;
let gameStarted = localStorage.getItem("game-started")
  ? JSON.parse(localStorage.getItem("game-started"))
  : false;
let gameEnded = localStorage.getItem("game-ended")
  ? JSON.parse(localStorage.getItem("game-ended"))
  : false;
let board = localStorage.getItem("board")
  ? JSON.parse(localStorage.getItem("board"))
  : [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xWins = localStorage.getItem("x-wins")
  ? JSON.parse(localStorage.getItem("x-wins"))
  : 0;
let nTies = localStorage.getItem("n-ties")
  ? JSON.parse(localStorage.getItem("n-ties"))
  : 0;
let oWins = localStorage.getItem("o-wins")
  ? JSON.parse(localStorage.getItem("o-wins"))
  : 0;
let turnIndicatorSrc = localStorage.getItem("turn-indicator-src")
  ? localStorage.getItem("turn-indicator-src")
  : "assets/icon-x.svg";

score1Text.textContent = localStorage.getItem("score-1-text");
score2Text.textContent = localStorage.getItem("score-2-text");
// ---- GENERIC FUNCTIONS ---- //
if (gameStarted) {
  newGamePage.classList.add("hidden");
  gameBoardPage.classList.remove("hidden");
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "x") {
      const xIcon = document.createElement("img");
      xIcon.src = "assets/icon-x.svg";
      xIcon.className = "x";
      slots[i].appendChild(xIcon);
      slots[i].style.pointerEvents = "none";
    }
    if (board[i] === "o") {
      const oIcon = document.createElement("img");
      oIcon.src = "assets/icon-o.svg";
      oIcon.className = "o";
      slots[i].appendChild(oIcon);
      slots[i].style.pointerEvents = "none";
    }
  }
  score1.textContent = xWins || 0;
  ties.textContent = nTies || 0;
  score2.textContent = oWins || 0;
  turnIndicator.src = turnIndicatorSrc;
}

const startGame = () => {
  newGamePage.classList.add("hidden");
  gameBoardPage.classList.remove("hidden");
  turnIndicatorSrc = "assets/icon-x.svg";
  localStorage.setItem("turn-indicator-src", turnIndicatorSrc);
  turnIndicator.src = turnIndicatorSrc;
  for (let i = 0; i < board.length; i++) {
    board[i] = i;
  }
  localStorage.setItem("board", JSON.stringify(board));
  for (const slot of slots) {
    slot.innerHTML = "";
    slot.style.pointerEvents = "auto";
    slot.classList.remove("slot--blue");
    slot.classList.remove("slot--yellow");
  }
  isP1Turn = p1IsX ? true : false;
  localStorage.setItem("is-p1-turn", isP1Turn);
  if (!p1IsX && vsAi) {
    aiAction();
    isP1Turn = !isP1Turn;
    localStorage.setItem("is-p1-turn", isP1Turn);
  }
  localStorage.setItem("board", JSON.stringify(board));
  gameStarted = true;
  localStorage.setItem("game-started", gameStarted);
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
    if (mark === "x") {
      if (!gameEnded) xWins++;
      localStorage.setItem("x-wins", xWins);
      score1.textContent = xWins;
    }
    if (mark === "o") {
      if (!gameEnded) oWins++;
      localStorage.setItem("o-wins", oWins);
      score2.textContent = oWins;
    }
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
    gameResultIcon.style.display = "block";
    gameResultText1.style.display = "block";
    gameResultIcon.src = `assets/icon-${mark}.svg`;
    gameResultText2.className =
      mark === "x" ? "heading--lg color--blue" : "heading--lg color--yellow";
    gameResultText2.innerText = "TAKES THE ROUND";
    modalButton1Text.textContent = "QUIT";
    modalButton2Text.textContent = "NEXT ROUND";
    gameEnded = true;
    localStorage.setItem("game-ended", gameEnded);
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
    if (!gameEnded) nTies++;
    localStorage.setItem("n-ties", nTies);
    ties.textContent = nTies;
    gameEnded = true;
    localStorage.setItem("game-ended", gameEnded);
    gameResultModal.showModal();
  }
};

if (gameEnded) {
  checkCondition("x");
  if (!gameResultModal.open) checkCondition("o");
}
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
      turnIndicatorSrc = "assets/icon-o.svg";
      localStorage.setItem("turn-indicator-src", turnIndicatorSrc);
      turnIndicator.src = turnIndicatorSrc;
      board[bestMoveIndex] = "x";
      localStorage.setItem("board", JSON.stringify(board));
      checkCondition("x");
    }
    if (aiMark === "o") {
      const oIcon = document.createElement("img");
      oIcon.src = "assets/icon-o.svg";
      oIcon.className = "o";
      slots[bestMoveIndex].appendChild(oIcon);
      turnIndicatorSrc = "assets/icon-x.svg";
      localStorage.setItem("turn-indicator-src", turnIndicatorSrc);
      turnIndicator.src = turnIndicatorSrc;
      board[bestMoveIndex] = "o";
      localStorage.setItem("board", JSON.stringify(board));
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
  localStorage.setItem("p1-is-x", JSON.parse(p1IsX));
};

const handleToggleClickO = () => {
  toggleButtonO.classList.add("active");
  toggleOIcon.className = "icon--md icon--navy";
  toggleButtonX.classList.remove("active");
  toggleXIcon.className = "icon--md icon--silver";
  p1IsX = false;
  localStorage.setItem("p1-is-x", JSON.parse(p1IsX));
};

const handleVsAiClick = () => {
  vsAi = true;
  vsP2 = false;
  localStorage.setItem("vs-ai", JSON.parse(vsAi));
  localStorage.setItem("vs-p2", JSON.parse(vsP2));
  score1Text.textContent = p1IsX ? "X (YOU)" : "X (CPU)";
  score2Text.textContent = p1IsX ? "O (CPU)" : "O (YOU)";
  localStorage.setItem("score-1-text", score1Text.textContent);
  localStorage.setItem("score-2-text", score2Text.textContent);
  startGame();
};

const handleVsP2Click = () => {
  vsAi = false;
  vsP2 = true;
  localStorage.setItem("vs-ai", JSON.parse(vsAi));
  localStorage.setItem("vs-p2", JSON.parse(vsP2));
  score1Text.textContent = p1IsX ? "X (P1)" : "X (P2)";
  score2Text.textContent = p1IsX ? "O (P2)" : "O (P1)";
  localStorage.setItem("score-1-text", score1Text.textContent);
  localStorage.setItem("score-2-text", score2Text.textContent);
  startGame();
};

const handleSlotEnter = (event) => {
  if (window.innerWidth > 1280) {
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
      turnIndicatorSrc = "assets/icon-o.svg";
      localStorage.setItem("turn-indicator-src", turnIndicatorSrc);
      turnIndicator.src = turnIndicatorSrc;
      board[event.target.id] = "x";
      localStorage.setItem("board", JSON.stringify(board));
      checkCondition("x");
    } else {
      const oIcon = document.createElement("img");
      oIcon.src = "assets/icon-o.svg";
      oIcon.className = "o";
      event.target.appendChild(oIcon);
      turnIndicatorSrc = "assets/icon-x.svg";
      localStorage.setItem("turn-indicator-src", turnIndicatorSrc);
      turnIndicator.src = turnIndicatorSrc;
      board[event.target.id] = "o";
      localStorage.setItem("board", JSON.stringify(board));
      checkCondition("o");
    }
    event.target.style.pointerEvents = "none";
    if (vsAi) aiAction();
    else {
      isP1Turn = !isP1Turn;
      localStorage.setItem("is-p1-turn", isP1Turn);
    }
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
    xWins = 0;
    oWins = 0;
    nTies = 0;
    p1IsX = true;
    localStorage.setItem("x-wins", xWins);
    localStorage.setItem("o-wins", oWins);
    localStorage.setItem("n-ties", nTies);
    localStorage.setItem("p1-is-x", p1IsX);
    score1.textContent = xWins;
    ties.textContent = nTies;
    score2.textContent = oWins;
    gameResultModal.close();
    gameBoardPage.classList.add("hidden");
    newGamePage.classList.remove("hidden");
    gameStarted = false;
    gameEnded = false;
    localStorage.setItem("game-started", gameStarted);
    localStorage.setItem("game-ended", gameEnded);
  }
};

const handleButton2Click = () => {
  gameResultModal.close();
  gameEnded = false;
  localStorage.setItem("game-ended", gameEnded);
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
