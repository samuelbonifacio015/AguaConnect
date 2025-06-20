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

// Funcionalidad FAQ 
document.querySelectorAll('.faqQuestion').forEach(question => {
  question.addEventListener('click', () => {
    const faqCard = question.parentElement;
    const isActive = faqCard.classList.contains('active');
    
    document.querySelectorAll('.faqCard').forEach(card => {
      card.classList.remove('active');
    });
    
    if (!isActive) {
      faqCard.classList.add('active');
    }
  });
});

// Funcionalidad del formulario de feedback
const feedbackForm = document.querySelector('.feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (email && subject && message) {
      // Simular envio de feedback
      alert('¡Gracias por tu feedback! Nos pondremos en contacto contigo pronto.');
      feedbackForm.reset();
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  });
}

// Funcionalidad para gestionar preferencias de notificacion
const notificationSwitches = document.querySelectorAll('.notificationSettings input[type="checkbox"]');
notificationSwitches.forEach(switchElement => {
  switchElement.addEventListener('change', () => {
    const settingName = switchElement.id;
    const isEnabled = switchElement.checked;
    
    // Simular guardado de configuracion
    console.log(`Configuracion ${settingName}: ${isEnabled ? 'activada' : 'desactivada'}`);
    
    // Mostrar feedback visual (opcional)
    const settingItem = switchElement.closest('.settingItem');
    settingItem.style.opacity = '0.7';
    setTimeout(() => {
      settingItem.style.opacity = '1';
    }, 200);
  });
});

// Funciones para terminos y condiciones
function showTermsModal() {
  alert('Aquí se mostraría el modal con los términos y condiciones completos.');
}
