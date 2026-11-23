// =====================================================
// CONFIGURAÇÃO DO SUPABASE
// Painel Supabase → Project Settings → API
// =====================================================
const SUPABASE_URL = "https://ykvvpmhiksqlwjieodcf.supabase.co";      // ex.: https://abcdxyz.supabase.co
const SUPABASE_ANON_KEY = "sb_publishable_TGoUNcujbIMEYmb_exh5kQ_nJ97BOnc";    // a chave "anon public"

// NUNCA coloque aqui a chave "service_role".
// A anon key pode ficar pública porque quem protege os dados é o RLS.

// Cria o cliente que as outras páginas usam (window.db)
window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
