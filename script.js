const audio = document.getElementById("bgMusic");
const memoryGrid = document.getElementById("memoryGrid");

/* MUSIC – plays once */
function startExperience(next){
  if(!audio.src){
    audio.src = "music/love.mp3";
    audio.volume = 0.7;
    audio.play().catch(()=>{});
  }
  showSection(next);
}

/* PAGE-LIKE NAVIGATION */
function showSection(id){
  history.pushState({}, "", "#" + id);

  document.querySelectorAll(".section").forEach(s=>{
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* FLOATING HEARTS */
const hearts = ["❤️","💖","💕","💘"];
const container = document.querySelector(".letters");

setInterval(()=>{
  const h = document.createElement("span");
  h.innerText = hearts[Math.floor(Math.random()*hearts.length)];
  h.style.left = Math.random()*100 + "vw";
  h.style.animationDuration = 6 + Math.random()*4 + "s";
  container.appendChild(h);
  setTimeout(()=>h.remove(), 9000);
}, 700);

/* VIDEO HOVER PLAY */
memoryGrid?.addEventListener("mouseover", e=>{
  const v = e.target.closest("video");
  if(v) v.play().catch(()=>{});
});
memoryGrid?.addEventListener("mouseout", e=>{
  const v = e.target.closest("video");
  if(v) v.pause();
});

/* COUNTDOWN */
const birthday = new Date("2025-03-20").getTime();
setInterval(()=>{
  const t = document.getElementById("timer");
  if(!t) return;

  const d = birthday - Date.now();
  if(d <= 0){
    t.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  const pad = n=>n.toString().padStart(2,"0");
  t.innerHTML =
    Math.floor(d/86400000)+"d "+
    pad(Math.floor((d%86400000)/3600000))+"h "+
    pad(Math.floor((d%3600000)/60000))+"m "+
    pad(Math.floor((d%60000)/1000))+"s";
},1000);

/* LOVE REVEAL */
function revealLove(){
  document.getElementById("loveReveal").style.display="block";
}
