// Cargar la API de IFrame de YouTube de forma asíncrona
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // Configurar IntersectionObserver cuando el reproductor esté listo
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reproducir video cuando el contenedor es visible
        // Nota: Los navegadores pueden bloquear el autoplay con sonido.
        // Se recomienda silenciar si falla el autoplay con sonido.
        // player.mute(); // Descomentar si es necesario para autoplay estricto
        player.playVideo();
      } else {
        // Opcional: Pausar si sale de pantalla
        player.pauseVideo();
      }
    });
  }, {
    threshold: 0.8 // 80% visible para activar
    // Se usa 0.8 en lugar de 1.0 para asegurar que se active incluso si hay pequeños márgenes
  });

  // Observar el contenedor del video
  const videoContainer = document.querySelector('.video-container');
  if (videoContainer) {
    observer.observe(videoContainer);
  }
}
