# Passarinho da UFLA

Jogo web feito com HTML, CSS e JavaScript puro (sem bibliotecas), para a
Atividade Prática 1 da disciplina GAC116 - Programação Web.

## Objetivo do jogo

Manter o passarinho no ar e atravessar o máximo de canos possível.
Cada cano ultrapassado vale 1 ponto. O jogo acaba quando o passarinho encosta
em um cano, no chão ou no céu.

## Como jogar

- Clique no botão **Começar**.
- Clique na tela **ou** aperte a tecla **ESPAÇO** para o passarinho voar.
- Quando você para de clicar, a gravidade puxa o passarinho para baixo.
- Passe pelo buraco entre o cano de cima e o de baixo.

## Regras

1. O passarinho cai sozinho o tempo todo (gravidade).
2. Cada clique/ESPAÇO dá um impulso para cima.
3. Cada cano ultrapassado por inteiro vale **1 ponto**.
4. Encostar em um cano, no chão ou no topo da tela = **derrota**.
5. Na derrota aparece a pontuação final e o botão **Jogar de novo**, que
   reinicia a partida do zero (pontos voltam a 0).

## Instalação

Não é necessário instalar nada. Basta abrir o arquivo `index.html` no navegador,
ou acessar o link publicado abaixo.

## Tecnologias utilizadas

- HTML5 (incluindo o elemento `<canvas>`)
- CSS3 (Flexbox)
- JavaScript puro (manipulação do DOM, eventos e `requestAnimationFrame`)

## Estrutura dos arquivos

| Arquivo      | Para que serve                                      |
|--------------|-----------------------------------------------------|
| `index.html` | Estrutura da página: título, placar, canvas e avisos |
| `style.css`  | Cores, tamanhos e posicionamento na tela             |
| `game.js`    | Toda a lógica do jogo                                |
| `LICENSE`    | Licença MIT                                          |

## Versão publicada (GitHub Pages)

https://vitormoreiradesenvolvedor.github.io/Flappy-Bird-UFLA/

## Licença

Este projeto está sob a licença [MIT](LICENSE).

## Informações da atividade

```json
{
    "nome": "Passarinho da UFLA",
    "descricao": "Jogo de reflexo em HTML, CSS e JavaScript puro: clique ou aperte espaço para o passarinho voar, desvie dos canos e marque 1 ponto a cada cano ultrapassado.",
    "autores": "Vitor Moreira dos Santos",
    "turma": "14A"
}
```
