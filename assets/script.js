// Atualiza ano
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ============================
// Simulador (Estimativa ilustrativa)
// ============================
const quickForm = document.getElementById('quickForm');
const resultado = document.getElementById('resultado');

function brl(v){
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

if (quickForm && resultado) {
  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const kwh = Number(document.getElementById('consumo')?.value || 0);
    const perc = Number(document.getElementById('percentual')?.value || 0);

    if (!kwh || !perc) {
      resultado.textContent = 'Preencha consumo e percentual de desconto.';
      return;
    }

    const percDesconto = perc / 100;

    // Modelo simples (ilustrativo): tarifa média x consumo e aplicação do percentual informado
    const tarifa = 0.85; // R$/kWh (apenas referência)
    const valorReferencia = kwh * tarifa;

    const descontoMes = Math.max(0, valorReferencia * percDesconto);
    const descontoAno = descontoMes * 12;

    resultado.innerHTML =
      `<strong>Desconto no mês:</strong> ${brl(descontoMes)}<br>` +
      `<strong>Desconto anual:</strong> ${brl(descontoAno)}`;
  });
}

// ============================
// Botões do formulário de proposta
// - "Receber proposta": POST normal (Netlify Forms) - NÃO interceptar
// - "Falar no WhatsApp": se campos preenchidos, abre WhatsApp com mensagem pronta
// ============================
const btnWhatsContato = document.getElementById('btnWhatsContato');

function buildWhatsMessage() {
  const nome = (document.getElementById('nome')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const telefone = (document.getElementById('telefone')?.value || '').trim();
  const perfil = (document.getElementById('perfil')?.value || '').trim();
  const distribuidora = (document.getElementById('distribuidora')?.value || '').trim();
  const valorFatura = (document.getElementById('valorFatura')?.value || '').trim();

  const linhas = [
    'Olá! Gostaria de solicitar uma proposta.',
    '',
    `Nome: ${nome || '-'}`,
    `E-mail: ${email || '-'}`,
    `WhatsApp: ${telefone || '-'}`,
    `Perfil: ${perfil || '-'}`,
    `Distribuidora: ${distribuidora || '-'}`,
    `Valor médio da fatura: R$ ${valorFatura || '-'}`,
  ];

  return linhas.join('\n');
}

function validateContactFormForWhats() {
  const nome = (document.getElementById('nome')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const telefone = (document.getElementById('telefone')?.value || '').trim();
  const perfil = (document.getElementById('perfil')?.value || '').trim();
  const distribuidora = (document.getElementById('distribuidora')?.value || '').trim();
  const valorFatura = (document.getElementById('valorFatura')?.value || '').trim();
  const lgpd = document.getElementById('lgpd');

  if (!nome || !email || !telefone || !perfil || !distribuidora || !valorFatura) {
    return 'Preencha todos os campos para enviar pelo WhatsApp.';
  }
  if (lgpd && !lgpd.checked) {
    return 'Para continuar, marque o consentimento de uso de dados (LGPD).';
  }
  return '';
}

if (btnWhatsContato) {
  btnWhatsContato.addEventListener('click', (e) => {
    // Se não tiver tudo preenchido, deixa seguir para o link padrão do botão.
    const err = validateContactFormForWhats();
    if (err) return;

    e.preventDefault();
    const msg = buildWhatsMessage();
    const url = `https://wa.me/5561996140478?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  });
}
