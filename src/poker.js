const SUITS = 'DCHS'; // ♦ ♣ ♥ ♠

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
      for (let v = 1; v < 14; v++) {
        deck.push(`${v}${s}`);
      }
    }
  }
  return deck;
}

export function newDeck() {
  return shuffled(buildDeck());
}
