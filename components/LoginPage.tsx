
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowLeft } from 'lucide-react';

interface Props {
  onLogin: (id: string, pass: string) => void;
  onBack: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, onBack }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && pass) onLogin(id, pass);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100"
    >
      <header className="text-center mb-10">
        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Sign In</h2>
        <p className="text-slate-500 font-medium">Access your BICSL training dashboard</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">KAMC ID / Admin</label>
          <div className="relative">
             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input 
               type="text" 
               required
               value={id}
               onChange={e => setId(e.target.value)}
               className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-teal-50 focus:border-teal-600 transition-all outline-none"
               placeholder="Enter your ID"
             />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Password</label>
          <div className="relative">
             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input 
               type="password" 
               required
               value={pass}
               onChange={e => setPass(e.target.value)}
               className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-teal-50 focus:border-teal-600 transition-all outline-none"
               placeholder="••••••••"
             />
          </div>
        </div>

        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-95">
          Sign In
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100 text-center space-y-4">
        <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          Admin Creds: admin / admin123
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
