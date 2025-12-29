const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️","💖","💕","💘"];

/* ================= CAKE PAGE ================= */
/* ================= CAKE PAGE ================= */
const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");
const cakePage = document.getElementById("cakePage");
const homePage = document.getElementById("home");

/* Light candle and start music */
lightCandleBtn.addEventListener("click", ()=>{
  flame.style.display = "block";                // show flame
  document.getElementById("candle").classList.add("lit"); // optional glow effect

  if(!audio.src){                               // play music if not already playing
    audio.src = "music/love.mp3";
    audio.volume = 0.7;
    audio.play().catch(()=>{});                 // catch autoplay errors
  }
});


/* ================= MUSIC ================= */
function startExperience(next){
  if(!audio.src){
    audio.src = "music/love.mp3";
    audio.volume = 0.7;
    audio.play().catch(()=>{});
  }
  showSection(next);
}

/* ================= PAGE NAVIGATION ================= */
function showSection(id){
  history.pushState({}, "", "#" + id);
  document.querySelectorAll(".section").forEach(sec=> sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll("video").forEach(v=>{ v.muted=true; v.play().catch(()=>{}); });
}

/* ================= FLOATING HEARTS ================= */
setInterval(()=>{
  const h = document.createElement("span");
  h.innerText = hearts[Math.floor(Math.random()*hearts.length)];
  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = (12 + Math.random()*12) + "px";
  h.style.transform = `rotate(${Math.random()*360}deg)`;
  h.style.animationDuration = 6 + Math.random()*4 + "s";
  container.appendChild(h);
  setTimeout(()=>h.remove(), 9000);
}, 500);

/* ================= COUNTDOWN TIMER ================= */
const birthday = new Date("2025-03-20").getTime();
setInterval(()=>{
  const t = document.getElementById("timer");
  if(!t) return;
  const d = birthday - Date.now();
  if(d <= 0){ t.innerHTML="🎉 Today is your day 🎉"; return; }
  const pad = n=>n.toString().padStart(2,"0");
  t.innerHTML = Math.floor(d/86400000)+"d "+ pad(Math.floor((d%86400000)/3600000))+"h "+ pad(Math.floor((d%3600000)/60000))+"m "+ pad(Math.floor((d%60000)/1000))+"s";
},1000);

/* ================= LOVE REVEAL (Typewriter Effect) ================= */
function revealLove(){
  const text = "I LOVE YOU";
  const container = document.getElementById("loveReveal");
  container.innerHTML = "";
  container.style.display = "flex";
  let i = 0;
  const interval = setInterval(()=>{
    const span = document.createElement("span");
    span.innerText = text[i];
    container.appendChild(span);
    i++;
    if(i >= text.length) clearInterval(interval);
    triggerConfetti();
  }, 400);
}

/* ================= CONFETTI ================= */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiParticles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Confetti(){ 
  this.x = Math.random()*canvas.width;
  this.y = Math.random()*canvas.height- canvas.height;
  this.r = Math.random()*6+4;
  this.d = Math.random()*canvas.height;
  this.color = hearts[Math.floor(Math.random()*hearts.length)];
  this.tilt = Math.floor(Math.random()*10)-10;
}

function triggerConfetti(){
  for(let i=0;i<30;i++) confettiParticles.push(new Confetti());
  animateConfetti();
}

function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<confettiParticles.length;i++){
    let p = confettiParticles[i];
    p.y += (Math.cos(p.d) + 1 + p.r/2);
    p.x += Math.sin(p.d);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);
    ctx.lineTo(p.x+p.tilt,p.y+p.r);
    ctx.stroke();
    if(p.y>canvas.height) confettiParticles.splice(i,1);
  }
  if(confettiParticles.length>0) requestAnimationFrame(animateConfetti);
}

/* ================= AUTOPLAY VIDEOS ================= */
document.querySelectorAll("video").forEach(v=>{ v.muted=true; v.play().catch(()=>{}); });
