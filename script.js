const audio = document.getElementById("bgMusic");

/* ---------------- AUDIO ---------------- */
function startExperience() {
  audio.volume = 0.7;
  audio.play().catch(() => {});
  showSection('story');
}

/* ---------------- SECTION NAVIGATION ---------------- */
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

/* ---------------- FLOATING HEARTS ---------------- */
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

/* ---------------- COUNTDOWN ---------------- */
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const diff = birthday - Date.now();
  if (diff <= 0) {
    t.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  t.innerHTML =
    Math.floor(diff / 86400000) + "d " +
    Math.floor((diff % 86400000) / 3600000) + "h " +
    Math.floor((diff % 3600000) / 60000) + "m " +
    Math.floor((diff % 60000) / 1000) + "s";
}, 1000);

/* ---------------- LOVE REVEAL ---------------- */
function revealLove() {
  document.getElementById("loveReveal").style.display = "block";
}
