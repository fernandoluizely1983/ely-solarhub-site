const fmtBRL = (v) => Number(v).toLocaleString("pt-BR", {
  style: "currency", currency: "BRL",
});

const resultadoEl = document.getElementById("resultado");
const resumoEl = document.getElementById("resumo-executivo");

function renderResultadosFormal({ vrsc, vef, economiaMensal, successFee }) {
  const linhaFormal = `
    <div class="resultado-formal">
      <b>VRSC:</b> ${fmtBRL(vrsc)} |
      <b>VEF:</b> ${fmtBRL(vef)} |
      <b>Economia:</b> ${fmtBRL(economiaMensal)} |
      <b>Success fee:</b> ${fmtBRL(successFee)}
    </div>
  `;
  if (resultadoEl) resultadoEl.innerHTML = linhaFormal;

  const economiaAnual = Number(economiaMensal) * 12;
  if (resumoEl) {
    resumoEl.innerHTML = `
      <div class="linha-forte">Economia mensal de ${fmtBRL(economiaMensal)}</div>
      <div class="linha-forte">Economia anual de ${fmtBRL(economiaAnual)}</div>
    `;
  }
}

// Mock com seus números de exemplo (apenas para validar visual):
renderResultadosFormal({
  vrsc: 297.50,
  vef: 252.88,
  economiaMensal: 44.63,
  successFee: 8.93
});
