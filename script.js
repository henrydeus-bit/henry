// Dados Estruturados para Componentes Dinâmicos
const depoimentosData = [
    {
        texto: "Reduzimos o consumo de defensivos em 22% logo na primeira safra de soja com a consultoria. Margem de lucro aumentou de forma limpa.",
        autor: "Ronaldo Schultz, Produtor Rural - RS"
    },
    {
        texto: "Zero problemas com fiscalização ambiental este ano. O mapeamento e a dosagem recomendada pelos engenheiros nos salvou de multas complexas.",
        autor: "Mariana Costa, Gestora Agrícola - MT"
    }
];

const faqData = [
    {
        pergunta: "A consultoria recomenda a suspensão total de defensivos?",
        resposta: "Não. Atuamos com o Manejo Integrado de Pragas (MIP). O foco é utilizar a aplicação química de forma estratégica, precisa e racional, evitando desperdícios e superdosagens perigosas."
    },
    {
        pergunta: "Como é calculada a redução de custos?",
        resposta: "Através da calibragem fina de pulverizadores, mapeamento via drone de focos reais de infestação e prescrição com base nas curvas epidemiológicas exatas da lavoura."
    },
    {
        pergunta: "O plano atende às normas técnicas nacionais?",
        resposta: "Sim, todas as recomendações baseiam-se estritamente no Receituário Agronômico, obedecendo as diretrizes do MAPA, ANVISA e legislações estaduais vigentes."
    }
];

// Inicialização de Componentes e Estados de Acessibilidade
document.addEventListener("DOMContentLoaded", () => {
    
    // Renderizar Carrossel
    const track = document.getElementById("carousel-track");
    if(track) {
        depoimentosData.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("carousel-item");
            div.innerHTML = `<p>"${item.texto}"</p><h4>${item.autor}</h4>`;
            track.appendChild(div);
        });
    }

    // Lógica do Carrossel
    let indexAtual = 0;
    const btnPrev = document.getElementById("carousel-prev");
    const btnNext = document.getElementById("carousel-next");
    
    function atualizarCarrossel() {
        if(track) {
            track.style.transform = `translateX(-${indexAtual * 100}%)`;
        }
    }

    if(btnNext && btnPrev) {
        btnNext.addEventListener("click", () => {
            indexAtual = (indexAtual + 1) % depoimentosData.length;
            atualizarCarrossel();
        });
        btnPrev.addEventListener("click", () => {
            indexAtual = (indexAtual - 1 + depoimentosData.length) % depoimentosData.length;
            atualizarCarrossel();
        });
    }

    // Renderizar Acordeão (FAQ)
    const accordionContainer = document.getElementById("faq-accordion");
    if(accordionContainer) {
        faqData.forEach((item, index) => {
            const accItem = document.createElement("div");
            accItem.classList.add("accordion-item");

            const header = document.createElement("button");
            header.classList.add("accordion-header");
            header.innerHTML = `<span>${item.pergunta}</span><span>+</span>`;
            header.setAttribute("aria-expanded", "false");

            const content = document.createElement("div");
            content.classList.add("accordion-content");
            content.innerHTML = `<p>${item.resposta}</p>`;

            header.addEventListener("click", () => {
                const ativo = header.getAttribute("aria-expanded") === "true";
                header.setAttribute("aria-expanded", !ativo);
                header.querySelector("span:last-child").textContent = ativo ? "+" : "-";
                content.style.maxHeight = ativo ? "0px" : `${content.scrollHeight}px`;
            });

            accItem.appendChild(header);
            accItem.appendChild(content);
            accordionContainer.appendChild(accItem);
        });
    }

    // Acessibilidade: Controle de Fonte
    let tamanhoFonteAtual = 16;
    const btnAumentar = document.getElementById("btn-font-increase");
    const btnDiminuir = document.getElementById("btn-font-decrease");

    if(btnAumentar && btnDiminuir) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoFonteAtual < 24) {
                tamanhoFonteAtual += 2;
                document.body.style.setProperty('--base-font-size', `${tamanhoFonteAtual}px`);
            }
        });

        btnDiminuir.addEventListener("click", () => {
            if (tamanhoFonteAtual > 12) {
                tamanhoFonteAtual -= 2;
                document.body.style.setProperty('--base-font-size', `${tamanhoFonteAtual}px`);
            }
        });
    }

    // Acessibilidade: Alto Contraste
    const btnContraste = document.getElementById("btn-contrast");
    if(btnContraste) {
        btnContraste.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
        });
    }
});