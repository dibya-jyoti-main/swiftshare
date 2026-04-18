import { useAppContext } from '../context';
import { User, Send, Download, QrCode, Users } from 'lucide-react';

export const HomeScreen = () => {
  const { navigate, permissionsGranted } = useAppContext();

  const handleSend = () => {
    if (permissionsGranted) {
      navigate('FILE_SELECTION');
    } else {
      navigate('PERMISSIONS');
    }
  };

  const handleReceive = () => {
    if (permissionsGranted) {
      navigate('WAITING_RECEIVE');
    } else {
      navigate('PERMISSIONS');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-[#f7f5ff] to-[#e4e7ff] h-full">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 bg-secondary/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-tertiary/15 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"></div>

      <header className="w-full flex items-center justify-between px-6 py-4 z-40 relative glass-panel rounded-b-3xl">
        <span className="text-[#232c51] dark:text-slate-100 font-extrabold tracking-tighter text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary">
          SwiftShare
        </span>
        <button 
          onClick={() => navigate('PROFILE')}
          className="w-11 h-11 rounded-full bg-white border-2 border-white/50 shadow-md flex items-center justify-center overflow-hidden active:scale-95 transition-all hover:shadow-lg"
        >
          <User className="text-primary" size={24} strokeWidth={2.5} />
        </button>
      </header>

      <main className="flex-1 px-6 pt-4 pb-28 flex flex-col relative overflow-y-auto z-10 w-full">
        {/* Connection Status Area */}
        <div className="flex items-center space-x-3 mb-6 mt-2 pl-2 glass-panel py-2 px-4 rounded-full self-start border-outline/30">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
          </div>
          <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Offline • Ready to connect</span>
        </div>

        <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
          {/* Send Trigger */}
          <button 
            onClick={handleSend}
            className="relative w-full aspect-[16/10] min-h-[160px] rounded-3xl glass-dark ambient-glow flex flex-col items-center justify-center group overflow-hidden active:scale-95 duration-300 transition-all hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            
            <div className="mb-3 bg-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-inner border border-white/40 group-hover:-translate-y-1 transition-transform duration-300 relative z-10">
              <Send className="text-white drop-shadow-lg" size={48} strokeWidth={2.5} />
            </div>
            <h2 className="font-headline font-bold text-3xl text-white tracking-tight drop-shadow-lg relative z-10">Send</h2>
            <p className="font-body text-white/90 mt-1 text-sm font-medium relative z-10 drop-shadow-md">Select files to share</p>
          </button>

          {/* Receive Trigger */}
          <button 
            onClick={handleReceive}
            className="relative w-full aspect-[16/10] min-h-[160px] rounded-3xl glass-panel ambient-shadow flex flex-col items-center justify-center group overflow-hidden active:scale-95 duration-300 transition-all hover:bg-white/90 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-80 pointer-events-none"></div>
            
            <div className="mb-3 bg-white p-4 rounded-2xl border border-primary/20 group-hover:bg-primary/5 transition-colors duration-300 shadow-md group-hover:-translate-y-1 relative z-10">
              <Download className="text-primary" size={48} strokeWidth={2.5} />
            </div>
            <h2 className="font-headline font-bold text-3xl text-on-surface tracking-tight relative z-10">Receive</h2>
            <p className="font-body text-on-surface-variant mt-1 text-sm font-medium relative z-10">Wait for incoming files</p>
          </button>

          {/* Secondary Actions */}
          <div className="flex gap-4 w-full mt-2">
            <button className="flex-1 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/90 shadow-sm min-h-[100px] hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                <QrCode className="text-primary" size={24} />
              </div>
              <span className="font-semibold text-sm text-on-surface text-center">QR<br/>Connect</span>
            </button>
            <button className="flex-1 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/90 shadow-sm min-h-[100px] hover:shadow-md">
              <div className="bg-tertiary/10 p-3 rounded-xl group-hover:bg-tertiary/20 transition-colors">
                <Users className="text-tertiary" size={24} />
              </div>
              <span className="font-semibold text-sm text-on-surface text-center">Group<br/>Share</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
