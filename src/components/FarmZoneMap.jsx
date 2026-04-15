import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { Leaf, Warehouse, Sprout, Apple, Droplets, Thermometer, Activity, AlertTriangle, Lock } from 'lucide-react';
import { DashboardCard } from './Shared.jsx';
import { Map as MapIcon } from 'lucide-react';

export const FarmZoneMap = ({ isPremium }) => {
  const { t } = useTranslation();

  const ZONES = [
    { id: 'A', name: t('fz_zoneA'), icon: <Sprout className="w-8 h-8" />, type: 'crop', stats: { moist: 68, temp: 28, ph: 6.5 }, logs: ['2026-03-10: NPK', '2026-03-15: Weekly water'] },
    { id: 'B', name: t('fz_zoneB'), icon: <Apple className="w-8 h-8" />, type: 'orchard', stats: { moist: 28, temp: 32, ph: 5.8 }, logs: ['2026-03-12: Pruning'] },
    { id: 'C', name: t('fz_zoneC'), icon: <Leaf className="w-8 h-8" />, type: 'veg', stats: { moist: 72, temp: 26, ph: 6.2 }, logs: ['2026-03-14: Seed planted', '2026-03-16: Bio-pesticides'] },
    { id: 'D', name: t('fz_zoneD'), icon: <Warehouse className="w-8 h-8" />, type: 'storage', stats: { moist: 55, temp: 18, ph: null }, logs: ['2026-03-15: 500kg organic imported'] },
  ];

  const [selected, setSelected] = useState(ZONES[0]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-brand-green" /> {t('fz_title')}
      </h3>
      {isPremium && <p className="text-sm font-bold text-brand-green mb-4 flex items-center gap-2 animate-pulse"><Activity className="w-4 h-4"/> Dữ liệu được lấy trực tiếp từ Gateway IoT mỗi 30 giây</p>}
      
      {!isPremium ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
           <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
           <h4 className="text-xl font-bold text-gray-700 mb-2">Bản Đồ Nông Trại Tiêu Chuẩn</h4>
           <p className="text-gray-500 mb-6 max-w-md mx-auto">Chế độ Standard hiển thị thông số tổng quan của nông trại và được cập nhật 1 lần/ngày. Nâng cấp Premium để xem lưới từng khu vực với dữ liệu IoT Real-time.</p>
           <div className="flex justify-center gap-6">
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-32">
               <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-2" />
               <p className="font-black text-xl text-gray-800">29°C</p>
               <p className="text-xs font-bold text-gray-400">TRUNG BÌNH</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-32">
               <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
               <p className="font-black text-xl text-gray-800">65%</p>
               <p className="text-xs font-bold text-gray-400">ĐỘ ẨM</p>
             </div>
           </div>
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {ZONES.map(z => {
            const hasWarning = z.stats.moist && z.stats.moist < 30;
            const isSelected = selected.id === z.id;
            return (
              <div 
                key={z.id}
                onClick={() => setSelected(z)}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative overflow-hidden group
                  ${isSelected ? 'border-brand-green bg-brand-light/30 shadow-md' : 'border-gray-100 hover:border-brand-green/30 hover:bg-gray-50'}
                `}
              >
                {hasWarning && <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>}
                <div className={`mb-3 ${isSelected ? 'text-brand-green' : 'text-gray-400 group-hover:text-brand-green/70'}`}>
                  {z.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-sm md:text-base">{z.name}</h4>
                {z.stats.moist && (
                  <div className="mt-2 text-xs font-bold flex gap-2">
                    <span className={hasWarning ? 'text-red-500 flex items-center' : 'text-blue-500 flex items-center'}><Droplets className="w-3 h-3 mr-1"/> {z.stats.moist}%</span>
                    <span className="text-orange-500 flex items-center"><Thermometer className="w-3 h-3 mr-1"/> {z.stats.temp}°C</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
          <h4 className="font-black text-xl text-brand-teal mb-4">{selected.name}</h4>
          
          <div className="mb-6 space-y-3">
            <h5 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t('fz_realtime')}</h5>
            {selected.stats.moist ? (
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${selected.stats.moist < 30 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-100 text-gray-700'}`}>
                    <span className="flex items-center gap-1 text-sm font-bold"><Droplets className="w-4 h-4"/> {t('fz_water')}</span>
                    <span className="font-black">{selected.stats.moist}%</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-gray-700">
                    <span className="flex items-center gap-1 text-sm font-bold"><Thermometer className="w-4 h-4"/> {t('fz_temp')}</span>
                    <span className="font-black">{selected.stats.temp}°C</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-gray-700 col-span-2">
                  <span className="flex items-center gap-1 text-sm font-bold"><Activity className="w-4 h-4"/> pH</span>
                  <span className="font-black">{selected.stats.ph}</span>
                </div>
              </div>
            ) : (
               <div className="p-4 bg-white rounded-xl border border-gray-100 text-gray-500 italic text-sm">IoT N/A</div>
            )}
          </div>

          <div className="mb-6">
             <h5 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{t('fz_status')}</h5>
             {selected.stats.moist && selected.stats.moist < 30 ? (
               <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg text-sm font-bold">
                 <AlertTriangle className="w-5 h-5"/> {t('fz_alert_moist')}
               </div>
             ) : (
               <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3 rounded-lg text-sm font-bold">
                 <Activity className="w-5 h-5"/> {t('fz_normal')}
               </div>
             )}
          </div>

          <div className="flex-1 border-t border-gray-200 pt-4 mt-auto">
             <h5 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('fz_logs')}</h5>
             {selected.logs.length > 0 ? (
               <ul className="space-y-2">
                 {selected.logs.map((lg, i) => (
                   <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0"></span>
                     {lg}
                   </li>
                 ))}
               </ul>
             ) : (
               <p className="text-sm text-gray-400 italic">{t('fz_no_logs')}</p>
             )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
