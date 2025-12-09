import React from 'react';
import { LayoutDashboard, Users, Briefcase, CreditCard, UserCheck, LogOut, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients & Engagements', icon: Briefcase },
    { id: 'tasks', label: 'Work In Progress (WIP)', icon: ShieldCheck },
    { id: 'financial', label: 'Billing & Expenses', icon: CreditCard },
    { id: 'staff', label: 'Auditor Scheduling', icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 text-white transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 shadow-2xl flex flex-col
      `}>
        {/* Background Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900 pointer-events-none" />

        <div className="relative flex flex-col h-full z-10">
          {/* Logo Area */}
          <div className="p-8 pb-6 flex items-center gap-4">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <ShieldCheck size={26} className="text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white">{APP_NAME}</h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Audit Firm System</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Menu</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
                  ${activeTab === item.id 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {/* Active State Background Gradient */}
                {activeTab === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-100" />
                )}
                
                <item.icon size={20} className={`relative z-10 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="relative z-10">{item.label}</span>
                
                {activeTab === item.id && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full shadow-glow" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer Area */}
          <div className="p-4 mx-4 mb-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                    HG
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">Hendra Gunawan</p>
                    <p className="text-xs text-slate-400 truncate">Managing Partner</p>
                </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-red-500/20">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;