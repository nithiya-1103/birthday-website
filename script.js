function startMusicAndGo() {
  const frame = document.getElementById("musicFrame");
  frame.contentWindow.postMessage("playMusic", "*");
  setTimeout(() => window.location.href = "story.html", 300);
}

function go(page) {
  window.location.href = page;
}

/* Floating love letters */
const lettersArr = ["❤️","💖","💕","💘","💞","💌"];
const container = document.querySelector(".letters");

if (container) {
  setInterval(() => {
    const span = document.createElement("span");
    span.innerText = lettersArr[Math.floor(Math.random()*lettersArr.length)];
    span.style.left = Math.random()*100 + "vw";
    span.style.animationDuration = 5 + Math.random()*5 + "s";
    container.appendChild(span);
    setTimeout(() => span.remove(), 10000);
  }, 300);
}

/* Countdown */
const birthday = new Date("2025-03-20").getTime();
setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const d = birthday - Date.now();
  if (d <= 0) {
    t.innerHTML = "🎉 TODAY IS YOUR DAY 🎉";
    launchFireworks();
    return;
  }

  t.innerHTML =
    Math.floor(d / 86400000) + "d " +
    Math.floor((d % 86400000) / 3600000) + "h " +
    Math.floor((d % 3600000) / 60000) + "m " +
    Math.floor((d % 60000) / 1000) + "s";
}, 1000);

/* I LOVE YOU */
function showLove() {
  document.getElementById("loveAnimation").classList.add("show");
  launchFireworks();
}

/* Fireworks */
function launchFireworks() {
  for (let i = 0; i < 25; i++) {
    const fire = document.createElement("div");
    fire.innerText = "🎆";
    fire.style.position = "fixed";
    fire.style.left = Math.random()*100 + "vw";
    fire.style.top = Math.random()*100 + "vh";
    fire.style.fontSize = "2.5rem";
    document.body.appendChild(fire);
    setTimeout(() => fire.remove(), 2000);
  }
}
