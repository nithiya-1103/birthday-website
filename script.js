const audio = document.getElementById("bgMusic");
const container = document.querySelector(".letters");
const hearts = ["❤️","💖","💕","🩺","✨"];

/* --- CAKE LOGIC --- */
const lightCandleBtn = document.getElementById("lightCandleBtn");
const flame = document.getElementById("flame");
const nextPageBtn = document.getElementById("nextPageBtn");

lightCandleBtn?.addEventListener("click",()=>{
    flame.style.display="block";
    document.getElementById("candle").classList.add("lit");
    document.querySelector(".frosting.top").style.boxShadow="0 0 20px rgba(255,165,0,0.6)";
});

nextPageBtn?.addEventListener("click",()=>{ showSection('home'); startMusic(); });

/* --- NAVIGATION --- */
function startExperience(next){ showSection(next); startMusic(); }

function showSection(id){
    history.pushState({}, "", "#"+id);
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    const active = document.getElementById(id);
    if(active){ 
        active.classList.add("active"); 
        if(id==='gallery'){ document.getElementById("memoryGrid").scrollTop=0; }
        active.querySelectorAll("video").forEach(v=>{ v.style.opacity=0; v.play().then(()=>{ v.style.transition="opacity 1s ease"; v.style.opacity=1; }).catch(()=>{}); });
    }
}

/* --- MUSIC --- */
function startMusic(){
    if(!audio.src || audio.paused){
        audio.src="music/love.mp3";
        audio.volume=0.5; audio.play().catch(()=>console.log("Music blocked"));
    }
}

/* --- FLOATING HEARTS --- */
setInterval(()=>{
    const h=document.createElement("span");
    h.innerText=hearts[Math.floor(Math.random()*hearts.length)];
    h.classList.add("floating-heart");
    h.style.position="fixed"; h.style.bottom="-50px";
    h.style.left=Math.random()*95+"vw";
    h.style.fontSize=(15+Math.random()*20)+"px";
    h.style.transition="transform 6s linear, opacity 6s linear";
    h.style.zIndex="1000"; h.style.pointerEvents="none";
    container.appendChild(h);
    setTimeout(()=>{ h.style.transform=`translateY(-110vh) rotate(${Math.random()*360}deg)`; h.style.opacity="0"; },100);
    setTimeout(()=>h.remove(),7000);
},500);

/* --- BIRTHDAY COUNTDOWN --- */
const birthday = new Date("2025-03-20T00:00:00").getTime();
setInterval(()=>{
    const t=document.getElementById("timer"); if(!t) return;
    const d = birthday - Date.now();
    if(d<=0){ t.innerHTML="🎉 HAPPY BIRTHDAY DOCTOR! 🎉"; return; }
    const days=Math.floor(d/86400000), hours=Math.floor((d%86400000)/3600000),
          mins=Math.floor((d%3600000)/60000), secs=Math.floor((d%60000)/1000);
    t.innerHTML=`${days}d ${hours.toString().padStart(2,'0')}h ${mins.toString().padStart(2,'0')}m ${secs.toString().padStart(2,'0')}s`;
},1000);

/* --- FINAL SURPRISE & CONFETTI --- */
function revealLove(){
    const text="I LOVE YOU";
    const container=document.getElementById("loveReveal");
    if(!container) return;
    container.innerHTML=""; container.style.display="flex";
    let i=0; const interval=setInterval(()=>{
        const span=document.createElement("span"); span.innerText=text[i];
        span.style.animation="elegantFade 0.5s forwards";
        container.appendChild(span); i++; triggerConfetti();
        if(i>=text.length) clearInterval(interval);
    },300);
}

/* --- CONFETTI --- */
const canvas=document.getElementById("confettiCanvas");
const ctx=canvas.getContext("2d");
let confettiParticles=[];
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize',resizeCanvas); resizeCanvas();

function Confetti(){ 
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height - canvas.height;
    this.r=Math.random()*6+4;
    this.d=Math.random()*canvas.height;
    const colors=["#ff4d6d","#ff85a1","#ffffff","#d00000"];
    this.color=colors[Math.floor(Math.random()*colors.length)];
}
function triggerConfetti(){ for(let i=0;i<20;i++) confettiParticles.push(new Confetti()); if(confettiParticles.length===20) animateConfetti(); }
function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<confettiParticles.length;i++){
        let p=confettiParticles[i];
        p.y+=(Math.cos(p.d)+1+p.r/2); p.x+=Math.sin(p.d);
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(Math.random()*Math.PI);
        ctx.fillStyle=p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r); ctx.restore();
        if(p.y>canvas.height){ confettiParticles.splice(i,1); i--; }
    }
    if(confettiParticles.length>0) requestAnimationFrame(animateConfetti);
}
