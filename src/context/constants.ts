export const LOCAL_STORAGE_KEY = 'blackJackGameState';

export const NAME_ADJETIVES = [
  'Aggressive',
  'Clever',
  'Swift',
  'Wise',
  'Fierce',
  'Nimble',
  'Sly',
  'Crafty',
  'Sharp',
  'Brave',
  'Swift',
  'Gentle',
  'Calm',
  'Quiet',
  'Fiery',
  'Loyal',
  'Steady',
  'Wise',
  'Vigilant',
  'Fearless',
];

export const NAME_NOUNS = [
  'Wolf',
  'Tiger',
  'Eagle',
  'Bear',
  'Fox',
  'Lion',
  'Panther',
  'Shark',
  'Snake',
  'Hawk',
  'Dragon',
  'Falcon',
  'Raven',
  'Sword',
  'Shield',
  'Arrow',
  'Spear',
  'Hammer',
  'Phoenix',
  'Griffin',
];

export const ACTIONS = {
  SET_PLAYER_NAME: 'SET_PLAYER_NAME',
  SET_DECK: 'SET_DECK',
  DEAL_CARD: 'DEAL_CARD',
  START_GAME: 'START_GAME',
  CHANGE_STATUS: 'CHANGE_STATUS',
  EXIT_GAME: 'EXIT_GAME',
  RESET_HANDS: 'RESET_HANDS',
};

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PLAYER_WON: 'playerWon',
  DEALER_WON: 'dealerWon',
  DRAW: 'draw',
  EXITED: 'exited',
};
