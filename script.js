const PADROES = {
    "Vedação Simples": [2.8, 4.0, 0.09, 20],
    "Vedação Reforçada": [3.0, 5.0, 0.14, 40],
    "Alvenaria Estrutural": [3.2, 6.0, 0.19, 80]
};

function produtoInterno(v1, v2) {
    return v1.reduce((soma, val, i) => soma + val * v2[i], 0);
}

function norma(v) {
    return Math.sqrt(produtoInterno(v, v));
}

function similaridadeCosseno(v1, v2) {
    return produtoInterno(v1, v2) / (norma(v1) * norma(v2));
}

function classificar() {
    const campos = ["altura", "comprimento", "espessura", "carga"];
    const valores = campos.map(id => parseFloat(document.getElementById(id).value));

    if (valores.some(isNaN)) {
        alert("Preencha todos os campos.");
        return;
    }

    const vetorParede = valores;
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h2>Resultado da Classificação</h2>";
    resultadoDiv.classList.remove("oculto");

    let melhorTipo = "";
    let maiorSimilaridade = -Infinity;

    for (const tipo in PADROES) {
        const sim = similaridadeCosseno(vetorParede, PADROES[tipo]);
        const porcentagem = Math.max(0, Math.min(sim * 100, 100));

        resultadoDiv.innerHTML += `
            <strong>${tipo}</strong> – ${porcentagem.toFixed(2)}%
            <div class="barra">
                <span style="width:${porcentagem}%"></span>
            </div>
        `;

        if (sim > maiorSimilaridade) {
            maiorSimilaridade = sim;
            melhorTipo = tipo;
        }
    }

    resultadoDiv.innerHTML += `
        <div class="tipo-final">
            Classificação final: ${melhorTipo}
        </div>
    `;
}
