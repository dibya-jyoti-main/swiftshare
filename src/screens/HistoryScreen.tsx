import { useAppContext, HistoryItem as HistoryItemType } from '../context';
import { ArrowLeft, Clock, Search, ArrowUpRight, ArrowDownLeft, FileText, Image as ImageIcon, Film, Archive, Trash2, Download, Folder } from 'lucide-react';

export const HistoryScreen = () => {
  const { navigate, historyItems, setHistoryItems } = useAppContext();

  // Group history by relative date ranges
  const todayItems = historyItems.filter((i: HistoryItemType) => {
    const d = new Date(i.timestamp);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const earlierItems = historyItems.filter((i: HistoryItemType) => !todayItems.includes(i));

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased pb-24">
      <header className="bg-surface w-full docked top-0 flex items-center justify-between px-6 py-4 z-40 sticky">
        <button onClick={() => navigate('HOME')} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-on-surface font-bold tracking-tighter font-headline text-lg">Activity</h1>
        <div className="flex items-center gap-2">
          <button className="text-on-surface-variant p-2 -mr-2 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
            <Search size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 pb-32">
        <div className="mb-8 pl-2 pr-4">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-tight">Transfer<br/>History</h2>
        </div>

        {historyItems.length === 0 ? (
           <div className="w-full flex flex-col items-center justify-center py-20 text-center opacity-60">
             <div className="w-20 h-20 bg-surface-container-high rounded-full flex justify-center items-center mb-6">
               <Clock size={36} className="text-on-surface-variant" />
             </div>
             <h3 className="font-headline font-bold text-xl text-on-surface mb-2">No activity yet</h3>
             <p className="font-body text-sm text-on-surface-variant max-w-xs">Your transfers across devices will appear here.</p>
           </div>
        ) : (
          <div className="space-y-8">
            {todayItems.length > 0 && (
              <section>
                <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-[0.05em] pl-2 mb-4">Today</h3>
                <div className="flex flex-col gap-3">
                  {todayItems.map((item: HistoryItemType) => (
                    <HistoryItemComponent
                      key={item.id}
                      item={item}
                      formatSize={formatSize}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              </section>
            )}

            {earlierItems.length > 0 && (
              <section>
                <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-[0.05em] pl-2 mb-4">Earlier</h3>
                <div className="flex flex-col gap-3">
                  {earlierItems.map((item: HistoryItemType) => (
                    <HistoryItemComponent
                      key={item.id}
                      item={item}
                      formatSize={formatSize}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              </section>
            )}
            
            <div className="pt-6 w-full flex justify-center">
              <button 
                onClick={() => setHistoryItems([])}
                className="flex items-center gap-2 text-error px-4 py-2 font-label font-bold text-sm hover:bg-error/10 rounded-full transition-all"
              >
                <Trash2 size={16} /> Clear History
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const HistoryItemComponent = ({ item, formatSize, formatTime }: { item: HistoryItemType, formatSize: Function, formatTime: Function }) => {
  const isSent = item.status === 'Sent';
  const Icon = item.name.toLowerCase().match(/\.(mp4|mov|avi)$/) ? Film :
               item.name.toLowerCase().match(/\.(jpo?g|png|gif|webp)$/) ? ImageIcon :
               item.name.toLowerCase().match(/\.(zip|tar|gz)$/) ? Archive : FileText;

  const handleDownload = () => {
    if (item.fileBlob && item.status === 'Received') {
      const url = URL.createObjectURL(item.fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const statusColor = isSent ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container";

  return (
    <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-surface-container cursor-pointer active:scale-[0.98]">
      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex flex-shrink-0 items-center justify-center text-primary relative">
        <Icon size={24} className="text-on-surface-variant" />
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-sm ${isSent ? 'bg-primary' : 'bg-secondary'}`}>
          {isSent ? <ArrowUpRight className="text-white" size={10} strokeWidth={3} /> : <ArrowDownLeft className="text-white" size={10} strokeWidth={3} />}
        </div>
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="font-headline font-bold text-on-surface text-base truncate pb-0.5">{item.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-sm ${statusColor} font-label text-[9px] font-bold uppercase tracking-[0.05em]`}>
            {item.status}
          </span>
          <span className="font-body text-[13px] text-on-surface-variant truncate flex-1">{formatSize(item.size)}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        <span className="font-mono text-[11px] text-on-surface-variant font-medium opacity-80 pl-1">{formatTime(item.timestamp)}</span>
        {!isSent && item.fileBlob && (
           <button 
             onClick={handleDownload}
             className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors active:scale-95 duration-200"
           >
             <Download size={14} />
           </button>
        )}
      </div>
    </div>
  );
};
