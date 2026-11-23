# Portfólio pessoal

Site de portfólio com HTML5, CSS3 e JavaScript puro, usando Supabase (PostgreSQL + Auth) para login e cadastro de projetos.

## Estrutura

```
portfolio/
├── index.html
├── quemsoueu.html
├── portfolio.html
├── login.html
├── dashboard.html
├── css/
│   └── style.css
├── js/
│   ├── config.js      <- cole aqui a URL e a anon key
│   └── login.js
└── sql/
    └── schema.sql     <- rode no SQL Editor do Supabase
```

## Como configurar

1. Crie um projeto em https://supabase.com.
2. No **SQL Editor**, cole e rode o conteúdo de `sql/schema.sql`.
3. Em **Authentication → Users → Add user**, crie seu usuário (e-mail + senha, marcando *Auto Confirm User*).
4. Em **Authentication → Sign In / Providers**, desative *Allow new users to sign up*.
5. Em **Project Settings → API**, copie a *Project URL* e a *anon public key* e cole em `js/config.js`.
6. Abra `index.html` (de preferência com a extensão Live Server do VS Code) e teste o login.

## Segurança

- Use somente a chave `anon`. Nunca publique a `service_role`.
- Os dados são protegidos pelo RLS (Row Level Security), definido em `sql/schema.sql`.
