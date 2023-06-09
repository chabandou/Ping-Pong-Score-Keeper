let p1 = {
  score: 0,
  display: document.querySelector("#p1Display"),
  btn: document.querySelector("#p1Plus"),
  color: "rgb(4, 185, 110)",
  roundsWon: 0,
};
let p2 = {
  score: 0,
  display: document.querySelector("#p2Display"),
  btn: document.querySelector("#p2Plus"),
  color: "rgb(62, 115, 205)",
  roundsWon: 0,
};

const resetBtn = document.querySelector("#reset");
const chosenScore = document.querySelector("#maxScore");
const botToggle = document.querySelector("#botToggle");
let rounds = document.querySelector(".rounds");
let roundsFull = document.querySelectorAll(".rounds-full");
let roundsPlayed = 0;

let roundsShapes = {
  r1Empty: document.querySelector("#r1Empty"),
  r2Empty: document.querySelector("#r2Empty"),
  r3Empty: document.querySelector("#r3Empty"),
  r1Full: document.querySelector("#r1Full"),
  r1Path: r1Full.querySelector("#r1Full path"),
  r2Full: document.querySelector("#r2Full"),
  r2Path: r2Full.querySelector("#r2Full path"),
  r3Full: document.querySelector("#r3Full"),
  r3Path: r3Full.querySelector("#r3Full path"),
};

rounds.style.display = "none";

let winningScore = parseInt(chosenScore.value);
let isGameOver = false;

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.innerText = 0;
    p.btn.disabled = false;
    p.display.classList.remove("winner", "loser");
    p.roundsWon = 0;
  }
  if (rounds.style.display === "block") {
        roundsShapes.r1Empty.style.display = "inline";
        roundsShapes.r1Full.style.display = "none";
        roundsShapes.r2Empty.style.display = "inline";
        roundsShapes.r2Full.style.display = "none";
        roundsShapes.r3Empty.style.display = "inline";
        roundsShapes.r3Full.style.display = "none";
        roundsPlayed = 0
    }
  }
function softReset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.innerText = 0;
    p.btn.disabled = false;
    p.display.classList.remove("winner", "loser");
  }
}



chosenScore.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

function updateScore(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (rounds.style.display === "none") {
      if (winningScore === player.score) {
        if (player.score - opponent.score < 2) {
          winningScore += 1;
        } else {
          isGameOver = true;
          player.display.classList.add("winner");
          opponent.display.classList.add("loser");
          opponent.btn.disabled = true;
          player.btn.disabled = true;
        }
      }
    }
    if (rounds.style.display === "block") {
      if (winningScore === player.score) {
        if (player.score - opponent.score < 2) {
          winningScore += 1;
        } else {
          if (roundsPlayed < 3) {
            if (roundsPlayed === 0) {

                roundsShapes.r1Empty.style.display = "none";
                roundsShapes.r1Full.style.display = "inline";
                if (player.score > opponent.score) {
                  roundsShapes.r1Path.setAttribute("fill", player.color);
                  player.roundsWon += 1
                } else {
                  roundsShapes.r1Path.setAttribute("fill", opponent.color);
                  opponent.roundsWon += 1
                }
                softReset()
            } else if (roundsPlayed === 1) {
                roundsShapes.r2Empty.style.display = "none";
                roundsShapes.r2Full.style.display = "inline";
                if (player.score > opponent.score) {
                  roundsShapes.r2Path.setAttribute("fill", player.color);
                  player.roundsWon += 1
                } else {
                  roundsShapes.r2Path.setAttribute("fill", opponent.color);
                  opponent.roundsWon += 1
                }
                if (player.roundsWon >= 2 || opponent.roundsWon >= 2) {
                    isGameOver = true;
                    player.display.classList.add("winner");
                    opponent.display.classList.add("loser");
                    opponent.btn.disabled = true;
                    player.btn.disabled = true;
                } else {
                    softReset()
                }
            } else if (roundsPlayed === 2) {
                roundsShapes.r3Empty.style.display = "none";
                roundsShapes.r3Full.style.display = "inline";
                if (player.score > opponent.score) {
                  roundsShapes.r3Path.setAttribute("fill", player.color);
                } else {
                  roundsShapes.r3Path.setAttribute("fill", opponent.color);
                }
                isGameOver = true;
                player.display.classList.add("winner");
                opponent.display.classList.add("loser");
                opponent.btn.disabled = true;
                player.btn.disabled = true;
            }
            roundsPlayed += 1;
          }
        }
      }
    }
    player.display.innerText = player.score;
  }
}

p1.btn.addEventListener("click", function () {
  updateScore(p1, p2);
});

p2.btn.addEventListener("click", function () {
  updateScore(p2, p1);
});

botToggle.addEventListener("change", function () {
  if (rounds.style.display === "none") {
    rounds.style.display = "block";
  } else {
    rounds.style.display = "none";
  }
  reset();
});

resetBtn.addEventListener("click", reset);
