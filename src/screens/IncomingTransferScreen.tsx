import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { ArrowLeft, Smartphone, Film, File as FileIcon } from 'lucide-react';

export const IncomingTransferScreen = () => {
  const { navigate, incomingMetadata, addHistoryItems } = useAppContext();
  const [accepted, setAccepted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDecline = () => {
    navigate('HOME');
  };

  const handleAccept = () => {
    setAccepted(true);
    // Simulate real receive duration, finish at 100%
  };

  useEffect(() => {
    if (accepted && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.floor(Math.random() * 15 + 5), 100));
      }, 500);
      return () => clearTimeout(timer);
    } else if (accepted && progress === 100) {
      // Transfer complete: store files locally if needed, build history entry
      const items = incomingMetadata?.files?.map((f: File) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: f.name,
        size: f.size,
        timestamp: Date.now(),
        status: 'Received' as const,
        fileBlob: f
      })) || [];
      
      setTimeout(() => {
        if(items.length > 0) addHistoryItems(items);
        navigate('HISTORY');
      }, 800);
    }
  }, [accepted, progress, incomingMetadata, addHistoryItems, navigate]);


  const fileCount = incomingMetadata?.files?.length || 1;
  const sender = incomingMetadata?.senderName || "Unknown Device";
  const mainFileName = incomingMetadata?.files?.[0]?.name || "Project_Final_Render_v2.mp4";
  const totalSize = incomingMetadata?.files?.reduce((acc: number, f: File) => acc + f.size, 0) || 1200000000;

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sizeFormatted = formatSize(totalSize);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-low opacity-60 z-0"></div>

      <header className="w-full docked top-0 z-10 relative bg-surface flat no shadows">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <button onClick={handleDecline} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface">SwiftShare</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
        <div className={`w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_rgba(35,44,81,0.06)] overflow-hidden flex flex-col relative transition-all duration-500 ${accepted ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100'}`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-slipstream-gradient opacity-80"></div>
          
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 relative">
              <Smartphone className="text-primary" size={36} />
              <div className="absolute inset-0 border border-primary-container rounded-full opacity-30 scale-125"></div>
              <div className="absolute inset-0 border border-primary-container rounded-full opacity-10 scale-150"></div>
            </div>

            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2 tracking-tight">Incoming Transfer</h2>
            <p className="font-body text-on-surface-variant mb-8">From <span className="font-semibold text-on-surface">{sender}</span></p>

            <div className="w-full bg-surface-container-low rounded-lg p-4 flex items-center mb-8 border border-surface-container-highest">
              <div className="w-12 h-12 bg-primary-container rounded flex items-center justify-center mr-4 shrink-0">
                <FileIcon className="text-on-primary-container" size={24} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-body font-semibold text-on-surface truncate text-base">
                  {fileCount > 1 ? `${fileCount} items` : mainFileName}
                </p>
                <p className="font-label text-sm text-on-surface-variant uppercase tracking-[0.05em] mt-1">{sizeFormatted} • Offline</p>
              </div>
            </div>

            <div className="w-full flex space-x-4">
              <button onClick={handleDecline} className="flex-1 py-4 border-2 border-outline text-on-surface font-headline font-bold rounded-full hover:bg-surface-container active:scale-95 transition-all">
                Decline
              </button>
              <button onClick={handleAccept} className="flex-1 py-4 bg-primary text-on-primary font-headline font-bold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-[0_8px_16px_rgba(0,88,186,0.3)]">
                Accept
              </button>
            </div>
          </div>
        </div>

        {/* Accepted State */}
        <div className={`w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_rgba(35,44,81,0.06)] overflow-hidden flex flex-col relative transition-all duration-500 delay-200 ${accepted ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}>
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-lg text-on-surface">{progress === 100 ? 'Complete' : 'Receiving...'}</h3>
              <span className="font-headline font-bold text-primary tracking-tight text-xl">{progress}%</span>
            </div>
            
            <div className="mb-6 flex justify-between items-end gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-on-surface text-sm truncate">
                  {fileCount > 1 ? `${fileCount} files transferring...` : mainFileName}
                </p>
                <p className="font-label text-xs text-on-surface-variant uppercase tracking-[0.05em] mt-1">{progress === 100 ? 'Done' : 'Downloading'} • {sizeFormatted}</p>
              </div>
            </div>

            <div className="w-full h-4 bg-surface-container-high rounded-lg overflow-hidden mb-6">
              <div className="h-full bg-slipstream-gradient rounded-lg transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="text-center mt-2">
              <button onClick={() => navigate('HOME')} className="text-on-surface-variant hover:text-error font-label text-sm uppercase tracking-[0.05em] transition-colors">
                {progress === 100 ? 'Done' : 'Cancel Transfer'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
