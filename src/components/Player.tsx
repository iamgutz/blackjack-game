import { Player as PlayerData } from '../definitions';
import Avatar from './Avatar';

interface PlayerProps {
  data: PlayerData;
}

export default function Player({ data }: PlayerProps) {
  if (!data) {
    return null;
  }

  const hasRole = data.isBigBlind || data.isDealer || data.isSmallBlind;

  return (
    <div className="flex flex-col items-center justify-end overflow-hidden relative">
      {hasRole && (
        <div className="absolute right-0 top-14 text-xs bg-white rounded-full text-black min-w-5 min-h-5 max-w-5 max-h-5 flex items-center justify-center font-semibold">
          {data.isBigBlind && 'BB'}
          {data.isDealer && 'D'}
          {data.isSmallBlind && 'SB'}
        </div>
      )}
      <div className="w-16 h-16 md:w-20 md:h-20 flex justify-center">
        <Avatar
          variant={data.avatar}
          className="w-full h-auto"
        />
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full text-xs bg-gray-700 rounded-full px-2 py-1 text-center">
        {data.name}
        {data.kind === 'user' && <span className="px-2">(You)</span>}
      </div>
      <div className="mt-2 flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs bg-gray-700 bg-opacity-50 border rounded-full px-2 py-1 text-center">
        <div className="bg-amber-300 w-4 h-4 rounded-full text-black">$</div>
        {data.stack}
      </div>
    </div>
  );
}
