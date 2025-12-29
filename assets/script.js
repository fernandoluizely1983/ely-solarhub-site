// Atualiza ano
const year = document.getElementById('year');
if(year){ year.textContent = new Date().getFullYear(); }

// Estimativa ilustrativa: desconto projetado
const quickForm = document.getElementById('quickForm');
const resultado = document.getElementById('resultado');
if(quickForm){
  quickForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const kwh = Number(document.getElementById('consumo').value || 0);
    const percDesconto = Number(document.getElementById('percentual').value || 0)/100;
    if(!kwh || !percDesconto){resultado.textContent = 'Preencha consumo e percentual de desconto.';return;}

    // Modelo simples (ilustrativo): tarifa média x consumo e aplicação do percentual informado
    const tarifa = 0.85; // R$/kWh (apenas referência)
    const valorReferencia = kwh * tarifa;
    const descontoMes = Math.max(0, valorReferencia * percDesconto);
    const descontoAno = descontoMes * 12;

    const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    resultado.innerHTML = `<strong>Desconto no mês:</strong> ${brl(descontoMes)}<br><strong>Desconto anual:</strong> ${brl(descontoAno)}`;
  })
}

// Formulário de contato (envio via WhatsApp)
const contactForm = document.getElementById('contactForm');
const contactResult = document.getElementById('contactResult');
const btnWhatsContato = document.getElementById('btnWhatsContato');

function buildWhatsMessage(){
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

function openWhatsAppWithForm(){
  const msg = buildWhatsMessage();
  const url = `https://wa.me/5561996140478?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
}

function validateContactForm(){
  const nome = (document.getElementById('nome')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const telefone = (document.getElementById('telefone')?.value || '').trim();
  const perfil = (document.getElementById('perfil')?.value || '').trim();
  const distribuidora = (document.getElementById('distribuidora')?.value || '').trim();
  const valorFatura = (document.getElementById('valorFatura')?.value || '').trim();
  const lgpd = document.getElementById('lgpd');

  if(!nome || !email || !telefone || !perfil || !distribuidora || !valorFatura){
    return 'Preencha todos os campos para solicitar a proposta.';
  }
  if(lgpd && !lgpd.checked){
    return 'Para continuar, marque o consentimento de uso de dados (LGPD).';
  }
  return '';
}

if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const err = validateContactForm();
    if(err){ if(contactResult) contactResult.textContent = err; return; }
    if(contactResult) contactResult.textContent = 'Perfeito! Vamos abrir o WhatsApp para você enviar os dados da proposta.';
    openWhatsAppWithForm();
  });
}

if(btnWhatsContato){
  btnWhatsContato.addEventListener('click', (e)=>{
    // Se o usuário já preencheu o formulário, envia com os dados; caso contrário, segue link padrão
    const err = validateContactForm();
    if(err){ return; }
    e.preventDefault();
    openWhatsAppWithForm();
  });
}
