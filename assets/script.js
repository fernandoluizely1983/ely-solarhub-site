// Atualiza ano (rodapé)
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ============================
// Simulador (Estimativa ilustrativa)
// ============================
const quickForm = document.getElementById('quickForm');
const resultado = document.getElementById('resultado');

function brl(v) {
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
    const tarifaReferencia = 0.85; // R$/kWh (apenas referência)
    const valorReferencia = kwh * tarifaReferencia;

    const descontoMes = Math.max(0, valorReferencia * percDesconto);
    const descontoAno = descontoMes * 12;

    resultado.innerHTML =
      `<strong>Desconto no mês:</strong> ${brl(descontoMes)}<br>` +
      `<strong>Desconto anual:</strong> ${brl(descontoAno)}`;
  });
}

// ============================
// WhatsApp (botão do formulário de proposta)
// ============================
const btnWhatsContato = document.getElementById('btnWhatsContato');
const contactResult = document.getElementById('contactResult');

// Ajuste aqui o número de destino (DDI+DDD+numero, sem símbolos)
const WHATS_DESTINO = '5561996140478';

function setContactMsg(msg) {
  if (!contactResult) return;
  contactResult.textContent = msg || '';
}

function getVal(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function buildWhatsMessage() {
  const nome = getVal('nome');
  const email = getVal('email');
  const telefone = getVal('telefone');
  const perfil = getVal('perfil');
  const distribuidora = getVal('distribuidora');
  const valorFatura = getVal('valorFatura');

  return [
    'Olá! Gostaria de solicitar uma proposta.',
    '',
    `Nome: ${nome || '-'}`,
    `E-mail: ${email || '-'}`,
    `WhatsApp: ${telefone || '-'}`,
    `Perfil: ${perfil || '-'}`,
    `Distribuidora: ${distribuidora || '-'}`,
    `Valor médio da fatura: R$ ${valorFatura || '-'}`,
  ].join('\n');
}

function validateForWhats() {
  const nome = getVal('nome');
  const email = getVal('email');
  const telefone = getVal('telefone');
  const perfil = getVal('perfil');
  const distribuidora = getVal('distribuidora');
  const valorFatura = getVal('valorFatura');
  const lgpd = document.getElementById('lgpd');

  if (!nome || !email || !telefone || !perfil || !distribuidora || !valorFatura) {
    return 'Preencha os campos acima para enviar pelo WhatsApp.';
  }
  if (lgpd && !lgpd.checked) {
    return 'Para continuar, marque o consentimento de uso de dados (LGPD).';
  }
  return '';
}

function openWhatsAppWithMessage() {
  const err = validateForWhats();
  if (err) {
    setContactMsg(err);
    return;
  }

  setContactMsg('');
  const msg = buildWhatsMessage();
  const url = `https://wa.me/${WHATS_DESTINO}?text=${encodeURIComponent(msg)}`;

  // Alguns navegadores bloqueiam window.open; fallback para navegação na mesma aba
  const w = window.open(url, '_blank', 'noopener');
  if (!w) window.location.href = url;
}

if (btnWhatsContato) {
  // Sempre impedir o comportamento padrão do <a> (que abriria WA em branco)
  btnWhatsContato.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsAppWithMessage();
  });
}
