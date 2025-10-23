/* ================= LOGIN / REGISTRO ================= */
const popup = document.getElementById('loginPopup');
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

/* ===== FUNÇÕES AUXILIARES ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function setLoggedUser(user) {
  localStorage.setItem('loggedUser', JSON.stringify(user));
}

function getLoggedUser() {
  return JSON.parse(localStorage.getItem('loggedUser'));
}

function getUserName() {
  return getLoggedUser()?.username || null;
}

function logoutUser() {
  localStorage.removeItem('loggedUser');
  location.reload();
}

/* ===== POPUP ===== */
openPopup.addEventListener('click', () => popup.style.display = 'flex');
closePopup.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

/* ===== VALIDAÇÕES ===== */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== REGISTRO ===== */
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  registerError.textContent = "";

  if (username.length < 3) {
    registerError.textContent = "O nome deve ter pelo menos 3 caracteres.";
    return;
  }
  if (!isValidEmail(email)) {
    registerError.textContent = "E-mail inválido.";
    return;
  }
  if (password.length < 6) {
    registerError.textContent = "A senha deve ter pelo menos 6 caracteres.";
    return;
  }

  const users = getUsers();
  if (users.some(u => u.username === username)) {
    registerError.textContent = "Nome já está em uso.";
    return;
  }
  if (users.some(u => u.email === email)) {
    registerError.textContent = "E-mail já registrado.";
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  saveUsers(users);

  setLoggedUser(newUser);
  popup.style.display = 'none';
  updateHeader();
});

/* ===== LOGIN ===== */
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  loginError.textContent = "";

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    loginError.textContent = "Usuário ou senha incorretos!";
    return;
  }

  setLoggedUser(user);
  popup.style.display = 'none';
  updateHeader();
});

/* ===== HEADER DINÂMICO ===== */
function updateHeader() {
  const header = document.querySelector('.main-header');
  const loggedUser = getLoggedUser();

  const existingUserDiv = document.querySelector('.user-info');
  if (existingUserDiv) existingUserDiv.remove();

  if (loggedUser) {
    if (openPopup) openPopup.remove();

    const userDiv = document.createElement('div');
    userDiv.classList.add('user-info');
    userDiv.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Usuário">
      <span>Olá, <b>${loggedUser.username}</b></span>
      <button id="logoutBtn" class="logout-btn">Sair</button>
    `;
    header.appendChild(userDiv);

    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
  }
}

/* ===== INICIALIZAÇÃO HEADER ===== */
document.addEventListener('DOMContentLoaded', updateHeader);
