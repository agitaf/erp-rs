import React from 'react';
import { MOCK_STAFF } from '../constants';
import { StaffStatus } from '../types';
import { Card } from './ui/Card';
import { Calendar, Clock, MapPin } from 'lucide-react';

const StaffModule: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Human Capital (HCM)</h2>
          <p className="text-slate-500 text-sm">Staff scheduling, performance, and resource allocation.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm">
            Manage Shifts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_STAFF.map((staff) => (
            <div key={staff.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 text-center border-b border-slate-50">
                    <img 
                        src={staff.avatarUrl} 
                        alt={staff.name} 
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow-sm"
                    />
                    <h3 className="font-bold text-slate-900">{staff.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-1">{staff.role}</p>
                    <p className="text-xs text-slate-500">{staff.department}</p>
                </div>
                <div className="p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2">
                            <Clock size={14} /> Shift
                        </span>
                        <span className="font-medium text-slate-700">{staff.shift}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2">
                            <MapPin size={14} /> Status
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                            ${staff.status === StaffStatus.ON_DUTY ? 'bg-green-100 text-green-700' : 
                              staff.status === StaffStatus.OFF_DUTY ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-600'}`}>
                            {staff.status}
                        </span>
                    </div>
                </div>
                <div className="p-3 flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                        View Profile
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors">
                        Message
                    </button>
                </div>
            </div>
        ))}
      </div>

      <Card title="Shift Coverage - Today" className="mt-6">
         {/* Placeholder for a Scheduler UI */}
         <div className="h-48 flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-400">
            <div className="text-center">
                <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                <p>Interactive Scheduler View</p>
                <p className="text-xs">(Integration with Google Calendar API)</p>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default StaffModule;