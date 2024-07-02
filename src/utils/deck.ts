import { RANK_VALUES, SUITS } from './constants';
import { CardType } from '../definitions';

export function generateDeck(): CardType[] {
  const suits = Object.values(SUITS);
  const ranks = Object.keys(RANK_VALUES);
  const deck: CardType[] = [];

  suits.forEach(suit => {
    ranks.forEach(rank => {
      const card: CardType = { rank, suit };
      deck.push(card);
    });
  });

  return deck;
}

export function shuffleDeck(deck: CardType[]): CardType[] {
  // Loop through each card in the deck (from the last card to the second card)
  for (let i = deck.length - 1; i > 0; i--) {
    // Generate a random index 'j' between 0 and 'i' (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the current card 'deck[i]' with a randomly selected card 'deck[j]'
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Return the shuffled deck array
  return deck;
}

export const getCardName = (card: CardType) => `${card.suit}${card.rank}`;

export function extractCard(deck: CardType[]): CardType {
  if (deck.length > 0) {
    return deck.pop()!; // remove and return the last element from the deck array while asserting that it is not undefined
  }
  const fakeCard: CardType = {
    suit: '',
    rank: '',
  };
  return fakeCard;
}
