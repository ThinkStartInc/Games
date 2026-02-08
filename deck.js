const deck = document.getElementById('deck');
const slides = Array.from(document.querySelectorAll('.slide'));
const countLabel = document.getElementById('slideCount');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

let index = 0;

const updateDeck = () => {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });

  deck.style.transform = `translateX(-${index * 100}vw)`;
  const current = String(index + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');
  countLabel.textContent = `${current} / ${total}`;
};

const goNext = () => {
  if (index < slides.length - 1) {
    index += 1;
    updateDeck();
  }
};

const goPrev = () => {
  if (index > 0) {
    index -= 1;
    updateDeck();
  }
};

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    goNext();
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    goPrev();
  }
});

updateDeck();
