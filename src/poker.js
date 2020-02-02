const SUITS = 'DCHS'; // ♦ ♣ ♥ ♠

export const HANDS = {
  royalFlush: 'Royal Flush',
  straightFlush: 'Straight Flush',
  fourOfKind: '4 of a Kind',
  fullHouse: 'Full House',
  flush: 'Flush',
  straight: 'Straight',
  threeOfKind: '3 of a Kind',
  twoPair: '2 Pair',
  jacksBetter: 'Jacks or Better',
  zilch: 'Nothing'
};

export const PAYOUTS = {
  [HANDS.royalFlush]: 250,
  [HANDS.straightFlush]: 50,
  [HANDS.fourOfKind]: 25,
  [HANDS.fullHouse]: 9,
  [HANDS.flush]: 6,
  [HANDS.straight]: 4,
  [HANDS.threeOfKind]: 3,
  [HANDS.twoPair]: 2,
  [HANDS.jacksBetter]: 1,
  [HANDS.zilch]: 0
};

export const ROYAL_MAX_MULTIPLE = 4;

function shuffled(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

function buildDeck(size = 1) {
  const deck = [];
  for (let i = 0; i < size; i++) {
    for (let s of SUITS) {
      for (let v = 2; v < 15; v++) {
        deck.push(`${v}${s}`);
      }
    }
  }
  return deck;
}

export function newDeck() {
  return shuffled(buildDeck());
}

export function takeCards(deck, count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(deck.pop());
  }
  return cards;
}

const getRank = card => card.slice(0, -1);

const getSuit = card => card.slice(-1);

export function getRankAndSuit(card) {
  return [getRank(card), getSuit(card)];
}

function countCards(hand, key) {
  return hand.reduce((counts, card) => {
    const value = key(card);
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function countSuits(hand) {
  return countCards(hand, getSuit);
}

function countRanks(hand) {
  return countCards(hand, getRank);
}

function isRoyalFlush(hand) {
  if (!isFlush(hand)) return false;
  const ranks = countRanks(hand);
  for (let r = 10; r < 15; r++) {
    if (!(r in ranks)) return false;
  }
  return true;
}

function isStraightFlush(hand) {
  return isFlush(hand) && isStraight(hand);
}

function is4ofKind(hand) {
  for (const count of Object.values(countRanks(hand))) {
    if (count === 4) return true;
  }
  return false;
}

function isFullHouse(hand) {
  const threeKind = is3ofKind(hand);
  for (const count of Object.values(countRanks(hand))) {
    if (count === 2 && threeKind) return true;
  }
  return false;
}

function isFlush(hand) {
  for (const count of Object.values(countSuits(hand))) {
    if (count === 5) return true;
  }
  return false;
}

function isLowStraight(hand) {
  const ranks = countRanks(hand);
  const low = [14, 2, 3, 4, 5];
  for (let i of low) {
    if (!(i in ranks)) return false;
  }
  return true;
}

function isStraight(hand) {
  if (isLowStraight(hand)) return true;

  const ranks = Object.keys(countRanks(hand))
    .map(k => parseInt(k, 10))
    .sort((a, b) => a - b);

  if (ranks.length !== 5) return false;

  for (let i = 0; i < ranks.length - 1; i++) {
    if (ranks[i] !== ranks[i + 1] - 1) return false;
  }

  return true;
}

function is3ofKind(hand) {
  for (const count of Object.values(countRanks(hand))) {
    if (count === 3) return true;
  }
  return false;
}

function isTwoPair(hand) {
  let pairs = 0;
  for (const count of Object.values(countRanks(hand))) {
    if (count === 2) {
      pairs++;
    }
  }
  return pairs === 2;
}

function isPairJacksBetter(hand) {
  for (const [rank, count] of Object.entries(countRanks(hand))) {
    if (count === 2 && parseInt(rank, 10) > 10) {
      return true;
    }
  }
  return false;
}

export function scoreHand(hand, payouts = PAYOUTS) {
  if (hand.length !== 5) {
    throw new Error('A hand must contain 5 cards');
  }

  const scoringHands = [
    { test: isRoyalFlush, hand: HANDS.royalFlush },
    { test: isStraightFlush, hand: HANDS.straightFlush },
    { test: is4ofKind, hand: HANDS.fourOfKind },
    { test: isFullHouse, hand: HANDS.fullHouse },
    { test: isFlush, hand: HANDS.flush },
    { test: isStraight, hand: HANDS.straight },
    { test: is3ofKind, hand: HANDS.threeOfKind },
    { test: isTwoPair, hand: HANDS.twoPair },
    { test: isPairJacksBetter, hand: HANDS.jacksBetter }
  ];

  for (let score of scoringHands) {
    if (score.test(hand)) {
      return [payouts[score.hand], score.hand];
    }
  }

  return [payouts[HANDS.zilch], HANDS.zilch];
}

// const nada = ['8S', '12D', '4H', '1H', '8C'];
// const lowpair = ['8S', '11D', '4H', '12H', '8C'];
// const jacks = ['8S', '12D', '4H', '12H', '7C'];
// const twoPair = ['8S', '8D', '4H', '12H', '4C'];
// const threeKind = ['8S', '8D', '4H', '12H', '8C'];
// const straight = ['8S', '10D', '9H', '7H', '11C'];
// const straightLow = ['14S', '2D', '4H', '3H', '5C'];
// const flush = ['8S', '4S', '11S', '12S', '9S'];
// const fullHouse = ['8S', '8D', '8H', '12H', '12C'];
// const fourKind = ['8S', '8D', '4H', '8H', '8C'];
// const straightFlush = ['8D', '10D', '9D', '7D', '11D'];
// const straightFlushLow = ['14D', '2D', '4D', '3D', '5D'];
// const royalFlush = ['10S', '14S', '12S', '11S', '13S'];

// console.log('nothing', scoreHand(nada, 5, payouts));
// console.log('lowpair', scoreHand(lowpair, 5, payouts));
// console.log('jacks', scoreHand(jacks, 5, payouts));
// console.log('twoPair', scoreHand(twoPair, 5, payouts));
// console.log('3k', scoreHand(threeKind, 5, payouts));
// console.log('strght', scoreHand(straight, 5, payouts));
// console.log('strghtLOW', scoreHand(straightLow, 5, payouts));
// console.log('flsh', scoreHand(flush, 5, payouts));
// console.log('FH', scoreHand(fullHouse, 5, payouts));
// console.log('4k', scoreHand(fourKind, 5, payouts));
// console.log('strghtflush', scoreHand(straightFlush, 5, payouts));
// console.log('strghtflushLOW', scoreHand(straightFlushLow, 5, payouts));
// console.log('royal', scoreHand(royalFlush, 5, payouts));
// console.log('royal', scoreHand(royalFlush, 5, payouts));

// for 1 million hands
// Nothing         801240
// High pair       122348
// 2 pair          47658
// 3 kind          21109
// Straight        4007
// Flush           2012
// Full house      1382
// 4 kind          234
// Straight flush  9
// Royal flush     1

// function runStats(n = 1000000) {
//   const stats = {};
//   for (let i = 0; i < n; i++) {
//     const d = poker.newDeck();
//     const h = d.slice(-5);
//     const [, hand] = poker.scoreHand(h, 5);
//     stats[hand] = (stats[hand] || 0) + 1;
//   }
//   const hands = Object.entries(stats).sort((a, b) => b[1] - a[1]);
//   for (let hand of hands) {
//     console.log(hand[0], hand[1], hand[1] / n);
//   }
// }
