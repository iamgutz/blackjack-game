import { useCallback, useEffect, useState } from 'react';
import Button from '../components/Button';
import { useGameContext } from '../context/GameContext';
import { ACTIONS, GAME_STATUS } from '../context/constants';
import { CardType } from '../definitions';
import { extractCard, generateDeck, getCardName, shuffleDeck } from '../utils/deck';
import Card from '../components/Card';
import { calculateHandValue } from '../utils/calculateHandValue';
import { BiLogOut } from 'react-icons/bi';
import { GiCardDraw, GiCardPlay } from 'react-icons/gi';
import clsx from 'clsx';

export default function PokerView() {
  const { dispatch, state } = useGameContext();
  const [dealerResult, setDealerResult] = useState<number | string>('');
  const [playerResult, setPlayerResult] = useState<number | string>('');
  const dealerWon = state.gameStatus === GAME_STATUS.DEALER_WON;
  const playerWon = state.gameStatus === GAME_STATUS.PLAYER_WON;
  const isPlaying = state.gameStatus === GAME_STATUS.PLAYING;
  const isIdle = state.gameStatus === GAME_STATUS.IDLE;
  const isDraw = state.gameStatus === GAME_STATUS.DRAW;

  const resetScores = () => {
    setDealerResult('');
    setPlayerResult('');
  };

  const handleExitGame = () => {
    dispatch(ACTIONS.EXIT_GAME);
  };

  const handleOnPlayAgain = () => {
    dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.IDLE);
  };

  const startGame = useCallback(() => {
    // Create and shuffle the deck
    const deck = shuffleDeck(generateDeck());

    // Deal two cards to player and dealer
    const playerHand: CardType[] = [extractCard(deck), extractCard(deck)];
    const dealerHand: CardType[] = [extractCard(deck), extractCard(deck)];

    // Set the deck and hands in the state
    resetScores();
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

    const deck = [...state.deck] as [];
    const card = extractCard(deck); // remove the last element of the array
    dispatch('SET_DECK', deck);
    dispatch('DEAL_CARD', { hand: 'player', card });

    // Calculate total value of player's hand
    const playerHand = [...state.playerHand, card];
    const playerHandValue = calculateHandValue(playerHand);
    const dealerHandValue = calculateHandValue(state.dealerHand);

    // Check if player busts (hand value exceeds 21)
    if (playerHandValue > 21) {
      dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.DEALER_WON);

      setDealerResult(dealerHandValue);
      setPlayerResult(playerHandValue);
    }
  };

  const handleOnStand = () => {
    if (state.gameStatus !== 'playing') return;

    let dealerHand = [...state.dealerHand];
    let dealerHandValue = calculateHandValue(dealerHand);
    const deck = [...state.deck] as [];

    // Dealer draws cards until hand value >= 17
    while (dealerHandValue < 17 && deck.length > 0) {
      const card = extractCard(deck);
      if (card && typeof card === 'object') {
        dealerHand = [...dealerHand, card];
        dispatch(ACTIONS.SET_DECK, deck);
        dispatch(ACTIONS.DEAL_CARD, { hand: 'dealer', card });

        dealerHandValue = calculateHandValue(dealerHand);
      } else {
        // Handle unexpected cases where card is not of type Card
        console.error('Invalid card popped from deck:', card);
        break; // Exit loop or handle accordingly
      }
    }

    // Determine game outcome
    const playerHandValue = calculateHandValue(state.playerHand);

    if (dealerHandValue > 21 || (playerHandValue < 22 && playerHandValue > dealerHandValue)) {
      // Dealer busts, player wins
      dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.PLAYER_WON);
    } else if (playerHandValue < dealerHandValue || playerHandValue > 21) {
      // Dealer wins
      dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.DEALER_WON);
    } else {
      // tie game
      dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.DRAW);
    }

    setDealerResult(dealerHandValue);
    setPlayerResult(playerHandValue);
  };

  useEffect(() => {
    if (isIdle) {
      startGame();
    }
  }, [state.gameStatus, state.playerHand, startGame, isIdle]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center py-2 px-4">
        <h1 className="h5">Blackjack Game</h1>
        <Button onClick={handleExitGame}>
          <BiLogOut className="mr-2" />
          Exit game
        </Button>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col justify-center md:justify-start items-center my-5 px-4">
          {dealerWon && <h2 className="text-red-500 font-semibold">Dealer Won!</h2>}
          {playerWon && <h2 className="text-green-500 font-semibold">You Won!</h2>}
          {isDraw && <h2 className="text-amber-500 font-semibold">It's tie!</h2>}
          <div className="flex gap-4 md:gap-2">
            {dealerResult && (
              <h6 className="flex items-center gap-2">
                Dealer: <span className={clsx([dealerWon && 'text-red-500'])}>{dealerResult}</span>
              </h6>
            )}
            {playerResult && (
              <h6 className="flex items-center gap-2">
                {state.playerName}:{' '}
                <span className={clsx([playerWon && 'text-green-500'])}>{playerResult}</span>
              </h6>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 pb-6">
          <div className="overflow-hidden pb-3">
            <h5 className="text-center my-3">Dealer's Hand</h5>
            <div className="flex justify-center [&>*:nth-child(odd)]:top-5">
              {state.dealerHand.map((card: CardType) => (
                <div className="relative flex-1 max-w-32 max-h-64">
                  <Card
                    variant={getCardName(card)}
                    className="w-40 max-h-60"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden pb-3">
            <h5 className="text-center my-3 flex flex-col justify-center items-center">
              Your Hand
            </h5>
            <div className="flex justify-center [&>*:nth-child(even)]:top-5 [&>*:last-child]:basis-3">
              {state.playerHand.map((card: CardType) => (
                <div className="relative flex-1 max-w-32 max-h-64">
                  <Card
                    variant={getCardName(card)}
                    className="w-40 max-h-60"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          {!isPlaying && !isIdle && (
            <Button
              variant="success"
              onClick={handleOnPlayAgain}
            >
              PLAY AGAIN
            </Button>
          )}
          {isPlaying && (
            <>
              <Button
                variant="warning"
                onClick={handleOnHit}
                disabled={!isPlaying}
              >
                <GiCardPlay className="mr-2" />
                HIT
              </Button>
              <Button
                variant="danger"
                onClick={handleOnStand}
                disabled={!isPlaying}
              >
                <GiCardDraw className="mr-2" />
                STAND
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
