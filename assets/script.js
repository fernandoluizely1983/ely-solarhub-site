// Atualiza ano
const year = document.getElementById('year');
if(year){ year.textContent = new Date().getFullYear(); }

// Estimativa ilustrativa: success fee
const quickForm = document.getElementById('quickForm');
const resultado = document.getElementById('resultado');
if(quickForm){
  quickForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fatura = Number(document.getElementById('fatura').value || 0);
    const economiaPerc = Number(document.getElementById('economiaPerc').value || 0) / 100;
    const perc = Number(document.getElementById('percentual').value || 0) / 100;

    if(!fatura || !economiaPerc || !perc){
      resultado.textContent = 'Preencha o valor da fatura, economia estimada e percentual.';
      return;
    }

    // Estimativa simples (ilustrativa): usa percentuais informados pelo usuário.
    // A apuração real do success fee deve ser feita com base no VRSC e VEF da fatura do ciclo.
    const economia = Math.max(0, fatura * economiaPerc);
    const vef = Math.max(0, fatura - economia);
    const fee = economia * perc;
    resultado.textContent = `VRSC≈ R$ ${fatura.toFixed(2)} • VEF≈ R$ ${vef.toFixed(2)} • Economia≈ R$ ${economia.toFixed(2)} • Success fee≈ R$ ${fee.toFixed(2)}.`;
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
    const telefone = document.getElementById('telefone').value.trim();
    const perfil = document.getElementById('perfil').value;
    const distribuidora = document.getElementById('distribuidora').value.trim();
    const valorConta = document.getElementById('valorConta').value.trim();
    const lgpd = document.getElementById('lgpd')?.checked;

    if(!nome || !email || !perfil){
      contactResult.textContent = 'Preencha nome, e-mail e perfil.';
      return;
    }
    if(!lgpd){
      contactResult.textContent = 'Para enviar, marque o consentimento de privacidade (LGPD).';
      return;
    }

    const linhas = [
      'Olá! Gostaria de receber uma proposta da Ely SolarHub.',
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone ? `WhatsApp: ${telefone}` : null,
      `Perfil: ${perfil}`,
      distribuidora ? `Distribuidora: ${distribuidora}` : null,
      valorConta ? `Valor médio da fatura: R$ ${Number(valorConta).toFixed(2)}` : null,
      '',
      'Observação: ciente de que a apuração segue VRSC e VEF na fatura do ciclo (SCEE) e que não há garantia de economia mínima.'
    ].filter(Boolean);

    const msg = encodeURIComponent(linhas.join('\n'));
    const wa = `https://wa.me/5561996140478?text=${msg}`;

    // Feedback imediato e abertura do WhatsApp em nova aba.
    contactResult.textContent = 'Perfeito! Abrindo o WhatsApp com sua solicitação…';
    window.open(wa, '_blank', 'noopener');
    contactForm.reset();
  })
}
