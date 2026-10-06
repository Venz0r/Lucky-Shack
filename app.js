const symbols = ["🍒", "⭐", "💎", "🍀", "🍋", "🔔"];

const rewards = {
  "🍒": 150,
  "⭐": 100,
  "💎": 250,
  "🍀": 200,
  "🍋": 120,
  "🔔": 175
};

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const reels = [reel1, reel2, reel3];

const scoreElement = document.getElementById("score");
const bestElement = document.getElementById("best");
const roundsElement = document.getElementById("rounds");
const streakElement = document.getElementById("streak");
const messageElement = document.getElementById("message");
const playButton = document.getElementById("playButton");

let score = 0;
let best = 0;
let rounds = 0;
let streak = 0;

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateScreen() {
  scoreElement.textContent = score;
  bestElement.textContent = best;
  roundsElement.textContent = rounds;
  streakElement.textContent = streak;
}

function play() {
  if (playButton.disabled) return;

  playButton.disabled = true;
  messageElement.textContent = "Крутим...";

  reels.forEach(function(reel) {
    reel.classList.add("spinning");
  });

  let spins = 0;

  const animation = setInterval(function() {

    reels.forEach(function(reel) {
      reel.textContent = randomSymbol();
    });

    spins++;

    if (spins >= 15) {

      clearInterval(animation);

      const result = [
        randomSymbol(),
        randomSymbol(),
        randomSymbol()
      ];

      reels.forEach(function(reel, index) {
        reel.classList.remove("spinning");
        reel.textContent = result[index];
      });

      rounds++;

      const win =
        result[0] === result[1] &&
        result[1] === result[2];

      if (win) {

        const reward = rewards[result[0]] || 100;

        streak++;

        const bonus = streak >= 3 ? 50 : 0;

        const total = reward + bonus;

        score += total;

        if (score > best) {
          best = score;
        }

        messageElement.textContent =
          "Победа! +" + total + " очков 🎉";

        reels.forEach(function(reel) {
          reel.classList.add("win");
        });

        setTimeout(function() {
          reels.forEach(function(reel) {
            reel.classList.remove("win");
          });
        }, 500);

      } else {

        streak = 0;

        messageElement.textContent =
          "Почти! Попробуй ещё ✨";
      }

      updateScreen();

      setTimeout(function() {
        playButton.disabled = false;
      }, 300);
    }

  }, 80);
}

playButton.addEventListener("click", play);

updateScreen();

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}
