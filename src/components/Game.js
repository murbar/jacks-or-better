import React from 'react';
import styled from 'styled-components';
import { recordGAEvent } from 'lib/analytics';
import { getIndexes, isTruthy, isFalsy } from 'lib/utils';
import {
  newDeck,
  takeCards,
  scoreHand,
  HANDS,
  ROYAL_MAX_MULTIPLE,
  isBigWin
} from 'lib/poker';
import { playSound } from 'lib/soundFx';
import config from 'config';
import fireworks from 'lib/fireworks';
import useHotKeys from 'hooks/useHotKeys';
import useViewportSize from 'hooks/useViewportSize';
import Stats from 'components/Stats';
import Hand from 'components/Hand';
import Controls from 'components/Controls';
import BankEmptyModal from 'components/BankEmptyModal';
import { revealGame } from 'styles/animations';

function initGameState() {
  const deck = newDeck();
  return {
    ...config.initGameState,
    deck,
    hand: takeCards(deck, 5)
  };
}

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  color: ${p => p.theme.colors.offWhite};
  min-height: ${p => p.height}px;

  ${revealGame}
`;

export default function Game({ playerState, playerActions }) {
  const [gameState, setGameState] = React.useState(initGameState());
  const { height: viewportHeight } = useViewportSize();
  const isBankEmpty = playerState.bank <= 0;

  const resetHand = () => {
    const newState = initGameState();
    newState.currentBet = gameState.currentBet;
    newState.cardsHeld = Array(5).fill(false);
    newState.cardsFaceDown = Array(5).fill(true);
    setGameState(newState);
  };

  const playSoundFx = React.useCallback(
    (key, volume) => {
      if (playerState.soundFxOn) {
        playSound(key, volume);
      }
    },
    [playerState.soundFxOn]
  );

  const incrementBet = () => {
    const { currentBet, defaultBet, maxBet } = gameState;
    const { bank } = playerState;
    const bet = currentBet === maxBet ? defaultBet : currentBet + defaultBet;

    setGameState(prev => ({ ...prev, currentBet: bet < bank ? bet : bank }));
    playSoundFx('buttonPress', 0.5);
    playSoundFx('bet');
  };

  const setMaxBet = () => {
    const max = gameState.maxBet;
    const { bank } = playerState;
    setGameState(prev => ({ ...prev, currentBet: max < bank ? max : bank }));
    playSoundFx('buttonPress', 0.5);
    playSoundFx('betMax', 1);
  };

  const resetBank = () => {
    playerActions.incrementBank(config.initPlayerState.bank - playerState.bank);
    recordGAEvent('User', 'Play', 'Replenish bank');
  };

  const toggleHeld = index => {
    if (gameState.didDeal) {
      setGameState(prev => {
        prev.cardsHeld[index] = !prev.cardsHeld[index];
        return { ...prev, cardsHeld: prev.cardsHeld };
      });
      playSoundFx('cardTap');
    }
  };

  const discard = () => {
    const discards = getIndexes(gameState.cardsHeld, isFalsy);
    const hand = [...gameState.hand];
    discards.forEach(i => {
      toggleShowCard(i);
      hand[i] = gameState.deck.pop();
    });
    setGameState(prev => ({ ...prev, hand, cardsHeld: prev.cardsHeld.map(() => false) }));
  };

  const toggleShowCard = React.useCallback(
    index => {
      setGameState(prev => {
        prev.cardsFaceDown[index] = !prev.cardsFaceDown[index];
        return { ...prev, cardsFaceDown: prev.cardsFaceDown };
      });
    },
    [setGameState]
  );

  const revealHiddenCards = React.useCallback(() => {
    const hidden = getIndexes(gameState.cardsFaceDown, isTruthy).reverse();

    const showOneAndWait = () => {
      if (hidden.length) {
        setTimeout(() => {
          playSoundFx('cardTurn', 0.75);
          toggleShowCard(hidden.pop());
          showOneAndWait();
        }, config.cardRevealDelayMS);
      } else {
        setTimeout(
          () => setGameState(prev => ({ ...prev, busy: false })),
          config.cardFlipDurationMS
        );
      }
    };

    showOneAndWait();
  }, [gameState.cardsFaceDown, playSoundFx, toggleShowCard]);

  const play = () => {
    playSoundFx('buttonPress', 0.5);
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
      playerActions.incrementBank(-gameState.currentBet);
      recordGAEvent('User', 'Play', 'Deal');
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
      playerActions.incrementBank(winnings);

      if (winnings) {
        if (isBigWin(winningHand)) {
          playSoundFx('bigWin');
          fireworks();
        } else {
          playSoundFx('win');
        }
        recordGAEvent('User', 'Play', 'Winning hand');
      } else {
        playSoundFx('gameOver');
      }
    }
  }, [gameState, playSoundFx, endOfPlay, playerActions]);

  useHotKeys({
    d: play,
    b: incrementBet,
    m: playerActions.toggleSoundMute,
    1: () => toggleHeld(0),
    2: () => toggleHeld(1),
    3: () => toggleHeld(2),
    4: () => toggleHeld(3),
    5: () => toggleHeld(4),
    l: () => {
      if (config.env) console.log(gameState);
    }
  });

  return (
    <Styles height={viewportHeight}>
      <Stats gameState={gameState} playerState={playerState} />
      <Hand gameState={gameState} toggleHeld={toggleHeld} />
      <Controls gameState={gameState} actions={{ incrementBet, setMaxBet, play }} />
      {gameState.didScore && isBankEmpty && <BankEmptyModal onAccept={resetBank} />}
    </Styles>
  );
}
