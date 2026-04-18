import { AppProvider, useAppContext } from './context';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { PermissionsScreen } from './screens/PermissionsScreen';
import { FileSelectionScreen } from './screens/FileSelectionScreen';
import { DeviceDiscoveryScreen } from './screens/DeviceDiscoveryScreen';
import { OutgoingTransferScreen } from './screens/OutgoingTransferScreen';
import { IncomingTransferScreen } from './screens/IncomingTransferScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { WaitingReceiveScreen } from './screens/WaitingReceiveScreen';

const ScreenManager = () => {
  const { currentScreen } = useAppContext();

  return (
    <div className="h-full w-full">
      {currentScreen === 'HOME' && <HomeScreen />}
      {currentScreen === 'PERMISSIONS' && <PermissionsScreen />}
      {currentScreen === 'FILE_SELECTION' && <FileSelectionScreen />}
      {currentScreen === 'DEVICE_DISCOVERY' && <DeviceDiscoveryScreen />}
      {currentScreen === 'OUTGOING_TRANSFER' && <OutgoingTransferScreen />}
      {currentScreen === 'INCOMING_TRANSFER' && <IncomingTransferScreen />}
      {currentScreen === 'WAITING_RECEIVE' && <WaitingReceiveScreen />}
      {currentScreen === 'HISTORY' && <HistoryScreen />}
      {currentScreen === 'PROFILE' && <ProfileScreen />}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ScreenManager />
    </AppProvider>
  );
}

