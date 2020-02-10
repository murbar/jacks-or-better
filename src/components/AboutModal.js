import React from 'react';
import styled from 'styled-components';
import { mediaQuery, effect3dSmall } from 'styles/helpers';
import { exampleHands } from 'poker';
import { ReactComponent as AboutIcon } from 'images/help-circle-icon.svg';
import FullScreenModal from 'components/FullScreenModal';
import TextHandDisplay from 'components/TextHandDisplay';
import PayoutTable from 'components/PayoutTable';

const AboutModalControl = styled.div`
  padding: 1rem;
  cursor: pointer;
  svg {
    color: ${p => p.theme.colors.primary};
    width: 1.5em;
    height: auto;
  }
`;

const HandDisplay = styled(TextHandDisplay)`
  display: block;
  margin-bottom: 1rem;
`;
const HotKeys = styled.div`
  display: none;
  ${mediaQuery.above.phone`
    display: block;
  `}
  kbd {
    font-size: 1.25em;
    background: ${p => p.theme.colors.foreground};
    color: ${p => p.theme.colors.background};
    padding: 0.15em 0.35em;
    border-radius: 0.25em;
  }
  kbd:not(:first-child) {
    margin-left: 0.5rem;
  }
  dl {
    font-size: 0.9em;
    display: flex;
    flex-wrap: wrap;
    dt {
      width: 30%;
      display: block;
      text-align: right;
    }
    dd {
      width: 70%;
      display: block;
      margin: 0 0 1rem 0;
      padding-left: 2rem;
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  padding: 1rem;
  h2 {
    font-size: 2em;
    color: ${p => p.theme.colors.gold};
    margin-top: 0;
    text-align: center;
    ${p => effect3dSmall(p.theme.colors.gold)};
  }
  h3 {
    text-align: center;
    margin-bottom: 3rem;
  }
  p {
    font-size: 0.8em;
    line-height: 1.5;
  }
  ul {
    padding-left: 2rem;
  }
  li {
    font-size: 0.8em;
  }
`;

export default function AboutModal({ isShowing = false }) {
  const [showModal, setShowModal] = React.useState(isShowing);

  return (
    <>
      <AboutModalControl
        onClick={() => setShowModal(true)}
        role="switch"
        aria-checked={showModal ? 'true' : 'false'}
        title="Show About"
      >
        <AboutIcon />
      </AboutModalControl>

      <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={showModal}>
        <Styles>
          <h2>How to Play</h2>
          <p>
            <em>Jacks or Better</em> is a simple game that's easy to learn. To win a hand,
            you must have at least one pair with a rank of Jack, Queen, King or Ace. Your
            goal is to build the strongest hand with the cards you're dealt. Aces can be
            played low or high.
          </p>
          <ul>
            <li>Place your bet, $5-25</li>
            <li>
              Select <strong>DEAL</strong> to begin play and be dealt five cards
            </li>
            <li>Select which, if any, cards you would like to hold</li>
            <li>
              Select <strong>DRAW</strong> to receive new cards to replace those discarded
            </li>
            <li>
              Your hand will then be scored and any winnings will be added to your bank in
              the amount of the hand's <a href="#payouts">payout</a> multiplied by your
              bet
            </li>
          </ul>
          <p>
            Scoring hands for <em>Jacks or Better</em> are:
          </p>
          <ul>
            <li>
              <strong>High Pair</strong> - 2 cards with the same rank, Jacks or better
              <br />
              <HandDisplay hand={exampleHands.jacksBetter} />
            </li>
            <li>
              <strong>Two Pair</strong> - two pairs of any rank
              <br />
              <HandDisplay hand={exampleHands.twoPair} />
            </li>
            <li>
              <strong>Three of a Kind</strong> - 3 cards with the same rank
              <br />
              <HandDisplay hand={exampleHands.threeOfKind} />
            </li>
            <li>
              <strong>Straight</strong> - 5 cards of any suit ranked in sequential order
              <br />
              <HandDisplay hand={exampleHands.straightLow} />
            </li>
            <li>
              <strong>Flush</strong> - 5 cards of any rank with the same suit
              <br />
              <HandDisplay hand={exampleHands.flush} />
            </li>
            <li>
              <strong>Full House</strong> - three of a kind and a pair
              <br />
              <HandDisplay hand={exampleHands.fullHouse} />
            </li>
            <li>
              <strong>Four of a Kind</strong> - 4 cards with the same rank
              <br />
              <HandDisplay hand={exampleHands.fourOfKind} />
            </li>
            <li>
              <strong>Straight Flush</strong> - 5 cards of the same suit ranked in
              sequential order
              <br />
              <HandDisplay hand={exampleHands.straightFlush} />
            </li>
            <li>
              <strong>Royal Flush</strong> - the strongest possible hand, 5 cards of the
              same suit ranked in sequential order from 10 to Ace
              <br />
              <HandDisplay hand={exampleHands.royalFlush} />
            </li>
          </ul>

          <h3 id="payouts">Payouts</h3>
          <PayoutTable />

          <h3>Strategy</h3>
          <p>
            A little bit of skill will increase your winnings and make the game more fun
            and interesting to play. If played "perfectly", this game has an expected
            payback ratio of 99.5%, which is just about the best you can find in a casino.
            Using the heuristics below, you can expect a payback of about 99%. More
            optimal play is possible but a bit more complex. It's worth the research and
            effort if you're serious about the game. Play based on the first matching hand
            from the chart below. If you have the cards in your hand, hold them before
            drawing new cards. Good luck!
          </p>
          <ul>
            <li>
              4 cards of a Royal Flush (the potential payout is just too high to pass up)
            </li>
            <li>Any cards that make a hand of two pair or better</li>
            <li>4 cards of a Straight Flush</li>
            <li>Any high pair, ranked J or better</li>
            <li>3 cards of a Royal Flush</li>
            <li>4 cards of a Flush</li>
            <li>Any pair lower than Jacks</li>
            <li>4 cards of a Straight</li>
            <li>J, Q, K, and A of different suits</li>
            <li>Any 2 cards of the same suit ranked J or better</li>
            <li>3 cards of a Straight Flush</li>
            <li>J, Q, and K of different suits</li>
            <li>2 cards of different suits ranked J or better</li>
            <li>J, Q, or K, if you have a 10 of the same suit</li>
            <li>Any card ranked J or better</li>
            <li>Otherwise, keep nothing and draw a new hand</li>
          </ul>

          <HotKeys>
            <h3>Hotkeys</h3>
            <dl>
              <dt>
                <kbd>D</kbd>
              </dt>
              <dd>Deal/Draw</dd>
              <dt>
                <kbd>B</kbd>
              </dt>
              <dd>Bet one</dd>
              <dt>
                <kbd>1</kbd>
                <kbd>2</kbd>
                <kbd>3</kbd>
                <kbd>4</kbd>
                <kbd>5</kbd>
              </dt>
              <dd>Hold card</dd>
              <dt>
                <kbd>M</kbd>
              </dt>
              <dd>Toggle sound on/off</dd>
            </dl>
          </HotKeys>
        </Styles>
      </FullScreenModal>
    </>
  );
}
