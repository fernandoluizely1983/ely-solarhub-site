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

// Formulário de contato (simulação)
const contactForm = document.getElementById('contactForm');
const contactResult = document.getElementById('contactResult');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!nome || !email){ contactResult.textContent = 'Preencha nome e e-mail.'; return; }
    contactResult.textContent = 'Obrigado! Em breve enviaremos sua proposta com metodologia VRSC/VEF.';
    contactForm.reset();
  })
}
