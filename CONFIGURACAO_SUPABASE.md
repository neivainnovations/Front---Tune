# 🔧 Configuração do Supabase - FrontTune

## Passos para Configuração

### 1. Configurar Credenciais
Edite o arquivo `config.js` e substitua as credenciais:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://seuprojetoid.supabase.co',     // URL do seu projeto
    anonKey: 'sua-chave-publica-aqui',          // Chave pública/anônima
};
```

### 2. Onde Encontrar as Credenciais

1. Acesse [supabase.com](https://supabase.com)
2. Faça login e selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie:
   - **Project URL** → coloque em `url`
   - **anon/public key** → coloque em `anonKey`

### 3. Configurar Autenticação no Supabase

1. No painel do Supabase, vá em **Authentication** > **Settings**
2. Configure:
   - **Site URL**: `http://localhost:8000` (para desenvolvimento)
   - **Redirect URLs**: `http://localhost:8000/index.html`

### 4. Criar Usuários de Teste

No painel do Supabase:
1. Vá em **Authentication** > **Users**
2. Clique em **Add user**
3. Digite email e senha
4. Clique em **Create user**

## 🧪 Como Testar

1. Configure as credenciais em `config.js`
2. Abra o `login.html` no navegador
3. Use o email/senha criado no Supabase
4. Deve redirecionar para `index.html` após login

## 🔒 Fluxo de Autenticação

1. **`login.html`**: Autentica com Supabase
2. **`index.html`**: Verifica se usuário está logado
3. Se não autenticado → redireciona para login
4. Se autenticado → mostra a aplicação

## ⚠️ Problemas Comuns

- **"Configuração não encontrada"**: Verifique se editou o `config.js`
- **"Invalid API key"**: Chave incorreta no config.js
- **"Invalid login credentials"**: Email/senha não existem no Supabase
- **Página não carrega**: Verifique console (F12) para erros

## 📝 Logs de Debug

Abra o Console do navegador (F12) para ver:
- ✅ Configuração carregada
- 🔐 Status da autenticação
- ❌ Erros detalhados