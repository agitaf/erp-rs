import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { CHART_DATA_REVENUE } from '../constants';
import { Card } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, FileText, Plus } from 'lucide-react';
import { Modal } from './ui/Modal';

const FinancialModule: React.FC = () => {
  const { transactions, addTransaction } = useERP();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      description: '',
      amount: '',
      type: 'Income' as 'Income' | 'Expense',
      category: 'General'
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.description || !formData.amount) return;

    addTransaction({
        description: formData.description,
        amount: parseInt(formData.amount),
        type: formData.type,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        status: 'Unbilled'
    });

    setIsModalOpen(false);
    setFormData({ description: '', amount: '', type: 'Income', category: 'General' });
  };

  const totalRevenue = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Billing & Expenses</h2>
          <p className="text-slate-500 text-sm">Manage client invoices, audit fees, and operational expenses.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-slate-900/20"
        >
            <Plus size={16} /> Record Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Monthly Revenue vs Expenses (Million IDR)" className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={CHART_DATA_REVENUE}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="income" fill="#4f46e5" name="Billing" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>

        <Card title="Recent Invoices & Expenses" action={<button className="text-sm text-indigo-600 font-medium">View All</button>}>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {transactions.length === 0 && <p className="text-slate-400 text-center py-4">No transactions yet.</p>}
                {transactions.map(trx => (
                    <div key={trx.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors animate-fade-in">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${trx.type === 'Income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {trx.type === 'Income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{trx.description}</p>
                                <p className="text-xs text-slate-500">{trx.date} • {trx.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-bold ${trx.type === 'Income' ? 'text-green-600' : 'text-slate-900'}`}>
                                {trx.type === 'Income' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                            </p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${trx.status === 'Paid' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-600'}`}>
                                {trx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Gross Margin</p>
                <h3 className={`text-2xl font-bold mt-1 ${(totalRevenue - totalExpense) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    Rp {(totalRevenue - totalExpense).toLocaleString('id-ID')}
                </h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <DollarSign size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Pending Invoices</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">4</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <FileText size={24} />
            </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Transaction">
        <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <input 
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Audit Fee Term 2"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Amount (Rp)</label>
                    <input 
                        type="number"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <select
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value as 'Income' | 'Expense'})}
                    >
                        <option value="Income">Income (Bill)</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <input 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Audit Service, Tax, Travel"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
            </div>
            <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-lg">Save Record</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default FinancialModule;