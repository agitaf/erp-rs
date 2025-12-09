import React from 'react';

// Enums for status tracking
export enum EngagementStatus {
  PLANNING = 'Planning',
  FIELDWORK = 'Fieldwork',
  REVIEW = 'Review',
  FINALIZED = 'Finalized'
}

export enum StaffStatus {
  ON_SITE = 'Client Site',
  OFFICE = 'Office',
  TRAINING = 'Training'
}

export enum TaskStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REVIEWED = 'Reviewed'
}

// Entity Interfaces
export interface ClientEngagement {
  id: string;
  clientName: string;
  industry: string;
  serviceType: string; // e.g., General Audit, Tax, Advisory
  fiscalYear: string;
  status: EngagementStatus;
  partnerInCharge: string;
  deadline: string;
}

export interface AuditTask {
  id: string;
  taskName: string; // e.g., Cash & Bank, Revenue Cycle
  category: string;
  budgetedHours: number;
  actualHours: number;
  assignedTo: string; // Auditor Name
  status: TaskStatus;
  dueDate: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string; // Partner, Manager, Senior, Associate
  specialization: string; // Banking, Manufacturing, etc.
  email: string;
  status: StaffStatus;
  currentEngagement: string;
  avatarUrl: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  status: 'Billed' | 'Unbilled' | 'Paid' | 'Pending';
}

export interface KPI {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}