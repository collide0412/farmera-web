import React, { useState } from 'react';
import { Leaf, Warehouse, Sprout, Apple, Droplets, Thermometer, Activity, AlertTriangle } from 'lucide-react';
import { DashboardCard } from './Shared.jsx';

const ZONES = [
  { id: 'A', name: 'Khu A (Lúa OCOP)', icon: <Sprout className="w-8 h-8" />, type: 'crop', stats: { moist: 68, temp: 28, ph: 6.5 }, logs: ['2026-03-10: Phân bón NPK', '2026-03-15: Tưới tiêu định kỳ'] },
  { id: 'B', name: 'Khu B (Cây ăn quả)', icon: <Apple className="w-8 h-8" />, type: 'orchard', stats: { moist: 28, temp: 32, ph: 5.8 }, logs: ['2026-03-12: Cắt tỉa cành'] }, // Moisture < 30% -> warning
  { id: 'C', name: 'Khu C (Rau màu VietGAP)', icon: <Leaf className="w-8 h-8" />, type: 'veg', stats: { moist: 72, temp: 26, ph: 6.2 }, logs: ['2026-03-14: Gieo hạt giống cải', '2026-03-16: Phun phòng sâu sinh học'] },
  { id: 'D', name: 'Nhà kho (Storage)', icon: <Warehouse className="w-8 h-8" />, type: 'storage', stats: { moist: 55, temp: 18, ph: null }, logs: ['2026-03-15: Nhập kho 500kg phân hữu cơ'] },
];

export const FarmZoneMap = () => {
  const [selected, setSelected] = useState(ZONES[0]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-brand-green" /> Bản đồ Nông trại (IoT & Zoning)
      </h3>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Interactive Map Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {ZONES.map(z => {
            const hasWarning = z.stats.moist && z.stats.moist < 30;
            const isSelected = selected.id === z.id;
            return (
              <div 
                key={z.id}
                onClick={() => setSelected(z)}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center min-h-[160px] text-center
                  ${isSelected ? 'ring-4 ring-brand-green/30' : 'hover:scale-105'}
                  ${hasWarning 
                    ? 'bg-red-50 border-red-200 text-red-700' 
                    : 'bg-green-50 border-green-200 text-green-700'}`}
              >
                {hasWarning && <AlertTriangle className="w-6 h-6 text-red-500 absolute top-4 right-4 animate-pulse" />}
                <div className="mb-3">{z.icon}</div>
                <h4 className="font-bold">{z.name}</h4>
                {hasWarning && <span className="text-xs font-bold text-red-600 mt-2 bg-red-100 px-2 py-1 rounded">CẦN TƯỚI NƯỚC</span>}
              </div>
            )
          })}
        </div>

        {/* Side Panel stats */}
        <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-lg mb-4 text-brand-teal pb-2 border-b">Thông số: {selected.name}</h4>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600"><Droplets className="w-5 h-5 text-blue-500"/> Độ ẩm</div>
              <span className={`font-bold ${selected.stats.moist < 30 ? 'text-red-500' : 'text-brand-teal'}`}>{selected.stats.moist}%</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600"><Thermometer className="w-5 h-5 text-orange-500"/> Nhiệt độ</div>
              <span className="font-bold text-brand-teal">{selected.stats.temp}°C</span>
            </div>
            {selected.stats.ph && (
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-600"><Activity className="w-5 h-5 text-purple-500"/> pH Đất</div>
                <span className="font-bold text-brand-teal">{selected.stats.ph}</span>
              </div>
            )}
          </div>

          <h5 className="font-bold text-sm text-gray-500 uppercase tracking-widest mb-3">Nhật ký khu vực</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            {selected.logs.map((log, idx) => (
              <li key={idx} className="bg-white p-2 rounded border border-gray-100 flex gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-green shrink-0"/> {log}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
