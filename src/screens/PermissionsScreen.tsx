import { useAppContext } from '../context';
import { Unlock, FolderOpen, MapPin, Bluetooth } from 'lucide-react';

export const PermissionsScreen = () => {
  const { navigate, grantPermissions, goBack } = useAppContext();

  const handleGrant = () => {
    grantPermissions();
    goBack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <main className="flex-1 flex flex-col items-center pt-12 pb-24 px-6 md:justify-center">
        <header className="w-full max-w-md flex flex-col items-start mb-8">
          <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 text-primary">
            <Unlock size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline ml-1">Required Permissions</h1>
          <p className="text-on-surface-variant text-sm md:text-base ml-1 max-w-sm font-body">
            SwiftShare needs these permissions to enable seamless offline file sharing via Bluetooth and WiFi Direct.
          </p>
        </header>

        <div className="w-full max-w-md flex flex-col space-y-6">
          <PermissionCard 
            icon={<FolderOpen size={24} />} 
            title="Files and Media" 
            desc="Allow SwiftShare to read and write files so you can send and receive data." 
            color="primary"
          />
          <PermissionCard 
            icon={<MapPin size={24} />} 
            title="Location" 
            desc="Required to locate nearby devices using WiFi Direct for fast transfers." 
            color="secondary"
            defaultChecked
          />
          <PermissionCard 
            icon={<Bluetooth size={24} />} 
            title="Bluetooth" 
            desc="Required for rapid device discovery and pairing in the digital slipstream." 
            color="primary"
          />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-6 flex justify-center bg-surface/90 backdrop-blur-md z-40">
        <button 
          onClick={handleGrant}
          className="w-full max-w-md py-4 rounded-full bg-slipstream-gradient text-on-primary font-bold tracking-wide text-lg shadow-[0_8px_16px_rgba(0,88,186,0.2)] hover:shadow-[0_12px_24px_rgba(0,88,186,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
        >
          Grant All
        </button>
      </div>
    </div>
  );
};

const PermissionCard = ({ icon, title, desc, color, defaultChecked = false }: any) => {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container transition-colors cursor-pointer">
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${color}/5 rounded-full blur-2xl group-hover:bg-${color}/10 transition-colors pointer-events-none`}></div>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start space-x-4">
          <div className={`w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center text-${color} shadow-sm flex-shrink-0 mt-1`}>
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface mb-1 font-headline tracking-tight">{title}</h2>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed max-w-[200px]">{desc}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer mt-2 active:scale-95 transition-transform" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
          <div className="w-11 h-6 bg-outline-variant/30 hover:bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary peer-checked:hover:bg-secondary/90 transition-colors"></div>
        </label>
      </div>
    </div>
  );
};
