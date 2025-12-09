import React from 'react';
import { useERP } from '../context/ERPContext';
import { Users, FileText, CheckCircle, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { Card } from './ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA_REVENUE } from '../constants';
import { EngagementStatus, TaskStatus, StaffStatus } from '../types';

const Dashboard: React.FC = () => {
  const { engagements, tasks, transactions, staff } = useERP();

  // Real-time Calculations
  const activeEngagements = engagements.filter(p => p.status === EngagementStatus.FIELDWORK || p.status === EngagementStatus.PLANNING).length;
  const pendingTasks = tasks.filter(i => i.status === TaskStatus.IN_PROGRESS || i.status === TaskStatus.NOT_STARTED).length;
  const staffOnSite = staff.filter(s => s.status === StaffStatus.ON_SITE).length;
  
  // Calculate revenue (billed)
  const billedRevenue = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    { label: 'Active Engagements', value: activeEngagements.toString(), change: '+3', trend: 'up', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Pending WIP Tasks', value: `${pendingTasks}`, change: pendingTasks > 5 ? 'High Load' : 'Stable', trend: pendingTasks > 5 ? 'up' : 'down', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Billed Revenue', value: `Rp ${(billedRevenue / 1000000).toFixed(0)}M`, change: '+12%', trend: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Auditors On Site', value: staffOnSite.toString(), change: 'Busy Season', trend: 'neutral', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-800 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-indigo-400 opacity-20 blur-2xl"></div>
        
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome, Managing Partner 👋</h1>
            <p className="text-indigo-100 max-w-2xl text-lg">
                Your firm is currently managing <span className="font-semibold text-white">{activeEngagements} active engagements</span>. There are <span className="font-semibold text-white">{pendingTasks} audit tasks</span> pending review this week.
            </p>
            <div className="mt-6 flex gap-3">
                <button className="bg-white text-indigo-800 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-50 transition-colors">
                    Review WIP
                </button>
                <button className="bg-indigo-900/50 backdrop-blur-sm border border-indigo-400/30 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-900/70 transition-colors">
                    Engagement Report
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
        <Card title="Billing Trends (Million IDR)" className="lg:col-span-2 min-h-[400px]">
          <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CHART_DATA_REVENUE}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
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
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorIncome)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#4338ca' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Engagement Status" className="min-h-[400px]">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                    <div className="relative w-48 h-48 group">
                        {/* Decorative shadow */}
                        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        
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
                                className="text-indigo-600 drop-shadow-md"
                                strokeDasharray={`${Math.min(100, (activeEngagements/engagements.length)*100)}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                            <div className="flex justify-center mb-1 text-indigo-600">
                                <Briefcase size={24} />
                            </div>
                            <span className="text-4xl font-bold text-slate-900">{Math.round((activeEngagements/Math.max(1, engagements.length))*100)}%</span>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">Active</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-5 px-2">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 font-medium">Finalizing Phase</span>
                            <span className="font-bold text-slate-900">2 <span className="text-slate-400 font-normal">/ 5</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 font-medium">Fieldwork</span>
                            <span className="font-bold text-slate-900">{activeEngagements} <span className="text-slate-400 font-normal">/ {engagements.length}</span></span>
                        </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-400 to-violet-400 h-2.5 rounded-full" style={{ width: `${(activeEngagements/engagements.length)*100}%` }}></div>
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