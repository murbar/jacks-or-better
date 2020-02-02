import betSrc from 'sounds/bet.mp3';
import betMaxSrc from 'sounds/bet-max.mp3';
import cardTurnSrc from 'sounds/card-turn-alt.mp3';
import cardTapSrc from 'sounds/card-tap.mp3';
import gameOverSrc from 'sounds/game-over.mp3';
import winSrc from 'sounds/win.mp3';

let sourceMap = {
  bet: betSrc,
  betMax: betMaxSrc,
  cardTurn: cardTurnSrc,
  cardTap: cardTapSrc,
  gameOver: gameOverSrc,
  win: winSrc
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

initSourceMap();

function loadFile(url) {
  return window
    .fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      return new Promise((resolve, reject) => {
        context.decodeAudioData(
          arrayBuffer,
          buffer => {
            resolve(buffer);
          },
          e => {
            reject(e);
          }
        );
      });
    });
}

async function initSourceMap() {
  Object.entries(sourceMap).forEach(async ([key, src]) => {
    await loadFile(src).then(audioBuffer => (sourceMap[key] = audioBuffer));
  });
}

export function playSound(key) {
  if (!(key in sourceMap)) return;

  const buffer = sourceMap[key];
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}
