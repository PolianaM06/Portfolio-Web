
"use strict";

// Aguarda o carregamento do HTML
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os elementos do formulário
    const formulario = document.querySelector("#formContato");
    const mensagemFormulario = document.querySelector(
        "#mensagemFormulario"
    );

    // Verifica se os elementos existem
    if (!formulario || !mensagemFormulario) {
        return;
    }

    // Executa quando o formulário é enviado
    formulario.addEventListener("submit", async function (event) {

        // Impede o envio tradicional e o recarregamento da página
        event.preventDefault();

        // Verifica a validade dos campos HTML
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Obtém os valores digitados
        const nome = document.querySelector("#nome").value.trim();
        const email = document.querySelector("#email").value.trim();
        const texto = document.querySelector("#mensagem").value.trim();

        // Verifica se os campos não estão vazios
        if (nome === "" || email === "" || texto === "") {
            exibirMensagem(
                "Preencha todos os campos antes de continuar.",
                "danger"
            );
            return;
        }

        // Verifica o formato básico do e-mail
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(email)) {
            exibirMensagem(
                "Digite um endereço de e-mail válido.",
                "danger"
            );
            return;
        }

        // Desativa o botão durante o envio
        const botaoEnviar = formulario.querySelector(
            'button[type="submit"]'
        );

        if (botaoEnviar) {
            botaoEnviar.disabled = true;
            botaoEnviar.textContent = "Enviando...";
        }

        try {

            // Envia os dados para o FormSubmit
            const resposta = await fetch(
                "https://formsubmit.co/ajax/polifmelo_15@hotmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: nome,
                        email: email,
                        message: texto,
                        _subject: "Nova mensagem do portfólio"
                    })
                }
            );

            // Converte a resposta recebida em JSON
            const resultado = await resposta.json();

            // Verifica se o serviço aceitou a solicitação
            if (!resposta.ok || resultado.success === false) {
                throw new Error("Falha no envio da mensagem.");
            }

            // Exibe a confirmação de envio
            exibirMensagem(
                "Mensagem enviada com sucesso! Obrigada pelo contato.",
                "success"
            );

            // Limpa os campos após o envio aceito
            formulario.reset();

        } catch (erro) {

            // Exibe uma mensagem caso ocorra um erro
            exibirMensagem(
                "Não foi possível enviar a mensagem. Tente novamente.",
                "danger"
            );

            console.error("Erro ao enviar o formulário:", erro);

        } finally {

            // Reativa o botão após a tentativa de envio
            if (botaoEnviar) {
                botaoEnviar.disabled = false;
                botaoEnviar.textContent = "Enviar mensagem";
            }
        }
    });

    // Função para mostrar mensagens ao usuário
    function exibirMensagem(texto, tipo) {

        mensagemFormulario.textContent = texto;

        mensagemFormulario.className = "mt-3 mx-auto alert";

        if (tipo === "success") {
            mensagemFormulario.classList.add("alert-success");
        } else {
            mensagemFormulario.classList.add("alert-danger");
        }
    }

});
