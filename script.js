const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const cymbalImg = document.getElementById('cymbal-img');
const infoOverlay = document.querySelector('.info-overlay'); // Corregido: punto para clase
const infoPanel = document.getElementById('info-panel');

function playSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  // 1. Sonido Sintetizado
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = "highpass"; filter.frequency.value = 8000;
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

  noise.connect(filter); filter.connect(gainNode); gainNode.connect(audioCtx.destination);
  noise.start();

  // 2. Animación (Reinicia la animación de balanceo)
  cymbalImg.classList.remove('swinging');
  void cymbalImg.offsetWidth;
  cymbalImg.classList.add('swinging');

  // 3. El Toggle Mágico
  // Esto muestra/oculta el panel de información adicional
  infoPanel.classList.toggle('visible');

  // 4. Desaparecer el texto inicial permanentemente
  // Una vez que se toca el platillo, el mensaje de "toca aquí" ya no hace falta
  if (infoPanel.classList.contains('visible')) {
    infoOverlay.classList.remove('visible');
  } else {
    infoOverlay.classList.add('visible');
  }
}

// Asignamos el evento al platillo directamente
cymbalImg.addEventListener('click', playSound);

// Carrusel
const imgs = document.querySelectorAll('.bg-slider img');
let idx = 0;
setInterval(() => {
  imgs[idx].classList.remove('active');
  idx = (idx + 1) % imgs.length;
  imgs[idx].classList.add('active');
}, 5000);
