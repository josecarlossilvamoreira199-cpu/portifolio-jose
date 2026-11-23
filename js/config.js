// =====================================================
// CONFIGURAÇÃO DO SUPABASE
// Painel Supabase → Project Settings → API
// =====================================================
const SUPABASE_URL = "COLE_AQUI_A_SUA_PROJECT_URL";      // ex.: https://abcdxyz.supabase.co
const SUPABASE_ANON_KEY = "COLE_AQUI_A_SUA_ANON_KEY";    // a chave "anon public"

// NUNCA coloque aqui a chave "service_role".
// A anon key pode ficar pública porque quem protege os dados é o RLS.

// Cria o cliente que as outras páginas usam (window.db)
window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
