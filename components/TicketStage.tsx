
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface TicketStageProps {
  user: User;
  onBack: () => void;
}

const TicketStage: React.FC<TicketStageProps> = ({ user, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center">
          &larr; Back to Dashboard
        </button>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-bold flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span>Download PDF</span>
        </button>
      </div>

      <div className="max-w-md mx-auto relative group">
        {/* Ticket Outer Wrapper */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
          {/* Header Part */}
          <div className="bg-teal-600 p-8 text-white text-center space-y-1 relative">
            <div className="absolute top-4 left-4 w-10 h-10 border-2 border-white/20 rounded rotate-45 flex items-center justify-center opacity-30">
               <span className="text-[8px] font-bold -rotate-45">KAMC</span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest">Fit Test Ticket</h2>
            <p className="text-teal-100 text-xs font-bold opacity-80">BICSL Infection Control Program</p>
          </div>

          {/* Body Part */}
          <div className="p-8 space-y-6 relative">
            {/* Perforation Effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-50 flex justify-between px-1 -translate-y-1">
               {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-200"></div>)}
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <DataField label="STAFF NAME" value={user.fullName} />
              <DataField label="KAMC ID" value={user.kamcId} />
              <DataField label="DEPARTMENT" value={user.department} />
              <DataField label="JOB CATEGORY" value={user.jobCategory} />
              <DataField label="MASK TYPE" value={user.maskType} />
              <DataField label="ISSUED ON" value={new Date().toLocaleDateString()} />
            </div>

            <div className="border-t-2 border-dashed border-slate-100 pt-6 flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-slate-200 group-hover:border-teal-200 transition-colors">
                 {/* QR Code Placeholder */}
                 <div className="grid grid-cols-4 gap-1 p-2">
                    {[...Array(16)].map((_, i) => <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? 'bg-slate-800' : 'bg-transparent'}`}></div>)}
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Scan for digital verification</p>
            </div>
          </div>

          {/* Footer Part */}
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
             <p className="text-teal-800 font-bold text-sm">YOU ARE READY FOR YOUR FIT TEST</p>
             <p className="text-slate-400 text-[10px] mt-1">This ticket is valid for 30 days from issuance.</p>
          </div>
        </div>

        {/* Success Confetti Effect (Visual Only) */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3 mt-8">
         <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <div className="text-xs text-blue-700 leading-relaxed">
           <span className="font-bold">Next Steps:</span> Present this ticket (digital or printed) to the Occupational Health department to schedule your physical Fit Test session.
         </div>
      </div>
    </motion.div>
  );
};

const DataField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-800">{value}</p>
  </div>
);

export default TicketStage;
