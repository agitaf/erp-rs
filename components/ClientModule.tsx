import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { EngagementStatus } from '../types';
import { Search, Plus, Filter, FileText, Briefcase, CheckCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';

const ClientModule: React.FC = () => {
  const { engagements, addEngagement, updateEngagementStatus } = useERP();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    serviceType: 'General Audit',
    fiscalYear: '2023',
    partnerInCharge: 'Hendra Gunawan, CPA',
    deadline: '',
    status: EngagementStatus.PLANNING
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.clientName || !formData.serviceType) return;

    addEngagement({
      clientName: formData.clientName,
      industry: formData.industry,
      serviceType: formData.serviceType,
      fiscalYear: formData.fiscalYear,
      partnerInCharge: formData.partnerInCharge,
      deadline: formData.deadline,
      status: formData.status
    });

    setIsModalOpen(false);
    setFormData({ clientName: '', industry: '', serviceType: 'General Audit', fiscalYear: '2023', partnerInCharge: 'Hendra Gunawan, CPA', deadline: '', status: EngagementStatus.PLANNING });
  };

  const getStatusColor = (status: EngagementStatus) => {
    switch (status) {
      case EngagementStatus.PLANNING: return 'bg-slate-50 text-slate-700 border-slate-100';
      case EngagementStatus.FIELDWORK: return 'bg-blue-50 text-blue-700 border-blue-100';
      case EngagementStatus.REVIEW: return 'bg-amber-50 text-amber-700 border-amber-100';
      case EngagementStatus.FINALIZED: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const filteredEngagements = engagements.filter(p => 
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Engagements</h2>
          <p className="text-slate-500 text-sm mt-1">Manage audits, reviews, and advisory projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <Plus size={18} />
          <span className="font-semibold">New Engagement</span>
        </button>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search client, ID or service..." 
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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
                <th className="p-5 font-semibold">Client Name</th>
                <th className="p-5 font-semibold">Service</th>
                <th className="p-5 font-semibold">Partner</th>
                <th className="p-5 font-semibold">Deadline</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEngagements.map((eng) => (
                <tr key={eng.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 flex items-center justify-center text-sm font-bold shadow-inner">
                            {getInitials(eng.clientName)}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900">{eng.clientName}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{eng.id} • {eng.industry}</div>
                        </div>
                    </div>
                  </td>
                  <td className="p-5">
                     <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {eng.serviceType} <span className="text-slate-400 font-normal">({eng.fiscalYear})</span>
                     </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-slate-600">
                         <Briefcase size={14} className="text-slate-400" />
                         {eng.partnerInCharge}
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 text-sm">
                    {eng.deadline}
                  </td>
                  <td className="p-5">
                    <button 
                      onClick={() => updateEngagementStatus(eng.id, EngagementStatus.FINALIZED)}
                      title="Click to Finalize"
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(eng.status)} hover:opacity-80 transition-opacity`}
                    >
                      {eng.status}
                    </button>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors" title="View Details">
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Client Engagement">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Client Name</label>
            <input 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. PT Maju Jaya"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Industry</label>
              <input 
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="e.g. Manufacturing"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Service Type</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.serviceType}
                onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
              >
                <option value="General Audit">General Audit</option>
                <option value="Tax Compliance">Tax Compliance</option>
                <option value="Advisory">Advisory</option>
                <option value="Internal Audit">Internal Audit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Fiscal Year</label>
              <input 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.fiscalYear}
                onChange={(e) => setFormData({...formData, fiscalYear: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Deadline</label>
              <input 
                type="date"
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Partner in Charge</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.partnerInCharge}
                onChange={(e) => setFormData({...formData, partnerInCharge: e.target.value})}
              >
                <option value="Hendra Gunawan, CPA">Hendra Gunawan, CPA</option>
                <option value="Siti Rahma, CPA">Siti Rahma, CPA</option>
                <option value="Budi Santoso, CPA">Budi Santoso, CPA</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Current Phase</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as EngagementStatus})}
              >
                <option value={EngagementStatus.PLANNING}>Planning</option>
                <option value={EngagementStatus.FIELDWORK}>Fieldwork</option>
                <option value={EngagementStatus.REVIEW}>Review</option>
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
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20"
            >
              Create Engagement
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientModule;