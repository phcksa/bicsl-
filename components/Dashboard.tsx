
import React from 'react';
import { motion } from 'framer-motion';
import { User, AppStage } from '../types';
// Fix: Added Shield to the imports from lucide-react
import { Play, ClipboardCheck, Award, Lock, CheckCircle2, Shield } from 'lucide-react';

interface Props {
  user: User;
  onAction: (next: AppStage) => void;
}

const Dashboard: React.FC<Props> = ({ user, onAction }) => {
  const isVideoDone = ['VIDEO_WATCHED', 'QUIZ_PASSED', 'FIT_TESTED'].includes(user.status);
  const isQuizDone = ['QUIZ_PASSED', 'FIT_TESTED'].includes(user.status);
  const isFitTested = user.status === 'FIT_TESTED';

  return (
    <div className="space-y-8">
      <header className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.fullName.charAt(0)}
           </div>
           <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Salam, {user.fullName.split(' ')[0]}!</h1>
              <p className="text-slate-500 font-medium">KAMC Staff • ID: {user.kamcId}</p>
           </div>
        </div>
        <div className={`px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 ${isFitTested ? 'bg-green-100 text-green-700' : 'bg-teal-50 text-teal-700 border border-teal-100'}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isFitTested ? 'bg-green-500' : 'bg-teal-500'}`}></div>
          {isFitTested ? 'FIT TEST CERTIFIED' : 'ACTIVE LEARNER'}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard 
          icon={<Play />}
          title="Infection Video"
          desc="Watch the full safety protocol briefing"
          status={isVideoDone ? 'completed' : 'active'}
          onAction={() => onAction('video')}
        />
        <StepCard 
          icon={<ClipboardCheck />}
          title="Knowledge Check"
          desc="Test your knowledge on the protocol"
          status={isQuizDone ? 'completed' : isVideoDone ? 'active' : 'locked'}
          onAction={() => onAction('quiz')}
        />
        <StepCard 
          icon={<Award />}
          title="Fit Test Result"
          desc="Your official N95 certification ticket"
          status={isFitTested ? 'completed' : isQuizDone ? 'active' : 'locked'}
          onAction={() => onAction('pending-fit')}
          isPrimary
        />
      </div>

      <div className="bg-teal-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
         <div className="relative z-10 space-y-4 max-w-xl">
            <h3 className="text-2xl font-bold">Your safety is our priority.</h3>
            <p className="text-teal-100 leading-relaxed">The BICSL program ensures that every healthcare worker at KAMC is equipped with the right knowledge and gear to protect themselves and their patients from infectious hazards.</p>
         </div>
         {/* Decorative Blur */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity"></div>
         <div className="absolute bottom-0 right-10 flex items-end gap-2 opacity-10">
            <Shield className="w-48 h-48 -mb-12" />
         </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, desc, status, onAction, isPrimary }: any) => {
  const isLocked = status === 'locked';
  const isDone = status === 'completed';

  return (
    <div className={`p-8 rounded-3xl border-2 transition-all flex flex-col ${isLocked ? 'bg-slate-50 border-slate-100 opacity-60' : isDone ? 'bg-white border-green-100 shadow-lg shadow-green-50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-teal-400'}`}>
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isLocked ? 'bg-slate-200 text-slate-400' : isDone ? 'bg-green-500 text-white' : 'bg-teal-600 text-white'}`}>
          {isDone ? <CheckCircle2 /> : isLocked ? <Lock /> : icon}
       </div>
       <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
       <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{desc}</p>
       
       <button 
         disabled={isLocked}
         onClick={onAction}
         className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isLocked ? 'bg-slate-200 text-slate-400' : isDone ? 'bg-white text-green-600 border-2 border-green-100 hover:bg-green-50' : isPrimary ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-100' : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50'}`}
       >
         {isDone ? 'Review' : isLocked ? 'Locked' : 'Start Stage'}
       </button>
    </div>
  );
};

export default Dashboard;
