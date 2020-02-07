const SUITS = 'DCHS'; // ♦ ♣ ♥ ♠

export const HIGH_CARD_STRINGS = {
  '14': 'A',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

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
  [HANDS.royalFlush]: 250, // 800 with max bet
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

export const exampleHands = {
  zilch: ['8S', '12D', '4H', '1H', '8C'],
  lowPair: ['8S', '11D', '4H', '12H', '8C'],
  jacksBetter: ['8S', '12D', '4H', '12H', '7C'],
  twoPair: ['8S', '8D', '4H', '12H', '4C'],
  threeOfKind: ['8S', '8D', '4H', '12H', '8C'],
  straight: ['8S', '10D', '9H', '7H', '11C'],
  straightLow: ['14S', '2D', '4H', '3H', '5C'],
  flush: ['8S', '4S', '11S', '12S', '9S'],
  fullHouse: ['8S', '8D', '8H', '12H', '12C'],
  fourOfKind: ['8S', '8D', '4H', '8H', '8C'],
  straightFlush: ['8D', '10D', '9D', '7D', '11D'],
  straightFlushLow: ['14D', '2D', '4D', '3D', '5D'],
  royalFlush: ['10S', '14S', '12S', '11S', '13S']
};

export const ROYAL_MAX_MULTIPLE = 4;

export const randomCrypto = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

function shuffled(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(randomCrypto() * i);
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

export function newDeck(count = 1) {
  return shuffled(buildDeck(count));
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
