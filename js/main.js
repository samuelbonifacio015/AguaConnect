// smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// boton de volver al inicio
const backToTopButton = document.getElementById('backToTop');

// funcion para mostrar/ocultar el botón
function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

// evento de scroll
window.addEventListener('scroll', toggleBackToTopButton);

// evento de click en el boton
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

toggleBackToTopButton(); 

// inicializa el boton al cargar la página en mobile
const mobileMenuToggle = document.querySelector('.mobileMenuToogle');
const mobileMenu = document.querySelector('.mobileMenu');

// evento de click en el boton de menu mobile
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

//cerrar el menu mobile al hacer click en un enlace
mobileMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});