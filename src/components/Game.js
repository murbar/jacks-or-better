import React from 'react';
import styled from 'styled-components';
import Hand from 'components/Hand';
import { newDeck, takeCards, scoreHand, HANDS, ROYAL_MAX_MULTIPLE } from 'poker';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import { playSound } from 'soundFx';
import Message from './Message';
import Stats from './Stats';
import Controls from './Controls';

const REVEAL_DELAY_MS = 100;

function initGameState() {
  const deck = newDeck();
  return {
    deck,
    hand: takeCards(deck, 5),
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

  const resetHand = () => {
    const newState = initGameState();
    newState.currentBet = gameState.currentBet;
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
    const { currentBet, defaultBet, maxBet } = gameState;
    const bet = currentBet === maxBet ? defaultBet : currentBet + defaultBet;

    setGameState(prev => ({ ...prev, currentBet: bet }));
    playSoundFx('bet');
  };

  const setMaxBet = () => {
    setGameState(prev => ({ ...prev, currentBet: prev.maxBet }));
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
      const { currentBet, maxBet } = gameState;
      const royalMax = currentBet === maxBet && winningHand === HANDS.royalFlush;
      const winnings = royalMax
        ? multiple * currentBet * ROYAL_MAX_MULTIPLE
        : multiple * currentBet;

      setGameState(prev => ({ ...prev, didScore: true, winningHand, winnings }));
      incrementBank(winnings);

      if (winnings) {
        playSoundFx('win');
      } else {
        playSoundFx('gameOver');
      }
    }
  }, [gameState, incrementBank, playSoundFx, endOfPlay]);

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
      incrementBank(-gameState.currentBet);
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
    5: () => toggleHeld(4),
    l: () => console.log(gameState)
  });

  return (
    <Styles>
      <Stats gameState={gameState} playerState={playerState} />
      <Hand gameState={gameState} toggleHeld={toggleHeld} />
      <Message gameState={gameState} />
      <Controls gameState={gameState} actions={{ incrementBet, setMaxBet, play }} />
    </Styles>
  );
}

export default Game;
