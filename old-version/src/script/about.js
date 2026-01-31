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

let aboutSliderInterval = setInterval(nextAboutSlide, 4000);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(aboutSliderInterval);

    aboutSlides[currentAboutSlide].classList.remove('active');
    dots[currentAboutSlide].classList.remove('active');

    currentAboutSlide = index;

    aboutSlides[currentAboutSlide].classList.add('active');
    dots[currentAboutSlide].classList.add('active');

    aboutSliderInterval = setInterval(nextAboutSlide, 4000);
  });
});