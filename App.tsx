import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientModule from './components/ClientModule';
import TaskModule from './components/TaskModule';
import FinancialModule from './components/FinancialModule';
import StaffModule from './components/StaffModule';
import { ERPProvider } from './context/ERPContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientModule />;
      case 'tasks':
        return <TaskModule />;
      case 'financial':
        return <FinancialModule />;
      case 'staff':
        return <StaffModule />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch(activeTab) {
        case 'dashboard': return 'Executive Dashboard';
        case 'clients': return 'Client & Engagement Management';
        case 'tasks': return 'WIP & Audit Tasks';
        case 'financial': return 'Billing & Financials';
        case 'staff': return 'Resource Scheduling';
        default: return 'AuditCore ERP';
    }
  }

  return (
    <ERPProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 flex flex-col min-w-0">
          <Header 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              title={getPageTitle()}
          />
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </ERPProvider>
  );
};

export default App;