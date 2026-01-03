
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const VideoStage: React.FC<Props> = ({ onComplete, onBack }) => {
  const [canProceed, setCanProceed] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    
    // Simple anti-skip logic
    if (current > lastTimeRef.current + 2) {
      videoRef.current.currentTime = lastTimeRef.current;
    } else {
      lastTimeRef.current = current;
    }

    setProgress((current / videoRef.current.duration) * 100);
  };

  const handleEnded = () => {
    setCanProceed(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Dashboard
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
           <Play className="w-4 h-4 fill-current" />
           STAGE 1: EDUCATIONAL VIDEO
        </div>
      </header>

      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 aspect-video relative group border-4 border-white">
<video 
          ref={videoRef}
          src="/videos/bicsl.mp4" 
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          playsInline
          controls={false}
        />        
        {/* Progress Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
          <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        {!canProceed && progress < 1 && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <button onClick={() => videoRef.current?.play()} className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/40 text-white transform hover:scale-110 transition-all">
                <Play className="w-12 h-12 fill-current" />
             </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
             <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Watching Required</h3>
            <p className="text-sm text-slate-500 leading-relaxed">You must watch the entire video to unlock the quiz assessment. Seeking/skipping is disabled.</p>
          </div>
        </div>
        <button 
          disabled={!canProceed}
          onClick={onComplete}
          className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all ${canProceed ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
        >
          {canProceed ? 'Unlock Quiz' : 'Watching...'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default VideoStage;
