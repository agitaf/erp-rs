import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { Patient, PatientStatus } from '../types';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Card } from './ui/Card';

const PatientModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case PatientStatus.ADMITTED: return 'bg-blue-100 text-blue-700';
      case PatientStatus.DISCHARGED: return 'bg-green-100 text-green-700';
      case PatientStatus.EMERGENCY: return 'bg-red-100 text-red-700';
      case PatientStatus.OUTPATIENT: return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Patient Management (PRM)</h2>
          <p className="text-slate-500 text-sm">Manage admissions, appointments, and medical records.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          <Plus size={18} />
          <span>New Patient</span>
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm bg-slate-50/50">
                <th className="p-4 font-medium">Patient ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Age/Gender</th>
                <th className="p-4 font-medium">Diagnosis</th>
                <th className="p-4 font-medium">Doctor</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{patient.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{patient.name}</div>
                    <div className="text-xs text-slate-500">Admitted: {patient.admissionDate}</div>
                  </td>
                  <td className="p-4 text-slate-600">{patient.age} / {patient.gender}</td>
                  <td className="p-4 text-slate-600">{patient.diagnosis}</td>
                  <td className="p-4 text-slate-600">{patient.doctorAssigned}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PatientModule;