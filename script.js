const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const cymbalImg = document.getElementById('cymbal-img');
const infoOverlay = document.querySelector('.info-overlay'); // Corregido: punto para clase
const infoPanel = document.getElementById('info-panel');

function playSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const audio = new Audio('cymbal.mp3');
  audio.currentTime = 0; // reinicia desde el inicio
  audio.play();

  cymbalImg.classList.remove('swinging');
  void cymbalImg.offsetWidth;
  cymbalImg.classList.add('swinging');

  infoPanel.classList.toggle('visible');
  infoOverlay.classList.toggle('hidden');
}

cymbalImg.addEventListener('click', playSound);

cymbalImg.addEventListener('click', () => {
  cymbalImg.style.cursor = "url('drum-stick-hit.png') 10 0, auto";

  // quitar el cursor inclinado después de un breve tiempo
  setTimeout(() => { cymbalImg.style.cursor = "url('drum-stick.png') 10 0, auto"; }, 300);
});

// Carrusel
const imgs = document.querySelectorAll('.bg-slider img');
let idx = 0;
setInterval(() => {
  imgs[idx].classList.remove('active');
  idx = (idx + 1) % imgs.length;
  imgs[idx].classList.add('active');
}, 5000);
