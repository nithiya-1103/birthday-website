/* ================= BASIC ELEMENTS ================= */
const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️","💖","💕","💌","✨"];

/* ================= MUSIC (SMOOTH FADE IN) ================= */
function startMusic(){
    if(audio.src) return;
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
    document.querySelector(".cake").style.filter = "drop-shadow(0 0 25px rgba(255,180,120,0.7))";
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
        history.pushState({}, "", "#"+id);
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
    h.style.opacity = 0.8;

    container.appendChild(h);

    setTimeout(()=>{
        h.style.transform = `translateY(-110vh) scale(1.3)`;
        h.style.opacity = "0";
    },100);

    setTimeout(()=>h.remove(),7000);
},650);

/* ================= POLAROID CAPTIONS ================= */
const captions = [
    "Us 💕","My favorite smile","Always you",
    "Pure happiness","My safe place","Forever moment",
    "Love captured","Just us","Heartbeats",
    "Endless love","You & Me","Always mine"
];

document.querySelectorAll(".memory-card img").forEach((img,i)=>{
    const caption = document.createElement("div");
    caption.innerText = captions[i] || "Love";
    caption.style.fontFamily = "'Dancing Script', cursive";
    caption.style.color = "#b5172f";
    caption.style.marginTop = "10px";
    caption.style.fontSize = "1.05rem";
    caption.style.opacity = "0.85";
    img.parentElement.appendChild(caption);
});

/* ================= COUNTDOWN ================= */
const birthday = new Date("2025-03-20T00:00:00").getTime();

setInterval(()=>{
    const t = document.getElementById("timer");
    if(!t) return;

    const d = birthday - Date.now();
    if(d <= 0){
        t.innerHTML = "Happy Birthday Rowdyyy💋";
        return;
    }

    const days = Math.floor(d/86400000);
    const hours = Math.floor((d%86400000)/3600000);
    const mins = Math.floor((d%3600000)/60000);
    const secs = Math.floor((d%60000)/1000);

    t.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
},1000);

/* ================= FINAL LOVE LETTER ================= */
function revealLove(){
    const container = document.getElementById("loveReveal");
    container.innerHTML = "";
    container.style.display = "block";

    const text = "I LOVE YOU THANGOO";
    let i = 0;

    const interval = setInterval(()=>{
        const span = document.createElement("span");
        span.innerText = text[i];
        span.style.fontSize = "2.4rem";
        span.style.color = "#ff4d6d";
        span.style.fontFamily = "'Playfair Display', serif";
        span.style.opacity = "0";
        span.style.margin = "0 4px";

        container.appendChild(span);

        requestAnimationFrame(()=>{
            span.style.transition = "0.6s ease";
            span.style.opacity = "1";
            span.style.transform = "translateY(-5px)";
        });

        triggerConfetti();
        i++;

        if(i >= text.length) clearInterval(interval);
    },260);
}

/* ================= CONFETTI ================= */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function Confetti(){
    this.x = Math.random()*canvas.width;
    this.y = -20;
    this.size = Math.random()*6 + 4;
    this.speed = Math.random()*3 + 2;
    this.color = ["#ff8fab","#ffd6e0","#fff","#ff4d6d"][Math.floor(Math.random()*4)];
}

function triggerConfetti(){
    for(let i=0;i<15;i++) particles.push(new Confetti());
    animateConfetti();
}

function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{
        p.y += p.speed;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,p.size,p.size);
        if(p.y > canvas.height) particles.splice(i,1);
    });
    if(particles.length) requestAnimationFrame(animateConfetti);
}
// Envelope open logic
const envelope = document.querySelector(".envelope");
const openBtn = document.getElementById("openEnvelopeBtn");
const message = document.getElementById("envelopeMessage");

openBtn.addEventListener("click", () => {
    envelope.classList.add("open"); 
    message.style.overflowY = "auto"; // allow scrolling after opening
});


