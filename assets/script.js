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
    resultado.textContent = '';

    // usa validação HTML5 (required, min, max)
    if (!quickForm.checkValidity()) {
      quickForm.reportValidity();
      resultado.textContent = 'Preencha os campos para calcular a estimativa.';
      return;
    }

    const kwh = Number(document.getElementById('consumo')?.value);
    const perc = Number(document.getElementById('percentual')?.value);

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
// Formulário "Solicite sua proposta"
// - Receber proposta: envia via Netlify Forms (submit normal)
// - Falar no WhatsApp: abre WA com mensagem pronta
// Regras: NÃO permitir seguir com campos em branco.
// ============================
const contactForm = document.getElementById('contactForm');
const btnWhatsContato = document.getElementById('btnWhatsContato');
const contactResult = document.getElementById('contactResult');

// Ajuste aqui o número de destino (DDI+DDD+numero, sem símbolos)
const WHATS_DESTINO = '5561996140478';

function getVal(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function setContactMsg(msg) {
  if (!contactResult) return;
  contactResult.textContent = msg || '';
}

function markTouched(el) {
  if (!el) return;
  el.classList.add('touched');
}

// Ao tentar enviar: se inválido, mostra mensagens do navegador e impede submit
if (contactForm) {
  // marca campos como "tocados" quando o usuário tenta enviar
  const requiredFields = contactForm.querySelectorAll('input[required], select[required]');
  requiredFields.forEach((el) => {
    el.addEventListener('blur', () => markTouched(el));
    el.addEventListener('change', () => markTouched(el));
    el.addEventListener('input', () => markTouched(el));
  });

  contactForm.addEventListener('submit', (e) => {
    setContactMsg('');
    // checkValidity usa as regras HTML5 (required, type=email etc.)
    if (!contactForm.checkValidity()) {
      e.preventDefault();
      // dispara os balões/mensagens padrão do navegador
      contactForm.reportValidity();
      // marca tudo como tocado para destacar visualmente
      requiredFields.forEach(markTouched);
      setContactMsg('Revise os campos destacados para continuar.');
    }
    // se estiver válido, segue submit normal (Netlify Forms)
  });
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

function openWhatsAppWithMessage() {
  if (contactForm && !contactForm.checkValidity()) {
    contactForm.reportValidity();
    const requiredFields = contactForm.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(markTouched);
    setContactMsg('Preencha todos os campos para enviar pelo WhatsApp.');
    return;
  }

  setContactMsg('');
  const msg = buildWhatsMessage();
  const url = `https://wa.me/${WHATS_DESTINO}?text=${encodeURIComponent(msg)}`;

  const w = window.open(url, '_blank', 'noopener');
  if (!w) window.location.href = url;
}

if (btnWhatsContato) {
  btnWhatsContato.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsAppWithMessage();
  });
}
