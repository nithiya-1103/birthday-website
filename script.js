const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️", "💖", "💕", "🩺", "✨"]; 

/* --- 1. CAKE PAGE LOGIC --- */
const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");

if (lightCandleBtn) {
    lightCandleBtn.addEventListener("click", () => {
        flame.style.display = "block";
        document.getElementById("candle").classList.add("lit");
        // Add glow to the frosting
        document.querySelector(".frosting.top").style.boxShadow = "0 0 20px rgba(255, 165, 0, 0.6)";
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener("click", () => {
        showSection('home');
        startMusic();
    });
}

/* --- 2. NAVIGATION & FILM STRIP SCROLL RESET --- */
function startExperience(next) {
    showSection(next);
    startMusic();
}

function showSection(id) {
    // Update URL hash for back-button support
    history.pushState({}, "", "#" + id);
    
    // Hide all sections and show current
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const activeSection = document.getElementById(id);
    
    if (activeSection) {
        activeSection.classList.add("active");

        // CRITICAL: Reset the Film Strip scroll to the top when she enters
        if (id === 'gallery') {
            const grid = document.getElementById("memoryGrid");
            if (grid) grid.scrollTop = 0;
        }

        // Auto-play videos inside the film cards
        activeSection.querySelectorAll("video").forEach(v => {
            v.muted = true;
            v.play().catch(() => {});
        });
    }
}

/* --- 3. MUSIC CONTROL --- */
function startMusic() {
    if (!audio.src || audio.paused) {
        audio.src = "music/love.mp3"; // Ensure this path is correct
        audio.volume = 0.5;
        audio.play().catch(() => console.log("Music blocked until user clicks"));
    }
}

/* --- 4. FLOATING ELEMENTS (HEARTS & DOCTOR EMOJIS) --- */
setInterval(() => {
    const h = document.createElement("span");
    h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = "fixed";
    h.style.bottom = "-50px";
    h.style.left = Math.random() * 95 + "vw";
    h.style.fontSize = (15 + Math.random() * 20) + "px";
    h.style.transition = "transform 6s linear, opacity 6s linear";
    h.style.zIndex = "1000";
    h.style.pointerEvents = "none";
    container.appendChild(h);

    setTimeout(() => {
        h.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
        h.style.opacity = "0";
    }, 100);

    setTimeout(() => h.remove(), 7000);
}, 500);

/* --- 5. BIRTHDAY COUNTDOWN --- */
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

/* --- 6. FINAL SURPRISE & CONFETTI --- */
function revealLove() {
    const text = "I LOVE YOU";
    const revealContainer = document.getElementById("loveReveal");
    if (!revealContainer) return;
    
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
    const colors = ["#ff4d6d", "#ff85a1", "#ffffff", "#d00000"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
}

function triggerConfetti() {
    for (let i = 0; i < 20; i++) confettiParticles.push(new Confetti());
    if (confettiParticles.length === 20) animateConfetti();
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