import '__mocks__/crypto.mock';
import {
  newDeck,
  takeCards,
  getRankAndSuit,
  scoreHand,
  exampleHands,
  HANDS,
  PAYOUTS
} from 'poker';

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

  it('shuffles decks', () => {
    expect(newDeck()).not.toEqual(newDeck());
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

it('throws if a hand is not of length 5', () => {
  const tooMany = [...exampleHands.twoPair, '2C'];
  const notEnough = [...exampleHands.flush.slice(1)];
  expect(() => scoreHand(tooMany)).toThrow();
  expect(() => scoreHand(notEnough)).toThrow();
});

it('correctly scores a bad hand', () => {
  for (let hand in exampleHands) {
    if (hand === 'zilch' || hand === 'lowPair') {
      expect(scoreHand(exampleHands[hand])).toEqual([PAYOUTS[HANDS.zilch], HANDS.zilch]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.zilch],
        HANDS.zilch
      ]);
    }
  }
});

it('correctly scores a pair of jacks or better', () => {
  for (let hand in exampleHands) {
    if (hand === 'jacksBetter') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.jacksBetter],
        HANDS.jacksBetter
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.jacksBetter],
        HANDS.jacksBetter
      ]);
    }
  }
});

it('correctly scores a 2 pairs', () => {
  for (let hand in exampleHands) {
    if (hand === 'twoPair') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.twoPair],
        HANDS.twoPair
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.twoPair],
        HANDS.twoPair
      ]);
    }
  }
});

it('correctly scores 3 of a kind', () => {
  for (let hand in exampleHands) {
    if (hand === 'threeOfKind') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.threeOfKind],
        HANDS.threeOfKind
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.threeOfKind],
        HANDS.threeOfKind
      ]);
    }
  }
});

it('correctly scores a straight', () => {
  for (let hand in exampleHands) {
    if (hand === 'straightLow' || hand === 'straight') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.straight],
        HANDS.straight
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.straight],
        HANDS.straight
      ]);
    }
  }
});

it('correctly scores a flush', () => {
  for (let hand in exampleHands) {
    if (hand === 'flush' || hand === 'flushLow') {
      expect(scoreHand(exampleHands[hand])).toEqual([PAYOUTS[HANDS.flush], HANDS.flush]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.flush],
        HANDS.flush
      ]);
    }
  }
});

it('correctly scores a full house', () => {
  for (let hand in exampleHands) {
    if (hand === 'fullHouse') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.fullHouse],
        HANDS.fullHouse
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.fullHouse],
        HANDS.fullHouse
      ]);
    }
  }
});

it('correctly scores 4 of a kind', () => {
  for (let hand in exampleHands) {
    if (hand === 'fourOfKind') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.fourOfKind],
        HANDS.fourOfKind
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.fourOfKind],
        HANDS.fourOfKind
      ]);
    }
  }
});

it('correctly scores a straight flush', () => {
  for (let hand in exampleHands) {
    if (hand === 'straightFlush' || hand === 'straightFlushLow') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.straightFlush],
        HANDS.straightFlush
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.straightFlush],
        HANDS.straightFlush
      ]);
    }
  }
});

it('correctly scores a royal flush', () => {
  for (let hand in exampleHands) {
    if (hand === 'royalFlush') {
      expect(scoreHand(exampleHands[hand])).toEqual([
        PAYOUTS[HANDS.royalFlush],
        HANDS.royalFlush
      ]);
    } else {
      expect(scoreHand(exampleHands[hand])).not.toEqual([
        PAYOUTS[HANDS.royalFlush],
        HANDS.royalFlush
      ]);
    }
  }
});
