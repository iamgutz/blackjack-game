import { useCallback, useEffect } from 'react';
import Button from '../components/Button';
import { useGameContext } from '../context/GameContext';
import { ACTIONS, GAME_STATUS } from '../context/constants';
import { CardType } from '../definitions';
import { generateDeck, getCardName, shuffleDeck } from '../utils/deck';
import Card from '../components/Card';
import { calculateHandValue } from '../utils/calculateHandValue';

export default function PokerView() {
  const { dispatch, state } = useGameContext();

  const handleExitGame = () => {
    dispatch(ACTIONS.EXIT_GAME);
  };

  const startGame = useCallback(() => {
    // Create and shuffle the deck
    const deck = shuffleDeck(generateDeck());

    // Deal two cards to player and dealer
    const playerHand: CardType[] = [deck.pop()!, deck.pop()!];
    const dealerHand: CardType[] = [deck.pop()!, deck.pop()!];

    // Set the deck and hands in the state
    dispatch(ACTIONS.RESET_HANDS);
    dispatch(ACTIONS.SET_DECK, deck);
    dispatch(ACTIONS.DEAL_CARD, { hand: 'player', card: playerHand[0] });
    dispatch(ACTIONS.DEAL_CARD, { hand: 'player', card: playerHand[1] });
    dispatch(ACTIONS.DEAL_CARD, { hand: 'dealer', card: dealerHand[0] });
    dispatch(ACTIONS.DEAL_CARD, { hand: 'dealer', card: dealerHand[1] });

    // Start the game
    dispatch('START_GAME');
  }, [dispatch]);

  const handleOnHit = () => {
    if (state.gameStatus !== 'playing') return;

    const deck = [...state.deck];
    const card = deck.pop()!;
    dispatch('SET_DECK', deck);
    dispatch('DEAL_CARD', { hand: 'player', card });

    // Calculate total value of player's hand
    const playerHand = [...state.playerHand, card];
    const playerHandValue = calculateHandValue(playerHand);

    // Check if player busts (hand value exceeds 21)
    if (playerHandValue > 21) {
      dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.DEALER_WON);
    }
  };

  const handleOnStand = () => {
    if (state.gameStatus !== 'playing') return;
    // Implement dealer logic and determine game outcome
  };

  useEffect(() => {
    if (state.gameStatus === GAME_STATUS.IDLE) {
      startGame();
    }
  }, [state.gameStatus, state.playerHand, startGame]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between">
        <h1>Blackjack Game</h1>
        <Button onClick={handleExitGame}>Exit game</Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <p>dealer cards</p>
        <div className="flex justify-center [&>*:nth-child(odd)]:top-5">
          {state.dealerHand.map((card: CardType) => (
            <div className="relative flex-1 max-w-32 h-60">
              <Card variant={getCardName(card)} />
            </div>
          ))}
        </div>
      </div>

      <div>{state.gameStatus === GAME_STATUS.DEALER_WON && <h2>Dealer Won!</h2>}</div>

      <div className="flex-1 overflow-hidden">
        <p>player cards</p>
        <div className="flex justify-center [&>*:nth-child(even)]:top-5 [&>*:last-child]:basis-3">
          {state.playerHand.map((card: CardType) => (
            <div className="relative flex-1 max-w-32 h-60">
              <Card
                variant={getCardName(card)}
                className="absolute top-0 left-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 flex-1">
        <Button
          variant="warning"
          onClick={handleOnHit}
        >
          HIT
        </Button>
        <Button
          variant="danger"
          onClick={handleOnStand}
        >
          STAND
        </Button>
      </div>
    </div>
  );
}
