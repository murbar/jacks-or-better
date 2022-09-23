import React from 'react';
import styled from 'styled-components';
import { getRankAndSuit, HIGH_CARD_STRINGS } from 'lib/poker';

const suitMap = {
  D: '♦',
  C: '♣',
  H: '♥',
  S: '♠'
};

const Styles = styled.div`
  display: inline-block;
`;

const Card = styled.span`
  display: inline-block;
  width: 2.25em;
  padding: 0.25rem 0;
  margin-right: 0.25em;
  background: white;
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.cardHD : p.theme.colors.cardSC)};
  border-radius: 0.25rem;
  font-weight: bold;
  font-family: ${p => p.theme.fonts.cards};
  line-height: 1;
  text-align: center;
  &:last-child {
    margin-right: 0;
  }
`;

const Suit = styled.span`
  font-size: 0.75em;
`;

export default function TextHandDisplay({ hand, ...props }) {
  const cards = hand.map(c => {
    let [rank, suit] = getRankAndSuit(c);
    rank = rank in HIGH_CARD_STRINGS ? HIGH_CARD_STRINGS[rank] : rank;
    return { rank, suit };
  });
  return (
    <Styles {...props}>
      {cards.map((c, i) => (
        <Card suit={c.suit} key={i}>
          {c.rank}
          <Suit>{suitMap[c.suit]}</Suit>
        </Card>
      ))}
    </Styles>
  );
}
