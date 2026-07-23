document.addEventListener('DOMContentLoaded', () => {
  // Progress bar
  const progressBar = document.getElementById('progress-bar');
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    // Header Blur effect
    if (winScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up');
  animatedElements.forEach(el => observer.observe(el));

  // Auto-scroll Carrossel de Avaliações
  const track = document.getElementById('carousel-track');
  let isScrolling = true;
  
  if (track) {
    // Pausa o autoplay ao interagir
    track.addEventListener('touchstart', () => isScrolling = false);
    track.addEventListener('touchend', () => {
      setTimeout(() => isScrolling = true, 3000);
    });

    setInterval(() => {
      if (isScrolling) {
        // Encontra o próximo scroll baseado na largura de um card (280 + 16 gap = 296)
        const scrollAmount = 296;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000);
  }
});
