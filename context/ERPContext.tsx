import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientEngagement, AuditTask, Staff, Transaction, EngagementStatus, TaskStatus, StaffStatus } from '../types';
import { MOCK_ENGAGEMENTS, MOCK_TASKS, MOCK_STAFF, MOCK_TRANSACTIONS } from '../constants';

interface ERPContextType {
  engagements: ClientEngagement[];
  tasks: AuditTask[];
  staff: Staff[];
  transactions: Transaction[];
  
  // Actions
  addEngagement: (engagement: Omit<ClientEngagement, 'id'>) => void;
  updateEngagementStatus: (id: string, status: EngagementStatus) => void;
  
  addTask: (task: Omit<AuditTask, 'id'>) => void;
  updateTaskProgress: (id: string, actualHours: number) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  toggleStaffStatus: (id: string) => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Fallback to Mock Data
  const [engagements, setEngagements] = useState<ClientEngagement[]>(() => {
    const saved = localStorage.getItem('erp_engagements');
    return saved ? JSON.parse(saved) : MOCK_ENGAGEMENTS;
  });

  const [tasks, setTasks] = useState<AuditTask[]>(() => {
    const saved = localStorage.getItem('erp_tasks');
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });

  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('erp_staff');
    return saved ? JSON.parse(saved) : MOCK_STAFF;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('erp_transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => localStorage.setItem('erp_engagements', JSON.stringify(engagements)), [engagements]);
  useEffect(() => localStorage.setItem('erp_tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('erp_staff', JSON.stringify(staff)), [staff]);
  useEffect(() => localStorage.setItem('erp_transactions', JSON.stringify(transactions)), [transactions]);

  // --- Actions ---

  const addEngagement = (data: Omit<ClientEngagement, 'id'>) => {
    const newItem: ClientEngagement = {
      ...data,
      id: `ENG-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
    };
    setEngagements(prev => [newItem, ...prev]);
  };

  const updateEngagementStatus = (id: string, status: EngagementStatus) => {
    setEngagements(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const addTask = (data: Omit<AuditTask, 'id'>) => {
    const newItem: AuditTask = {
      ...data,
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
    };
    setTasks(prev => [newItem, ...prev]);
  };

  const updateTaskProgress = (id: string, actualHours: number) => {
    setTasks(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, actualHours: actualHours };
      }
      return item;
    }));
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: status };
      }
      return item;
    }));
  };

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTrx: Transaction = {
      ...data,
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setTransactions(prev => [newTrx, ...prev]);
  };

  const addStaff = (data: Omit<Staff, 'id'>) => {
    const newStaff: Staff = {
      ...data,
      id: `S-${Math.floor(100 + Math.random() * 900)}`,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
    };
    setStaff(prev => [newStaff, ...prev]);
  };

  const toggleStaffStatus = (id: string) => {
    setStaff(prev => prev.map(s => {
      if (s.id === id) {
        // Cycle status
        const nextStatus = s.status === StaffStatus.OFFICE ? StaffStatus.ON_SITE : 
                           s.status === StaffStatus.ON_SITE ? StaffStatus.TRAINING : StaffStatus.OFFICE;
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <ERPContext.Provider value={{
      engagements,
      tasks,
      staff,
      transactions,
      addEngagement,
      updateEngagementStatus,
      addTask,
      updateTaskProgress,
      updateTaskStatus,
      addTransaction,
      addStaff,
      toggleStaffStatus
    }}>
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) throw new Error("useERP must be used within an ERPProvider");
  return context;
};