const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️", "💖", "💕", "🩺", "✨"]; // Added doctor & sparkle icons

/* --- CAKE PAGE LOGIC --- */
const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");
const cakePage = document.getElementById("cakePage");
const homePage = document.getElementById("home");

lightCandleBtn.addEventListener("click", () => {
    flame.style.display = "block";
    document.getElementById("candle").classList.add("lit");
    // Add a nice glow effect to the frosting when lit
    document.querySelector(".frosting.top").style.boxShadow = "0 0 20px rgba(255, 165, 0, 0.6)";
});

nextPageBtn.addEventListener("click", () => {
    cakePage.classList.remove("active");
    homePage.classList.add("active");

    if (!audio.src || audio.paused) {
        audio.src = "music/love.mp3";
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play blocked until user interaction"));
    }
});

/* --- PAGE NAVIGATION --- */
function startExperience(next) {
    showSection(next);
}

function showSection(id) {
    history.pushState({}, "", "#" + id);
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const activeSection = document.getElementById(id);
    activeSection.classList.add("active");

    // Auto-play videos in gallery if that's the current section
    activeSection.querySelectorAll("video").forEach(v => {
        v.muted = true;
        v.play().catch(() => {});
    });
}

/* --- FLOATING HEARTS --- */
setInterval(() => {
    const h = document.createElement("span");
    h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = "fixed";
    h.style.bottom = "-50px";
    h.style.left = 5 + Math.random() * 90 + "vw";
    h.style.fontSize = (15 + Math.random() * 15) + "px";
    h.style.transition = "transform 6s linear, opacity 6s linear";
    h.style.zIndex = "1000";
    container.appendChild(h);

    // Animate up
    setTimeout(() => {
        h.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
        h.style.opacity = "0";
    }, 100);

    setTimeout(() => h.remove(), 7000);
}, 500);

/* --- COUNTDOWN TIMER --- */
const birthday = new Date("2025-03-20T00:00:00").getTime();
setInterval(() => {
    const t = document.getElementById("timer");
    if (!t) return;
    const d = birthday - Date.now();
    if (d <= 0) {
        t.innerHTML = "🎉 HAPPY BIRTHDAY DOCTOR! 🎉";
        return;
    }
    const days = Math.floor(d / 86400000);
    const hours = Math.floor((d % 86400000) / 3600000);
    const mins = Math.floor((d % 3600000) / 60000);
    const secs = Math.floor((d % 60000) / 1000);
    
    t.innerHTML = `${days}d ${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
}, 1000);

/* --- LOVE REVEAL & CONFETTI --- */
function revealLove() {
    const text = "I LOVE YOU";
    const revealContainer = document.getElementById("loveReveal");
    revealContainer.innerHTML = "";
    revealContainer.style.display = "flex";
    
    let i = 0;
    const interval = setInterval(() => {
        const span = document.createElement("span");
        span.innerText = text[i];
        span.style.animation = "elegantFade 0.5s forwards";
        revealContainer.appendChild(span);
        i++;
        triggerConfetti();
        if (i >= text.length) clearInterval(interval);
    }, 300);
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiParticles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function Confetti() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.r = Math.random() * 6 + 4;
    this.d = Math.random() * canvas.height;
    // Doctor/Romantic theme colors
    const colors = ["#ff4d6d", "#ff85a1", "#ffffff", "#d00000"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.tilt = Math.floor(Math.random() * 10) - 10;
}

function triggerConfetti() {
    for (let i = 0; i < 20; i++) confettiParticles.push(new Confetti());
    if (confettiParticles.length <= 20) animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i];
        p.y += (Math.cos(p.d) + 1 + p.r / 2);
        p.x += Math.sin(p.d);
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r/2, 0, Math.PI * 2);
        ctx.fill();

        if (p.y > canvas.height) {
            confettiParticles.splice(i, 1);
            i--;
        }
    }
    if (confettiParticles.length > 0) requestAnimationFrame(animateConfetti);
}