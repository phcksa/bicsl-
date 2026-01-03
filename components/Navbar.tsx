
import React from 'react';
import { Shield, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User | null;
  isAdmin: boolean;
  onLogout: () => void;
  onGoToAdmin: () => void;
}

const Navbar: React.FC<Props> = ({ user, isAdmin, onLogout, onGoToAdmin }) => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3 group cursor-pointer">
           <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-100 group-hover:rotate-12 transition-transform">
              <Shield className="w-6 h-6 fill-current" />
           </div>
           <div>
              <span className="font-black text-xl text-slate-900 tracking-tighter">BICSL <span className="text-teal-600">KAMC</span></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Infection Control</p>
           </div>
        </div>

        {(user || isAdmin) && (
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
               <p className="text-sm font-bold text-slate-800">{isAdmin ? 'Administrator' : user?.fullName}</p>
               <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{isAdmin ? 'Full Access' : `ID: ${user?.kamcId}`}</p>
            </div>
            <div className="flex items-center gap-2">
               {isAdmin && (
                 <button onClick={onGoToAdmin} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-all border border-transparent hover:border-teal-100">
                   <LayoutDashboard className="w-5 h-5" />
                 </button>
               )}
               <button onClick={onLogout} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                 <LogOut className="w-5 h-5" />
               </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
