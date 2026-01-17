// Aguarda o carregamento completo da página para evitar erros
document.addEventListener('DOMContentLoaded', function () {

    // Selecionando os elementos do HTML
    const form = document.getElementById('calc-form');
    const resultDiv = document.getElementById('result');
    const totalTijolosSpan = document.getElementById('total-tijolos');

    // Adiciona um "ouvinte" para quando o usuário clicar no botão (enviar o formulário)
    form.addEventListener('submit', function (event) {

        // Impede que a página recarregue (padrão de formulários)
        event.preventDefault();

        // 1. Captura os valores dos inputs
        // parseFloat converte o texto digitado para número decimal
        const altura = parseFloat(document.getElementById('altura').value);
        const comprimento = parseFloat(document.getElementById('comprimento').value);
        const areaTijolo = parseFloat(document.getElementById('tipo-tijolo').value);

        // Validação básica (caso passe algo errado)
        if (isNaN(altura) || isNaN(comprimento) || isNaN(areaTijolo)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // 2. Cálculo da Área da Parede (m²)
        const areaParede = altura * comprimento;

        // 3. Cálculo da Quantidade de Tijolos (Sem perdas)
        const quantidadeLiquida = areaParede / areaTijolo;

        // 4. Adicionando 10% de margem de segurança (Perdas/Quebras)
        // Multiplicar por 1.10 é o mesmo que somar 10%
        const quantidadeComMargem = quantidadeLiquida * 1.10;

        // 5. Arredondamento
        // Math.ceil arredonda para o próximo número inteiro (Ex: 50.1 vira 51)
        const resultadoFinal = Math.ceil(quantidadeComMargem);

        // 6. Exibindo o resultado na tela
        totalTijolosSpan.textContent = resultadoFinal;

        // Remove a classe 'hidden' para fazer o resultado aparecer
        resultDiv.classList.remove('hidden');
    });
});