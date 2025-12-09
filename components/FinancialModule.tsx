import React from 'react';
import { MOCK_TRANSACTIONS, CHART_DATA_REVENUE } from '../constants';
import { Card } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, FileText } from 'lucide-react';

const FinancialModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial & Billing</h2>
          <p className="text-slate-500 text-sm">Revenue monitoring, billing, and accounting integration.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Revenue vs Expenses (Last 7 Days)" className="h-96">
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
                <Bar dataKey="income" fill="#3b82f6" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>

        <Card title="Recent Transactions" action={<button className="text-sm text-blue-600 font-medium">View All</button>}>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {MOCK_TRANSACTIONS.map(trx => (
                    <div key={trx.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors">
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
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${trx.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-600'}`}>
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
                <p className="text-sm text-slate-500">Unpaid Invoices</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <FileText size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500">Insurance Claims</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Rp 450.2M</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <DollarSign size={24} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialModule;