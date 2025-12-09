import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { StaffStatus } from '../types';
import { Card } from './ui/Card';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { Modal } from './ui/Modal';

const StaffModule: React.FC = () => {
  const { staff, toggleStaffStatus, addStaff } = useERP();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      role: '',
      department: 'General',
      email: '',
      shift: 'Morning'
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.role) return;

    addStaff({
        name: formData.name,
        role: formData.role,
        department: formData.department,
        email: formData.email,
        shift: formData.shift,
        status: StaffStatus.OFF_DUTY,
        avatarUrl: '' // Handled in context
    });

    setIsModalOpen(false);
    setFormData({ name: '', role: '', department: 'General', email: '', shift: 'Morning' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Human Capital (HCM)</h2>
          <p className="text-slate-500 text-sm">Staff scheduling, performance, and resource allocation.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
            <Plus size={18} />
            <span className="font-semibold">Add Staff</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staff.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="p-6 text-center border-b border-slate-50 relative">
                    <img 
                        src={s.avatarUrl} 
                        alt={s.name} 
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow-sm"
                    />
                    <h3 className="font-bold text-slate-900">{s.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-1">{s.role}</p>
                    <p className="text-xs text-slate-500">{s.department}</p>
                </div>
                <div className="p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2">
                            <Clock size={14} /> Shift
                        </span>
                        <span className="font-medium text-slate-700">{s.shift}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2">
                            <MapPin size={14} /> Status
                        </span>
                        <button 
                            onClick={() => toggleStaffStatus(s.id)}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity
                            ${s.status === StaffStatus.ON_DUTY ? 'bg-green-100 text-green-700' : 
                              s.status === StaffStatus.OFF_DUTY ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-600'}`}
                            title="Click to toggle status"
                        >
                            {s.status}
                        </button>
                    </div>
                </div>
                <div className="p-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                        Profile
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors">
                        Message
                    </button>
                </div>
            </div>
        ))}
      </div>

      <Card title="Shift Coverage - Today" className="mt-6">
         <div className="h-48 flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-400">
            <div className="text-center">
                <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                <p>Interactive Scheduler View</p>
                <p className="text-xs">(Integration with Google Calendar API)</p>
            </div>
         </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Staff Member">
          <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. Dr. New Doctor"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Role</label>
                      <input 
                          required
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g. Surgeon"
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Department</label>
                      <select 
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                      >
                          <option value="General">General</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="ICU">ICU</option>
                          <option value="Pharmacy">Pharmacy</option>
                      </select>
                  </div>
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input 
                      type="email"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="email@medicore.id"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Default Shift</label>
                  <select 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={formData.shift}
                      onChange={(e) => setFormData({...formData, shift: e.target.value})}
                  >
                      <option value="Morning">Morning (07:00 - 15:00)</option>
                      <option value="Day">Day (09:00 - 17:00)</option>
                      <option value="Evening">Evening (15:00 - 23:00)</option>
                      <option value="Night">Night (23:00 - 07:00)</option>
                  </select>
              </div>
              <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20">Register Staff</button>
              </div>
          </form>
      </Modal>
    </div>
  );
};

export default StaffModule;