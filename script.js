function realPic() {
  const id = Math.floor((Math.random() * 6 + 1) * 10000);
  return `https://whichfaceisreal.blob.core.windows.net/public/realimages/${id}.jpeg`;
}

const fakePic = "https://thispersondoesnotexist.com/";

const imgCon = document.getElementById("images");
const resultCon = document.getElementById("result");
const streakCon = document.getElementById("streak");
const feedbackDiv = document.getElementById("feedback");
const checkEmoji = document.getElementById("check-emoji");
const xEmoji = document.getElementById("x-emoji");
const playAgainBtn = document.getElementById("play-again-btn");

let currentStreak = 0;

function game() {
  imgCon.innerHTML = "";

  const randBool = Math.random() > 0.5;
  const arr = [randBool, !randBool];

  for (const isReal of arr) {
    const img = document.createElement("img");
    img.src = isReal ? realPic() : fakePic;
    imgCon.appendChild(img);

    img.onclick = function () {
      // Show feedback div with appropriate emoji
      if (isReal) {
        checkEmoji.style.display = "inline";
        xEmoji.style.display = "none";
        feedbackDiv.className = "";
      } else {
        checkEmoji.style.display = "none";
        xEmoji.style.display = "inline";
        feedbackDiv.className = "";
      }

      // Update game state
      if (isReal) {
        currentStreak++;
      } else {
        currentStreak = 0;
      }

      streakCon.textContent = `Streak: ${currentStreak}`;
    };
  }
}

// Set up play again button functionality
playAgainBtn.onclick = function() {
  feedbackDiv.className = "feedback-hidden";
  game();
};

const playAgain = document.createElement("button");
playAgain.textContent = "Play Again!";
playAgain.onclick = game;

game();
