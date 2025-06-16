// Variável para controlar a cena atual (1 para normal, 2 para só prédios, 3 para mensagem final)
let scene = 1;
// Tempo em que a cena mudou para a cena 2 (só prédios)
let lastSceneChangeTime = 0;
// Duração da cena 2 em milissegundos (10 segundos)
const scene2Duration = 10000;
// Duração da cena 3 (mensagem final) em milissegundos (5 segundos)
const scene3Duration = 5000;

// O texto sobre a importância das árvores, para ser desenhado no canvas
const importanceText = "Árvores urbanas são pulmões da cidade: purificam o ar, reduzem o calor, gerenciam a água da chuva e aumentam a biodiversidade. Elas trazem bem-estar e tornam nossas cidades mais saudáveis e agradáveis. Por isso, a importância delas dentro das cidades é inegável.";

// Mensagem final com uma carinha mais feliz
const finalMessage = "Então vamos cuidar do meio ambiente 🐻"; // Emoji alterado para uma carinha mais feliz

function setup() {
  // Cria um canvas com largura de 800 e altura de 500
  createCanvas(800, 500);
}

// Função para desenhar nuvens
function drawClouds() {
  fill(255, 255, 255, 200); // Nuvens brancas semi-transparentes
  noStroke(); // Sem contorno para as nuvens

  // Nuvem 1
  ellipse(150, 80, 100, 60);
  ellipse(190, 70, 80, 50);
  ellipse(120, 90, 70, 40);

  // Nuvem 2
  ellipse(400, 120, 120, 70);
  ellipse(450, 110, 90, 60);
  ellipse(370, 130, 80, 50);

  // Nuvem 3
  ellipse(650, 90, 90, 50);
  ellipse(680, 80, 70, 40);
  ellipse(620, 100, 60, 35);
}

// Função para desenhar o sol
function drawSun() {
  fill(255, 204, 0); // Cor amarela para o sol
  noStroke(); // Garante que o círculo do sol não tenha contorno
  ellipse(width - 100, 100, 100, 100); // Sol no canto superior direito

  // Raios do sol
  stroke(255, 204, 0); // Contorno amarelo para os raios
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = TWO_PI / 12 * i;
    let x1 = (width - 100) + cos(angle) * 60;
    let y1 = 100 + sin(angle) * 60;
    let x2 = (width - 100) + cos(angle) * 80;
    let y2 = 100 + sin(angle) * 80;
    line(x1, y1, x2, y2);
  }
  noStroke(); // Remove o contorno após desenhar os raios do sol
}

// Função de desenho principal do p5.js
function draw() {
  background(135, 206, 235); // Fundo azul celeste

  // Desenha o sol ou as nuvens dependendo da cena (o sol aparece na cena 2 e 3)
  if (scene === 2 || scene === 3) { // Sol visível nas cenas 2 e 3
    drawSun();
  } else if (scene === 1) {
    drawClouds(); // Nuvens visíveis na cena 1
  }

  // Desenha um chão verde
  fill(34, 139, 34);
  rect(0, height - 100, width, 100);

  // --- Desenha 5 Prédios (tamanho fixo) ---
  let larguraPredio = 80;
  let alturaPredioFixa = 300; // Altura fixa para os prédios
  let baseYPredio = height - 100; // Os prédios ficam no chão

  for (let i = 0; i < 5; i++) {
    let xPredio = 50 + i * (larguraPredio + 70); // Espaça os prédios

    // Corpo do prédio
    fill(150, 150, 150); // Cor cinza para os prédios
    noStroke(); // Garante que os prédios não tenham contorno
    rect(xPredio, baseYPredio - alturaPredioFixa, larguraPredio, alturaPredioFixa);

    // Adiciona janelas
    fill(173, 216, 230); // Azul claro para as janelas
    noStroke(); // Garante que as janelas não tenham contorno
    let numJanelasY = floor(alturaPredioFixa / 50);
    for (let j = 0; j < numJanelasY; j++) {
      rect(xPredio + 10, baseYPredio - alturaPredioFixa + 10 + j * 40, 25, 25);
      rect(xPredio + larguraPredio - 35, baseYPredio - alturaPredioFixa + 10 + j * 40, 25, 25);
    }

    // Adiciona uma porta
    fill(100, 50, 0); // Marrom para a porta
    noStroke(); // Garante que a porta não tenha contorno
    rect(xPredio + larguraPredio / 2 - 15, baseYPredio - 60, 30, 60);
  }

  // Lógica das cenas
  if (scene === 1) {
    // Cena com árvores e lago
    // --- Desenha o Laguinho (no centro) ---
    fill(65, 105, 225); // Cor azul para a água
    noStroke(); // Garante que o laguinho não tenha contorno
    let laguinhoX = width / 2; // Exatamente no centro horizontal
    let laguinhoY = height - 70; // Posição vertical fixa, um pouco acima da base do chão
    let laguinhoLargura = 150;
    let laguinhoAltura = 60;
    ellipse(laguinhoX, laguinhoY, laguinhoLargura, laguinhoAltura);

    // --- Desenha 20 Árvores (apenas do lado esquerdo e direito do laguinho) ---
    const treePositions = [
      { x: 30, y: height - 100 }, { x: 80, y: height - 130 }, { x: 130, y: height - 70 },
      { x: 180, y: height - 110 }, { x: 230, y: height - 90 }, { x: 280, y: height - 140 },
      { x: 50, y: height - 60 }, { x: 110, y: height - 100 }, { x: 160, y: height - 50 },
      { x: 210, y: height - 120 },
      { x: 520, y: height - 100 }, { x: 570, y: height - 130 }, { x: 620, y: height - 70 },
      { x: 670, y: height - 110 }, { x: 720, y: height - 90 }, { x: 770, y: height - 140 },
      { x: 540, y: height - 60 }, { x: 600, y: height - 100 }, { x: 650, y: height - 50 },
      { x: 700, y: height - 120 }
    ];

    for (let i = 0; i < treePositions.length; i++) {
      desenhaArvore(treePositions[i].x, treePositions[i].y);
    }

    // Instrução para o usuário (agora no centro da tela)
    fill(0); // Cor do texto: preto
    textSize(16);
    textAlign(CENTER, CENTER); // Alinhamento centralizado
    text("Pressione ENTER para continuar", width / 2, height / 2); // Posição no centro da tela

  } else if (scene === 2) {
    // Cena sem árvores, mostra o texto de importância
    fill(0); // Cor do texto: preto
    textSize(13); // Tamanho da fonte
    textLeading(18); // Espaçamento entre linhas
    textAlign(LEFT, TOP); // Alinha o texto à esquerda e ao topo
    // Posição (x, y) e largura/altura da caixa de texto para caber no canto
    text(importanceText, 20, 20, width - 40, height - 40);

    // Transição para a cena 3 após a duração da cena 2
    if (millis() - lastSceneChangeTime >= scene2Duration) {
      scene = 3; // Muda para a cena da mensagem final
      lastSceneChangeTime = millis(); // Registra o tempo de início da cena 3
    }
  } else if (scene === 3) {
    // Cena da mensagem final
    fill(0); // Cor do texto: preto
    textSize(24); // Tamanho MAIOR para a mensagem final
    textAlign(CENTER, CENTER); // Centraliza o texto
    text(finalMessage, width / 2, height / 2); // Desenha a mensagem no centro da tela

    // Transição de volta para a cena 1 após a duração da cena 3
    if (millis() - lastSceneChangeTime >= scene3Duration) {
      scene = 1; // Volta para a cena completa
      lastSceneChangeTime = 0; // Reseta o tempo
    }
  }
}

// Função para desenhar uma única árvore de tamanho médio
function desenhaArvore(x, y) {
  // Tronco
  fill(100, 60, 30); // Cor marrom para o tronco
  stroke(0); // Contorno preto
  strokeWeight(1); // Espessura do contorno
  rect(x, y, 15, 60);

  // Folhas
  fill(34, 139, 34); // Cor verde para as folhas
  triangle(x - 25, y, x + 40, y, x + 7.5, y - 70); // Parte inferior das folhas
  triangle(x - 20, y - 40, x + 35, y - 40, x + 7.5, y - 110); // Parte superior das folhas
  noStroke(); // Remove o contorno para os próximos desenhos
}

// Função para detectar o pressionar de teclas
function keyPressed() {
  // Verifica se a tecla ENTER foi pressionada
  if (keyCode === ENTER) {
    if (scene === 1) {
      scene = 2; // Muda para a cena só com prédios
      lastSceneChangeTime = millis(); // Registra o tempo em que a cena 2 começou
    } else {
      // Se já estiver na cena 2 ou 3 e ENTER for pressionado, volta imediatamente para a cena 1
      scene = 1;
      lastSceneChangeTime = 0; // Reseta o tempo
    }
  }
}