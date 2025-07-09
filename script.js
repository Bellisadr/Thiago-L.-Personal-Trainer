document.addEventListener('DOMContentLoaded', () => {
    const sobreTextoContainer = document.querySelector('.sobre__texto'); // O div pai do parágrafo e título
    const paragraph = document.getElementById('sobre-paragrafo-principal');
    const imageToHide = document.querySelector('.foto__sobre'); // Sua imagem original (fora do sobre__texto)

    if (!paragraph || !imageToHide) {
        console.warn("Elementos 'sobre-paragrafo-principal' ou '.foto__sobre' não encontrados. O script pode não funcionar.");
        return;
    }

    const originalTextContent = paragraph.innerHTML; // Salva o HTML original do parágrafo
    
    // Ponto onde você quer inserir a imagem (aproximadamente)
    const brBreakPoint = originalTextContent.indexOf('<br><br>', originalTextContent.indexOf('<br><br>') + 1);

    // Media Query para detectar 375px
    const mediaQuery = window.matchMedia('(max-width: 375px)');

    // Cria o elemento da imagem a ser injetada UMA VEZ
    const inlineImage = document.createElement('img');
    inlineImage.src = 'assets/thiago_sobre.png';
    inlineImage.alt = 'Thiago Lopes';
    inlineImage.classList.add('foto__sobre-inline');
    // Adiciona a imagem ao DOM, mas escondida por padrão
    sobreTextoContainer.appendChild(inlineImage); // Adiciona ao final do sobre__texto

    function applyMobileLayout() {
        if (brBreakPoint !== -1) {
            const textPart1 = originalTextContent.substring(0, brBreakPoint + '<br><br>'.length);
            const textPart2 = originalTextContent.substring(brBreakPoint + '<br><br>'.length);

            // Temporariamente esconde o parágrafo original
            paragraph.style.display = 'none';

            // Garante que a imagem original esteja escondida
            imageToHide.style.display = 'none';

            // Cria ou atualiza os elementos de texto injetados
            let p1 = document.querySelector('.sobre-texto-parte1-js');
            let p2 = document.querySelector('.sobre-texto-parte2-js');

            if (!p1) { // Se não existirem, cria
                p1 = document.createElement('p');
                p1.classList.add('sobre-texto-parte1-js');
                sobreTextoContainer.insertBefore(p1, paragraph); // Insere antes do original
            }
            p1.innerHTML = textPart1;
            p1.style.display = 'block';

            if (!p2) { // Se não existirem, cria
                p2 = document.createElement('p');
                p2.classList.add('sobre-texto-parte2-js');
                sobreTextoContainer.appendChild(p2); // Insere depois da imagem (será reordenado com flexbox/CSS)
            }
            p2.innerHTML = textPart2;
            p2.style.display = 'block';

            // Insere a imagem inline entre p1 e p2 (via JS)
            sobreTextoContainer.insertBefore(inlineImage, p2);
            inlineImage.style.display = 'block'; // Mostra a imagem inline

            sobreTextoContainer.classList.add('mobile-layout-active');
        }
    }

    function revertToOriginalLayout() {
        // Mostra o parágrafo original e esconde os injetados
        paragraph.style.display = 'block';
        
        const p1 = document.querySelector('.sobre-texto-parte1-js');
        const p2 = document.querySelector('.sobre-texto-parte2-js');

        if (p1) p1.style.display = 'none';
        if (p2) p2.style.display = 'none';
        
        inlineImage.style.display = 'none'; // Esconde a imagem inline

        // Mostra a imagem original
        imageToHide.style.display = 'block';

        sobreTextoContainer.classList.remove('mobile-layout-active');
    }

    function handleMediaQueryChange(e) {
        if (e.matches) {
            applyMobileLayout();
        } else {
            revertToOriginalLayout();
        }
    }

    // Chama a função uma vez ao carregar a página
    handleMediaQueryChange(mediaQuery);

    // Adiciona o listener para mudanças na media query
    mediaQuery.addListener(handleMediaQueryChange);
});