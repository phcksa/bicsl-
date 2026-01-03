
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStage, User, UserStatus } from './types';
import { Shield, Users, LogOut, Search, Download, CheckCircle, Play, ClipboardCheck, Award, UserPlus, ArrowRight, ArrowLeft } from 'lucide-react';
import * as XLSX from 'xlsx';

// Components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RegistrationStepper from './components/RegistrationStepper';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import VideoStage from './components/VideoStage';
import QuizStage from './components/QuizStage';
import TicketStage from './components/TicketStage';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Mock Database
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('bicsl_users');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        kamcId: '2000',
        fullName: 'Mohammed Al-Ghamdi',
        nationalId: '1029384756',
        dob: '1985-05-12',
        nationality: 'Saudi',
        department: 'ER',
        jobCategory: 'Physician',
        subCategory: 'Consultant',
        gender: 'Male',
        email: 'mohammed@kamc.gov.sa',
        mobile: '0501234567',
        maskType: '3M 1860 (Regular)',
        status: 'QUIZ_PASSED'
      },
      {
        id: '2',
        kamcId: '2001',
        fullName: 'Sara Al-Otaibi',
        nationalId: '1098765432',
        dob: '1992-08-20',
        nationality: 'Saudi',
        department: 'ICU',
        jobCategory: 'Nurse',
        subCategory: 'Staff Nurse',
        gender: 'Female',
        email: 'sara@kamc.gov.sa',
        mobile: '0559988776',
        maskType: '3M 1870+',
        status: 'VIDEO_WATCHED'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bicsl_users', JSON.stringify(users));
  }, [users]);

  const handleLogin = (id: string, pass: string) => {
    if (id === 'admin' && pass === 'admin123') {
      setIsAdmin(true);
      setStage('admin-dashboard');
      return;
    }

    const foundUser = users.find(u => u.kamcId === id);
    if (foundUser) {
      setCurrentUser(foundUser);
      setIsAdmin(false);
      setStage('dashboard');
    } else {
      alert("User not found. Please register.");
    }
  };

  const handleRegister = (newUser: User) => {
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setStage('dashboard');
  };

  const updateStatus = (status: UserStatus) => {
    if (!currentUser) return;
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, status } : u
    );
    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find(u => u.id === currentUser.id)!;
    setCurrentUser(updatedUser);
    setStage('dashboard');
  };

  const adminUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setStage('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar 
        user={currentUser} 
        isAdmin={isAdmin} 
        onLogout={handleLogout} 
        onGoToAdmin={() => setStage('admin-dashboard')}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {stage === 'landing' && (
            <LandingPage onNavigate={setStage} />
          )}

          {stage === 'login' && (
            <LoginPage onLogin={handleLogin} onBack={() => setStage('landing')} />
          )}

          {stage === 'register' && (
            <RegistrationStepper onComplete={handleRegister} onCancel={() => setStage('landing')} />
          )}

          {stage === 'dashboard' && currentUser && (
            <Dashboard 
              user={currentUser} 
              onAction={(next) => setStage(next)} 
            />
          )}

          {stage === 'video' && (
            <VideoStage onComplete={() => updateStatus('VIDEO_WATCHED')} onBack={() => setStage('dashboard')} />
          )}

          {stage === 'quiz' && (
            <QuizStage onComplete={() => updateStatus('QUIZ_PASSED')} onBack={() => setStage('dashboard')} />
          )}

          {stage === 'pending-fit' && currentUser && (
            <TicketStage user={currentUser} onBack={() => setStage('dashboard')} />
          )}

          {stage === 'admin-dashboard' && isAdmin && (
            <AdminDashboard 
              users={users} 
              onUpdateUser={adminUpdateUser} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 py-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Powered by Infection Control Department &copy; {new Date().getFullYear()} KAMC
        </p>
      </footer>
    </div>
  );
};

export default App;
