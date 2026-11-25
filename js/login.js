const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    erroLogin.style.color = '#38bdf8';
    erroLogin.textContent = 'A verificar credenciais...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('senha').value.trim();

    if (!window.db) {
      erroLogin.style.color = '#f87171';
      erroLogin.textContent = 'Erro: window.db não carregado. Verifique js/config.js.';
      return;
    }

    const { data, error } = await window.db.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      erroLogin.style.color = '#f87171';
      erroLogin.textContent = 'Erro: ' + error.message;
    } else {
      erroLogin.style.color = '#4ade80';
      erroLogin.textContent = 'Login efetuado! A entrar no Dashboard...';
      window.location.href = 'dashboard.html';
    }
  });
}
