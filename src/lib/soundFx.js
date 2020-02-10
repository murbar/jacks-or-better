import config from 'config';
import buttonSrc from 'audio/button-press.mp3';
import betSrc from 'audio/bet.mp3';
import betMaxSrc from 'audio/bet-max.mp3';
import cardTurnSrc from 'audio/card-turn-alt.mp3';
import cardTapSrc from 'audio/card-tap.mp3';
import gameOverSrc from 'audio/game-over.mp3';
import winSrc from 'audio/win.mp3';
import bigWinSrc from 'audio/big-win.mp3';

const inTesting = config.env === 'test';

let sourceMap = {
  buttonPress: buttonSrc,
  bet: betSrc,
  betMax: betMaxSrc,
  cardTurn: cardTurnSrc,
  cardTap: cardTapSrc,
  gameOver: gameOverSrc,
  win: winSrc,
  bigWin: bigWinSrc
};

const context = new (window.AudioContext || window.webkitAudioContext)();

if (!inTesting) {
  setTimeout(initSourceMap, 250);
}

async function loadFile(url) {
  const response = await window.fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  // return await context.decodeAudioData(arrayBuffer);
  // Safari doesn't support await syntax for decodeAudioData
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
}

async function initSourceMap() {
  Object.entries(sourceMap).forEach(async ([key, src]) => {
    try {
      const audioBuffer = await loadFile(src);
      sourceMap[key] = audioBuffer;
    } catch (error) {
      console.warn(`Unable to load sound "${key}" with src "${src}"`, error);
    }
  });
}

export function playSound(key, volume = 1) {
  if (!(key in sourceMap) || inTesting) return;

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
