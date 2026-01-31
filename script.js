// Cargar la API de IFrame de YouTube de forma asíncrona
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = {};

function onYouTubeIframeAPIReady() {
  // Inicializamos ambos reproductores
  createPlayer('yt-player');
  createPlayer('yt-player-2');
}

function createPlayer(elementId) {
  // Verificamos si existe el elemento en el DOM antes de intentar crearlo
  if (document.getElementById(elementId)) {
    players[elementId] = new YT.Player(elementId, {
      events: {
        'onReady': (event) => onPlayerReady(event, elementId)
      }
    });
  }
}

function onPlayerReady(event, elementId) {
  const playerFn = event.target;
  const iframe = document.getElementById(elementId);
  const container = iframe ? iframe.parentElement : null;

  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reproducir
        playerFn.playVideo();
      } else {
        // Pausar
        playerFn.pauseVideo();
      }
    });
  }, {
    threshold: 0.5 // 50% visible
  });

  observer.observe(container);
}
