import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, InventoryItem, Staff, Transaction, PatientStatus, StockStatus, StaffStatus } from '../types';
import { MOCK_PATIENTS, MOCK_INVENTORY, MOCK_STAFF, MOCK_TRANSACTIONS } from '../constants';

interface ERPContextType {
  patients: Patient[];
  inventory: InventoryItem[];
  staff: Staff[];
  transactions: Transaction[];
  
  // Actions
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatientStatus: (id: string, status: PatientStatus) => void;
  
  updateStockLevel: (id: string, change: number) => void;
  
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  
  toggleStaffStatus: (id: string) => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Fallback to Mock Data
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('erp_patients');
    return saved ? JSON.parse(saved) : MOCK_PATIENTS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('erp_inventory');
    return saved ? JSON.parse(saved) : MOCK_INVENTORY;
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
  useEffect(() => localStorage.setItem('erp_patients', JSON.stringify(patients)), [patients]);
  useEffect(() => localStorage.setItem('erp_inventory', JSON.stringify(inventory)), [inventory]);
  useEffect(() => localStorage.setItem('erp_staff', JSON.stringify(staff)), [staff]);
  useEffect(() => localStorage.setItem('erp_transactions', JSON.stringify(transactions)), [transactions]);

  // --- Actions ---

  const addPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: `P-${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ID
    };
    setPatients(prev => [newPatient, ...prev]);
  };

  const updatePatientStatus = (id: string, status: PatientStatus) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateStockLevel = (id: string, change: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        let newStatus = StockStatus.IN_STOCK;
        if (newQuantity === 0) newStatus = StockStatus.OUT_OF_STOCK;
        else if (newQuantity <= item.minLevel) newStatus = StockStatus.LOW_STOCK;
        
        return { ...item, quantity: newQuantity, status: newStatus };
      }
      return item;
    }));
  };

  const addTransaction = (trxData: Omit<Transaction, 'id'>) => {
    const newTrx: Transaction = {
      ...trxData,
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`
    };
    setTransactions(prev => [newTrx, ...prev]);
  };

  const toggleStaffStatus = (id: string) => {
    setStaff(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === StaffStatus.ON_DUTY ? StaffStatus.OFF_DUTY : StaffStatus.ON_DUTY;
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <ERPContext.Provider value={{
      patients,
      inventory,
      staff,
      transactions,
      addPatient,
      updatePatientStatus,
      updateStockLevel,
      addTransaction,
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