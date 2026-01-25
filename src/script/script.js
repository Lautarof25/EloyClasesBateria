const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const cymbalPrev = document.getElementById("cymbal-prev");
const cymbalNext = document.getElementById("cymbal-next");
const sectionTitle = document.getElementById("section-title");
const sliderTrack = document.getElementById("slider-track");

let currentView = 0; // 0: Servicios, 1: Sobre Mi, 2: Videos
const views = ["Servicios", "Sobre Mi", "Videos"];

function updateView(direction) {
  if (audioCtx.state === "suspended") audioCtx.resume();

  const audio = new Audio("./src/audio/cymbal.mp3");
  audio.currentTime = 0;
  audio.play();

  // Animate the clicked cymbal
  const clickedCymbal = direction === 1 ? cymbalNext : cymbalPrev;
  clickedCymbal.classList.remove("swinging");
  void clickedCymbal.offsetWidth;
  clickedCymbal.classList.add("swinging");

  setTimeout(() => {
    // Update view state
    currentView = (currentView + direction + 3) % 3;

    sliderTrack.classList.remove("show-gallery", "show-about");

    if (currentView === 1) {
      sliderTrack.classList.add("show-about");
    } else if (currentView === 2) {
      sliderTrack.classList.add("show-gallery");
    }

    sectionTitle.textContent = views[currentView];
  }, 400);
}

cymbalNext.addEventListener("click", () => updateView(1));
cymbalPrev.addEventListener("click", () => updateView(-1));

// Interaction visual feedback
[cymbalPrev, cymbalNext].forEach((cymbal) => {
  cymbal.addEventListener("mousedown", () => {
    cymbal.style.cursor = "url('./src/images/drum-stick-hit.png') 10 0, auto";
  });
  cymbal.addEventListener("mouseup", () => {
    cymbal.style.cursor = "url('./src/images/drum-stick.png') 10 0, auto";
  });
  cymbal.addEventListener("mouseleave", () => {
    cymbal.style.cursor = "url('./src/images/drum-stick.png') 10 0, auto";
  });
});

// Background Image Slider
const imgs = document.querySelectorAll(".bg-slider img");
let idx = 0;
setInterval(() => {
  if (imgs.length > 0) {
    imgs[idx].classList.remove("active");
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add("active");
  }
}, 5000);
