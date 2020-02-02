import React from 'react';
import styled from 'styled-components';
import Hand from 'components/Hand';
import Button from 'components/Button';
import ValueTween from 'components/ValueTween';
import { newDeck, takeCards, scoreHand, HANDS, ROYAL_MAX_MULTIPLE } from 'poker';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import { playSound } from 'soundFx';

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
    maxBet: 25,
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

  const resetHand = () => {
    const newState = initGameState();
    newState.bank = gameState.bank;
    setGameState(newState);
  };

  const toggleSoundMute = () => {
    setPlayerState(prev => ({ ...prev, soundFx: !prev.soundFx }));
  };

  const playSoundFx = React.useCallback(
    key => {
      if (playerState.soundFx) {
        playSound(key);
      }
    },
    [playerState.soundFx]
  );

  const incrementBet = () => {
    if (bet === gameState.maxBet) {
      setBet(gameState.defaultBet);
    } else {
      setBet(prev => prev + gameState.defaultBet);
    }
    playSoundFx('bet');
  };

  const maxBet = () => {
    setBet(gameState.maxBet);
    playSoundFx('betMax');
  };

  const toggleHeld = index => {
    if (gameState.didDeal) {
      setGameState(prev => {
        prev.held[index] = !prev.held[index];
        return { ...prev, held: prev.held };
      });
      playSoundFx('cardTap');
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
          playSoundFx('cardTurn');
          toggleShowCard(hidden.pop());
          showOneAndWait();
        }, REVEAL_DELAY_MS);
      } else {
        setGameState(prev => ({ ...prev, busy: false }));
      }
    };
    showOneAndWait();
  }, [gameState.hidden, playSoundFx, toggleShowCard]);

  // reveal face-down cards after the deal and after the draw
  React.useEffect(() => {
    if (gameState.didDeal || gameState.didDraw) {
      revealHiddenCards();
    }
  }, [gameState.didDeal, gameState.didDraw, revealHiddenCards]);

  // score the hand after the draw and when all face-down cards have been revealed
  const endOfPlay = gameState.didDraw && !gameState.busy && !gameState.didScore;
  React.useEffect(() => {
    if (endOfPlay) {
      const [multiple, winningHand] = scoreHand(gameState.hand);
      const royalMax = bet === gameState.maxBet && winningHand === HANDS.royalFlush;
      const winnings = royalMax ? multiple * bet * ROYAL_MAX_MULTIPLE : multiple * bet;

      setStatusMessage(winnings ? `${winningHand}! You win $${winnings}` : 'Game Over');
      setGameState(prev => ({ ...prev, didScore: true }));
      incrementBank(winnings);

      if (winnings) {
        playSoundFx('win');
      } else {
        playSoundFx('gameOver');
      }
    }
  }, [gameState, bet, setGameState, incrementBank, playSoundFx, endOfPlay]);

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
    Enter: play,
    b: incrementBet,
    m: toggleSoundMute,
    1: () => toggleHeld(0),
    2: () => toggleHeld(1),
    3: () => toggleHeld(2),
    4: () => toggleHeld(3),
    5: () => toggleHeld(4)
  });

  return (
    <Styles>
      <div>
        Bank: $<ValueTween>{playerState.bank}</ValueTween>
      </div>

      <div>
        Bet: $<ValueTween duration={250}>{bet}</ValueTween>
      </div>
      <Hand gameState={gameState} toggleHeld={toggleHeld} />
      <div>{statusMessage}</div>
      <div>
        <Button onClick={incrementBet} disabled={gameState.didDeal || gameState.busy}>
          Bet
        </Button>
        <Button onClick={maxBet} disabled={gameState.didDeal || gameState.busy}>
          Bet Max
        </Button>
        <Button onClick={play} disabled={gameState.busy}>
          {gameState.didDeal ? 'Draw' : 'Deal'}
        </Button>
        <Button onClick={toggleSoundMute}>{playerState.soundFx ? '🔈' : '🔇'}</Button>
      </div>
    </Styles>
  );
}

export default Game;
