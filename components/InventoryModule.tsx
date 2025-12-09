import React from 'react';
import { MOCK_INVENTORY } from '../constants';
import { StockStatus } from '../types';
import { Package, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/Card';

const InventoryModule: React.FC = () => {
  const getStockStatusBadge = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle size={16} /> In Stock
          </span>
        );
      case StockStatus.LOW_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
            <AlertTriangle size={16} /> Low Stock
          </span>
        );
      case StockStatus.OUT_OF_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-red-600 text-sm font-medium">
            <AlertCircle size={16} /> Critical
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Medical Supply Chain (M-SCM)</h2>
          <p className="text-slate-500 text-sm">Real-time inventory tracking and procurement.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
                Scan Barcode
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
                Create Purchase Order
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
                <AlertCircle size={24} />
            </div>
            <div>
                <p className="text-sm text-red-600 font-medium">Stock Alerts</p>
                <p className="text-2xl font-bold text-red-700">3 Items</p>
            </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Package size={24} />
            </div>
            <div>
                <p className="text-sm text-blue-600 font-medium">Total SKUs</p>
                <p className="text-2xl font-bold text-blue-700">1,240</p>
            </div>
        </div>
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <CheckCircle size={24} />
            </div>
            <div>
                <p className="text-sm text-green-600 font-medium">Orders Arriving</p>
                <p className="text-2xl font-bold text-green-700">5 POs</p>
            </div>
        </div>
      </div>

      <Card title="Current Inventory Levels" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm bg-slate-50/50">
                <th className="p-4 font-medium">Item Code</th>
                <th className="p-4 font-medium">Item Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Available Qty</th>
                <th className="p-4 font-medium">Expiry Date</th>
                <th className="p-4 font-medium">Supplier</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 font-mono text-sm text-slate-500">{item.id}</td>
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4 font-medium">
                    {item.quantity} <span className="text-slate-400 text-sm font-normal">{item.unit}</span>
                  </td>
                  <td className="p-4 text-slate-600">{item.expiryDate}</td>
                  <td className="p-4 text-slate-600">{item.supplier}</td>
                  <td className="p-4">
                    {getStockStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default InventoryModule;