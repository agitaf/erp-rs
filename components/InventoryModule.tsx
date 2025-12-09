import React from 'react';
import { MOCK_INVENTORY } from '../constants';
import { StockStatus } from '../types';
import { Package, AlertTriangle, CheckCircle, AlertCircle, ScanBarcode, ShoppingCart, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';

const InventoryModule: React.FC = () => {
  const getStockStatusBadge = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <CheckCircle size={14} /> Healthy
          </span>
        );
      case StockStatus.LOW_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <AlertTriangle size={14} /> Low Stock
          </span>
        );
      case StockStatus.OUT_OF_STOCK:
        return (
          <span className="flex items-center gap-1.5 text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full text-xs font-bold">
            <AlertCircle size={14} /> Critical
          </span>
        );
    }
  };

  const calculateProgress = (current: number, min: number) => {
     // A simple visual calculation: 
     // If current < min, it's < 30%. If current > 2*min, it's 100%.
     const maxRef = min * 3;
     const percent = Math.min(100, Math.max(5, (current / maxRef) * 100));
     return percent;
  };

  const getProgressColor = (status: StockStatus) => {
      switch (status) {
          case StockStatus.IN_STOCK: return 'bg-emerald-500';
          case StockStatus.LOW_STOCK: return 'bg-amber-500';
          case StockStatus.OUT_OF_STOCK: return 'bg-rose-500';
          default: return 'bg-slate-300';
      }
  }

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Supply Chain Center</h2>
          <p className="text-slate-500 text-sm mt-1">M-SCM / Inventory & Procurement</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl transition-all shadow-sm font-medium">
                <ScanBarcode size={18} />
                <span>Scan Item</span>
            </button>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/20 font-medium">
                <ShoppingCart size={18} />
                <span>Purchase Order</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-rose-600 font-bold uppercase tracking-wider">Alerts</p>
                <p className="text-3xl font-bold text-slate-900">3 <span className="text-lg text-slate-400 font-normal">Items</span></p>
            </div>
            <div className="p-4 bg-white rounded-xl text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                <AlertCircle size={28} />
            </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Total SKUs</p>
                <p className="text-3xl font-bold text-slate-900">1,240</p>
            </div>
            <div className="p-4 bg-white rounded-xl text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                <Package size={28} />
            </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
                <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">Inbound</p>
                <p className="text-3xl font-bold text-slate-900">5 <span className="text-lg text-slate-400 font-normal">Orders</span></p>
            </div>
            <div className="p-4 bg-white rounded-xl text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight size={28} />
            </div>
        </div>
      </div>

      <Card title="Current Stock Levels" className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80">
                <th className="p-5 font-semibold">Item Details</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold w-1/4">Stock Level</th>
                <th className="p-5 font-semibold">Expiry</th>
                <th className="p-5 font-semibold">Supplier</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="p-5">
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="font-mono text-xs text-slate-400 mt-0.5">{item.id}</div>
                  </td>
                  <td className="p-5">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          {item.category}
                      </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-slate-700">{item.quantity} <span className="text-slate-400 font-normal text-xs">{item.unit}</span></span>
                        <span className="text-xs text-slate-400">Min: {item.minLevel}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.status)}`} 
                            style={{ width: `${calculateProgress(item.quantity, item.minLevel)}%` }}
                        ></div>
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 text-sm">{item.expiryDate}</td>
                  <td className="p-5 text-slate-600 text-sm">{item.supplier}</td>
                  <td className="p-5">
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