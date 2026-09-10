// ===== 1. Pegar os pedaços da tela que vamos usar =====
const tela = document.getElementById("tela");
const pincel = tela.getContext("2d"); // o "pincel" que desenha no canvas
const aviso = document.getElementById("aviso");
const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");
const botao = document.getElementById("botao");
const placar = document.getElementById("placar");

// ===== 2. Regras do jogo (mude estes números para deixar mais fácil ou difícil) =====
const GRAVIDADE = 0.4;      // quanto o passarinho cai por quadro
const FORCA_DO_PULO = -7;   // negativo porque subir é ir para cima
const VELOCIDADE = 2;       // quanto os canos andam para a esquerda
const BURACO = 150;         // tamanho do espaço entre o cano de cima e o de baixo
const LARGURA_CANO = 60;
const DISTANCIA_CANOS = 200;

// ===== 3. Estado da partida =====
let passaro;
let canos;
let pontos;
let jogando = false;

// Prepara tudo do zero (usado no início e no reinício)
function comecarPartida() {
  passaro = { x: 70, y: 200, raio: 14, velocidade: 0 };
  canos = [];
  pontos = 0;
  jogando = true;
  placar.textContent = "Pontos: 0";
  aviso.style.display = "none";
}

// Cria um cano novo na beirada direita, com o buraco em altura sorteada
function criarCano() {
  const alturaDoTopo = 50 + Math.random() * (tela.height - BURACO - 150);
  canos.push({ x: tela.width, topo: alturaDoTopo, jaContou: false });
}

// Faz o passarinho pular
function pular() {
  if (jogando) {
    passaro.velocidade = FORCA_DO_PULO;
  }
}

// Fim de jogo: mostra a mensagem com a pontuação
function perder() {
  jogando = false;
  titulo.textContent = "Fim de jogo!";
  texto.innerHTML = "Você fez <b>" + pontos + "</b> ponto(s).";
  botao.textContent = "Jogar de novo";
  aviso.style.display = "flex";
}

// ===== 4. Atualizar as contas do jogo =====
function atualizar() {
  // o passarinho cai um pouco mais rápido a cada quadro
  passaro.velocidade = passaro.velocidade + GRAVIDADE;
  passaro.y = passaro.y + passaro.velocidade;

  // bateu no céu ou no chão?
  if (passaro.y - passaro.raio < 0 || passaro.y + passaro.raio > tela.height) {
    perder();
    return;
  }

  // os canos andam para a esquerda
  for (const cano of canos) {
    cano.x = cano.x - VELOCIDADE;
  }

  // nasce um cano novo quando o último já andou o bastante
  if (canos.length === 0 || canos[canos.length - 1].x < tela.width - DISTANCIA_CANOS) {
    criarCano();
  }

  // apaga o cano que já saiu da tela
  if (canos.length > 0 && canos[0].x + LARGURA_CANO < 0) {
    canos.shift();
  }

  // confere colisão e ponto de cada cano
  for (const cano of canos) {
    const estaNaFrenteDoCano =
      passaro.x + passaro.raio > cano.x && passaro.x - passaro.raio < cano.x + LARGURA_CANO;
    const estaDentroDoBuraco =
      passaro.y - passaro.raio > cano.topo && passaro.y + passaro.raio < cano.topo + BURACO;

    if (estaNaFrenteDoCano && !estaDentroDoBuraco) {
      perder();
      return;
    }

    // passou do cano inteiro: ganha 1 ponto (só uma vez por cano)
    if (!cano.jaContou && cano.x + LARGURA_CANO < passaro.x) {
      cano.jaContou = true;
      pontos = pontos + 1;
      placar.textContent = "Pontos: " + pontos;
    }
  }
}

// ===== 5. Desenhar na tela =====
function desenhar() {
  // céu
  pincel.fillStyle = "#70c5ce";
  pincel.fillRect(0, 0, tela.width, tela.height);

  // canos (um retângulo em cima e outro embaixo)
  pincel.fillStyle = "#4caf50";
  for (const cano of canos) {
    pincel.fillRect(cano.x, 0, LARGURA_CANO, cano.topo);
    pincel.fillRect(cano.x, cano.topo + BURACO, LARGURA_CANO, tela.height);
  }

  // passarinho: uma bolinha amarela com olho e bico
  pincel.fillStyle = "#ffd93d";
  pincel.beginPath();
  pincel.arc(passaro.x, passaro.y, passaro.raio, 0, Math.PI * 2);
  pincel.fill();

  pincel.fillStyle = "#000000";
  pincel.fillRect(passaro.x + 4, passaro.y - 6, 4, 4);

  pincel.fillStyle = "#ff8c00";
  pincel.fillRect(passaro.x + 10, passaro.y - 2, 10, 5);
}

// ===== 6. O laço do jogo: repete para sempre, ~60 vezes por segundo =====
function loop() {
  if (jogando) {
    atualizar();
  }
  desenhar();
  requestAnimationFrame(loop);
}

// ===== 7. Comandos do jogador =====
botao.addEventListener("click", comecarPartida);

tela.addEventListener("click", pular);

document.addEventListener("keydown", function (evento) {
  if (evento.code === "Space") {
    evento.preventDefault();
    pular();
  }
});

// ===== 8. Ligar o jogo (começa parado, mostrando as instruções) =====
comecarPartida();
jogando = false;
aviso.style.display = "flex";
loop();
