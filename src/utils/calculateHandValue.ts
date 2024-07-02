import { CardType } from '../definitions';
import { RANK_VALUES } from './constants';

export const calculateHandValue = (hand: CardType[]): number => {
  let sum = 0;
  let aceCount = 0;

  for (const card of hand) {
    const value = RANK_VALUES[card.rank];
    sum += value;
    if (card.rank === 'A') {
      aceCount++;
    }
  }

  // Adjust for Aces (consider Ace as 11 if it doesn't bust)
  while (sum > 21 && aceCount > 0) {
    sum -= 10; // Convert Ace from 11 to 1
    aceCount--;
  }

  return sum;
};
