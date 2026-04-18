import React, { useRef } from 'react';
import { useAppContext } from '../context';
import { ArrowLeft, Search, MoreVertical, CheckCircle2, Send, File as FileIcon, Upload } from 'lucide-react';

export const FileSelectionScreen = () => {
  const { goBack, navigate, memoryFiles, setMemoryFiles } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (memoryFiles.length > 0) {
      navigate('DEVICE_DISCOVERY');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setMemoryFiles([...memoryFiles, ...newFiles]);
    }
  };

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = [...memoryFiles];
    updated.splice(index, 1);
    setMemoryFiles(updated);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen relative pb-32">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-surface flat no shadows z-40 sticky top-0 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-on-surface font-bold text-lg tracking-tight">SwiftShare</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-on-surface-variant p-2 bg-surface-container-low rounded-full">
            <Search size={20} />
          </button>
          <button className="text-on-surface-variant p-2 bg-surface-container-low rounded-full">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      <nav className="w-full overflow-x-auto hide-scrollbar px-6 py-4 mb-2">
        <div className="flex items-center gap-3 min-w-max">
          <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-label text-sm uppercase tracking-[0.05em] font-bold shadow-sm">My Files</button>
          <button onClick={() => fileInputRef.current?.click()} className="bg-primary/10 text-primary px-6 py-3 rounded-full font-label text-sm uppercase tracking-[0.05em] font-bold flex items-center gap-2 hover:bg-primary/20 transition-all"><Upload size={16} /> Browse Local</button>
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
        </div>
      </nav>

      <main className="px-6">
        <h2 className="font-headline font-semibold text-on-surface mb-4 mt-2">Selected for Transfer</h2>
        
        {memoryFiles.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-outline-variant/30 rounded-3xl mt-4">
            <div className="w-16 h-16 bg-surface-container-high rounded-full flex justify-center items-center mb-4 text-on-surface-variant">
              <FileIcon size={32} />
            </div>
            <p className="font-headline font-bold text-on-surface mb-2">No files selected</p>
            <p className="font-body text-sm text-on-surface-variant">Click Browse Local to pick files directly from your memory for offline sending.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {memoryFiles.map((file, index) => (
              <div key={index} className="relative flex flex-col rounded-xl p-3 bg-secondary-container transition-transform">
                <div onClick={(e) => removeFile(e, index)} className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full p-1.5 bg-surface-container-lowest/50 hover:bg-surface-container-lowest cursor-pointer shadow-sm transition-all text-error">
                  <CheckCircle2 size={24} className="text-secondary opacity-0" />
                  <span className="absolute text-sm font-bold opacity-100">&times;</span>
                </div>
                
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 relative bg-surface-container-high flex flex-col items-center justify-center pb-2">
                  <FileIcon className="text-primary/60 mb-2" size={48} />
                  <span className="text-[10px] uppercase font-bold text-primary/60 px-2 truncate w-full text-center">
                     {file.name.split('.').pop() || 'FILE'}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-headline font-semibold text-sm truncate w-[90%] text-on-secondary-container">{file.name}</span>
                  <span className="font-body text-xs mt-0.5 text-on-secondary-container/80">{formatSize(file.size)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {memoryFiles.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={handleSend}
            className="flex items-center gap-3 bg-slipstream-gradient px-10 py-5 rounded-full shadow-[0_16px_32px_-4px_rgba(35,44,81,0.3)] hover:scale-105 active:scale-95 hover:shadow-[0_24px_48px_-4px_rgba(35,44,81,0.4)] transition-all duration-300"
          >
            <div className="flex items-center justify-center bg-surface-container-lowest text-primary min-w-[32px] h-[32px] rounded-full font-headline font-bold text-base px-2 shadow-sm">
              {memoryFiles.length}
            </div>
            <span className="text-on-primary font-headline font-bold tracking-wide text-xl">Send</span>
            <Send className="text-on-primary" size={24} />
          </button>
        </div>
      )}
    </div>
  );
};
