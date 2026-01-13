const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️", "💖", "💕", "🩺", "✨"];

const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");

/* LIGHT CANDLE */
lightCandleBtn.addEventListener("click", () => {
    flame.style.opacity = "1";
});

/* NEXT PAGE */
nextPageBtn.addEventListener("click", () => {
    showSection("home");
    startMusic();
});

/* NAVIGATION */
function startExperience(id) {
    showSection(id);
    startMusic();
}

function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* MUSIC */
function startMusic() {
    if (!audio.src) {
        audio.src = "music/love.mp3";
        audio.volume = 0.5;
        audio.play().catch(() => {});
    }
}

/* FLOATING HEARTS */
setInterval(() => {
    const h = document.createElement("span");
    h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = "fixed";
    h.style.bottom = "-40px";
    h.style.left = Math.random() * 95 + "vw";
    h.style.fontSize = "20px";
    h.style.transition = "transform 6s linear, opacity 6s linear";
    container.appendChild(h);

    setTimeout(() => {
        h.style.transform = "translateY(-110vh)";
        h.style.opacity = "0";
    }, 100);

    setTimeout(() => h.remove(), 7000);
}, 600);

/* FINAL LOVE */
function revealLove() {
    document.getElementById("loveReveal").innerText = "I LOVE YOU ❤️";
}
