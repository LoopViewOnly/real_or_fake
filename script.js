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
let isAnswered = false; // lock flag

function game() {
  imgCon.innerHTML = "";
  isAnswered = false; // reset lock for new round

  const randBool = Math.random() > 0.5;
  const arr = [randBool, !randBool];

  for (const isReal of arr) {
    const img = document.createElement("img");
    img.src = isReal ? realPic() : fakePic;
    imgCon.appendChild(img);

    img.onclick = function () {
      if (isAnswered) return; // 🚫 ignore extra clicks
      isAnswered = true;

      // Show feedback
      if (isReal) {
        checkEmoji.style.display = "inline";
        xEmoji.style.display = "none";
        feedbackDiv.className = "";
        currentStreak++;
      } else {
        checkEmoji.style.display = "none";
        xEmoji.style.display = "inline";
        feedbackDiv.className = "";
        currentStreak = 0;
      }

      streakCon.textContent = `Streak: ${currentStreak}`;
    };
  }
}

// Play again button
playAgainBtn.onclick = function () {
  feedbackDiv.className = "feedback-hidden";
  game();
};

// Start first game
game();
