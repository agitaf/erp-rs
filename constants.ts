import { Patient, InventoryItem, Staff, Transaction, PatientStatus, StockStatus, StaffStatus } from './types';

export const APP_NAME = "MediCore ERP";

// Mock Patients (PRM)
export const MOCK_PATIENTS: Patient[] = [
  { id: 'P-1001', name: 'Budi Santoso', age: 45, gender: 'M', diagnosis: 'Hypertension', admissionDate: '2023-10-24', status: PatientStatus.ADMITTED, doctorAssigned: 'Dr. Sarah Lim' },
  { id: 'P-1002', name: 'Siti Aminah', age: 32, gender: 'F', diagnosis: 'Dengue Fever', admissionDate: '2023-10-25', status: PatientStatus.EMERGENCY, doctorAssigned: 'Dr. John Doe' },
  { id: 'P-1003', name: 'Rudi Hartono', age: 58, gender: 'M', diagnosis: 'Post-Op Recovery', admissionDate: '2023-10-20', status: PatientStatus.ADMITTED, doctorAssigned: 'Dr. Sarah Lim' },
  { id: 'P-1004', name: 'Linda Kusuma', age: 28, gender: 'F', diagnosis: 'Migraine', admissionDate: '2023-10-26', status: PatientStatus.OUTPATIENT, doctorAssigned: 'Dr. Emily Chen' },
  { id: 'P-1005', name: 'Ahmad Dahlan', age: 65, gender: 'M', diagnosis: 'Diabetes T2', admissionDate: '2023-10-22', status: PatientStatus.DISCHARGED, doctorAssigned: 'Dr. John Doe' },
];

// Mock Inventory (M-SCM)
export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-001', name: 'Paracetamol 500mg', category: 'Medicine', quantity: 5000, unit: 'Tabs', minLevel: 1000, expiryDate: '2025-12-01', status: StockStatus.IN_STOCK, supplier: 'Kimia Farma' },
  { id: 'INV-002', name: 'Amoxicillin 500mg', category: 'Medicine', quantity: 120, unit: 'Tabs', minLevel: 200, expiryDate: '2024-05-15', status: StockStatus.LOW_STOCK, supplier: 'BioFarma' },
  { id: 'INV-003', name: 'Surgical Mask N95', category: 'Supplies', quantity: 45, unit: 'Box', minLevel: 50, expiryDate: '2026-01-01', status: StockStatus.LOW_STOCK, supplier: '3M Health' },
  { id: 'INV-004', name: 'Saline Solution 500ml', category: 'Fluids', quantity: 800, unit: 'Bottles', minLevel: 100, expiryDate: '2024-11-20', status: StockStatus.IN_STOCK, supplier: 'Otsuka' },
  { id: 'INV-005', name: 'Insulin Glargine', category: 'Medicine', quantity: 0, unit: 'Vials', minLevel: 20, expiryDate: '2024-08-10', status: StockStatus.OUT_OF_STOCK, supplier: 'Sanofi' },
];

// Mock Staff (HCM)
export const MOCK_STAFF: Staff[] = [
  { id: 'S-001', name: 'Dr. Sarah Lim', role: 'Chief Surgeon', department: 'Surgery', email: 'sarah.lim@medicore.id', status: StaffStatus.ON_DUTY, shift: 'Morning', avatarUrl: 'https://picsum.photos/100/100?random=1' },
  { id: 'S-002', name: 'Ns. Bayu Pradana', role: 'Senior Nurse', department: 'ICU', email: 'bayu.p@medicore.id', status: StaffStatus.ON_DUTY, shift: 'Morning', avatarUrl: 'https://picsum.photos/100/100?random=2' },
  { id: 'S-003', name: 'Dr. Emily Chen', role: 'Pediatrician', department: 'Pediatrics', email: 'emily.c@medicore.id', status: StaffStatus.OFF_DUTY, shift: 'Night', avatarUrl: 'https://picsum.photos/100/100?random=3' },
  { id: 'S-004', name: 'Dr. John Doe', role: 'General Practitioner', department: 'General', email: 'john.d@medicore.id', status: StaffStatus.ON_LEAVE, shift: 'Day', avatarUrl: 'https://picsum.photos/100/100?random=4' },
];

// Mock Financials
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-8821', date: '2023-10-26', description: 'In-Patient Billing - P-1005', amount: 12500000, type: 'Income', category: 'Patient Services', status: 'Completed' },
  { id: 'TRX-8822', date: '2023-10-26', description: 'Vendor Payment - BioFarma', amount: 4500000, type: 'Expense', category: 'Procurement', status: 'Pending' },
  { id: 'TRX-8823', date: '2023-10-25', description: 'Consultation Fee - P-1004', amount: 350000, type: 'Income', category: 'Out-Patient', status: 'Completed' },
  { id: 'TRX-8824', date: '2023-10-25', description: 'Electricity Bill Oct', amount: 8500000, type: 'Expense', category: 'Utilities', status: 'Completed' },
];

export const CHART_DATA_REVENUE = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];