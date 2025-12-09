import { ClientEngagement, AuditTask, Staff, Transaction, EngagementStatus, TaskStatus, StaffStatus } from './types';

export const APP_NAME = "AuditCore ERP";

// Mock Clients (CRM) - Realistically diverse portfolio
export const MOCK_ENGAGEMENTS: ClientEngagement[] = [
  { id: 'ENG-2024-001', clientName: 'PT Mega Konstruksi Tbk', industry: 'Construction & Real Estate', serviceType: 'General Audit', fiscalYear: '2023', status: EngagementStatus.FIELDWORK, partnerInCharge: 'Hendra Gunawan, CPA', deadline: '2024-03-31' },
  { id: 'ENG-2024-002', clientName: 'CV Sumber Makmur Sejahtera', industry: 'Retail & Distribution', serviceType: 'Tax Compliance', fiscalYear: '2023', status: EngagementStatus.PLANNING, partnerInCharge: 'Siti Rahma, CPA', deadline: '2024-04-30' },
  { id: 'ENG-2024-003', clientName: 'Global Tech Solutions Indonesia', industry: 'Technology', serviceType: 'Internal Control Review', fiscalYear: '2023', status: EngagementStatus.REVIEW, partnerInCharge: 'Hendra Gunawan, CPA', deadline: '2024-02-15' },
  { id: 'ENG-2024-004', clientName: 'Yayasan Harapan Bangsa', industry: 'Non-Profit', serviceType: 'General Audit', fiscalYear: '2023', status: EngagementStatus.FINALIZED, partnerInCharge: 'Budi Santoso, CPA', deadline: '2024-01-31' },
  { id: 'ENG-2024-005', clientName: 'PT Bank Finansial Asia', industry: 'Banking', serviceType: 'IT Audit Advisory', fiscalYear: '2023', status: EngagementStatus.FIELDWORK, partnerInCharge: 'Siti Rahma, CPA', deadline: '2024-03-15' },
];

// Mock Tasks/WIP (WIP Management) - Realistic Audit Procedures & Hours
export const MOCK_TASKS: AuditTask[] = [
  { id: 'TSK-101', taskName: 'Cash Opname & Bank Confirmation', category: 'Assets', budgetedHours: 32, actualHours: 28, assignedTo: 'Andi Saputra', status: TaskStatus.REVIEWED, dueDate: '2024-02-01' },
  { id: 'TSK-102', taskName: 'Revenue Cut-off Testing', category: 'Revenue', budgetedHours: 65, actualHours: 45, assignedTo: 'Dewi Lestari', status: TaskStatus.IN_PROGRESS, dueDate: '2024-02-20' },
  { id: 'TSK-103', taskName: 'Inventory Stock Count (Site A)', category: 'Assets', budgetedHours: 120, actualHours: 128, assignedTo: 'Team Alpha', status: TaskStatus.COMPLETED, dueDate: '2024-01-15' },
  { id: 'TSK-104', taskName: 'Payroll Test of Controls', category: 'Expenses', budgetedHours: 40, actualHours: 5, assignedTo: 'Rudi Hartono', status: TaskStatus.NOT_STARTED, dueDate: '2024-03-01' },
  { id: 'TSK-105', taskName: 'CIT (PPh 29) Reconciliation', category: 'Tax', budgetedHours: 55, actualHours: 50, assignedTo: 'Dewi Lestari', status: TaskStatus.IN_PROGRESS, dueDate: '2024-02-28' },
  { id: 'TSK-106', taskName: 'Fixed Asset Physical Inspection', category: 'Assets', budgetedHours: 48, actualHours: 0, assignedTo: 'Andi Saputra', status: TaskStatus.NOT_STARTED, dueDate: '2024-02-25' },
];

// Mock Staff (HCM)
export const MOCK_STAFF: Staff[] = [
  { id: 'S-001', name: 'Hendra Gunawan, CPA', role: 'Audit Partner', specialization: 'Construction & Mining', email: 'hendra@auditcore.id', status: StaffStatus.OFFICE, currentEngagement: 'Supervising Multiple', avatarUrl: 'https://ui-avatars.com/api/?name=Hendra+Gunawan&background=0D8ABC&color=fff' },
  { id: 'S-002', name: 'Siti Rahma, CPA', role: 'Audit Manager', specialization: 'Banking & Finserv', email: 'siti@auditcore.id', status: StaffStatus.ON_SITE, currentEngagement: 'PT Bank Finansial Asia', avatarUrl: 'https://ui-avatars.com/api/?name=Siti+Rahma&background=random' },
  { id: 'S-003', name: 'Andi Saputra', role: 'Senior Auditor', specialization: 'Manufacturing', email: 'andi@auditcore.id', status: StaffStatus.ON_SITE, currentEngagement: 'PT Mega Konstruksi', avatarUrl: 'https://ui-avatars.com/api/?name=Andi+Saputra&background=random' },
  { id: 'S-004', name: 'Dewi Lestari', role: 'Junior Auditor', specialization: 'Taxation', email: 'dewi@auditcore.id', status: StaffStatus.TRAINING, currentEngagement: 'In-House Training', avatarUrl: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=random' },
  { id: 'S-005', name: 'Budi Santoso, CPA', role: 'Quality Control Partner', specialization: 'Compliance', email: 'budi@auditcore.id', status: StaffStatus.OFFICE, currentEngagement: 'Final Review', avatarUrl: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random' },
];

// Mock Financials - Realistic Amounts for Mid-Tier Firm
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'INV-2024-001', date: '2024-01-26', description: 'Audit Fee Term 1 (30%) - PT Mega Konstruksi', amount: 450000000, type: 'Income', category: 'Audit Services', status: 'Paid' },
  { id: 'EXP-2024-001', date: '2024-01-25', description: 'Flight & Accommodation (Stock Opname - Kalimantan)', amount: 28500000, type: 'Expense', category: 'Travel', status: 'Paid' },
  { id: 'INV-2024-002', date: '2024-01-24', description: 'Tax Advisory Retainer - CV Sumber Makmur', amount: 35000000, type: 'Income', category: 'Tax Services', status: 'Unbilled' },
  { id: 'EXP-2024-002', date: '2024-01-20', description: 'Audit Software License (Annual Renewal)', amount: 125000000, type: 'Expense', category: 'IT Overhead', status: 'Pending' },
  { id: 'INV-2024-003', date: '2024-01-15', description: 'Final Billing - Yayasan Harapan Bangsa', amount: 85000000, type: 'Income', category: 'Audit Services', status: 'Paid' },
];

// Chart Data - Reflecting Peak Season (Jan-Apr) Revenue in Millions
export const CHART_DATA_REVENUE = [
  { name: 'Jan', income: 850, expense: 320 }, // Early billing, high travel cost
  { name: 'Feb', income: 1200, expense: 450 }, // Peak fieldwork
  { name: 'Mar', income: 1500, expense: 500 }, // Peak billing & overtime
  { name: 'Apr', income: 1850, expense: 550 }, // Deadline billing
  { name: 'May', income: 600, expense: 280 }, // Post-season dip
  { name: 'Jun', income: 450, expense: 250 }, // Normal operations
  { name: 'Jul', income: 520, expense: 260 }, // Interim audits start
];