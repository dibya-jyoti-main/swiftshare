import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { ArrowLeft, Radio, Smartphone, RefreshCw, WifiOff } from 'lucide-react';

export const DeviceDiscoveryScreen = () => {
  const { navigate, goBack, deviceId, deviceName, memoryFiles, setTargetDeviceId } = useAppContext();
  const [devices, setDevices] = useState<{id: string, name: string}[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(true);

  const startDiscovery = () => {
    setIsDiscovering(true);
    setDevices([]);
    
    const channel = new BroadcastChannel('swiftshare_channel');
    channel.postMessage({ type: 'DISCOVER_REQUEST', senderId: deviceId });
    
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'DISCOVER_RESPONSE') {
        setDevices(prev => {
          if (prev.find(d => d.id === e.data.deviceId)) return prev;
          return [...prev, { id: e.data.deviceId, name: e.data.deviceName }];
        });
      }
    };
    
    channel.addEventListener('message', handleMessage);

    // Stop discovering after 4 seconds to show results
    setTimeout(() => {
      setIsDiscovering(false);
      channel.removeEventListener('message', handleMessage);
      channel.close();
    }, 4000);
  };

  useEffect(() => {
    startDiscovery();
  }, []);

  const handleConnect = (targetId: string) => {
    setTargetDeviceId(targetId);
    const channel = new BroadcastChannel('swiftshare_channel');
    
    channel.postMessage({ 
      type: 'TRANSFER_REQUEST', 
      targetDeviceId: targetId,
      senderId: deviceId,
      senderName: deviceName,
      files: memoryFiles
    });
    
    channel.close();
    navigate('OUTGOING_TRANSFER');
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary/20 selection:text-primary pb-12">
      <nav className="bg-surface w-full flex items-center justify-between px-6 py-4 z-50 sticky top-0 flat no shadows">
        <button onClick={goBack} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-on-surface font-bold text-lg tracking-tight">SwiftShare</h1>
        <div className="w-6 h-6"></div>
      </nav>

      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center pt-8">
        <div className="relative w-full h-72 flex items-center justify-center overflow-hidden mb-12">
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-surface via-surface-container-low to-surface-container-high opacity-50 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]"></div>
          
          <div className={`absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl origin-bottom-right translate-x-[-10%] translate-y-[-10%] transition-opacity duration-1000 ${isDiscovering ? 'animate-[spin_6s_linear_infinite] opacity-100' : 'opacity-30'}`}></div>
          <div className={`absolute w-64 h-64 bg-secondary/20 rounded-full blur-3xl origin-top-left translate-x-[10%] translate-y-[10%] transition-opacity duration-1000 ${isDiscovering ? 'animate-[spin_10s_linear_infinite_reverse] opacity-100' : 'opacity-30'}`}></div>

          <div className={`absolute w-64 h-64 border-[24px] border-surface-container/30 rounded-full ${isDiscovering ? 'animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]' : ''}`}></div>
          <div className={`absolute w-44 h-44 border-[16px] border-surface-container-high/50 rounded-full ${isDiscovering ? 'animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]' : ''}`} style={{ animationDelay: isDiscovering ? '1s' : '0s' }}></div>

          <div className={`relative z-10 w-24 h-24 bg-slipstream-gradient rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,88,186,0.2)] transition-transform duration-300 ${isDiscovering ? 'animate-pulse scale-105' : 'scale-100'}`}>
            <Radio className="text-on-primary" size={48} />
          </div>
        </div>

        <div className="text-center mb-10 w-full">
          <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface mb-2">Searching the Slipstream</h2>
          <p className="font-body text-on-surface-variant text-base">Looking for nearby devices ready to receive...</p>
        </div>

        <div className="w-full">
          <h3 className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-bold mb-4 pl-4 border-l-4 border-primary">
            Available Devices
          </h3>

          {isDiscovering && devices.length === 0 && (
            <div className="flex flex-col gap-4 w-full">
              {[1, 2].map((i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-4 shadow-sm animate-pulse">
                  <div className="w-14 h-14 rounded-full bg-surface-container-high shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-outline-variant/30 rounded w-2/3"></div>
                    <div className="h-3 bg-outline-variant/20 rounded w-1/3"></div>
                  </div>
                  <div className="w-24 h-10 bg-outline-variant/20 rounded-full shrink-0"></div>
                </div>
              ))}
            </div>
          )}

          {!isDiscovering && devices.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 mt-4 text-center bg-surface-container-lowest/50 rounded-3xl border border-dashed border-outline-variant/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
                 <WifiOff className="text-on-surface-variant" size={32} />
               </div>
               <h4 className="font-headline font-bold text-lg text-on-surface mb-2">No Devices Found</h4>
               <p className="font-body text-sm text-on-surface-variant mb-6 max-w-[250px]">
                 Make sure the receiving device is nearby, has SwiftShare open, and is set to Receive.
               </p>
               <button onClick={startDiscovery} className="flex items-center gap-2 bg-surface-container text-primary font-label font-bold text-sm px-6 py-3 rounded-full hover:bg-surface-container-high active:scale-95 transition-all">
                 <RefreshCw size={18} /> Retry Search
               </button>
            </div>
          )}

          <div className="flex flex-col gap-4 w-full">
            {devices.map((device) => (
              <div key={device.id} className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(35,44,81,0.06)] active:scale-[0.98]">
                <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/20">
                  <Smartphone className="text-primary" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline font-semibold text-lg text-on-surface truncate">{device.name}</h4>
                  <p className="font-body text-sm text-on-surface-variant truncate">ID: {device.id}</p>
                </div>
                <button 
                  onClick={() => handleConnect(device.id)}
                  className="shrink-0 bg-primary hover:bg-primary-dim focus:ring-4 focus:ring-primary/30 text-on-primary rounded-full px-4 py-2 sm:px-6 sm:py-2.5 font-label text-xs sm:text-sm font-bold uppercase tracking-[0.05em] shadow-[0_4px_12px_rgba(0,88,186,0.15)] hover:shadow-[0_6px_16px_rgba(0,88,186,0.25)] active:scale-95 transition-all"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
