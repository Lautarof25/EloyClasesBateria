const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const cymbalImg = document.getElementById('cymbal-img');
const cymbalText = document.getElementById('cymbal-text');
const sliderTrack = document.getElementById('slider-track');
let currentView = 0; // 0: Info, 1: About, 2: Gallery

function playSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const audio = new Audio('./src/audio/cymbal.mp3');
  audio.currentTime = 0;
  audio.play();

  cymbalImg.classList.remove('swinging');
  void cymbalImg.offsetWidth;
  cymbalImg.classList.add('swinging');

  setTimeout(() => {
    currentView = (currentView + 1) % 3;

    sliderTrack.classList.remove('show-gallery', 'show-about');

    if (currentView === 0) {
      cymbalText.textContent = "🥁 Sobre mí 🥁";
    } else if (currentView === 1) {
      sliderTrack.classList.add('show-about');
      cymbalText.textContent = "🥁 Ver Videos 🥁";
    } else if (currentView === 2) {
      sliderTrack.classList.add('show-gallery');
      cymbalText.textContent = "🥁 Volver al Inicio 🥁";
    }
  }, 500);
}

cymbalImg.addEventListener('click', playSound);

cymbalImg.addEventListener('click', () => {
  cymbalImg.style.cursor = "url('./src/images/drum-stick-hit.png') 10 0, auto";

  setTimeout(() => { cymbalImg.style.cursor = "url('./src/images/drum-stick.png') 10 0, auto"; }, 300);
});

const imgs = document.querySelectorAll('.bg-slider img');
let idx = 0;
setInterval(() => {
  imgs[idx].classList.remove('active');
  idx = (idx + 1) % imgs.length;
  imgs[idx].classList.add('active');
}, 5000);
