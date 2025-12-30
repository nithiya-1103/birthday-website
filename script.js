const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️","💖","💕","🩺","👩‍⚕️","✨"];

/* Particles Background */
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 30 },
        "color": { "value": "#ffffff" },
        "shape": { "type": "heart" },
        "opacity": { "value": 0.3 },
        "size": { "value": 4 },
        "move": { "speed": 1.5 }
    }
});

/* CAKE PAGE LOGIC */
document.getElementById("lightCandleBtn").addEventListener("click", function() {
    document.getElementById("flame").style.display = "block";
    this.innerText = "✨ MAGICAL ✨";
    this.style.opacity = "0.7";
});

document.getElementById("nextPageBtn").addEventListener("click", function() {
    if(!audio.src) {
        audio.src = "music/love.mp3"; // Ensure this path is correct
        audio.play().catch(e => console.log("Audio waiting for interaction"));
    }
    showSection('home');
});

/* NAVIGATION */
function startExperience(id) { showSection(id); }

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    
    // Auto-play videos in gallery
    if(id === 'gallery') {
        document.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
    }
}

/* POLAROID TILT */
document.querySelectorAll('.memory-card').forEach(card => {
    const randomRotation = Math.floor(Math.random() * 10 - 5) + "deg";
    card.style.setProperty('--r', randomRotation);
});

/* FLOATING HEARTS (Manual override for extra love) */
setInterval(() => {
    const h = document.createElement("span");
    h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (15 + Math.random() * 20) + "px";
    h.style.animationDuration = (5 + Math.random() * 5) + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), 8000);
}, 600);

/* FINAL LOVE REVEAL */
function revealLove() {
    const reveal = document.getElementById("loveReveal");
    reveal.innerHTML = "<h2>I LOVE YOU FOREVER ❤️</h2>";
    reveal.style.display = "block";
    triggerConfetti();
    if (navigator.vibrate) navigator.vibrate(100);
}

/* CONFETTI LOGIC (Simplified for performance) */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function triggerConfetti() {
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 10,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    }
    drawConfetti();
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.y += 3;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if(p.y > canvas.height) particles.splice(i, 1);
    });
    if(particles.length > 0) requestAnimationFrame(drawConfetti);
}
// Add this to the bottom of your script.js
document.querySelectorAll('.memory-card').forEach(card => {
  const randomRotation = Math.floor(Math.random() * 10 - 5) + "deg";
  card.style.setProperty('--r', randomRotation);
});