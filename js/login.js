const formLogin = document.getElementById('form-login');
const msgErro = document.getElementById('erro-login');

// Credenciais simuladas para o projeto escolar
const USUARIO_CORRETO = 'admin';
const SENHA_CORRETA = '1234';

formLogin.addEventListener('submit', function (evento) {
  evento.preventDefault(); // Impede o recarregamento da página

  const usuarioDigitado = document.getElementById('usuario').value.trim();
  const senhaDigitada = document.getElementById('senha').value.trim();

  if (usuarioDigitado === USUARIO_CORRETO && senhaDigitada === SENHA_CORRETA) {
    // Salva status de sessão simulada e redireciona
    sessionStorage.setItem('logado', 'true');
    window.location.href = 'dashboard.html';
  } else {
    msgErro.textContent = 'Usuário ou senha incorretos. Tente novamente.';
  }
});