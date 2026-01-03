
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { JOB_CATEGORIES, GENDERS, MASKS } from '../constants';
import { User as UserIcon, Contact, Shield, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Props {
  onComplete: (user: User) => void;
  onCancel: () => void;
}

const RegistrationStepper: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<User>>({
    kamcId: '',
    password: '',
    nationalId: '',
    fullName: '',
    dob: '',
    nationality: 'Saudi',
    department: '',
    jobCategory: '',
    subCategory: '',
    gender: '',
    email: '',
    mobile: '',
    maskType: '',
    status: 'REGISTERED'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formData.jobCategory === 'Admin') {
      setFormData(prev => ({ ...prev, maskType: 'Not Applicable' }));
    }
  }, [formData.jobCategory]);

  const validate = () => {
    const err: Record<string, string> = {};
    if (step === 1) {
      if (!formData.kamcId) err.kamcId = "ID is required";
      if (!formData.password) err.password = "Password required";
      if (formData.nationalId?.length !== 10) err.nationalId = "Must be 10 digits";
    }
    if (step === 2) {
      if (!formData.fullName) err.fullName = "Name is required";
      if (!formData.jobCategory) err.jobCategory = "Category required";
      if (!formData.gender) err.gender = "Gender required";
    }
    if (step === 3) {
      if (!formData.email?.includes('@')) err.email = "Invalid email";
      if (!formData.mobile) err.mobile = "Mobile required";
    }
    if (step === 4) {
      if (!formData.maskType && formData.jobCategory !== 'Admin') err.maskType = "Select a mask";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (step < 4) setStep(step + 1);
      else onComplete({ ...formData, id: Math.random().toString(36).substr(2, 9) } as User);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-slate-50 border-b border-slate-100 p-8">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 -z-0"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-teal-500 -translate-y-1/2 -z-0 transition-all duration-500" style={{ width: `${(step - 1) * 33}%` }}></div>
          
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s ? 'bg-teal-600 text-white' : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[350px]"
          >
            {step === 1 && (
              <div className="space-y-6">
                <header className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Account Credentials</h2>
                  <p className="text-slate-500">Secure your access with ID and password</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="KAMC ID" value={formData.kamcId!} onChange={v => setFormData({...formData, kamcId: v})} error={errors.kamcId} placeholder="e.g. 1000" />
                  <Input label="Create Password" type="password" value={formData.password!} onChange={v => setFormData({...formData, password: v})} error={errors.password} />
                  <Input label="National ID / Iqama" value={formData.nationalId!} onChange={v => setFormData({...formData, nationalId: v})} error={errors.nationalId} placeholder="10 digits" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <header className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Personal Details</h2>
                  <p className="text-slate-500">How should we identify you?</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" value={formData.fullName!} onChange={v => setFormData({...formData, fullName: v})} error={errors.fullName} />
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                    <div className="flex gap-2">
                      {GENDERS.map(g => (
                        <button key={g} onClick={() => setFormData({...formData, gender: g as any})} className={`flex-1 py-3 rounded-xl border font-medium transition-all ${formData.gender === g ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200'}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <Input label="Date of Birth" type="date" value={formData.dob!} onChange={v => setFormData({...formData, dob: v})} />
                  <Select label="Job Category" value={formData.jobCategory!} options={JOB_CATEGORIES} onChange={v => setFormData({...formData, jobCategory: v})} error={errors.jobCategory} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <header className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Contact Information</h2>
                  <p className="text-slate-500">We'll use these to send your results</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Email Address" type="email" value={formData.email!} onChange={v => setFormData({...formData, email: v})} error={errors.email} />
                  <Input label="Mobile Number" value={formData.mobile!} onChange={v => setFormData({...formData, mobile: v})} error={errors.mobile} placeholder="05xxxxxxxx" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <header className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Respiratory Profile</h2>
                  <p className="text-slate-500">Select the N95 mask type you commonly use</p>
                </header>
                {formData.jobCategory === 'Admin' ? (
                  <div className="p-8 bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl text-center">
                    <p className="text-blue-700 font-medium">As an Admin, you are exempt from fit testing. "Not Applicable" has been selected for you.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {MASKS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setFormData({...formData, maskType: m.name})}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.maskType === m.name ? 'border-teal-600 bg-teal-50 ring-4 ring-teal-50' : 'border-slate-100 bg-white hover:border-teal-200'}`}
                      >
                        <img src={m.imageUrl} className="w-20 h-20 object-cover rounded-full" alt={m.name} />
                        <span className="text-xs font-bold text-slate-700 text-center">{m.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {errors.maskType && <p className="text-red-500 text-xs font-bold">{errors.maskType}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <button onClick={step === 1 ? onCancel : () => setStep(step - 1)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button onClick={handleNext} className="bg-teal-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-teal-700 transition-all flex items-center gap-2 shadow-lg shadow-teal-100">
            {step === 4 ? 'Complete Registration' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, error, placeholder, type = 'text' }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`w-full p-4 rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${error ? 'border-red-400 focus:ring-4 focus:ring-red-50' : 'border-slate-200 focus:ring-4 focus:ring-teal-50 focus:border-teal-600'}`} />
    {error && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{error}</p>}
  </div>
);

const Select = ({ label, value, options, onChange, error }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className={`w-full p-4 rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none appearance-none ${error ? 'border-red-400 focus:ring-4 focus:ring-red-50' : 'border-slate-200 focus:ring-4 focus:ring-teal-50 focus:border-teal-600'}`}>
      <option value="">Select...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default RegistrationStepper;
