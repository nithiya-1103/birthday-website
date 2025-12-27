function go(page) {
  window.location.href = page;
}

// Typing animation
const text = document.querySelector(".type");
if (text) {
  const msg = text.innerText;
  let i = 0;
  text.innerText = "";
  setInterval(() => {
    if (i < msg.length) {
      text.innerText += msg.charAt(i);
      i++;
    }
  }, 80);
}

// Countdown
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;
  const d = birthday - Date.now();
  if (d <= 0) {
    t.innerHTML = "🎂 Happy Birthday 🎉";
    return;
  }
  t.innerHTML =
    Math.floor(d / 86400000) + "d " +
    Math.floor((d % 86400000) / 3600000) + "h " +
    Math.floor((d % 3600000) / 60000) + "m " +
    Math.floor((d % 60000) / 1000) + "s";
}, 1000);

function showLove() {
  document.getElementById("loveText").innerText =
    "I love you more than words can ever say 💖";
}
