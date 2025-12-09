import React from 'react';
import { useERP } from '../context/ERPContext';
import { Users, AlertTriangle, Activity, DollarSign, ArrowUpRight, ArrowDownRight, BedDouble } from 'lucide-react';
import { Card } from './ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA_REVENUE } from '../constants';
import { PatientStatus, StockStatus, StaffStatus } from '../types';

const Dashboard: React.FC = () => {
  const { patients, inventory, transactions, staff } = useERP();

  // Real-time Calculations
  const activePatients = patients.filter(p => p.status === PatientStatus.ADMITTED || p.status === PatientStatus.EMERGENCY).length;
  const criticalStock = inventory.filter(i => i.status === StockStatus.LOW_STOCK || i.status === StockStatus.OUT_OF_STOCK).length;
  const staffOnDuty = staff.filter(s => s.status === StaffStatus.ON_DUTY).length;
  
  // Calculate daily revenue (simplified for demo)
  const today = new Date().toISOString().split('T')[0];
  const dailyRevenue = transactions
    .filter(t => t.date === today && t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    { label: 'Active Patients', value: activePatients.toString(), change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Stock Alerts', value: `${criticalStock} Items`, change: criticalStock > 0 ? 'Action Needed' : 'Good', trend: criticalStock > 0 ? 'down' : 'up', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Daily Revenue', value: `Rp ${(dailyRevenue / 1000000).toFixed(1)}M`, change: '+8%', trend: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Staff On Duty', value: staffOnDuty.toString(), change: 'Stable', trend: 'neutral', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
        
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Good Morning, Dr. Admin 👋</h1>
            <p className="text-blue-100 max-w-2xl text-lg">
                Hospital operations are running smoothly. You have <span className="font-semibold text-white">{activePatients} active patients</span> and <span className="font-semibold text-white">{criticalStock} supply alerts</span> to review today.
            </p>
            <div className="mt-6 flex gap-3">
                <button className="bg-white text-blue-700 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-50 transition-colors">
                    View Schedule
                </button>
                <button className="bg-blue-800/50 backdrop-blur-sm border border-blue-400/30 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800/70 transition-colors">
                    Generate Reports
                </button>
            </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white p-6 rounded-2xl border ${stat.border} shadow-sm hover:shadow-lg transition-all duration-300 group`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : stat.trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                {stat.trend === 'up' && <ArrowUpRight size={12} />}
                {stat.trend === 'down' && <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Revenue Trends" className="lg:col-span-2 min-h-[400px]">
          <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CHART_DATA_REVENUE}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    tickFormatter={(value) => `${value/1000}k`}
                />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorIncome)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Ward Status" className="min-h-[400px]">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                    <div className="relative w-48 h-48 group">
                        {/* Decorative shadow */}
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        
                        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                className="text-blue-600 drop-shadow-md"
                                strokeDasharray={`${Math.min(100, (activePatients/100)*100)}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                            <div className="flex justify-center mb-1 text-blue-600">
                                <BedDouble size={24} />
                            </div>
                            <span className="text-4xl font-bold text-slate-900">{Math.round((activePatients/100)*100)}%</span>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">Occupied</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-5 px-2">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 font-medium">VIP Rooms</span>
                            <span className="font-bold text-slate-900">8 <span className="text-slate-400 font-normal">/ 10</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 font-medium">General Ward</span>
                            <span className="font-bold text-slate-900">{activePatients} <span className="text-slate-400 font-normal">/ 100</span></span>
                        </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2.5 rounded-full" style={{ width: `${(activePatients/100)*100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;