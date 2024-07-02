import HomeView from './Home';
import BlackJackView from './BlackJack';
import bgPattern from '../assets/background-pattern.png';
import { useGameContext } from '../context/GameContext';
import { GAME_STATUS } from '../context/constants';

export default function GameView() {
  const { state } = useGameContext();
  return (
    <main
      className="flex flex-col flex-1"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(9,9,121,0.5) 50%, rgba(2,0,36,1) 100%), url(${bgPattern})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center center',
      }}
    >
      {state.gameStatus === GAME_STATUS.EXITED ? <HomeView /> : <BlackJackView />}
    </main>
  );
}
