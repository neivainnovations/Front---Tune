// ==============================================
// CONFIGURAÇÃO CENTRAL DO SUPABASE
// ==============================================

// IMPORTANTE: Substitua pelos dados do seu projeto Supabase
const SUPABASE_CONFIG = {
    url: 'https://gmgnjjllwwrniteytfmn.supabase.co',          // Ex: https://xyzcompany.supabase.co
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZ25qamxsd3dybml0ZXl0Zm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDk5NTcsImV4cCI6MjA3MjA4NTk1N30.Er56kYtwt3WTA3_N2SOW33a1YWmJ5jcEmbF-rPq-kao', // Sua chave pública (anon/public key)
};

// Verifica se as configurações foram definidas
function checkSupabaseConfig() {
    if (SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL' || 
        SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.error('❌ Configure suas credenciais do Supabase em config.js');
        return false;
    }
    console.log('✅ Configuração do Supabase carregada');
    return true;
}

// Disponibiliza as configurações globalmente
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.checkSupabaseConfig = checkSupabaseConfig;