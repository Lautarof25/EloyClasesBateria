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

// Background Image Slider (Main BG)
const imgs = document.querySelectorAll(".bg-slider img");
let idx = 0;
setInterval(() => {
  if (imgs.length > 0) {
    imgs[idx].classList.remove("active");
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add("active");
  }
}, 5000);

// About Card Image Slider
const aboutSlides = document.querySelectorAll('.about-slide');
const dots = document.querySelectorAll('.dot');
let currentAboutSlide = 0;

function nextAboutSlide() {
  if (aboutSlides.length === 0) return;

  aboutSlides[currentAboutSlide].classList.remove('active');
  dots[currentAboutSlide].classList.remove('active');

  currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;

  aboutSlides[currentAboutSlide].classList.add('active');
  dots[currentAboutSlide].classList.add('active');
}

// Auto-slide every 4 seconds
let aboutSliderInterval = setInterval(nextAboutSlide, 4000);

// Manual dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(aboutSliderInterval);

    aboutSlides[currentAboutSlide].classList.remove('active');
    dots[currentAboutSlide].classList.remove('active');

    currentAboutSlide = index;

    aboutSlides[currentAboutSlide].classList.add('active');
    dots[currentAboutSlide].classList.add('active');

    // Restart auto-slide
    aboutSliderInterval = setInterval(nextAboutSlide, 4000);
  });
});
