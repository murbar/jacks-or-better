const VERSION = '2020.02.06';

export default {
  storageKeys: {
    playerState: `poker-player-${VERSION}`
  },
  initPlayerState: {
    name: 'Lucky Player',
    bank: 500,
    soundFxOn: true,
    theme: null
  },
  initGameState: {
    held: Array(5).fill(false),
    hidden: Array(5).fill(true),
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
  cardRevealDelay: 100,
  GAPropertyId: 'UA-140727716-7',
  env: process.env.NODE_ENV
};
