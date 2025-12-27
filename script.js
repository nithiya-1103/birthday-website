const audio = document.getElementById("bgMusic");

/* Start music ONLY after click */
function startMusicOnce() {
  if (!localStorage.getItem("musicStarted")) {
    audio.volume = 0.7;
    audio.play().then(() => {
      localStorage.setItem("musicStarted", "true");
    }).catch(() => {});
  }
}

/* Resume on next pages */
window.addEventListener("load", () => {
  if (localStorage.getItem("musicStarted")) {
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }
});

function startExperience() {
  startMusicOnce();
  setTimeout(() => {
    window.location.href = "story.html";
  }, 300);
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
    setTimeout(() => s.remove(), 9000);
  }, 600);
}

/* Countdown */
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const d = birthday - Date.now();
  if (d <= 0) {
    t.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  t.innerHTML =
    Math.floor(d / 86400000) + "d " +
    Math.floor((d % 86400000) / 3600000) + "h " +
    Math.floor((d % 3600000) / 60000) + "m " +
    Math.floor((d % 60000) / 1000) + "s";
}, 1000);

function revealLove() {
  document.getElementById("loveReveal").style.display = "block";
}

