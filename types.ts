import React from 'react';

// Enums for status tracking
export enum PatientStatus {
  ADMITTED = 'In-Patient',
  DISCHARGED = 'Discharged',
  OUTPATIENT = 'Out-Patient',
  EMERGENCY = 'Emergency'
}

export enum StaffStatus {
  ON_DUTY = 'On Duty',
  OFF_DUTY = 'Off Duty',
  ON_LEAVE = 'On Leave'
}

export enum StockStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

// Entity Interfaces
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  admissionDate: string;
  status: PatientStatus;
  doctorAssigned: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minLevel: number;
  expiryDate: string;
  status: StockStatus;
  supplier: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: StaffStatus;
  shift: string;
  avatarUrl: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  status: 'Completed' | 'Pending';
}

export interface KPI {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}