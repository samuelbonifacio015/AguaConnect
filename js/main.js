// Smooth scroll para todos los enlaces internos
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

// Boton de volver al inicio
const backToTopButton = document.getElementById('backToTop');

// Funcion para mostrar/ocultar el boton
function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

// Evento de scroll
window.addEventListener('scroll', toggleBackToTopButton);

// Evento de click en el boton
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Inicializar el estado del boton
toggleBackToTopButton();

// Funcionalidad menu hamburguesa
const mobileMenuToggle = document.querySelector('.mobileMenuToogle');
const mobileMenu = document.querySelector('.mobileMenu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
  // Cerrar menu al hacer click en un enlace
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
} 