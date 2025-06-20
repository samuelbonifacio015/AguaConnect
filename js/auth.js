// Sistema de Autenticacion AguaConnect
class AuthSystem {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('aguaconnect_users')) || [];
    this.currentUser = JSON.parse(localStorage.getItem('aguaconnect_current_user')) || null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.checkUserSession();
  }

  bindEvents() {
    // Cambio entre formularios de registro y login
    document.querySelectorAll('.switchForm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.dataset.target;
        this.switchForm(target);
      });
    });

    // Cambio de visibilidad de contrasena
    document.querySelectorAll('.togglePassword').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.togglePasswordVisibility(e.target);
      });
    });

    // Envio de formularios
    document.getElementById('loginFormElement').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    document.getElementById('registerFormElement').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleRegister();
    });

    // Cerrar modal
    document.getElementById('modalCloseBtn').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('modalOverlay').addEventListener('click', () => {
      this.closeModal();
    });

    // Validacion en tiempo real
    this.setupRealTimeValidation();
  }

  switchForm(target) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (target === 'register') {
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    } else {
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    }

    // Limpiar formularios
    this.clearFormErrors();
    document.getElementById('loginFormElement').reset();
    document.getElementById('registerFormElement').reset();
  }

  togglePasswordVisibility(button) {
    const targetId = button.dataset.target || button.closest('.togglePassword').dataset.target;
    const passwordField = document.getElementById(targetId);
    const icon = button.querySelector('i') || button.closest('.togglePassword').querySelector('i');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }

  setupRealTimeValidation() {
    // Validacion en tiempo real para el registro
    const confirmPassword = document.getElementById('confirmPassword');
    const registerPassword = document.getElementById('registerPassword');

    confirmPassword.addEventListener('input', () => {
      this.validatePasswordMatch();
    });

    registerPassword.addEventListener('input', () => {
      this.validatePasswordMatch();
      this.validatePasswordStrength(registerPassword.value);
    });

    // Validacion de usuario/correo
    const username = document.getElementById('username');
    username.addEventListener('blur', () => {
      this.validateUsername(username.value);
    });
  }

  validatePasswordMatch() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmGroup = document.getElementById('confirmPassword').closest('.formGroup');

    if (confirmPassword && password !== confirmPassword) {
      this.showFieldError(confirmGroup, 'Las contrasenas no coinciden');
      return false;
    } else {
      this.clearFieldError(confirmGroup);
      return true;
    }
  }

  validatePasswordStrength(password) {
    const passwordGroup = document.getElementById('registerPassword').closest('.formGroup');
    
    if (password.length < 6) {
      this.showFieldError(passwordGroup, 'La contrasena debe tener al menos 6 caracteres');
      return false;
    } else {
      this.clearFieldError(passwordGroup);
      return true;
    }
  }

  validateUsername(username) {
    const usernameGroup = document.getElementById('username').closest('.formGroup');
    
    // Verificar si el usuario ya existe
    const userExists = this.users.some(user => 
      user.username.toLowerCase() === username.toLowerCase() || 
      user.email.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      this.showFieldError(usernameGroup, 'Este usuario o correo ya esta registrado');
      return false;
    } else {
      this.clearFieldError(usernameGroup);
      return true;
    }
  }

  showFieldError(fieldGroup, message) {
    fieldGroup.classList.add('error');
    let errorMsg = fieldGroup.querySelector('.errorMessage');
    
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'errorMessage';
      fieldGroup.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
  }

  clearFieldError(fieldGroup) {
    fieldGroup.classList.remove('error');
    const errorMsg = fieldGroup.querySelector('.errorMessage');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  clearFormErrors() {
    document.querySelectorAll('.formGroup.error').forEach(group => {
      this.clearFieldError(group);
    });
  }

  async handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const loginButton = document.querySelector('.loginButton');

    // Limpiar errores previos
    this.clearFormErrors();

    // Validacion
    if (!email || !password) {
      this.showError('Por favor, completa todos los campos');
      return;
    }

    // Mostrar estado de carga
    loginButton.classList.add('loading');
    loginButton.disabled = true;

    // Simular espera
    await this.delay(1000);

    // Buscar usuario
    const user = this.users.find(u => 
      (u.username.toLowerCase() === email.toLowerCase() || 
       u.email.toLowerCase() === email.toLowerCase()) && 
      u.password === password
    );

    loginButton.classList.remove('loading');
    loginButton.disabled = false;

    if (user) {
      this.currentUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      };
      
      localStorage.setItem('aguaconnect_current_user', JSON.stringify(this.currentUser));
      
      this.showModal(
        '¡Bienvenido de vuelta!',
        `Hola ${user.firstName}, has iniciado sesion exitosamente.`
      );
    } else {
      this.showError('Usuario o contrasena incorrectos');
    }
  }

  async handleRegister() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    const registerButton = document.querySelector('.registerButton');

    // Limpiar errores previos
    this.clearFormErrors();

    // Validacion
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      this.showError('Por favor, completa todos los campos');
      return;
    }

    if (!acceptTerms) {
      this.showError('Debes aceptar los terminos y condiciones');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('Las contrasenas no coinciden');
      return;
    }

    if (password.length < 6) {
      this.showError('La contrasena debe tener al menos 6 caracteres');
      return;
    }

    // Verificar si el usuario ya existe
    const userExists = this.users.some(user => 
      user.username.toLowerCase() === username.toLowerCase() || 
      user.email.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      this.showError('Este usuario o correo ya esta registrado');
      return;
    }

    // Mostrar estado de carga
    registerButton.classList.add('loading');
    registerButton.disabled = true;

    // Simular espera
    await this.delay(1500);

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      username,
      email: this.isEmail(username) ? username : `${username}@aguaconnect.pe`,
      password,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    localStorage.setItem('aguaconnect_users', JSON.stringify(this.users));

    registerButton.classList.remove('loading');
    registerButton.disabled = false;

    this.showModal(
      '¡Cuenta creada exitosamente!',
      `¡Bienvenido ${firstName}! Tu cuenta ha sido creada. Ahora puedes iniciar sesion.`
    );

    setTimeout(() => {
      this.switchForm('login');
    }, 2000);
  }

  isEmail(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  showError(message) {
    alert(message);
  }

  showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('successModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
  }

  closeModal() {
    document.getElementById('successModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
    
    if (this.currentUser) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    }
  }

  checkUserSession() {
    if (this.currentUser) {
      window.location.href = 'index.html';
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inicializar sistema de autenticacion al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
  new AuthSystem();
});

// Accion para recuperar contrasena (proximamente)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('forgotPassword')) {
    e.preventDefault();
    alert('Funcionalidad de recuperacion de contrasena proximamente disponible.');
  }
});

// Accion para abrir terminos y condiciones
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('termsLink')) {
    e.preventDefault();
    window.open('index.html#terms', '_blank');
  }
}); 