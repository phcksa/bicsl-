
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizStageProps {
  onComplete: () => void;
  onBack: () => void;
}

const QuizStage: React.FC<QuizStageProps> = ({ onComplete, onBack }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const isAllAnswered = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  const handleSelect = (qId: number, idx: number) => {
    setAnswers({ ...answers, [qId]: idx });
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const finalScore = (correct / QUIZ_QUESTIONS.length) * 100;
    setScore(finalScore);
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isPass = score === 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center">
          &larr; Back
        </button>
        <div className="text-xs font-bold uppercase text-slate-400">Stage 2: Knowledge Assessment</div>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Infection Control Quiz</h2>
            <p className="text-sm text-slate-500">You must score 100% to pass. Total questions: {QUIZ_QUESTIONS.length}</p>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded text-slate-500 font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-slate-800">{q.text}</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-9">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i)}
                      className={`text-left p-4 rounded-xl border text-sm transition-all ${
                        answers[q.id] === i 
                          ? 'bg-teal-50 border-teal-600 text-teal-800 ring-2 ring-teal-100' 
                          : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={!isAllAnswered}
            onClick={calculateScore}
            className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${
              isAllAnswered 
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl text-center space-y-6"
        >
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
            isPass ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isPass ? (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-800">
              {isPass ? "Excellent Work!" : "Try Again"}
            </h2>
            <p className="text-slate-500">
              You scored <span className={`font-bold ${isPass ? 'text-green-600' : 'text-red-600'}`}>{score}%</span>
            </p>
          </div>

          <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
            {isPass 
              ? "You've successfully validated your knowledge. You can now download your Fit Test Ticket."
              : "A score of 100% is required to pass. Review the material and try once more."}
          </p>

          <div className="flex flex-col gap-3 pt-4">
            {isPass ? (
              <button 
                onClick={onComplete}
                className="bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-95"
              >
                Proceed to Certificate
              </button>
            ) : (
              <button 
                onClick={handleRetry}
                className="bg-white text-red-600 border-2 border-red-600 font-bold py-4 rounded-xl hover:bg-red-50 transition-all active:scale-95"
              >
                Retry Quiz
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizStage;
