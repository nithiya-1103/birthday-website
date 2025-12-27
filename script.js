// Countdown Timer
const birthday = new Date("2025-03-20").getTime(); // CHANGE DATE

setInterval(() => {
    const now = new Date().getTime();
    const diff = birthday - now;

    if (diff < 0) {
        document.getElementById("timer").innerHTML = "🎂 Happy Birthday My Love 🎉";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Play Music
function playMusic() {
    document.getElementById("bgMusic").play();
    document.getElementById("musicPopup").style.display = "none";
}

// Surprise Message
function showLove() {
    document.getElementById("loveMessage").innerText =
        "I fell for you slowly, then all at once 💖";
}

// Floating Hearts
setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "0";
    heart.style.fontSize = "24px";
    heart.style.animation = "float 4s linear";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}, 600);

// Heart Animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes float {
    to {
        transform: translateY(-100vh);
        opacity: 0;
    }
}`;
document.head.appendChild(style);
