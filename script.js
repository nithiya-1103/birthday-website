let musicReady = false;

/* Start experience */
function startExperience() {
  if (!musicReady) return;

  const frame = document.getElementById("musicFrame");
  frame.contentWindow.postMessage("playMusic", "*");

  setTimeout(() => {
    window.location.href = "story.html";
  }, 400);
}

function navigateTo(page) {
  window.location.href = page;
}

/* Floating hearts */
const symbols = ["❤️","💖","💕","💘"];
const container = document.querySelector(".letters");

if (container) {
  setInterval(() => {
    const s = document.createElement("span");
    s.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = 6 + Math.random() * 4 + "s";
    container.appendChild(s);
    setTimeout(() => s.remove(), 10000);
  }, 500);
}

/* Countdown */
const birthday = new Date("2025-03-20").getTime();

setInterval(() => {
  const timer = document.getElementById("timer");
  if (!timer) return;

  const diff = birthday - Date.now();
  if (diff <= 0) {
    timer.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  timer.innerHTML =
    Math.floor(diff / 86400000) + "d " +
    Math.floor((diff % 86400000) / 3600000) + "h " +
    Math.floor((diff % 3600000) / 60000) + "m " +
    Math.floor((diff % 60000) / 1000) + "s";
}, 1000);

/* Love reveal */
function revealLove() {
  document.getElementById("loveReveal").style.display = "block";
}
