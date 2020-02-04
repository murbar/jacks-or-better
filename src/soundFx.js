import buttonSrc from 'sounds/button-press.mp3';
import betSrc from 'sounds/bet.mp3';
import betMaxSrc from 'sounds/bet-max.mp3';
import cardTurnSrc from 'sounds/card-turn-alt.mp3';
import cardTapSrc from 'sounds/card-tap.mp3';
import gameOverSrc from 'sounds/game-over.mp3';
import winSrc from 'sounds/win.mp3';

let sourceMap = {
  buttonPress: buttonSrc,
  bet: betSrc,
  betMax: betMaxSrc,
  cardTurn: cardTurnSrc,
  cardTap: cardTapSrc,
  gameOver: gameOverSrc,
  win: winSrc
};

const context = new (window.AudioContext || window.webkitAudioContext)();

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

export function playSound(key, volume = 1) {
  if (!(key in sourceMap)) return;

  // for browser's autoplay policy
  if (context.state === 'suspended') {
    context.resume();
  }

  const buffer = sourceMap[key];
  const source = context.createBufferSource();
  const gain = context.createGain();

  source.buffer = buffer;
  gain.gain.value = volume;

  source.connect(gain);
  gain.connect(context.destination);

  source.start();
}
