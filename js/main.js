// Scroll suave para enlaces internos
// Selecciona todos los enlaces que empiezan con # y aplica scroll suave

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

// Boton para volver al inicio
const backToTopButton = document.getElementById('backToTop');

// Funcion para mostrar u ocultar el boton de volver arriba
function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

// Evento de scroll para mostrar/ocultar el boton
window.addEventListener('scroll', toggleBackToTopButton);

// Evento de click en el boton para volver arriba
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Inicializa el estado del boton al cargar la pagina
toggleBackToTopButton();

// Menu hamburguesa para navegacion movil
const mobileMenuToggle = document.querySelector('.mobileMenuToggle');
const mobileMenu = document.querySelector('.mobileMenu');

if (mobileMenuToggle && mobileMenu) {
  // Crear boton de cierre
  const closeButton = document.createElement('div');
  closeButton.className = 'mobileMenuClose';
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  mobileMenu.appendChild(closeButton);

  // Funcion para abrir/cerrar menu
  const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    // Prevenir scroll del body cuando el menu esta abierto
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  mobileMenuToggle.addEventListener('click', toggleMenu);
  closeButton.addEventListener('click', toggleMenu);

  // Cierra el menu al hacer click en un enlace
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Cierra el menu con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Preguntas frecuentes (FAQ) desplegables
// Permite abrir/cerrar cada pregunta

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

// Envio del formulario de feedback de soporte
const feedbackForm = document.querySelector('.feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (email && subject && message) {
      // Simula el envio del feedback
      alert('Gracias por tu feedback! Nos pondremos en contacto pronto.');
      feedbackForm.reset();
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  });
}

// Preferencias de notificaciones en soporte
const notificationSwitches = document.querySelectorAll('.notificationSettings input[type="checkbox"]');
notificationSwitches.forEach(switchElement => {
  switchElement.addEventListener('change', () => {
    const settingName = switchElement.id;
    const isEnabled = switchElement.checked;
    
    // Simula el guardado de la configuracion
    console.log(`Configuracion ${settingName}: ${isEnabled ? 'activada' : 'desactivada'}`);
    
    // Feedback visual al usuario
    const settingItem = switchElement.closest('.settingItem');
    settingItem.style.opacity = '0.7';
    setTimeout(() => {
      settingItem.style.opacity = '1';
    }, 200);
  });
});

// Funcion para mostrar los terminos y condiciones (simulado)
function showTermsModal() {
  alert('Aqui se mostraria el modal con los terminos y condiciones completos.');
}

// Funcion para descargar los terminos y condiciones
function downloadTerms() {
  // Crear un enlace temporal para descargar el archivo
  const link = document.createElement('a');
  link.href = '/assets/doc/LeyProteccionDeDatos.pdf';
  link.download = 'TerminosYCondiciones_AguaConnect.pdf';
  link.target = '_blank';
  
  // Simular el click para iniciar la descarga
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Sistema de autenticacion en la pagina principal
class MainAuthSystem {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('aguaconnect_current_user')) || null;
    this.init();
  }

  init() {
    this.updateUserInterface();
    this.bindEvents();
  }

  // Asocia eventos a los botones de usuario y logout
  bindEvents() {
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    const mobileLogoutBtnHeader = document.getElementById('mobileLogoutBtnHeader');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }

    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }

    if (mobileLogoutBtnHeader) {
      mobileLogoutBtnHeader.addEventListener('click', () => {
        this.logout();
      });
    }

    // Icono de usuario en escritorio
    const userIcon = document.getElementById('userMenuToggle');
    if (userIcon) {
      userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('userDropdown');
        dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
        dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
      });
    }

    // Icono de usuario en header movil
    const mobileUserIcon = document.getElementById('mobileUserToggle');
    if (mobileUserIcon) {
      mobileUserIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileUserIcon.classList.toggle('active');
      });
    }

    // Cierra los dropdowns al hacer click fuera
    document.addEventListener('click', (e) => {
      const userSection = document.querySelector('.userSection');
      const dropdown = document.getElementById('userDropdown');
      const mobileUserIcon = document.getElementById('mobileUserToggle');
      
      if (userSection && dropdown && !userSection.contains(e.target)) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
      }

      if (mobileUserIcon && !mobileUserIcon.contains(e.target)) {
        mobileUserIcon.classList.remove('active');
      }
    });
  }

  // Actualiza la interfaz segun el estado de autenticacion
  updateUserInterface() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userGreeting = document.getElementById('userGreeting');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    const mobileAuthButtons = document.getElementById('mobileAuthButtons');
    const mobileUserMenu = document.getElementById('mobileUserMenu');
    const mobileUserNameDisplay = document.getElementById('mobileUserNameDisplay');
    const mobileUserEmailDisplay = document.getElementById('mobileUserEmailDisplay');

    // Elementos del header movil
    const mobileAuthButtonsHeader = document.getElementById('mobileAuthButtonsHeader');
    const mobileUserMenuHeader = document.getElementById('mobileUserMenuHeader');
    const mobileUserNameHeader = document.getElementById('mobileUserNameHeader');
    const mobileUserEmailHeader = document.getElementById('mobileUserEmailHeader');

    if (this.currentUser) {
      // Elementos de escritorio
      if (authButtons) authButtons.style.display = 'none';
      if (userMenu) userMenu.style.display = 'block';
      if (userGreeting) {
        userGreeting.style.display = 'inline';
        userGreeting.textContent = `Hola, ${this.currentUser.firstName}!`;
      }
      if (userNameDisplay) {
        userNameDisplay.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      }
      if (userEmailDisplay) {
        userEmailDisplay.textContent = this.currentUser.email;
      }

      // Elementos del menu movil
      if (mobileAuthButtons) mobileAuthButtons.style.display = 'none';
      if (mobileUserMenu) mobileUserMenu.style.display = 'block';
      if (mobileUserNameDisplay) {
        mobileUserNameDisplay.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      }
      if (mobileUserEmailDisplay) {
        mobileUserEmailDisplay.textContent = this.currentUser.email;
      }

      // Elementos del header movil
      if (mobileAuthButtonsHeader) mobileAuthButtonsHeader.style.display = 'none';
      if (mobileUserMenuHeader) mobileUserMenuHeader.style.display = 'block';
      if (mobileUserNameHeader) {
        mobileUserNameHeader.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      }
      if (mobileUserEmailHeader) {
        mobileUserEmailHeader.textContent = this.currentUser.email;
      }
      if (mobileUserEmailDisplay) {
        mobileUserEmailDisplay.textContent = this.currentUser.email;
      }

      // Cambia color del icono de usuario si esta logueado
      const userIcon = document.querySelector('.userIcon');
      if (userIcon) {
        userIcon.style.backgroundColor = 'var(--color-accent)';
        const icon = userIcon.querySelector('i');
        if (icon) {
          icon.style.color = 'var(--color-light)';
        }
      }

    } else {
      // Elementos de escritorio
      if (authButtons) authButtons.style.display = 'block';
      if (userMenu) userMenu.style.display = 'none';
      if (userGreeting) userGreeting.style.display = 'none';

      // Elementos del menu movil
      if (mobileAuthButtons) mobileAuthButtons.style.display = 'flex';
      if (mobileUserMenu) mobileUserMenu.style.display = 'none';

      // Elementos del header movil
      if (mobileAuthButtonsHeader) mobileAuthButtonsHeader.style.display = 'flex';
      if (mobileUserMenuHeader) mobileUserMenuHeader.style.display = 'none';

      // Cambia color del icono de usuario si no esta logueado
      const userIcon = document.querySelector('.userIcon');
      if (userIcon) {
        userIcon.style.backgroundColor = 'var(--color-primary)';
        const icon = userIcon.querySelector('i');
        if (icon) {
          icon.style.color = 'var(--color-accent)';
        }
      }
    }
  }

  // Cierra la sesion del usuario
  logout() {
    if (confirm('Estas seguro de que quieres cerrar sesion?')) {
      localStorage.removeItem('aguaconnect_current_user');
      this.currentUser = null;
      
      this.updateUserInterface();
      
      alert('Has cerrado sesion exitosamente.');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Verifica si hay usuario logueado
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // Devuelve el usuario actual
  getCurrentUser() {
    return this.currentUser;
  }
}

// Inicializa el sistema de autenticacion al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
  window.mainAuth = new MainAuthSystem();
});

// Refresca la sesion del usuario al volver el foco o cambiar el storage
function refreshUserSession() {
  if (window.mainAuth) {
    window.mainAuth.currentUser = JSON.parse(localStorage.getItem('aguaconnect_current_user')) || null;
    window.mainAuth.updateUserInterface();
  }
}

window.addEventListener('focus', () => {
  refreshUserSession();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'aguaconnect_current_user') {
    refreshUserSession();
  }
});

// Funciones para el footer

// Funcion para manejar el newsletter
function handleNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  
  if (email) {
    // Simular envio del newsletter
    setTimeout(() => {
      alert('¡Gracias por suscribirte! Te mantendremos informado sobre las novedades de AguaConnect.');
      event.target.reset();
    }, 1000);
  }
};

// Modal de mapa de fuentes de agua
document.addEventListener('DOMContentLoaded', function() {
  // Abrir modal al hacer click en la tarjeta
  document.querySelectorAll('.featureCard').forEach(card => {
    if (card.textContent.includes('Ver mapa de fuentes de agua cercanas')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        document.getElementById('modalMapa').style.display = 'flex';
      });
    }
  });

  // Cerrar modal
  document.getElementById('cerrarModalMapa').onclick = function() {
    document.getElementById('modalMapa').style.display = 'none';
  };

  // Cerrar modal al hacer click fuera del contenido
  document.getElementById('modalMapa').onclick = function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  };
  
  // Manejo de filtros
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function() {
      // Quitar clase active de todos los filtros
      document.querySelectorAll('.filter-option').forEach(opt => {
        opt.classList.remove('active');
      });
      // Agregar clase active al filtro seleccionado
      this.classList.add('active');
      
      // Aquí se podría agregar lógica para filtrar los puntos en el mapa
      // Por ahora solo mostramos un mensaje de ejemplo
      console.log('Filtro seleccionado:', this.textContent.trim());
    });
  });
  
  // Botón de registrar fuente
  const registerBtn = document.querySelector('.modal-register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      alert('En la app real podrías registrar una nueva fuente de agua.');
    });
  }
  
  // Navegación inferior
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      // Quitar clase active de todos los items
      document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      // Agregar clase active al item seleccionado
      this.classList.add('active');
      
      // Aquí se podría agregar lógica para cambiar de sección
      const section = this.querySelector('span').textContent;
      console.log('Sección seleccionada:', section);
    });
  });

  // Modal de compras grupales
  document.querySelectorAll('.featureCard').forEach(card => {
    if (card.textContent.includes('Coordinar compras grupales')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        document.getElementById('modalCompras').style.display = 'flex';
      });
    }
  });

  // Cerrar modal de compras
  const cerrarModalCompras = document.getElementById('cerrarModalCompras');
  if (cerrarModalCompras) {
    cerrarModalCompras.onclick = function() {
      document.getElementById('modalCompras').style.display = 'none';
    };
  }

  // Cerrar modal de compras al hacer click fuera del contenido
  const modalCompras = document.getElementById('modalCompras');
  if (modalCompras) {
    modalCompras.onclick = function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    };
  }

  // Modal de alertas
  document.querySelectorAll('.featureCard').forEach(card => {
    if (card.textContent.includes('Recibir alertas de escasez o contaminación')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        document.getElementById('modalAlertas').style.display = 'flex';
      });
    }
  });

  // Cerrar modal de alertas
  const cerrarModalAlertas = document.getElementById('cerrarModalAlertas');
  if (cerrarModalAlertas) {
    cerrarModalAlertas.onclick = function() {
      document.getElementById('modalAlertas').style.display = 'none';
    };
  }

  // Cerrar modal de alertas al hacer click fuera del contenido
  const modalAlertas = document.getElementById('modalAlertas');
  if (modalAlertas) {
    modalAlertas.onclick = function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    };
  }

  // Modal de pagos
  document.querySelectorAll('.featureCard').forEach(card => {
    if (card.textContent.includes('Pagos digitales comunitarios')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        document.getElementById('modalPagos').style.display = 'flex';
      });
    }
  });

  // Cerrar modal de pagos
  const cerrarModalPagos = document.getElementById('cerrarModalPagos');
  if (cerrarModalPagos) {
    cerrarModalPagos.onclick = function() {
      document.getElementById('modalPagos').style.display = 'none';
    };
  }

  // Cerrar modal de pagos al hacer click fuera del contenido
  const modalPagos = document.getElementById('modalPagos');
  if (modalPagos) {
    modalPagos.onclick = function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    };
  }

  // Funcionalidad para botones de "Ver detalles" en alertas
  document.querySelectorAll('.btn-detalles').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('En la app real podrías ver los detalles completos de la alerta.');
    });
  });

  // Funcionalidad para botón "Unirme" en compras grupales
  const unirmeBtn = document.querySelector('.btn-primary');
  if (unirmeBtn && unirmeBtn.textContent.includes('Unirme')) {
    unirmeBtn.addEventListener('click', function() {
      alert('En la app real podrías unirte al grupo de compras.');
    });
  }

  // Funcionalidad para botones de pagos
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Guardar método de pago')) {
      alert('En la app real podrías guardar tu método de pago.');
    }
    
    if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Confirmar pago')) {
      alert('En la app real podrías confirmar tu pago.');
    }
  });
});