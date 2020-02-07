import '__mocks__/crypto.mock';
import { newDeck, takeCards, getRankAndSuit, scoreHand, HANDS, PAYOUTS } from 'poker';

describe('Helper functions', () => {
  it('builds a new deck', () => {
    const deck = newDeck();
    expect(deck.length).toEqual(52);
    const set = new Set(deck);
    expect(set.size).toEqual(52);
  });

  it('builds multiple decks', () => {
    const deck = newDeck(3);
    expect(deck.length).toEqual(156);
    const set = new Set(deck);
    expect(set.size).toEqual(52);
  });

  it('takes cards', () => {
    const deck = newDeck();
    const hand = takeCards(deck, 5);
    expect(deck.length).toEqual(47);
    expect(hand.length).toEqual(5);
  });

  it('gets the rank and suit of a card', () => {
    const deck = newDeck();
    const [card] = takeCards(deck, 1);
    const rank = card.slice(0, -1);
    const suit = card.slice(-1);
    const result = getRankAndSuit(card);
    expect(rank).toEqual(result[0]);
    expect(suit).toEqual(result[1]);
  });
});

const testHands = {
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

it('throws if a hand is not of length 5', () => {
  const tooMany = [...testHands.twoPair, '2C'];
  const notEnough = [...testHands.flush.slice(1)];
  expect(() => scoreHand(tooMany)).toThrow();
  expect(() => scoreHand(notEnough)).toThrow();
});

it('correctly scores a bad hand', () => {
  for (let hand in testHands) {
    if (hand === 'zilch' || hand === 'lowPair') {
      expect(scoreHand(testHands[hand])).toEqual([PAYOUTS[HANDS.zilch], HANDS.zilch]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([PAYOUTS[HANDS.zilch], HANDS.zilch]);
    }
  }
});

it('correctly scores a pair of jacks or better', () => {
  for (let hand in testHands) {
    if (hand === 'jacksBetter') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.jacksBetter],
        HANDS.jacksBetter
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.jacksBetter],
        HANDS.jacksBetter
      ]);
    }
  }
});

it('correctly scores a 2 pairs', () => {
  for (let hand in testHands) {
    if (hand === 'twoPair') {
      expect(scoreHand(testHands[hand])).toEqual([PAYOUTS[HANDS.twoPair], HANDS.twoPair]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.twoPair],
        HANDS.twoPair
      ]);
    }
  }
});

it('correctly scores 3 of a kind', () => {
  for (let hand in testHands) {
    if (hand === 'threeOfKind') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.threeOfKind],
        HANDS.threeOfKind
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.threeOfKind],
        HANDS.threeOfKind
      ]);
    }
  }
});

it('correctly scores a straight', () => {
  for (let hand in testHands) {
    if (hand === 'straightLow' || hand === 'straight') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.straight],
        HANDS.straight
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.straight],
        HANDS.straight
      ]);
    }
  }
});

it('correctly scores a flush', () => {
  for (let hand in testHands) {
    if (hand === 'flush' || hand === 'flushLow') {
      expect(scoreHand(testHands[hand])).toEqual([PAYOUTS[HANDS.flush], HANDS.flush]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([PAYOUTS[HANDS.flush], HANDS.flush]);
    }
  }
});

it('correctly scores a full house', () => {
  for (let hand in testHands) {
    if (hand === 'fullHouse') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.fullHouse],
        HANDS.fullHouse
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.fullHouse],
        HANDS.fullHouse
      ]);
    }
  }
});

it('correctly scores 4 of a kind', () => {
  for (let hand in testHands) {
    if (hand === 'fourOfKind') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.fourOfKind],
        HANDS.fourOfKind
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.fourOfKind],
        HANDS.fourOfKind
      ]);
    }
  }
});

it('correctly scores a straight flush', () => {
  for (let hand in testHands) {
    if (hand === 'straightFlush' || hand === 'straightFlushLow') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.straightFlush],
        HANDS.straightFlush
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.straightFlush],
        HANDS.straightFlush
      ]);
    }
  }
});

it('correctly scores a royal flush', () => {
  for (let hand in testHands) {
    if (hand === 'royalFlush') {
      expect(scoreHand(testHands[hand])).toEqual([
        PAYOUTS[HANDS.royalFlush],
        HANDS.royalFlush
      ]);
    } else {
      expect(scoreHand(testHands[hand])).not.toEqual([
        PAYOUTS[HANDS.royalFlush],
        HANDS.royalFlush
      ]);
    }
  }
});
