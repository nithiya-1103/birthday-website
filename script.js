const music = document.getElementById("bgMusic");
const banner = document.getElementById("soundBanner");

window.onload = () => {
  if (music) {
    music.play().catch(() => {
      if (banner) banner.style.display = "block";
    });
  }
};

function enableSound() {
  music.play();
  banner.style.display = "none";
}

function go(page) {
  window.location.href = page;
}

// Countdown
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const now = new Date().getTime();
  const d = birthday - now;

  if (d < 0) {
    t.innerHTML = "🎂 Happy Birthday My Love 🎉";
    return;
  }

  const days = Math.floor(d / 86400000);
  const hours = Math.floor((d % 86400000) / 3600000);
  const mins = Math.floor((d % 3600000) / 60000);
  const secs = Math.floor((d % 60000) / 1000);

  t.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

function showLove() {
  document.getElementById("loveMessage").innerText =
    "I choose you. Always. Forever. 💖";
}
