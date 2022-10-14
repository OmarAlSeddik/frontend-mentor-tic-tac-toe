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
const ties = document.getElementById("ties");

let p1IsX = true;
let vsAi = false;
let vsP2 = false;
let isP1Turn = false;

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

const startGame = () => {
  newGamePage.classList.add("hidden");
  gameBoardPage.classList.remove("hidden");
  score1.innerHTML = 0;
  score2.innerHTML = 0;
  ties.innerHTML = 0;
  for (const slot of slots) {
    slot.innerHTML = "";
  }
  if (p1IsX) isP1Turn = true;
};

const handleVsAiClick = () => {
  vsAi = true;
  startGame();
};

const handleVsP2Click = () => {
  vsP2 = true;
  startGame();
};

const handleSlotEnter = (event) => {
  if (isP1Turn && p1IsX) {
    const xOutline = document.createElement("img");
    xOutline.src = "assets/icon-x-outline.svg";
    event.target.appendChild(xOutline);
  }
  if (isP1Turn && !p1IsX) {
    const oOutline = document.createElement("img");
    oOutline.src = "assets/icon-o-outline.svg";
    event.target.appendChild(oOutline);
  }
};

const handleSlotLeave = (event) => {
  if (event.target.children.length > 0)
    event.target.removeChild(event.target.firstChild);
};

toggleButtonX.addEventListener("click", handleToggleClickX);
toggleButtonO.addEventListener("click", handleToggleClickO);
vsAiButton.addEventListener("click", handleVsAiClick);
vsP2Button.addEventListener("click", handleVsP2Click);
for (const slot of slots) {
  slot.addEventListener("mouseenter", handleSlotEnter);
  slot.addEventListener("mouseleave", handleSlotLeave);
}
