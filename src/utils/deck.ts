import { RANK_VALUES, SUITS } from './constants';
import { Card } from '../definitions';

export function generateDeck(): Card[] {
  const suits = Object.values(SUITS);
  const ranks = Object.keys(RANK_VALUES);
  const deck: Card[] = [];

  suits.forEach(suit => {
    ranks.forEach(rank => {
      const card: Card = { rank, suit };
      deck.push(card);
    });
  });

  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
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

export const getCardName = (card: Card) => `${card.suit}${card.rank}`;

// Deals a specified number of cards from the deck to a player or the community.
export function dealCards(deck: Card[], numCards: number): Card[] {
  return deck.splice(0, numCards);
}
