const audio = document.getElementById("bgMusic");

/* Play music after first click (required by browsers) */
function startExperience(nextSection){
  if(!audio.src){
    audio.src = "music/love.mp3";
    audio.volume = 0.7;
    audio.play().catch(()=>{}); // ignore autoplay errors
  }
  showSection(nextSection);
}

/* Show section */
function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  // Start slideshow only when gallery opens
  if(id === "gallery"){
    startSlideshow();
  }
}

/* Floating hearts */
const symbols = ["❤️","💖","💕","💘"];
const container = document.querySelector(".letters");

setInterval(()=>{
  const s = document.createElement("span");
  s.innerText = symbols[Math.floor(Math.random()*symbols.length)];
  s.style.left = Math.random()*100 + "vw";
  s.style.animationDuration = 6 + Math.random()*4 + "s";
  container.appendChild(s);
  setTimeout(()=>s.remove(),9000);
},600);

/* Countdown */
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
    Math.floor(d / 86400000) + "d " +
    pad(Math.floor((d % 86400000) / 3600000)) + "h " +
    pad(Math.floor((d % 3600000) / 60000)) + "m " +
    pad(Math.floor((d % 60000) / 1000)) + "s";
},1000);

/* Reveal love */
function revealLove(){
  document.getElementById("loveReveal").style.display = "block";
}

/* =========================
   MEMORY SLIDESHOW
========================= */

let slideIndex = 0;
let slideshowTimer = null;

function startSlideshow(){
  const slides = document.querySelectorAll(".slide");
  if(!slides.length) return;

  // Prevent multiple timers
  if(slideshowTimer) clearTimeout(slideshowTimer);

  slides.forEach(slide => slide.style.display = "none");

  slideIndex++;
  if(slideIndex > slides.length) slideIndex = 1;

  const currentSlide = slides[slideIndex - 1];
  currentSlide.style.display = "block";

  // Pause all videos
  slides.forEach(slide => {
    const v = slide.querySelector("video");
    if(v) v.pause();
  });

  // Play video if current slide has one
  const video = currentSlide.querySelector("video");
  if(video){
    video.currentTime = 0;
    video.play().catch(()=>{});
  }

  slideshowTimer = setTimeout(startSlideshow, 4000); // 4 seconds per memory
}
