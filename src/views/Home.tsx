import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useGameContext } from '../context/GameContext';
import { ACTIONS, GAME_STATUS } from '../context/constants';

export default function HomeView() {
  const { state, dispatch } = useGameContext();
  const [name, setName] = useState(state.playerName || '');
  const handleOnSubmit = () => {
    dispatch(ACTIONS.SET_PLAYER_NAME, name);
    dispatch(ACTIONS.CHANGE_STATUS, GAME_STATUS.IDLE);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-xl m-auto">
      <h1 className="text-2xl font-bold text-center">Blackjack Game</h1>
      <div className="flex flex-col justify-center gap-2 w-full">
        <Input
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          placeholder="Enter your name"
        />
      </div>

      <Button
        variant="success"
        onClick={handleOnSubmit}
        disabled={!name}
      >
        PLAY
      </Button>
    </div>
  );
}
