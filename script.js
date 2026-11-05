const form = document.getElementById("form-signo");
const inputData = document.getElementById("dataNascimento");
const formCard = document.getElementById("form-card");
const resultadoCard = document.getElementById("resultado-card");
const btnVoltar = document.getElementById("btn-voltar");
const btnDescobrir = document.getElementById("btn-descobrir");
const erroMsg = document.getElementById("erro-msg");

function mostrarErro(texto) {
    erroMsg.innerHTML = texto;
    erroMsg.classList.remove("d-none");
}

function esconderErro() {
    erroMsg.classList.add("d-none");
    erroMsg.innerHTML = "";
}

function preencherResultado(signo) {
    document.getElementById("simbolo-signo").textContent = signo.simbolo;
    document.getElementById("nome-signo").textContent = signo.nome;
    document.getElementById("periodo-signo").textContent = signo.periodo;
    document.getElementById("elemento-signo").textContent = signo.elemento;
    document.getElementById("planeta-signo").textContent = signo.planeta;
    document.getElementById("cor-signo").textContent = signo.cor;
    document.getElementById("numeros-signo").textContent = signo.numeros;
    document.getElementById("descricao-signo").textContent = signo.descricao;
    document.getElementById("amor-signo").textContent = signo.amor;
    document.getElementById("fortes-signo").textContent = signo.fortes;
    document.getElementById("compat-signo").textContent = signo.compat;
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    esconderErro();

    if (!inputData.value) {
        inputData.classList.add("is-invalid");
        return;
    }
    inputData.classList.remove("is-invalid");

    btnDescobrir.disabled = true;
    btnDescobrir.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Buscando no banco...';

    try {
        const statusResp = await fetch("/api/status");
        if (!statusResp.ok) {
            throw new Error("Servidor não respondeu em /api/status");
        }
        const status = await statusResp.json();
        if (!status.ok) {
            throw new Error("Banco de dados com problema: " + (status.erro || "desconhecido"));
        }
        if (status.total < 1) {
            throw new Error("Banco vazio (0 signos). Reinicie o servidor com python3 app.py");
        }

        const url = "/api/signo?data=" + encodeURIComponent(inputData.value);
        const resp = await fetch(url);

        if (!resp.ok) {
            const err = await resp.json().catch(function () { return {}; });
            throw new Error(err.erro || ("Erro HTTP " + resp.status));
        }

        const signo = await resp.json();
        if (!signo.nome) {
            throw new Error("Resposta do banco sem dados do signo.");
        }

        preencherResultado(signo);
        formCard.classList.add("d-none");
        resultadoCard.classList.remove("d-none");
        resultadoCard.scrollIntoView({ behavior: "smooth", block: "start" });

    } catch (err) {
        console.error(err);
        var msg = "<strong>Erro ao consultar o banco:</strong><br>" + err.message;
        msg += "<br><br><small>Confirme que você abriu a página pelo servidor ";
        msg += "(http://127.0.0.1:PORTA) e não abriu o arquivo HTML direto.</small>";
        mostrarErro(msg);
    } finally {
        btnDescobrir.disabled = false;
        btnDescobrir.innerHTML = '<i class="bi bi-search-heart"></i> Descobrir meu signo';
    }
});

btnVoltar.addEventListener("click", function () {
    resultadoCard.classList.add("d-none");
    formCard.classList.remove("d-none");
    esconderErro();
    inputData.value = "";
    inputData.focus();
});
