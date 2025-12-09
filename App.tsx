import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PatientModule from './components/PatientModule';
import InventoryModule from './components/InventoryModule';
import FinancialModule from './components/FinancialModule';
import StaffModule from './components/StaffModule';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientModule />;
      case 'inventory':
        return <InventoryModule />;
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
        case 'dashboard': return 'Dashboard';
        case 'patients': return 'Patient Management';
        case 'inventory': return 'Inventory & Supply Chain';
        case 'financial': return 'Financials';
        case 'staff': return 'Human Capital';
        default: return 'MediCore ERP';
    }
  }

  return (
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
  );
};

export default App;