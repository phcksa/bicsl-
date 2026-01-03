
import React, { useState, useMemo } from 'react';
import { User, UserStatus } from '../types';
import { Search, Download, CheckCircle, ClipboardCheck, Edit3, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import { MASKS } from '../constants';

interface Props {
  users: User[];
  onUpdateUser: (id: string, updates: Partial<User>) => void;
}

const AdminDashboard: React.FC<Props> = ({ users, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fitTestModal, setFitTestModal] = useState<User | null>(null);
  const [selectedMaskForTest, setSelectedMaskForTest] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.kamcId.includes(searchTerm) || 
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleExport = () => {
    const data = users.map(u => ({
      'KAMC ID': u.kamcId,
      'Full Name': u.fullName,
      'Job Category': u.jobCategory,
      'Department': u.department,
      'Gender': u.gender,
      'Mask Type': u.maskType,
      'Progress Status': u.status
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Trainees");
    XLSX.writeFile(wb, "BICSL_Trainee_Report.xlsx");
  };

  const handleApproveFitTest = () => {
    if (fitTestModal) {
      onUpdateUser(fitTestModal.id, { 
        status: 'FIT_TESTED', 
        maskType: selectedMaskForTest 
      });
      setFitTestModal(null);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Manage trainees and conduct physical fit tests</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-teal-50 focus:border-teal-600 transition-all w-64"
            />
          </div>
          <button 
            onClick={handleExport}
            className="bg-white border-2 border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Excel
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Trainee</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Mask</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">{u.fullName}</div>
                    <div className="text-xs text-slate-400">ID: {u.kamcId} • {u.department}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{u.jobCategory}</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">{u.maskType}</td>
                  <td className="px-6 py-5">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    {u.status === 'QUIZ_PASSED' && (
                      <button 
                        onClick={() => {
                          setFitTestModal(u);
                          setSelectedMaskForTest(u.maskType);
                        }}
                        className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 inline-flex"
                      >
                        <ClipboardCheck className="w-4 h-4" />
                        Conduct Fit Test
                      </button>
                    )}
                    {u.status === 'FIT_TESTED' && (
                      <div className="text-green-600 flex items-center gap-1 justify-end text-xs font-bold">
                        <CheckCircle className="w-4 h-4" />
                        Certified
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fit Test Modal */}
      {fitTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setFitTestModal(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Conduct Physical Fit Test</h3>
                <p className="text-sm text-slate-500">Trainee: {fitTestModal.fullName} ({fitTestModal.kamcId})</p>
              </div>
              <button onClick={() => setFitTestModal(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </header>
            
            <div className="p-8 space-y-8">
              <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">Trainee Preference</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Edit3 className="w-6 h-6 text-teal-600" />
                   </div>
                   <p className="font-bold text-teal-900">{fitTestModal.maskType}</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verify or Change Mask Result</label>
                <div className="grid grid-cols-1 gap-2">
                  {MASKS.map(m => (
                    <button 
                      key={m.id} 
                      onClick={() => setSelectedMaskForTest(m.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${selectedMaskForTest === m.name ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-100' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <span className={`font-bold ${selectedMaskForTest === m.name ? 'text-teal-900' : 'text-slate-700'}`}>{m.name}</span>
                      {selectedMaskForTest === m.name && <CheckCircle className="w-5 h-5 text-teal-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setFitTestModal(null)}
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleApproveFitTest}
                  className="flex-2 px-10 py-4 rounded-2xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                >
                  Approve & Certify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: UserStatus }) => {
  const configs: Record<UserStatus, { label: string, color: string }> = {
    REGISTERED: { label: 'Registered', color: 'bg-slate-100 text-slate-600' },
    VIDEO_WATCHED: { label: 'Video Finished', color: 'bg-blue-100 text-blue-600' },
    QUIZ_PASSED: { label: 'Quiz Passed', color: 'bg-purple-100 text-purple-600' },
    FIT_TESTED: { label: 'Fit Tested', color: 'bg-green-100 text-green-700' }
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${configs[status].color}`}>
      {configs[status].label}
    </span>
  );
};

export default AdminDashboard;
