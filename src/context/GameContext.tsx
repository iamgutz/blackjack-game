/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { ACTIONS, GAME_STATUS, LOCAL_STORAGE_KEY } from './constants';
import { CardType } from '../definitions';

type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

type ScoreType = {
  dealer: number;
  player: number;
};

interface GameState {
  deck: string[];
  playerHand: CardType[];
  dealerHand: CardType[];
  gameStatus: GameStatus;
  playerName: string;
  score: ScoreType;
}

type GameAction = { type: string; payload?: any };

const initialScore: ScoreType = {
  dealer: 0,
  player: 0,
};

const initialState: GameState = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  gameStatus: GAME_STATUS.EXITED,
  playerName: '',
  score: initialScore,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case ACTIONS.SET_PLAYER_NAME:
      return { ...state, playerName: action.payload };
    case ACTIONS.SET_DECK:
      return { ...state, deck: action.payload };
    case ACTIONS.DEAL_CARD:
      if (action.payload.hand === 'player') {
        return { ...state, playerHand: [...state.playerHand, action.payload.card] };
      } else {
        return { ...state, dealerHand: [...state.dealerHand, action.payload.card] };
      }
    case ACTIONS.START_GAME:
      return { ...state, gameStatus: GAME_STATUS.PLAYING };
    case ACTIONS.CHANGE_STATUS:
      return { ...state, gameStatus: action.payload };
    case ACTIONS.RESET_HANDS:
      return { ...state, playerHand: [], dealerHand: [] };
    case ACTIONS.EXIT_GAME:
      return { ...initialState };
    case ACTIONS.ADD_SCORE:
      if (action.payload === 'player') {
        return { ...state, score: { ...state.score, player: state.score.player + 1 } };
      } else {
        return { ...state, score: { ...state.score, dealer: state.score.dealer + 1 } };
      }
    default:
      return state;
  }
}

interface GameContextProps {
  state: GameState;
  dispatch: (actionType: GameAction['type'], payload?: any) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedState = storedState ? JSON.parse(storedState) : {};
  const [state, dispatch] = useReducer(gameReducer, { ...initialState, ...parsedState });
  const contextDispatch = (actionType: GameAction['type'], payload?: any) => {
    const action: GameAction = { type: actionType, payload } as GameAction;
    dispatch(action);
  };
  const contextValue = { state, dispatch: contextDispatch };

  useEffect(() => {
    // store state changes to localStorage
    const serializedState = JSON.stringify({ ...state });
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  }, [state]);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
