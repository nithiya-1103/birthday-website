/* ================= BASIC ELEMENTS ================= */
const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️","💖","💕","💌","✨"];

/* ================= MUSIC (SMOOTH FADE IN) ================= */
function startMusic(){
    if (!audio || !audio.paused) return;

    audio.src = "music/love.mp3";
    audio.volume = 0;
    audio.play().catch(()=>{});

    let vol = 0;
    const fade = setInterval(()=>{
        if(vol >= 0.5){
            clearInterval(fade);
        } else {
            vol += 0.02;
            audio.volume = vol;
        }
    },120);
}

/* ================= CAKE ================= */
const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");

lightCandleBtn?.addEventListener("click",()=>{
    flame.style.display = "block";
    flame.style.animation = "flicker 0.15s infinite alternate";
    document.querySelector(".cake").style.filter =
        "drop-shadow(0 0 25px rgba(255,180,120,0.7))";
});

nextPageBtn?.addEventListener("click",()=>{
    showSection("home");
    startMusic();
});

/* ================= NAVIGATION ================= */
function startExperience(next){
    showSection(next);
    startMusic();
}

function showSection(id){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    const active = document.getElementById(id);
    if(active){
        active.classList.add("active");
        history.replaceState({}, "", "#"+id);
    }
}

/* ================= FLOATING HEARTS ================= */
setInterval(()=>{
    if(container.childElementCount > 22) return;

    const h = document.createElement("span");
    h.innerText = hearts[Math.floor(Math.random()*hearts.length)];
    h.className = "floating-heart";
    h.style.left = Math.random()*90 + "vw";
    h.style.bottom = "-40px";
    h.style.fontSize = (14 + Math.random()*16) + "px";

    container.appendChild(h);
    setTimeout(()=>h.remove(),7000);
},650);

/* ================= POLAROID CAPTIONS ================= */
const captions = [
    "My First Love [22/03/2024]😌❤️","Our First Dating[11/05/2024]🤭","I searched for love, and I found you✨[28/03/2025]",
    "Not in arms, but in safe hands and pure love 💘[23/08/2025]",
    "இவன் இல்லா வாழ்க்கையே ஒரு பிழை என்று நான் உணா்கிறேன்😭💌[18/06/2025]","Forever Minee👩‍❤️‍💋‍👨[10/07/2024]","Just us😘[06/09/2025]","His love towards me is priceless🫶💞[20/12/2024]",
    "Personal Doctor aee😌😁[19/11/2024]","Small Bd gift,big happiness🤌[13/03/2025]","You + Me + Bikeride=🥹💕[16/09/2025]","Your last touch before Long distance🥺❤️‍🩹[24/09/2025]"
];

document.querySelectorAll(".memory-card img").forEach((img,i)=>{
    const caption = document.createElement("div");
    caption.textContent = captions[i] || "Love";
    caption.style.cssText = `
        font-family:font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        color: #b5172f;
        margin-top: 10px;
        font-size: 1.05rem;
        opacity: 0.85;
    `;
    img.parentElement.appendChild(caption);
});
/* ================= COUNTDOWN ================= */

const birthday = new Date("2026-01-01T00:00:00").getTime(); 
// 🔺 Change date & time if needed

setInterval(() => {
    const t = document.getElementById("timer");
    if (!t) return;

    const now = new Date().getTime();
    const d = birthday - now;

    if (d <= 0) {
        t.innerHTML = "Happy Birthday Rowdyyy 💋🎂";
        return;
    }

    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((d / (1000 * 60)) % 60);
    const secs = Math.floor((d / 1000) % 60);

    t.innerHTML = `
        <b>${days}</b> Days 
        <b>${hours}</b> Hours 
        <b>${mins}</b> Mins 
        <b>${secs}</b> Secs ❤️
    `;
}, 1000);

/* ================= FINAL LOVE LETTER ================= */
function revealLove(){
    const box = document.getElementById("loveReveal");
    box.innerHTML = "";
    box.style.display = "block";

    const text = "I LOVE YOU THANGOO...";
    let i = 0;

    const interval = setInterval(()=>{
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.cssText = `
            font-size: 1.8rem;
            color: #ff4d6d;
            font-family:Cursive;
            margin: 0 4px;
            opacity: 0;
        `;
        box.appendChild(span);

        requestAnimationFrame(()=>{
            span.style.transition = "0.6s ease";
            span.style.opacity = "1";
            span.style.transform = "translateY(-5px)";
        });

        addConfetti();
        i++;
        if(i >= text.length) clearInterval(interval);
    },260);
}

/* ================= CONFETTI ================= */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let confettiRunning = false;

function resizeCanvas(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

function Confetti(){
    this.x = Math.random()*canvas.width;
    this.y = -20;
    this.size = Math.random()*6 + 4;
    this.speed = Math.random()*3 + 2;
    this.color = ["#ff8fab","#ffd6e0","#fff","#ff4d6d"]
        [Math.floor(Math.random()*4)];
}

function addConfetti(){
    for(let i=0;i<12;i++) particles.push(new Confetti());
    if(!confettiRunning){
        confettiRunning = true;
        animateConfetti();
    }
}

function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{
        p.y += p.speed;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,p.size,p.size);
        if(p.y > canvas.height) particles.splice(i,1);
    });
    if(particles.length){
        requestAnimationFrame(animateConfetti);
    } else {
        confettiRunning = false;
    }
}

/* ================= ENVELOPE ================= */
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openEnvelopeBtn");

openBtn?.addEventListener("click",()=>{
    envelope.classList.toggle("open");
    openBtn.textContent =
        envelope.classList.contains("open") ? "Close 💖" : "Open 💌";
});
