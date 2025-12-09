import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { PatientStatus } from '../types';
import { Search, Plus, Filter, MoreHorizontal, FileText, User, XCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';

const PatientModule: React.FC = () => {
  const { patients, addPatient, updatePatientStatus } = useERP();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M',
    diagnosis: '',
    doctorAssigned: 'Dr. Sarah Lim',
    status: PatientStatus.ADMITTED
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.diagnosis) return;

    addPatient({
      name: formData.name,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      diagnosis: formData.diagnosis,
      doctorAssigned: formData.doctorAssigned,
      status: formData.status,
      admissionDate: new Date().toISOString().split('T')[0]
    });

    setIsModalOpen(false);
    setFormData({ name: '', age: '', gender: 'M', diagnosis: '', doctorAssigned: 'Dr. Sarah Lim', status: PatientStatus.ADMITTED });
  };

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case PatientStatus.ADMITTED: return 'bg-blue-50 text-blue-700 border-blue-100';
      case PatientStatus.DISCHARGED: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case PatientStatus.EMERGENCY: return 'bg-rose-50 text-rose-700 border-rose-100';
      case PatientStatus.OUTPATIENT: return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Management</h2>
          <p className="text-slate-500 text-sm mt-1">PRM / Admissions & Medical Records</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} />
          <span className="font-semibold">Register Patient</span>
        </button>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID or diagnosis..." 
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80">
                <th className="p-5 font-semibold">Patient Name</th>
                <th className="p-5 font-semibold">Diagnosis</th>
                <th className="p-5 font-semibold">Doctor Assigned</th>
                <th className="p-5 font-semibold">Admission</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 flex items-center justify-center text-sm font-bold shadow-inner">
                            {getInitials(patient.name)}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900">{patient.name}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{patient.id} • {patient.age}y • {patient.gender}</div>
                        </div>
                    </div>
                  </td>
                  <td className="p-5">
                     <div className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        {patient.diagnosis}
                     </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-slate-600">
                         <User size={14} className="text-slate-400" />
                         {patient.doctorAssigned}
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 text-sm">
                    {patient.admissionDate}
                  </td>
                  <td className="p-5">
                    <button 
                      onClick={() => updatePatientStatus(patient.id, PatientStatus.DISCHARGED)}
                      title="Click to Discharge"
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(patient.status)} hover:opacity-80 transition-opacity`}
                    >
                      {patient.status}
                    </button>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="View Details">
                            <FileText size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Registration Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Patient Admission">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input 
                type="number"
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Years"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Diagnosis / Complaint</label>
            <textarea 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Primary diagnosis..."
              rows={2}
              value={formData.diagnosis}
              onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Assigned Doctor</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.doctorAssigned}
                onChange={(e) => setFormData({...formData, doctorAssigned: e.target.value})}
              >
                <option value="Dr. Sarah Lim">Dr. Sarah Lim</option>
                <option value="Dr. John Doe">Dr. John Doe</option>
                <option value="Dr. Emily Chen">Dr. Emily Chen</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Admission Type</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as PatientStatus})}
              >
                <option value={PatientStatus.ADMITTED}>In-Patient (Admitted)</option>
                <option value={PatientStatus.EMERGENCY}>Emergency</option>
                <option value={PatientStatus.OUTPATIENT}>Out-Patient</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/20"
            >
              Confirm Admission
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PatientModule;