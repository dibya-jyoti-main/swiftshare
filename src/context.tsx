import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export type Screen = 'HOME' | 'PERMISSIONS' | 'FILE_SELECTION' | 'DEVICE_DISCOVERY' | 'OUTGOING_TRANSFER' | 'INCOMING_TRANSFER' | 'HISTORY' | 'PROFILE' | 'WAITING_RECEIVE';

export interface HistoryItem {
  id: string;
  name: string;
  size: number;
  timestamp: number;
  status: 'Sent' | 'Received';
  fileBlob?: File;
}

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  permissionsGranted: boolean;
  grantPermissions: () => void;
  deviceId: string;
  deviceName: string;
  setDeviceName: (name: string) => void;
  profileAvatar: string;
  setProfileAvatar: (url: string) => void;
  memoryFiles: File[];
  setMemoryFiles: (files: File[]) => void;
  incomingMetadata: { senderName: string, files: File[] } | null;
  setIncomingMetadata: (data: any) => void;
  historyItems: HistoryItem[];
  addHistoryItems: (items: HistoryItem[]) => void;
  targetDeviceId: string | null;
  setTargetDeviceId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<Screen[]>(['HOME']);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [memoryFiles, setMemoryFiles] = useState<File[]>([]);
  const [incomingMetadata, setIncomingMetadata] = useState<any>(null);
  const [targetDeviceId, setTargetDeviceId] = useState<string | null>(null);
  
  const [deviceName, setDeviceName] = useState('Web Device ' + Math.floor(Math.random() * 1000));
  const [profileAvatar, setProfileAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuAqJpR-3qSpbeiIgXHCTvWt15dsmuRp78Zg-471VIbXw0sAbhQM1j5iP8-nge_nTWnsETyu4FI6h8vgtbS5WYC81EAaFptzDqjzq-jwS75Tr_Vztf7yT3VsI9l1GNmxUDsDEJORVD_AmXZOD6ZzTe-6qHrpBMX0aWsIElkAgMLtifHkw1DnbulEujawQd3fcoVSkONPJwwN3y3IfEaE9uTQsCC4irFkNDF01JUwXuPgf_hQK7lmlvZj2VU5fR7OdCMbQIJL94ONhfc');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const deviceId = useMemo(() => Math.random().toString(36).substring(2, 9), []);

  const currentScreen = history[history.length - 1];

  const navigate = (screen: Screen) => {
    setHistory((prev) => [...prev, screen]);
  };

  const goBack = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const grantPermissions = () => {
    setPermissionsGranted(true);
  };

  const addHistoryItems = (items: HistoryItem[]) => {
    setHistoryItems(prev => {
      const newItems = [...items, ...prev];
      // Optional: Broadcast local history update to other devices to sync transfer history mesh
      const channel = new BroadcastChannel('swiftshare_channel');
      // We drop fileBlob from sync to prevent large clones across the channel
      const syncable = newItems.map(i => ({...i, fileBlob: undefined}));
      channel.postMessage({ type: 'HISTORY_SYNC', history: syncable, senderId: deviceId });
      channel.close();
      
      const unique = newItems.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      return unique;
    });
  };

  // Cross-tab offline file sharing simulation via BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel('swiftshare_channel');
    
    // Request initial history sync naturally when mounting
    channel.postMessage({ type: 'REQUEST_HISTORY_SYNC', senderId: deviceId });
    
    const handleMessage = (e: MessageEvent) => {
      // Respond to discovery requests if we are waiting to receive
      if (e.data.type === 'DISCOVER_REQUEST' && currentScreen === 'WAITING_RECEIVE') {
        channel.postMessage({ type: 'DISCOVER_RESPONSE', deviceId, deviceName });
      }
      
      // Accept incoming transfer requests aimed at this device ID
      if (e.data.type === 'TRANSFER_REQUEST' && e.data.targetDeviceId === deviceId) {
        setIncomingMetadata({ senderName: e.data.senderName, files: e.data.files });
        navigate('INCOMING_TRANSFER');
      }

      // Handle Transfer Start on Receiver (to sync state visually if needed)
      if (e.data.type === 'TRANSFER_START' && e.data.targetDeviceId === deviceId) {
         // trigger UI updates if necessary
      }

      // Mesh History Sync implementation
      if (e.data.type === 'HISTORY_SYNC' && e.data.senderId !== deviceId) {
        setHistoryItems(prev => {
          const combined = [...prev, ...e.data.history];
          return combined.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).sort((a,b) => b.timestamp - a.timestamp);
        });
      }
      
      if (e.data.type === 'REQUEST_HISTORY_SYNC' && e.data.senderId !== deviceId) {
        const syncable = historyItems.map(i => ({...i, fileBlob: undefined}));
        channel.postMessage({ type: 'HISTORY_SYNC', history: syncable, senderId: deviceId });
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [currentScreen, deviceId, deviceName, historyItems]);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        permissionsGranted,
        grantPermissions,
        deviceId,
        deviceName,
        setDeviceName,
        profileAvatar,
        setProfileAvatar,
        memoryFiles,
        setMemoryFiles,
        incomingMetadata,
        setIncomingMetadata,
        historyItems,
        addHistoryItems,
        targetDeviceId,
        setTargetDeviceId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
