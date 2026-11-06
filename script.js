const signos = {
    aries: {
        nome: "Áries", simbolo: "♈", periodo: "21 de março a 20 de abril",
        elemento: "Fogo", planeta: "Marte", cor: "Vermelho", numeros: "1, 9, 17",
        descricao: "Áries é o primeiro signo do zodíaco. Pessoas de Áries são impulsivas, corajosas, energéticas e líderes natas. Gostam de desafios, agem rápido e possuem grande iniciativa. Podem ser impacientes e um pouco competitivas.",
        amor: "No amor são apaixonadas, diretas e gostam de conquistar. Precisam de liberdade e de um parceiro que acompanhe seu ritmo dinâmico.",
        fortes: "Coragem, liderança, otimismo, determinação e honestidade.",
        compat: "Melhor compatibilidade com Leão, Sagitário e Gêmeos. Boa também com Aquário e Libra."
    },
    touro: {
        nome: "Touro", simbolo: "♉", periodo: "21 de abril a 20 de maio",
        elemento: "Terra", planeta: "Vênus", cor: "Verde / Rosa", numeros: "2, 6, 15",
        descricao: "Touro valoriza estabilidade, conforto e prazeres sensoriais. São pessoas práticas, pacientes, leais e com forte senso de segurança material e emocional. Podem ser teimosas quando decidem algo.",
        amor: "São carinhosos, sensuais e buscam relacionamentos duradouros. Demonstram amor através de gestos concretos e fidelidade.",
        fortes: "Paciência, lealdade, praticidade, perseverança e bom gosto.",
        compat: "Melhor compatibilidade com Virgem, Capricórnio e Câncer. Boa também com Peixes e Escorpião."
    },
    gemeos: {
        nome: "Gêmeos", simbolo: "♊", periodo: "21 de maio a 20 de junho",
        elemento: "Ar", planeta: "Mercúrio", cor: "Amarelo", numeros: "3, 5, 14",
        descricao: "Gêmeos é o signo da comunicação e da versatilidade. São curiosos, inteligentes, sociáveis e adoram trocar ideias. Possuem mente ágil e se adaptam facilmente a novas situações. Podem parecer inquietos ou inconstantes.",
        amor: "Gostam de conversas estimulantes e de variedade. Precisam de um parceiro intelectualmente compatível e que respeite sua necessidade de movimento.",
        fortes: "Comunicação, inteligência, adaptabilidade, humor e versatilidade.",
        compat: "Melhor compatibilidade com Libra, Aquário e Áries. Boa também com Leão e Sagitário."
    },
    cancer: {
        nome: "Câncer", simbolo: "♋", periodo: "21 de junho a 22 de julho",
        elemento: "Água", planeta: "Lua", cor: "Prata / Branco", numeros: "2, 7, 11",
        descricao: "Câncer é profundamente emocional e ligado à família e ao lar. São protetores, intuitivos, sensíveis e carinhosos. Valorizam a segurança emocional e podem ser um pouco possessivos ou humoráveis.",
        amor: "São românticos, cuidadosos e buscam conexões profundas. Demonstram amor cuidando do outro e criando um ambiente acolhedor.",
        fortes: "Empatia, intuição, lealdade, proteção e capacidade de cuidar.",
        compat: "Melhor compatibilidade com Escorpião, Peixes e Touro. Boa também com Virgem e Capricórnio."
    },
    leao: {
        nome: "Leão", simbolo: "♌", periodo: "23 de julho a 22 de agosto",
        elemento: "Fogo", planeta: "Sol", cor: "Dourado / Laranja", numeros: "1, 4, 10",
        descricao: "Leão é confiante, generoso, criativo e gosta de ser o centro das atenções. Possuem carisma natural, orgulho saudável e grande generosidade. Podem ser dramáticos e orgulhosos demais em alguns momentos.",
        amor: "São apaixonados, leais e gostam de elogiar e ser elogiados. Buscam um relacionamento que os faça se sentir especiais e admirados.",
        fortes: "Confiança, generosidade, criatividade, lealdade e magnetismo.",
        compat: "Melhor compatibilidade com Áries, Sagitário e Libra. Boa também com Gêmeos e Aquário."
    },
    virgem: {
        nome: "Virgem", simbolo: "♍", periodo: "23 de agosto a 22 de setembro",
        elemento: "Terra", planeta: "Mercúrio", cor: "Bege / Verde claro", numeros: "5, 14, 23",
        descricao: "Virgem é analítico, organizado, perfeccionista e prestativo. Prestam atenção aos detalhes e buscam utilidade e eficiência em tudo. Podem ser críticos consigo mesmos e com os outros.",
        amor: "Demonstram amor através de gestos práticos e cuidados diários. Valorizam estabilidade e honestidade no relacionamento.",
        fortes: "Organização, inteligência prática, dedicação, discrição e utilidade.",
        compat: "Melhor compatibilidade com Touro, Capricórnio e Câncer. Boa também com Escorpião e Peixes."
    },
    libra: {
        nome: "Libra", simbolo: "♎", periodo: "23 de setembro a 22 de outubro",
        elemento: "Ar", planeta: "Vênus", cor: "Rosa / Azul claro", numeros: "6, 15, 24",
        descricao: "Libra busca harmonia, justiça e beleza. São diplomáticos, sociáveis, elegantes e com forte senso de equidade. Podem ter dificuldade em tomar decisões por quererem agradar a todos.",
        amor: "São românticos, parceiros e valorizam o equilíbrio no casal. Gostam de relacionamentos harmoniosos e estéticamente agradáveis.",
        fortes: "Diplomacia, senso de justiça, charme, sociabilidade e equilíbrio.",
        compat: "Melhor compatibilidade com Gêmeos, Aquário e Leão. Boa também com Áries e Sagitário."
    },
    escorpiao: {
        nome: "Escorpião", simbolo: "♏", periodo: "23 de outubro a 21 de novembro",
        elemento: "Água", planeta: "Plutão / Marte", cor: "Preto / Bordô", numeros: "8, 11, 18",
        descricao: "Escorpião é intenso, apaixonado, misterioso e profundamente leal. Possuem grande força de vontade, intuição e capacidade de transformação. Podem ser possessivos e guardam rancores.",
        amor: "Amam com intensidade total. Buscam conexão profunda e verdade. Não aceitam superficialidade nos relacionamentos.",
        fortes: "Intensidade, lealdade, determinação, intuição e resiliência.",
        compat: "Melhor compatibilidade com Câncer, Peixes e Virgem. Boa também com Touro e Capricórnio."
    },
    sagitario: {
        nome: "Sagitário", simbolo: "♐", periodo: "22 de novembro a 21 de dezembro",
        elemento: "Fogo", planeta: "Júpiter", cor: "Roxo / Azul", numeros: "3, 9, 12",
        descricao: "Sagitário é aventureiro, otimista, filosófico e livre. Adoram viajar, aprender e expandir horizontes. São honestos (às vezes demais) e possuem grande senso de humor. Podem ser irresponsáveis ou excessivamente diretos.",
        amor: "Precisam de liberdade e de um parceiro que compartilhe a sede de aventura e conhecimento. São leais quando encontram alguém especial.",
        fortes: "Otimismo, honestidade, entusiasmo, visão ampla e generosidade.",
        compat: "Melhor compatibilidade com Áries, Leão e Aquário. Boa também com Gêmeos e Libra."
    },
    capricornio: {
        nome: "Capricórnio", simbolo: "♑", periodo: "22 de dezembro a 19 de janeiro",
        elemento: "Terra", planeta: "Saturno", cor: "Marrom / Preto", numeros: "4, 8, 13",
        descricao: "Capricórnio é ambicioso, responsável, disciplinado e pragmático. Valorizam o trabalho duro, o status e a construção de uma base sólida. Podem parecer frios ou excessivamente sérios.",
        amor: "São leais e comprometidos a longo prazo. Demonstram amor através de estabilidade, proteção e conquistas compartilhadas.",
        fortes: "Disciplina, ambição, responsabilidade, paciência e perseverança.",
        compat: "Melhor compatibilidade com Touro, Virgem e Peixes. Boa também com Escorpião e Câncer."
    },
    aquario: {
        nome: "Aquário", simbolo: "♒", periodo: "20 de janeiro a 18 de fevereiro",
        elemento: "Ar", planeta: "Urano / Saturno", cor: "Azul elétrico", numeros: "4, 7, 11",
        descricao: "Aquário é inovador, independente, humanitário e original. Pensam no coletivo e valorizam a liberdade individual. São visionários e podem parecer distantes emocionalmente ou excêntricos.",
        amor: "Precisam de liberdade e de um relacionamento baseado em amizade e respeito mútuo. Valorizam a individualidade do parceiro.",
        fortes: "Originalidade, humanitarismo, inteligência, independência e visão de futuro.",
        compat: "Melhor compatibilidade com Gêmeos, Libra e Sagitário. Boa também com Áries e Leão."
    },
    peixes: {
        nome: "Peixes", simbolo: "♓", periodo: "19 de fevereiro a 20 de março",
        elemento: "Água", planeta: "Netuno / Júpiter", cor: "Lilás / Verde água", numeros: "3, 7, 12",
        descricao: "Peixes é sonhador, compassivo, artístico e extremamente sensível. Possuem grande empatia e imaginação. Podem se perder em fantasias ou ser excessivamente escapistas.",
        amor: "São românticos, intuitivos e se doam completamente. Buscam uma conexão espiritual e emocional profunda.",
        fortes: "Empatia, criatividade, intuição, compaixão e adaptabilidade.",
        compat: "Melhor compatibilidade com Câncer, Escorpião e Capricórnio. Boa também com Touro e Virgem."
    }
};

function descobrirChave(mes, dia) {
    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 20)) return "aries";
    if ((mes === 4 && dia >= 21) || (mes === 5 && dia <= 20)) return "touro";
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return "gemeos";
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return "cancer";
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return "leao";
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return "virgem";
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return "libra";
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return "escorpiao";
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return "sagitario";
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return "capricornio";
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "aquario";
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return "peixes";
    return "aries";
}

const HIST_KEY = "signo_historico";

function lerHistorico() {
    try { return JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); }
    catch (e) { return []; }
}

function salvarConsulta(dataNascimento, signoNome) {
    var lista = lerHistorico();
    lista.unshift({
        id: Date.now(),
        data_nascimento: dataNascimento,
        signo_nome: signoNome,
        data_hora: new Date().toLocaleString("pt-BR")
    });
    if (lista.length > 30) lista = lista.slice(0, 30);
    localStorage.setItem(HIST_KEY, JSON.stringify(lista));
}

function mostrarHistorico() {
    var lista = lerHistorico();
    var el = document.getElementById("lista-historico");
    if (!lista.length) {
        el.innerHTML = '<p class="text-muted-claro small mb-0">Nenhuma consulta ainda.</p>';
        return;
    }
    var html = '<table class="table table-dark table-sm table-borderless mb-0" style="--bs-table-bg:transparent">';
    html += '<thead><tr class="text-muted-claro"><th>#</th><th>Nascimento</th><th>Signo</th><th>Quando</th></tr></thead><tbody>';
    lista.forEach(function (c, i) {
        html += '<tr class="text-claro"><td>' + (i + 1) + '</td><td>' + c.data_nascimento + '</td>';
        html += '<td><strong>' + c.signo_nome + '</strong></td><td class="small">' + c.data_hora + '</td></tr>';
    });
    html += '</tbody></table>';
    el.innerHTML = html;
}

const form = document.getElementById("form-signo");
const inputData = document.getElementById("dataNascimento");
const formCard = document.getElementById("form-card");
const resultadoCard = document.getElementById("resultado-card");
const btnVoltar = document.getElementById("btn-voltar");

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

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!inputData.value) {
        inputData.classList.add("is-invalid");
        return;
    }
    inputData.classList.remove("is-invalid");

    var p = inputData.value.split("-");
    var mes = parseInt(p[1], 10);
    var dia = parseInt(p[2], 10);
    var signo = signos[descobrirChave(mes, dia)];

    preencherResultado(signo);
    salvarConsulta(inputData.value, signo.nome);
    mostrarHistorico();

    formCard.classList.add("d-none");
    resultadoCard.classList.remove("d-none");
    resultadoCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

btnVoltar.addEventListener("click", function () {
    resultadoCard.classList.add("d-none");
    formCard.classList.remove("d-none");
    inputData.value = "";
    inputData.focus();
});

document.getElementById("btn-limpar-historico").addEventListener("click", function () {
    localStorage.removeItem(HIST_KEY);
    mostrarHistorico();
});

mostrarHistorico();
