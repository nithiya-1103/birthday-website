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

/* Countdown timer (optional) */
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const d = birthday - Date.now();
  if (d <= 0) {
    t.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  const pad = n => n.toString().padStart(2, "0");
  t.innerHTML =
    Math.floor(d / 86400000) + "d " +
    pad(Math.floor((d % 86400000) / 3600000)) + "h " +
    pad(Math.floor((d % 3600000) / 60000)) + "m " +
    pad(Math.floor((d % 60000) / 1000)) + "s";
}, 1000);

/* Navigation between pages */
function navigateTo(page) {
  window.location.href = page;
}
