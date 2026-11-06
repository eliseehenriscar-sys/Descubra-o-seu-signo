const form = document.getElementById("form-signo");
const inputData = document.getElementById("dataNascimento");
const formCard = document.getElementById("form-card");
const resultadoCard = document.getElementById("resultado-card");
const btnVoltar = document.getElementById("btn-voltar");
const btnDescobrir = document.getElementById("btn-descobrir");
const erroMsg = document.getElementById("erro-msg");
const listaHistorico = document.getElementById("lista-historico");
const btnAtualizarHistorico = document.getElementById("btn-atualizar-historico");

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

function carregarHistorico() {
    fetch("/api/historico")
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (!data.ok || !data.consultas || data.consultas.length === 0) {
                listaHistorico.innerHTML = '<p class="text-muted-claro small mb-0">Nenhuma consulta ainda. Faça uma busca acima.</p>';
                return;
            }
            var html = '<table class="table table-dark table-sm table-borderless mb-0" style="--bs-table-bg:transparent">';
            html += '<thead><tr class="text-muted-claro"><th>#</th><th>Nascimento</th><th>Signo</th><th>Quando</th></tr></thead><tbody>';
            data.consultas.forEach(function (c) {
                html += '<tr class="text-claro"><td>' + c.id + '</td><td>' + c.data_nascimento + '</td>';
                html += '<td><strong>' + c.signo_nome + '</strong></td><td class="small">' + c.data_hora + '</td></tr>';
            });
            html += '</tbody></table>';
            listaHistorico.innerHTML = html;
        })
        .catch(function () {
            listaHistorico.innerHTML = '<p class="text-muted-claro small mb-0">Erro ao carregar histórico.</p>';
        });
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
    btnDescobrir.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Buscando...';

    try {
        var statusResp = await fetch("/api/status");
        if (!statusResp.ok) throw new Error("Servidor não respondeu");
        var status = await statusResp.json();
        if (!status.ok) throw new Error(status.erro || "Problema no banco");

        var resp = await fetch("/api/signo?data=" + encodeURIComponent(inputData.value));
        if (!resp.ok) {
            var err = await resp.json().catch(function () { return {}; });
            throw new Error(err.erro || ("Erro " + resp.status));
        }
        var signo = await resp.json();
        if (!signo.nome) throw new Error("Sem dados do signo");

        preencherResultado(signo);
        formCard.classList.add("d-none");
        resultadoCard.classList.remove("d-none");
        resultadoCard.scrollIntoView({ behavior: "smooth", block: "start" });
        carregarHistorico();
    } catch (err) {
        console.error(err);
        mostrarErro("<strong>Erro:</strong> " + err.message + "<br><small>Use http://127.0.0.1:PORTA (não abra o HTML direto)</small>");
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

if (btnAtualizarHistorico) {
    btnAtualizarHistorico.addEventListener("click", carregarHistorico);
}
carregarHistorico();
