const audio = document.getElementById("bgMusic");

/* =========================
   START EXPERIENCE
========================= */
function startExperience(nextSection){
  if(!audio.src){
    audio.src = "music/love.mp3";
    audio.volume = 0.7;
    audio.play().catch(()=>{});
  }
  showSection(nextSection);
}

/* =========================
   SECTION CONTROL
========================= */
function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if(id === "gallery"){
    startMemorySlideshow();
  }
}

/* =========================
   FLOATING HEARTS
========================= */
const symbols = ["❤️","💖","💕","💘"];
const container = document.querySelector(".letters");

setInterval(()=>{
  const s = document.createElement("span");
  s.innerText = symbols[Math.floor(Math.random()*symbols.length)];
  s.style.left = Math.random() * 100 + "vw";
  s.style.animationDuration = 6 + Math.random()*4 + "s";
  container.appendChild(s);
  setTimeout(()=>s.remove(), 9000);
}, 600);

/* =========================
   COUNTDOWN TIMER
========================= */
const birthday = new Date("2025-03-20").getTime();

setInterval(()=>{
  const t = document.getElementById("timer");
  if(!t) return;

  const d = birthday - Date.now();
  if(d <= 0){
    t.innerHTML = "🎉 Today is your day 🎉";
    return;
  }

  const pad = n => n.toString().padStart(2,"0");
  t.innerHTML =
    Math.floor(d/86400000) + "d " +
    pad(Math.floor((d%86400000)/3600000)) + "h " +
    pad(Math.floor((d%3600000)/60000)) + "m " +
    pad(Math.floor((d%60000)/1000)) + "s";
}, 1000);

/* =========================
   LOVE REVEAL
========================= */
function revealLove(){
  document.getElementById("loveReveal").style.display = "block";
}


/* =========================
   MEMORY WALL SLIDESHOW
========================= */

const memoryGrid = document.getElementById("memoryGrid");
const allCards = Array.from(memoryGrid.children);

const imageCards = allCards.filter(c => c.querySelector("img"));
const videoCards = allCards.filter(c => c.querySelector("video"));

let imgIndex = 0;
let vidIndex = 0;
let memoryTimer = null;

const VISIBLE_COUNT = 8;

/* Shuffle helper */
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(imageCards);
shuffle(videoCards);

function startMemorySlideshow(){
  if(memoryTimer) return;
  updateMemoryWall();
  memoryTimer = setInterval(updateMemoryWall, 6000);
}

function updateMemoryWall(){
  memoryGrid.innerHTML = "";

  let placed = 0;

  while(placed < VISIBLE_COUNT){
    /* 2 IMAGES */
    for(let i = 0; i < 2 && placed < VISIBLE_COUNT; i++){
      const imgCard = imageCards[imgIndex % imageCards.length];
      memoryGrid.appendChild(imgCard);
      imgIndex++;
      placed++;
    }

    /* 1 VIDEO */
    if(placed < VISIBLE_COUNT && videoCards.length){
      const vidCard = videoCards[vidIndex % videoCards.length];
      const video = vidCard.querySelector("video");

      if(video){
        video.currentTime = 0;
        video.muted = true;
        video.play().catch(()=>{});
      }

      memoryGrid.appendChild(vidCard);
      vidIndex++;
      placed++;
    }
  }
}
