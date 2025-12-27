const audio = document.getElementById("bgMusic");

/* ---------------- AUDIO ---------------- */
function startExperience() {
  audio.volume = 0.7;
  audio.play().catch(()=>{});
  showSection('story');
}

/* ---------------- SECTION NAVIGATION ---------------- */
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.style.display='none');
  document.getElementById(id).style.display='flex';
}

/* ---------------- FLOATING HEARTS ---------------- */
const symbols = ["❤️","💖","💕","💘"];
const container = document.querySelector(".letters");
if(container){
  setInterval(()=>{
    const s = document.createElement("span");
    s.innerText = symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left = Math.random()*100+"vw";
    s.style.animationDuration = 6 + Math.random()*4 + "s";
    container.appendChild(s);
    setTimeout(()=>s.remove(),9000);
  },600);
}

/* ---------------- COUNTDOWN ---------------- */
const birthday = new Date("2025-03-20").getTime();
setInterval(()=>{
  const t = document.getElementById("timer");
  if(!t) return;
  const diff = birthday - Date.now();
  if(diff<=0){ t.innerHTML="🎉 Today is your day 🎉"; return; }
  t.innerHTML=
    Math.floor(diff/86400000)+"d "+
    Math.floor((diff%86400000)/3600000)+"h "+
    Math.floor((diff%3600000)/60000)+"m "+
    Math.floor((diff%60000)/1000)+"s";
},1000);

/* ---------------- LOVE REVEAL ---------------- */
function revealLove(){
  const loveDiv = document.getElementById("loveReveal");
  loveDiv.classList.add("show");
}

/* ---------------- FIREWORKS ---------------- */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

function random(min,max){ return Math.random()*(max-min)+min; }

class Firework{
  constructor(x,y,targetY){
    this.x=x; this.y=y; this.targetY=targetY; this.color=`hsl(${random(0,360)},100%,50%)`; 
    this.exploded=false;
  }
  update(){
    if(this.y>this.targetY){ this.y -= 8; } 
    else if(!this.exploded){ this.explode(); this.exploded=true; }
  }
  explode(){ for(let i=0;i<50;i++){ particles.push(new Particle(this.x,this.y,this.color)); } }
  draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,3,this.exploded?0:Math.PI*2,false); ctx.fillStyle=this.color; ctx.fill(); }
}

class Particle{
  constructor(x,y,color){
    this.x=x; this.y=y; this.color=color;
    this.vx=random(-5,5); this.vy=random(-5,5); this.alpha=1;
  }
  update(){ this.x+=this.vx; this.y+=this.vy; this.alpha-=0.02; }
  draw(){ ctx.globalAlpha=this.alpha; ctx.beginPath(); ctx.arc(this.x,this.y,2,0,Math.PI*2,false); ctx.fillStyle=this.color; ctx.fill(); ctx.globalAlpha=1; }
}

function animate(){
  // Love-themed background for fireworks (no black)
  ctx.fillStyle = "rgba(255,240,243,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.05){ 
    fireworks.push(new Firework(random(0,canvas.width),canvas.height,random(canvas.height/2,canvas.height/3))); 
  }

  for(let f of fireworks){ f.update(); f.draw(); }
  fireworks = fireworks.filter(f=>!f.exploded);

  for(let p of particles){ p.update(); p.draw(); }
  particles = particles.filter(p=>p.alpha>0);

  requestAnimationFrame(animate);
}
animate();
