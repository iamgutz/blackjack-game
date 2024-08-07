import { CardType } from '../definitions';
import { SUITS } from './constants';
import { generateDeck, shuffleDeck } from './deck';

describe('generateDeck function', () => {
  test('should generate a deck of 52 cards', () => {
    const deck = generateDeck();
    expect(deck.length).toBe(52);
  });

  test('should generate a deck with 13 cards of each suit', () => {
    const deck = generateDeck();
    const hearts = deck.filter((card: CardType) => card.suit === SUITS.HEARTS);
    const diamonds = deck.filter((card: CardType) => card.suit === SUITS.DIAMONDS);
    const clubs = deck.filter((card: CardType) => card.suit === SUITS.CLUBS);
    const spades = deck.filter((card: CardType) => card.suit === SUITS.SPADES);

    expect(hearts.length).toBe(13);
    expect(diamonds.length).toBe(13);
    expect(clubs.length).toBe(13);
    expect(spades.length).toBe(13);
  });
});

describe('shuffleDeck function', () => {
  test('should shuffle the deck', () => {
    const deck = generateDeck();
    const shuffledDeck = shuffleDeck([...deck]);

    // Check if the shuffled deck has the same length and different order
    expect(shuffledDeck.length).toBe(52);
    expect(shuffledDeck).not.toEqual(deck);
  });

  test('should have all the original cards after shuffling', () => {
    const deck = generateDeck();
    const shuffledDeck = shuffleDeck([...deck]);

    // Check if all original cards are present after shuffling
    expect(shuffledDeck).toEqual(expect.arrayContaining(deck));
  });
});
