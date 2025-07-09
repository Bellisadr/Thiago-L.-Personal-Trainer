document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.getElementById('sobre-paragrafo-principal');
    const originalText = paragraph.innerHTML; // Salva o HTML original do parágrafo
    const imageToHide = document.querySelector('.foto__sobre'); // Sua imagem original

    // Ponto onde você quer inserir a imagem (aproximadamente)
    // Vou usar a segunda <br><br> como ponto de inserção
    const brBreakPoint = originalText.indexOf('<br><br>', originalText.indexOf('<br><br>') + 1); // Encontra a segunda ocorrência de <br><br>
    
    // Media Query para detectar 375px
    const mediaQuery = window.matchMedia('(max-width: 375px)');

    function handleMediaQuery(e) {
        if (e.matches) {
            // Se a tela for 375px ou menor
            if (brBreakPoint !== -1) {
                const textPart1 = originalText.substring(0, brBreakPoint + '<br><br>'.length);
                const textPart2 = originalText.substring(brBreakPoint + '<br><br>'.length);

                // Esconde a imagem original
                if (imageToHide) {
                    imageToHide.style.display = 'none';
                }

                // Cria o elemento da imagem a ser inserida
                const inlineImage = document.createElement('img');
                inlineImage.src = 'assets/thiago_sobre.png'; // Use a mesma imagem ou uma versão otimizada
                inlineImage.alt = 'Thiago Lopes';
                inlineImage.classList.add('foto__sobre-inline'); // Adicione uma classe para estilizar

                // Cria os novos elementos de parágrafo para as partes do texto
                const p1 = document.createElement('p');
                p1.innerHTML = textPart1;

                const p2 = document.createElement('p');
                p2.innerHTML = textPart2;
                
                // Limpa o conteúdo original e insere os novos elementos
                paragraph.innerHTML = ''; // Limpa o parágrafo original
                paragraph.parentNode.insertBefore(p1, paragraph); // Insere a primeira parte
                paragraph.parentNode.insertBefore(inlineImage, paragraph); // Insere a imagem
                paragraph.parentNode.insertBefore(p2, paragraph); // Insere a segunda parte

                // Remove o parágrafo original vazio se você não o quiser
                paragraph.remove(); 

                // Adiciona a classe ao container pai para ajustar layout
                document.querySelector('.sobre__texto').classList.add('mobile-layout-active');

            }
        } else {
            // Se a tela for maior que 375px
            // Reverte as mudanças, restaurando o HTML original
            const existingInlineImage = document.querySelector('.foto__sobre-inline');
            const existingP1 = document.querySelector('#sobre-paragrafo-principal + p'); // Ou outra forma de selecionar os parágrafos injetados
            const existingP2 = existingP1 ? existingP1.nextElementSibling : null;

            if (existingInlineImage && existingP1 && existingP2) {
                const originalP = document.createElement('p');
                originalP.id = 'sobre-paragrafo-principal';
                originalP.innerHTML = originalText;

                existingP1.parentNode.insertBefore(originalP, existingP1); // Insere o p original de volta
                existingP1.remove();
                existingInlineImage.remove();
                existingP2.remove();

                // Mostra a imagem original
                if (imageToHide) {
                    imageToHide.style.display = 'block'; // Ou o display original dela
                }

                document.querySelector('.sobre__texto').classList.remove('mobile-layout-active');
            }
        }
    }

    // Chama a função uma vez ao carregar a página
    handleMediaQuery(mediaQuery);

    // Adiciona o listener para mudanças na media query
    mediaQuery.addListener(handleMediaQuery);
});