const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    erroLogin.style.color = '#38bdf8';
    erroLogin.textContent = 'A verificar credenciais...';

    try {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('senha').value.trim();

      // Procura automaticamente o cliente Supabase criado no config.js
      const cliente =
        window.supabaseClient ||
        window._supabase ||
        (typeof supabaseClient !== 'undefined' ? supabaseClient : null) ||
        (typeof supabase !== 'undefined' && supabase.auth ? supabase : null);

      if (!cliente) {
        throw new Error('Ligação ao Supabase não encontrada. Verifique o ficheiro js/config.js.');
      }

      const { data, error } = await cliente.auth.signInWithPassword({
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
    } catch (err) {
      erroLogin.style.color = '#f87171';
      erroLogin.textContent = 'Falha: ' + err.message;
      console.error(err);
    }
  });
}
