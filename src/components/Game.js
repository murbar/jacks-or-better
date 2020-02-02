import React from 'react';
import styled from 'styled-components';
import Hand from 'components/Hand';
import { newDeck, takeCards, scoreHand } from 'poker';
import useLocalStorageState from 'hooks/useLocalStorageState';
// import useDebugLogging from 'hooks/useDebugLogging';
import useHotKeys from 'hooks/useHotKeys';

const REVEAL_DELAY_MS = 100;
const DEFAULT_STATUS = 'Good Luck!';

function initGameState() {
  const deck = newDeck();
  return {
    deck,
    hand: takeCards(deck, 5),
    held: Array(5).fill(false),
    hidden: Array(5).fill(true),
    defaultBet: 5,
    didDeal: false,
    didDraw: false,
    didScore: false,
    busy: false
  };
}

function initPlayerState() {
  return {
    name: 'Lucky Player',
    bank: 500,
    soundFx: true,
    theme: null
  };
}

const Styles = styled.div`
  color: ${p => p.theme.colors.offWhite};
`;

const isTruthy = value => !!value;
const isFalsy = value => !!!value;

const getIndexes = (array, filter) =>
  array.reduce((indexes, value, i) => (filter(value) ? [...indexes, i] : indexes), []);

function Game() {
  const [playerState, setPlayerState] = useLocalStorageState('PLAYER', initPlayerState());
  const [gameState, setGameState] = React.useState(initGameState());
  const [bet, setBet] = React.useState(gameState.defaultBet);
  const [statusMessage, setStatusMessage] = React.useState(DEFAULT_STATUS);
  const maxBet = 5 * gameState.defaultBet;

  // useDebugLogging(gameState, 'GAME');

  const resetHand = () => {
    const newState = initGameState();
    newState.bank = gameState.bank;
    setGameState(newState);
  };

  const incrementBet = () => {
    if (bet === maxBet) {
      setBet(gameState.defaultBet);
    } else {
      setBet(prev => prev + gameState.defaultBet);
    }
  };

  const toggleHeld = index => {
    if (gameState.didDeal) {
      setGameState(prev => {
        prev.held[index] = !prev.held[index];
        return { ...prev, held: prev.held };
      });
    }
  };

  const discard = () => {
    const discards = getIndexes(gameState.held, isFalsy);
    const hand = [...gameState.hand];
    discards.forEach(i => {
      toggleShowCard(i);
      hand[i] = gameState.deck.pop();
    });
    setGameState(prev => ({ ...prev, hand, held: prev.held.map(() => false) }));
  };

  const incrementBank = React.useCallback(
    points => {
      setPlayerState(prev => ({ ...prev, bank: prev.bank + points }));
    },
    [setPlayerState]
  );

  const toggleShowCard = React.useCallback(
    index => {
      setGameState(prev => {
        prev.hidden[index] = !prev.hidden[index];
        return { ...prev, hidden: prev.hidden };
      });
    },
    [setGameState]
  );

  const revealHiddenCards = React.useCallback(() => {
    const hidden = getIndexes(gameState.hidden, isTruthy).reverse();
    const showOneAndWait = () => {
      if (hidden.length) {
        setTimeout(() => {
          toggleShowCard(hidden.pop());
          showOneAndWait();
        }, REVEAL_DELAY_MS);
      } else {
        setGameState(prev => ({ ...prev, busy: false }));
      }
    };
    showOneAndWait();
  }, [gameState.hidden, toggleShowCard]);

  // reveal face-down cards after the deal and after the draw
  React.useEffect(() => {
    if (gameState.didDeal || gameState.didDraw) {
      revealHiddenCards();
    }
  }, [gameState.didDeal, gameState.didDraw, revealHiddenCards]);

  // score the hand after the draw and when all face-down cards have been revealed
  React.useEffect(() => {
    if (gameState.didDraw && !gameState.busy && !gameState.didScore) {
      const [winnings, winningHand] = scoreHand(gameState.hand, bet);
      setStatusMessage(winnings ? `${winningHand}! You win $${winnings}` : 'Game Over');
      setGameState(prev => ({ ...prev, didScore: true }));
      incrementBank(winnings);
    }
  }, [
    bet,
    gameState.hand,
    gameState.didDraw,
    setGameState,
    gameState.busy,
    gameState.didScore,
    incrementBank
  ]);

  const play = () => {
    if (gameState.busy) return;

    if (!gameState.didDeal) {
      if (gameState.didDraw) {
        resetHand();
      }
      setGameState(prev => ({
        ...prev,
        didDeal: true,
        busy: true
      }));
      incrementBank(-bet);

      setStatusMessage(DEFAULT_STATUS);
    } else {
      discard();
      setGameState(prev => ({
        ...prev,
        didDeal: false,
        didDraw: true,
        busy: true
      }));
    }
  };

  useHotKeys({
    d: play,
    b: incrementBet,
    1: () => toggleHeld(0),
    2: () => toggleHeld(1),
    3: () => toggleHeld(2),
    4: () => toggleHeld(3),
    5: () => toggleHeld(4)
  });

  return (
    <Styles>
      <div>Bank: ${playerState.bank}</div>
      <div>Bet: ${bet}</div>
      <Hand gameState={gameState} toggleHeld={toggleHeld} />
      <div>{statusMessage}</div>
      <div>
        <button onClick={incrementBet} disabled={gameState.didDeal || gameState.busy}>
          Bet
        </button>
        <button
          onClick={() => setBet(maxBet)}
          disabled={gameState.didDeal || gameState.busy}
        >
          Bet Max
        </button>
        <button onClick={play} disabled={gameState.busy}>
          {gameState.didDeal ? 'Draw' : 'Deal'}
        </button>
      </div>

      <button onClick={resetHand} disabled={gameState.busy}>
        DEBUG RESET
      </button>
    </Styles>
  );
}

export default Game;
