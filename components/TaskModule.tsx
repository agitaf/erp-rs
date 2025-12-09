import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { TaskStatus } from '../types';
import { ClipboardList, CheckCircle, Clock, AlertCircle, ScanLine, FileText, ArrowRight, Plus, Minus, Briefcase } from 'lucide-react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';

const TaskModule: React.FC = () => {
  const { tasks, updateTaskProgress, updateTaskStatus, addTask } = useERP();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    category: 'Assets',
    budgetedHours: '',
    actualHours: '0',
    assignedTo: '',
    dueDate: '',
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseInt(formData.budgetedHours) || 0;
    
    addTask({
      taskName: formData.taskName,
      category: formData.category,
      budgetedHours: budget,
      actualHours: 0,
      assignedTo: formData.assignedTo,
      status: TaskStatus.NOT_STARTED,
      dueDate: formData.dueDate
    });

    setIsModalOpen(false);
    setFormData({ taskName: '', category: 'Assets', budgetedHours: '', actualHours: '0', assignedTo: '', dueDate: '' });
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return (
          <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <CheckCircle size={14} /> Completed
          </span>
        );
      case TaskStatus.REVIEWED:
        return (
          <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <CheckCircle size={14} /> Reviewed
          </span>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <Clock size={14} /> In Progress
          </span>
        );
      case TaskStatus.NOT_STARTED:
        return (
           <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <AlertCircle size={14} /> Pending
          </span>
        );
    }
  };

  const calculateProgress = (actual: number, budget: number) => {
     if(budget === 0) return 0;
     return Math.min(100, (actual / budget) * 100);
  };

  const getProgressColor = (percent: number) => {
      if (percent > 100) return 'bg-rose-500'; // Overbudget
      if (percent > 75) return 'bg-amber-500';
      return 'bg-emerald-500';
  }

  const wipCount = tasks.filter(i => i.status === TaskStatus.IN_PROGRESS).length;
  const completedCount = tasks.filter(i => i.status === TaskStatus.COMPLETED || i.status === TaskStatus.REVIEWED).length;

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Work In Progress (WIP)</h2>
          <p className="text-slate-500 text-sm mt-1">Track audit procedures, tasks, and budgeted hours.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 font-medium"
            >
                <Plus size={18} />
                <span>Add Task</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-amber-600 font-bold uppercase tracking-wider">Active Tasks</p>
                <p className="text-3xl font-bold text-slate-900">{wipCount} <span className="text-lg text-slate-400 font-normal">Pending</span></p>
            </div>
            <div className="p-4 bg-white rounded-xl text-amber-500 shadow-sm group-hover:scale-110 transition-transform">
                <Clock size={28} />
            </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Completed</p>
                <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
            </div>
            <div className="p-4 bg-white rounded-xl text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                <ClipboardList size={28} />
            </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">Total Tasks</p>
                <p className="text-3xl font-bold text-slate-900">{tasks.length}</p>
            </div>
            <div className="p-4 bg-white rounded-xl text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight size={28} />
            </div>
        </div>
      </div>

      <Card title="Task Tracking & Budgeting" className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80">
                <th className="p-5 font-semibold">Task Name</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold w-1/4">Budget vs Actual</th>
                <th className="p-5 font-semibold">Hours Log</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="p-5">
                    <div className="font-semibold text-slate-900">{task.taskName}</div>
                    <div className="font-mono text-xs text-slate-400 mt-0.5">{task.id} • {task.assignedTo}</div>
                  </td>
                  <td className="p-5">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          {task.category}
                      </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-slate-700">{task.actualHours} <span className="text-slate-400 font-normal text-xs">/ {task.budgetedHours} hrs</span></span>
                        <span className="text-xs text-slate-400">{Math.round((task.actualHours/task.budgetedHours)*100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor((task.actualHours/task.budgetedHours)*100)}`} 
                            style={{ width: `${calculateProgress(task.actualHours, task.budgetedHours)}%` }}
                        ></div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => updateTaskProgress(task.id, Math.max(0, task.actualHours - 1))}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <button 
                             onClick={() => updateTaskProgress(task.id, task.actualHours + 1)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                  </td>
                  <td className="p-5">
                     <button 
                      onClick={() => {
                          const nextStatus = task.status === TaskStatus.NOT_STARTED ? TaskStatus.IN_PROGRESS :
                                             task.status === TaskStatus.IN_PROGRESS ? TaskStatus.COMPLETED : 
                                             task.status === TaskStatus.COMPLETED ? TaskStatus.REVIEWED : TaskStatus.NOT_STARTED;
                          updateTaskStatus(task.id, nextStatus);
                      }}
                    >
                        {getStatusBadge(task.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign New Audit Task">
          <form onSubmit={handleAddTask} className="space-y-4">
              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Task Name / Procedure</label>
                  <input 
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. Bank Confirmation"
                      value={formData.taskName}
                      onChange={(e) => setFormData({...formData, taskName: e.target.value})}
                  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Audit Area</label>
                      <select 
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                          <option value="Assets">Assets</option>
                          <option value="Liabilities">Liabilities</option>
                          <option value="Revenue">Revenue</option>
                          <option value="Expenses">Expenses</option>
                          <option value="Tax">Tax</option>
                      </select>
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Assigned To</label>
                      <input 
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="e.g. Andi Saputra"
                          value={formData.assignedTo}
                          onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      />
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Budgeted Hours</label>
                      <input 
                          type="number"
                          required
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          value={formData.budgetedHours}
                          onChange={(e) => setFormData({...formData, budgetedHours: e.target.value})}
                      />
                  </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Due Date</label>
                      <input 
                          type="date"
                          required
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      />
                  </div>
              </div>
              <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Assign Task</button>
              </div>
          </form>
      </Modal>
    </div>
  );
};

export default TaskModule;