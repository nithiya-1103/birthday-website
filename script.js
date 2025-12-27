/* Floating Hearts & Petals */
const symbols = ["❤️","💖","💕","💘","💌","💝"];
const container = document.querySelector(".letters");

if (container) {
  setInterval(() => {
    const s = document.createElement("span");
    s.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 12 + Math.random() * 24 + "px";
    s.style.animationDuration = 6 + Math.random() * 5 + "s";
    container.appendChild(s);
    setTimeout(() => s.remove(), 9000);
  }, 400); // more frequent
}

/* Music */
function startExperience() {
  const musicFrame = document.getElementById("musicFrame");
  if (musicFrame) musicFrame.contentWindow.postMessage("play", "*");
  setTimeout(() => {
    window.location.href = "story.html";
  }, 300);
}

function navigateTo(page) {
  window.location.href = page;
}

/* Countdown (if used later) */
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;
  const d = birthday - Date.now();
  if (d <= 0) { t.innerHTML = "🎉 Today is your day 🎉"; return; }
  t.innerHTML =
    Math.floor(d / 86400000) + "d " +
    Math.floor((d % 86400000) / 3600000) + "h " +
    Math.floor((d % 3600000) / 60000) + "m " +
    Math.floor((d % 60000) / 1000) + "s";
}, 1000);

/* Love Reveal */
function revealLove() {
  document.getElementById("loveReveal").style.display = "block";
}
