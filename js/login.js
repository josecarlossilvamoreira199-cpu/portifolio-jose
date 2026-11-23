const form = document.getElementById("form-login");
const botao = document.getElementById("btn-entrar");
const mensagem = document.getElementById("mensagem");

// Se já tem sessão ativa, não precisa logar de novo
window.db.auth.getSession().then(({ data }) => {
  if (data.session) window.location.href = "dashboard.html";
});

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensagem.textContent = "";

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    mensagem.textContent = "Preencha e-mail e senha.";
    return;
  }

  botao.disabled = true;
  botao.textContent = "Entrando...";

  // 1) Autentica (o Supabase confere a senha com segurança no servidor)
  const { data, error } = await window.db.auth.signInWithPassword({ email, password: senha });

  if (error) {
    mensagem.textContent = "E-mail ou senha incorretos.";
    resetarBotao();
    return;
  }

  // 2) Consulta a tabela usuarios: só entra quem tem perfil cadastrado
  const { data: perfil, error: erroPerfil } = await window.db
    .from("usuarios")
    .select("nome")
    .eq("id", data.user.id)
    .maybeSingle();

  if (erroPerfil || !perfil) {
    await window.db.auth.signOut();
    mensagem.textContent = "Usuário sem permissão de acesso.";
    resetarBotao();
    return;
  }

  window.location.href = "dashboard.html";
});

function resetarBotao() {
  botao.disabled = false;
  botao.textContent = "Entrar";
}
