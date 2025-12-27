function go(id){
  document.querySelectorAll('.section').forEach(s=>{
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* Floating hearts */
const letters=document.querySelector('.letters');
const symbols=["❤️","💖","💕","💘"];

setInterval(()=>{
  const s=document.createElement("span");
  s.innerText=symbols[Math.floor(Math.random()*symbols.length)];
  s.style.left=Math.random()*100+"vw";
  s.style.animationDuration=6+Math.random()*4+"s";
  letters.appendChild(s);
  setTimeout(()=>s.remove(),9000);
},600);

/* Countdown */
const birthday=new Date("2025-03-20").getTime();
setInterval(()=>{
  const t=document.getElementById("timer");
  if(!t) return;
  const d=birthday-Date.now();
  if(d<=0){ t.innerHTML="🎉 Today is your day 🎉"; return;}
  t.innerHTML=
    Math.floor(d/86400000)+"d "+
    Math.floor((d%86400000)/3600000)+"h "+
    Math.floor((d%3600000)/60000)+"m "+
    Math.floor((d%60000)/1000)+"s";
},1000);

function revealLove(){
  document.getElementById("loveReveal").style.display="block";
}
