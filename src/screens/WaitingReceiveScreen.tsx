import { useAppContext } from '../context';
import { ArrowLeft, Radar } from 'lucide-react';

export const WaitingReceiveScreen = () => {
  const { goBack } = useAppContext();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-low opacity-60 z-0"></div>

      <header className="w-full docked top-0 z-10 relative bg-surface flat no shadows">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <button onClick={goBack} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface">SwiftShare</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-[0_16px_32px_rgba(35,44,81,0.06)] overflow-hidden flex flex-col relative p-10 text-center items-center border border-surface-container-highest">
          <div className="absolute top-0 left-0 right-0 h-1 bg-slipstream-gradient opacity-80"></div>
          
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping-slow"></div>
            <div className="absolute inset-4 rounded-full border-2 border-secondary/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            
            <div className="relative w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary shadow-inner">
              <Radar size={40} className="animate-pulse" />
            </div>
          </div>

          <h2 className="font-headline font-bold text-2xl text-on-surface tracking-tight mb-2">Ready to Receive</h2>
          <p className="font-body text-on-surface-variant text-sm mb-6 max-w-xs">
            Open SwiftShare on another device and send files. Your device is currently visible on the network.
          </p>

          <button onClick={goBack} className="mt-4 px-8 py-3 rounded-full border-2 border-outline/30 text-on-surface-variant font-label font-bold text-sm hover:bg-surface-container-low active:scale-95 transition-all">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
};
