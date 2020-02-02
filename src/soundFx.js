import UIfx from 'uifx';
import betSrc from 'sounds/bet.mp3';
import betMaxSrc from 'sounds/bet-max.mp3';
import cardTurnSrc from 'sounds/card-turn-alt.mp3';
import cardTapSrc from 'sounds/card-tap.mp3';
import gameOverSrc from 'sounds/game-over.mp3';
import winSrc from 'sounds/win.mp3';

const bet = new UIfx(betSrc);
const betMax = new UIfx(betMaxSrc);
const cardTurn = new UIfx(cardTurnSrc);
const cardTap = new UIfx(cardTapSrc);
const gameOver = new UIfx(gameOverSrc);
const win = new UIfx(winSrc);

export const fxBet = () => bet.play();
export const fxBetMax = () => betMax.play();
export const fxCardTurn = () => cardTurn.play();
export const fxCardTap = () => cardTap.play();
export const fxGameOver = () => gameOver.play();
export const fxWin = () => win.play();
