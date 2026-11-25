const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (erroLogin) {
      erroLogin.style.color = '#38bdf8';
      erroLogin.textContent = 'A verificar credenciais...';
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('senha').value.trim();

    // Tenta usar supabaseClient ou supabase (conforme definido no seu config.js)
    const cliente = typeof supabaseClient !== 'undefined' ? supabaseClient : supabase;

    const { data, error } = await cliente.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      if (erroLogin) {
        erroLogin.style.color = '#f87171';
        erroLogin.textContent = 'Erro: ' + error.message;
      } else {
        alert('Erro: ' + error.message);
      }
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}
