import React from 'react';
import { Bell, Menu, Search, UserCircle } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
        >
          <Menu size={24} />
        </button>
        {/* On mobile show title here if sidebar hidden, on desktop hidden or breadcrumb */}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Global search..." 
            className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Dr. Admin</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
               <UserCircle size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;