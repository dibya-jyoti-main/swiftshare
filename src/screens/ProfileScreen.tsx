import { useState } from 'react';
import { useAppContext } from '../context';
import { ArrowLeft, Pen, Badge, Smartphone } from 'lucide-react';

export const ProfileScreen = () => {
  const { navigate, deviceName, setDeviceName, profileAvatar, setProfileAvatar, deviceId } = useAppContext();
  
  const [localName, setLocalName] = useState(deviceName);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setProfileAvatar(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDeviceName(localName);
    navigate('HOME');
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen pb-24 flex flex-col md:flex-row">
      <header className="md:hidden w-full docked top-0 bg-surface flex items-center justify-between px-6 py-4 z-40 sticky shadow-sm shadow-[#232c51]/5 border-b border-outline-variant/10">
        <button onClick={() => navigate('HOME')} className="text-[#0058ba] hover:opacity-80 transition-opacity active:scale-95 duration-200 p-2 -ml-2 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-on-surface font-bold tracking-tight text-lg">SwiftShare</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 py-8 md:px-12 md:py-12 max-w-4xl mx-auto w-full relative">
        <div className="mb-10 pl-2">
          <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface mb-2">My Profile</h2>
          <p className="font-body text-on-surface-variant text-base">Manage your identity on the slipstream.</p>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] p-6 md:p-10 relative overflow-hidden group shadow-sm border border-surface-container-highest/50">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
          
          <form className="relative z-10 flex flex-col gap-8" onSubmit={handleSave}>
            <div className="flex flex-col items-center justify-center mb-4">
              <label className="relative group cursor-pointer" htmlFor="avatarUpload">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(35,44,81,0.08)] ring-4 ring-surface-container-lowest bg-surface-container">
                  <img alt="Profile Avatar" className="w-full h-full object-cover" src={profileAvatar} />
                </div>
                <div className="absolute bottom-0 right-0 md:bottom-2 md:right-2 w-10 h-10 md:w-12 md:h-12 bg-surface-container-lowest rounded-full shadow-[0_4px_16px_rgba(35,44,81,0.1)] flex items-center justify-center text-primary transform transition-transform group-hover:scale-105 active:scale-95">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slipstream-gradient rounded-full flex items-center justify-center">
                    <Pen className="text-white" size={16} />
                  </div>
                </div>
                <input id="avatarUpload" type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              </label>
              <p className="mt-4 font-label text-sm uppercase tracking-widest text-on-surface-variant font-semibold">Update Avatar</p>
            </div>

            <div className="space-y-6 max-w-lg mx-auto w-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="displayName" className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant pl-4 cursor-pointer font-bold">Display Name</label>
                <div className="relative">
                  <input type="text" id="displayName" value={localName} onChange={(e) => setLocalName(e.target.value)} placeholder="Enter display name" className="w-full bg-surface-container-highest border-none rounded-full px-6 py-4 text-on-surface font-body font-medium placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all shadow-sm shadow-on-surface/5" />
                  <Badge className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="deviceId" className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant pl-4 cursor-pointer font-bold">Device ID</label>
                <div className="relative opacity-60">
                  <input type="text" id="deviceId" value={deviceId} readOnly className="w-full bg-surface-container border-none rounded-full px-6 py-4 text-on-surface font-body font-medium focus:ring-0 focus:outline-none cursor-not-allowed" />
                  <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" size={20} />
                </div>
                <p className="pl-4 text-[11px] text-on-surface-variant mt-1">This ID is used for secure slipstream transfers.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 max-w-lg mx-auto w-full">
              <button type="button" onClick={() => navigate('HOME')} className="w-full px-8 py-4 rounded-full bg-primary-container text-on-primary-container font-label font-bold text-sm tracking-wide hover:bg-tertiary-container transition-colors active:scale-95 duration-200">
                Cancel
              </button>
              <button type="submit" className="w-full px-10 py-4 rounded-full bg-slipstream-gradient text-white font-label font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(0,88,186,0.2)] hover:shadow-[0_12px_32px_rgba(0,104,89,0.3)] transition-all active:scale-95 duration-200 flex items-center justify-center gap-2">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
