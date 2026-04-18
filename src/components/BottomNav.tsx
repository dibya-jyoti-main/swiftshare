import { useAppContext } from '../context';
import { Home, History, User } from 'lucide-react';

export const BottomNav = () => {
  const { currentScreen, navigate } = useAppContext();

  if (!['HOME', 'HISTORY', 'PROFILE'].includes(currentScreen)) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 glass-panel rounded-t-3xl border-b-0 border-x-0">
      <button
        onClick={() => navigate('HOME')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          currentScreen === 'HOME'
            ? 'bg-secondary/15 text-secondary rounded-2xl px-8 py-2.5'
            : 'text-on-surface-variant px-8 py-2.5 hover:bg-surface-container-low rounded-2xl'
        }`}
      >
        <Home className="mb-1" size={24} strokeWidth={currentScreen === 'HOME' ? 3 : 2} />
        <span className="font-label text-[10px] font-bold uppercase tracking-wider">Home</span>
      </button>

      <button
        onClick={() => navigate('HISTORY')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          currentScreen === 'HISTORY'
            ? 'bg-secondary-container/50 text-secondary rounded-2xl px-8 py-2.5'
            : 'text-on-surface-variant px-8 py-2.5 hover:bg-surface-container-low rounded-2xl'
        }`}
      >
        <History className="mb-1" size={24} strokeWidth={currentScreen === 'HISTORY' ? 3 : 2} />
        <span className="font-label text-[10px] font-bold uppercase tracking-wider">History</span>
      </button>

      <button
        onClick={() => navigate('PROFILE')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          currentScreen === 'PROFILE'
            ? 'bg-secondary-container/50 text-secondary rounded-2xl px-8 py-2.5'
            : 'text-on-surface-variant px-8 py-2.5 hover:bg-surface-container-low rounded-2xl'
        }`}
      >
        <User className="mb-1" size={24} strokeWidth={currentScreen === 'PROFILE' ? 3 : 2} />
        <span className="font-label text-[10px] font-bold uppercase tracking-wider">Profile</span>
      </button>
    </nav>
  );
};
