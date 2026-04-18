import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { ArrowLeft, File } from 'lucide-react';

export const OutgoingTransferScreen = () => {
  const { navigate, memoryFiles, addHistoryItems, setMemoryFiles } = useAppContext();
  const [progress, setProgress] = useState(0);

  const handleCancel = () => {
    navigate('HOME');
  };

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.floor(Math.random() * 10 + 5), 100));
      }, 400);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      const items = memoryFiles.map((f: File) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: f.name,
        size: f.size,
        timestamp: Date.now(),
        status: 'Sent' as const,
        fileBlob: f
      }));
      
      setTimeout(() => {
        if(items.length > 0) addHistoryItems(items);
        setMemoryFiles([]);
        navigate('HISTORY');
      }, 1000);
    }
  }, [progress, memoryFiles, addHistoryItems, setMemoryFiles, navigate]);


  const totalSize = memoryFiles.reduce((acc, file) => acc + file.size, 0);

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col pt-4">
      <nav className="bg-surface w-full flex items-center justify-between px-6 py-4 z-10 relative">
        <button className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200" onClick={handleCancel}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-on-surface font-bold text-lg tracking-tight">SwiftShare</h1>
        <div className="w-6 h-6"></div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 max-w-4xl mx-auto w-full relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary-container opacity-20 blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-secondary-container opacity-20 blur-3xl mix-blend-multiply"></div>
        </div>

        <section className="w-full max-w-md bg-surface-container-low rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-slipstream-gradient"></div>

          <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-surface-container-highest animate-ping-slow opacity-50"></div>
            <div className="relative w-24 h-24 bg-surface-container-lowest rounded-[2rem] flex items-center justify-center shadow-[0_16px_32px_rgba(35,44,81,0.06)]">
              <File className="text-primary" size={64} fill="currentColor" />
            </div>
          </div>

          <div className="text-center mb-10 w-full px-4">
            <h2 className="font-headline font-semibold text-2xl text-on-surface mb-2 truncate">
              {memoryFiles.length > 0 ? `${memoryFiles.length} item${memoryFiles.length > 1 ? 's' : ''}` : 'No files selected'}
            </h2>
            <p className="font-body text-sm text-on-surface-variant">
              {memoryFiles.length > 0 ? formatSize(totalSize) : '0 MB'}
            </p>
          </div>

          <div className="w-full mb-10">
            <div className="flex items-baseline justify-center mb-6">
              <span className="font-headline font-bold text-[5rem] leading-none text-on-surface tracking-[-0.02em] tabular-nums">{progress}</span>
              <span className="font-headline font-semibold text-2xl text-on-surface-variant ml-1">%</span>
            </div>

            <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden relative mb-4 shadow-inner">
              <div className="absolute top-0 left-0 h-full bg-slipstream-gradient rounded-full transition-all duration-300" style={{ width: `${progress}%` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mt-6">
              <div className="bg-surface rounded-xl py-3 px-4 shadow-[0_4px_12px_rgba(35,44,81,0.03)] border border-outline-variant/15">
                <p className="font-label text-[10px] uppercase tracking-[0.05em] text-on-surface-variant mb-1">Speed</p>
                <p className="font-headline font-medium text-lg text-primary tabular-nums">{progress === 100 ? '0' : '15.2'} MB/s</p>
              </div>
              <div className="bg-surface rounded-xl py-3 px-4 shadow-[0_4px_12px_rgba(35,44,81,0.03)] border border-outline-variant/15">
                <p className="font-label text-[10px] uppercase tracking-[0.05em] text-on-surface-variant mb-1">{progress === 100 ? 'Status' : 'Time Left'}</p>
                <p className="font-headline font-medium text-lg text-on-surface tabular-nums">{progress === 100 ? 'Done' : '8 sec'}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <button 
              onClick={handleCancel}
              className="bg-transparent border-2 border-outline-variant/20 text-on-surface-variant font-headline font-medium py-4 px-10 rounded-full w-full hover:bg-surface-container hover:text-on-surface active:scale-95 transition-all duration-200"
            >
              {progress === 100 ? 'Continue' : 'Cancel Transfer'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
