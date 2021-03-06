const VERSION = '2020.02.09';

export default {
  storageKeys: {
    playerState: `poker-player-${VERSION}`
  },
  initPlayerState: {
    name: 'Lucky Player',
    bank: 500,
    soundFxOn: true,
    tableColor: 'green',
    cardColor: 'blue'
  },
  initGameState: {
    cardsHeld: Array(5).fill(false),
    cardsFaceDown: Array(5).fill(true),
    defaultBet: 5,
    maxBet: 25,
    currentBet: 5,
    didDeal: false,
    didDraw: false,
    didScore: false,
    winnings: 0,
    winningHand: null,
    busy: false
  },
  cardRevealDelayMS: 100,
  cardFlipDurationMS: 200,
  GAPropertyId: 'UA-140727716-7',
  env: process.env.NODE_ENV
};
