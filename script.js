// Elementos DOM
const form = document.getElementById('musicForm');
const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');
const errorArea = document.getElementById('errorArea');
const copyBtn = document.getElementById('copyBtn');
const newRequestBtn = document.getElementById('newRequestBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// Event listener para o formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handlePayment();
});

// Event listeners para botões
copyBtn.addEventListener('click', copyPixCode);
newRequestBtn.addEventListener('click', resetForm);
tryAgainBtn.addEventListener('click', resetForm);

// Função principal para lidar com o pagamento
async function handlePayment() {
    // Mostra loading e esconde formulário e erros
    showLoading();
    
    // Coleta valores dos inputs
    const formData = {
        billingType: "PIX",
        provider: "spotify",
        customerName: document.getElementById('customerName').value,
        customerCpf: document.getElementById('customerCpf').value.replace(/[^\d]/g, ''),
        customerEmail: document.getElementById('customerEmail').value,
        artist: document.getElementById('artist').value,
        song: document.getElementById('song').value,
        bar_id: "00000000-0000-0000-0000-000000000000",
        externalReference: `music_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    try {
        // Chamada fetch para a API
        const response = await fetch('http://localhost:3001/api/criar-pagamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const dados = await response.json();
            showSuccess(dados);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || errorData.message || 'Erro desconhecido';
            showError(errorMessage);
        }
        
    } catch (error) {
        // Trata erros de rede
        showError('Erro de rede: Verifique se a API está online');
    }
}

// Mostra área de loading
function showLoading() {
    form.style.display = 'none';
    errorArea.style.display = 'none';
    resultArea.style.display = 'none';
    loadingArea.style.display = 'block';
}

// Mostra resultado de sucesso
function showSuccess(dados) {
    loadingArea.style.display = 'none';
    
    // Configura imagem do QR Code
    const qrImage = document.getElementById('qrCodeImage');
    if (dados.qrCodeImage) {
        qrImage.src = `data:image/png;base64,${dados.qrCodeImage}`;
    } else if (dados.qr_code_base64) {
        qrImage.src = `data:image/jpeg;base64,${dados.qr_code_base64}`;
    }
    
    // Configura código PIX
    const pixCodeField = document.getElementById('pixCode');
    if (dados.qrCodePayload) {
        pixCodeField.value = dados.qrCodePayload;
    } else if (dados.payload) {
        pixCodeField.value = dados.payload;
    }
    
    resultArea.style.display = 'block';
}

// Mostra erro
function showError(message) {
    loadingArea.style.display = 'none';
    
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    
    errorArea.style.display = 'block';
    form.style.display = 'block';
}

// Copia código PIX
async function copyPixCode() {
    const pixCode = document.getElementById('pixCode').value;
    
    try {
        await navigator.clipboard.writeText(pixCode);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copiado!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = pixCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copiado!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }
}

// Reseta formulário
function resetForm() {
    form.reset();
    form.style.display = 'block';
    loadingArea.style.display = 'none';
    resultArea.style.display = 'none';
    errorArea.style.display = 'none';
}