import { Card } from '../definitions';
import { SUITS } from './constants';
import { dealCards, generateDeck, shuffleDeck } from './deck';

describe('generateDeck function', () => {
  test('should generate a deck of 52 cards', () => {
    const deck = generateDeck();
    expect(deck.length).toBe(52);
  });

  test('should generate a deck with 13 cards of each suit', () => {
    const deck = generateDeck();
    const hearts = deck.filter((card: Card) => card.suit === SUITS.HEARTS);
    const diamonds = deck.filter((card: Card) => card.suit === SUITS.DIAMONDS);
    const clubs = deck.filter((card: Card) => card.suit === SUITS.CLUBS);
    const spades = deck.filter((card: Card) => card.suit === SUITS.SPADES);

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

describe('dealCards function', () => {
  test('should deal the correct number of cards', () => {
    const deck = generateDeck();
    const numCards = 5;
    const dealtCards = dealCards(deck, numCards);

    expect(dealtCards.length).toBe(numCards);
    expect(deck.length).toBe(52 - numCards);
  });

  test('should remove dealt cards from the deck', () => {
    const deck = generateDeck();
    const numCards = 5;
    const dealtCards = dealCards(deck, numCards);

    dealtCards.forEach((card: Card) => {
      expect(deck).not.toContain(card);
    });
  });
});
