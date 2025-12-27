// Formatação BRL
const fmtBRL = (v) => Number(v).toLocaleString("pt-BR", {
  style: "currency", currency: "BRL",
});

const resultadoEl = document.getElementById("resultado");
const resumoEl = document.getElementById("resumo-executivo");

/**
 * Chame esta função com os valores NUMÉRICOS do seu simulador
 * (VRSC, VEF, Economia mensal, Success fee).
 * Não altera a lógica; só a apresentação.
 */
function renderResultadosFormal({ vrsc, vef, economiaMensal, successFee }) {
  // Linha técnica formal (sem “≈” e sem “•”)
  const linhaFormal = `
    <div class="resultado-formal">
      <b>VRSC:</b> ${fmtBRL(vrsc)} |
      <b>VEF:</b> ${fmtBRL(vef)} |
      <b>Economia:</b> ${fmtBRL(economiaMensal)} |
      <b>Success fee:</b> ${fmtBRL(successFee)}
    </div>
  `;
  if (resultadoEl) resultadoEl.innerHTML = linhaFormal;

  // Resumo executivo (mensal + anual)
  const economiaAnual = Number(economiaMensal) * 12;
  if (resumoEl) {
    resumoEl.innerHTML = `
      <div class="linha-forte">Economia mensal de ${fmtBRL(economiaMensal)}</div>
      <div class="linha-forte">Economia anual de ${fmtBRL(economiaAnual)}</div>
    `;
  }
}

// TODO: Chamar renderResultadosFormal com os valores reais após o cálculo.
// Exemplo (mock) — remova quando integrar:
renderResultadosFormal({
  vrsc: 297.50,
  vef: 252.88,
  economiaMensal: 44.63,
  successFee: 8.93,
});
