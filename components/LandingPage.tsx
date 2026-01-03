
import React from 'react';
import { motion } from 'framer-motion';
import { AppStage } from '../types';
import { UserPlus, LogIn, ShieldCheck, Stethoscope, Microscope } from 'lucide-react';

interface Props {
  onNavigate: (stage: AppStage) => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center py-12 text-center"
    >
      <div className="bg-teal-600 p-4 rounded-3xl shadow-xl shadow-teal-200 mb-8 transform hover:rotate-6 transition-transform">
        <ShieldCheck className="w-16 h-16 text-white" />
      </div>
      
      <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Welcome to <span className="text-teal-600">BICSL Course</span>
      </h1>
      <p className="text-xl text-slate-500 max-w-2xl mb-12">
        The Basic Infection Control Skills License. Your gateway to excellence in hospital safety and N95 respiratory protection.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => onNavigate('login')}
          className="flex-1 bg-white text-teal-600 border-2 border-teal-600 font-bold py-4 px-8 rounded-2xl hover:bg-teal-50 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="flex-1 bg-teal-600 text-white font-bold py-4 px-8 rounded-2xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100 active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Register
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <Stethoscope className="w-10 h-10 text-teal-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Comprehensive Training</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Engaging multimedia content focused on core infection prevention protocols used at KAMC.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <ShieldCheck className="w-10 h-10 text-teal-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Fit Test Readiness</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Prepare for your physical N95 fit testing by validating your knowledge and selecting the correct gear.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <Microscope className="w-10 h-10 text-teal-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Official Certification</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Complete all modules and pass the final assessment to receive your BICSL certificate.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
