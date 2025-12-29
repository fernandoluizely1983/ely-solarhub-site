// Atualiza ano
const year = document.getElementById('year');
if(year){ year.textContent = new Date().getFullYear(); }

// Estimativa ilustrativa: success fee
const quickForm = document.getElementById('quickForm');
const resultado = document.getElementById('resultado');
if(quickForm){
  quickForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const kwh = Number(document.getElementById('consumo').value || 0);
    const perc = Number(document.getElementById('percentual').value || 0)/100;
    if(!kwh || !perc){resultado.textContent = 'Preencha consumo e percentual.';return;}
    // Tarifa média ilustrativa: R$0,85/kWh | supõe compensação de 15% no ciclo (apenas exemplo)
    const tarifa = 0.85;
    const contaSem = kwh * tarifa;          // VRSC aproximado
    const compensacao = contaSem * 0.15;    // economia hipotética
    const vef = contaSem - compensacao;     // VEF aproximado
    const economia = Math.max(0, contaSem - vef);
    const fee = economia * perc;
    resultado.textContent = `VRSC≈ R$ ${contaSem.toFixed(2)} • VEF≈ R$ ${vef.toFixed(2)} • Economia≈ R$ ${economia.toFixed(2)} • Success fee≈ R$ ${fee.toFixed(2)}.`;
  })
}

// Formulário de contato (simulação)
const 
// Contato / proposta -> envia para WhatsApp
const contactForm = document.getElementById('contactForm');
const contactResult = document.getElementById('contactResult');
const whatsBtn = document.getElementById('whatsBtn');

function buildWhatsMessage(){
  const nome = (document.getElementById('nome')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const telefone = (document.getElementById('telefone')?.value || '').trim();
  const perfil = (document.getElementById('perfil')?.value || '').trim();
  const distribuidora = (document.getElementById('distribuidora')?.value || '').trim();
  const fatura = (document.getElementById('fatura')?.value || '').trim();

  return [
    'Olá! Gostaria de solicitar proposta.',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `WhatsApp: ${telefone}`,
    `Perfil: ${perfil}`,
    `Distribuidora: ${distribuidora}`,
    `Fatura média (R$): ${fatura}`,
  ].join('\n');
}

function openWhatsApp(){
  const companyNumber = '5561996140478'; // ajuste se necessário
  const msg = buildWhatsMessage();
  const url = `https://wa.me/${companyNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
}

function validateContact(){
  const nome = (document.getElementById('nome')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const telefone = (document.getElementById('telefone')?.value || '').trim();
  const perfil = (document.getElementById('perfil')?.value || '').trim();
  const distribuidora = (document.getElementById('distribuidora')?.value || '').trim();
  const fatura = (document.getElementById('fatura')?.value || '').trim();
  const lgpd = document.getElementById('lgpd');

  if(!nome || !email || !telefone || !perfil || !distribuidora || !fatura){
    contactResult.textContent = 'Preencha todos os campos para solicitar a proposta.';
    return false;
  }
  if(lgpd && !lgpd.checked){
    contactResult.textContent = 'Para continuar, marque o aceite da Política de Privacidade.';
    return false;
  }
  contactResult.textContent = '';
  return true;
}

if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!validateContact()) return;
    contactResult.textContent = 'Perfeito! Vamos te direcionar para o WhatsApp para finalizar o pedido.';
    openWhatsApp();
    contactForm.reset();
  });
}

if(whatsBtn){
  whatsBtn.addEventListener('click', ()=>{
    if(contactForm && !validateContact()) return;
    openWhatsApp();
  });
}
