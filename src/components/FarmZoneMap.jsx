import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { Leaf, Warehouse, Sprout, Apple, Droplets, Thermometer, Activity, AlertTriangle, Lock, X } from 'lucide-react';
import { DashboardCard } from './Shared.jsx';
import { Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const FarmZoneMap = ({ isPremium }) => {
  const { t, lang } = useTranslation();

  const ZONES = [
    { id: 'A', name: t('fz_zoneA'), icon: <Sprout className="w-8 h-8" />, type: 'crop', stats: { moist: 68, temp: 28, ph: 6.5 }, logs: ['2026-03-10: NPK', '2026-03-15: Weekly water'] },
    { id: 'B', name: t('fz_zoneB'), icon: <Apple className="w-8 h-8" />, type: 'orchard', stats: { moist: 28, temp: 32, ph: 5.8 }, logs: ['2026-03-12: Pruning'] },
    { id: 'C', name: t('fz_zoneC'), icon: <Leaf className="w-8 h-8" />, type: 'veg', stats: { moist: 72, temp: 26, ph: 6.2 }, logs: ['2026-03-14: Seed planted', '2026-03-16: Bio-pesticides'] },
    { id: 'D', name: t('fz_zoneD'), icon: <Warehouse className="w-8 h-8" />, type: 'storage', stats: { moist: 55, temp: 18, ph: null }, logs: ['2026-03-15: 500kg organic imported'] },
  ];

  const [selected, setSelected] = useState(ZONES[0]);
  const [showEditFarm, setShowEditFarm] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-brand-green" /> {t('fz_title')}
      </h3>
      {isPremium && <p className="text-sm font-bold text-brand-green mb-4 flex items-center gap-2 animate-pulse"><Activity className="w-4 h-4"/> {lang === 'vi' ? 'Dữ liệu được lấy trực tiếp từ Gateway IoT mỗi 30 giây' : lang === 'en' ? 'Data fetched directly from IoT Gateway every 30 seconds' : 'IoT 게이트웨이에서 30초마다 데이터 가져오기'}</p>}
      
      {!isPremium ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
           <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
           <h4 className="text-xl font-bold text-gray-700 mb-2">{lang === 'vi' ? 'Bản Đồ Nông Trại Tiêu Chuẩn' : lang === 'en' ? 'Standard Farm Map' : '표준 농장 지도'}</h4>
           <p className="text-gray-500 mb-6 max-w-md mx-auto">{lang === 'vi' ? 'Chế độ Standard hiển thị thông số tổng quan theo dự báo thời tiết (API), không có thiết bị IoT cục bộ. Nâng cấp Premium kết hợp lắp đặt gateway IoT để quan trắc từng khu vực Real-time.' : lang === 'en' ? 'Standard mode shows overview parameters based on weather forecast (API), without local IoT devices. Upgrade to Premium to integrate IoT gateways for real-time monitoring of each zone.' : '표준 모드는 로컬 IoT 장치 없이 날씨 예보(API)를 기반으로 한 개요 매개변수를 표시합니다. 프리미엄으로 업그레이드하여 각 구역의 실시간 모니터링을 위한 IoT 게이트웨이를 통합하세요.'}</p>
           <div className="flex justify-center gap-6">
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-32">
               <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-2" />
               <p className="font-black text-xl text-gray-800">29°C</p>
               <p className="text-xs font-bold text-gray-400">{lang === 'vi' ? 'TRUNG BÌNH' : lang === 'en' ? 'AVERAGE' : '평균'}</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-32">
               <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
               <p className="font-black text-xl text-gray-800">65%</p>
               <p className="text-xs font-bold text-gray-400">{lang === 'vi' ? 'ĐỘ ẨM' : lang === 'en' ? 'HUMIDITY' : '습도'}</p>
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
                  {hasWarning ? (
                    <span className="absolute top-3 right-3 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 flex h-3 w-3" title="Live Connection">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
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
                  <span className="font-black">{selected.stats.ph || '-'}</span>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100 flex items-center justify-between text-yellow-700 col-span-2">
                  <span className="flex items-center gap-1 text-sm font-bold">Ánh sáng (Lux)</span>
                  <span className="font-black">65,000 Lux</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex flex-col gap-1 text-blue-900 col-span-2 mt-2 shadow-sm">
                  <div className="flex items-center gap-1 text-sm font-bold border-b border-blue-200 pb-2 mb-1"><MapIcon className="w-4 h-4"/> Thông tin Tọa độ & Thổ nhưỡng</div>
                  <span className="text-xs block"><span className="font-bold">Vị trí:</span> 21.0285° N, 105.8542° E</span>
                  <span className="text-xs block"><span className="font-bold">Đất:</span> Đất phù sa, giữ nước tốt (Phù hợp {selected.name})</span>
                  <span className="text-xs block"><span className="font-bold">Khí hậu:</span> Nhiệt đới gió mùa, độ ẩm TB 75-85%</span>
                  <button 
                    onClick={() => setShowEditFarm(true)}
                    className="mt-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg self-start transition-colors"
                  >
                    {lang === 'vi' ? 'Sửa Thông Tin' : lang === 'en' ? 'Edit Info' : '정보 수정'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 bg-gray-100/50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                <Warehouse className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-xs font-bold px-4 text-center">{lang === 'vi' ? 'Kho lạnh không trang bị đủ Cảm biến IoT.' : lang === 'en' ? 'Cold storage not equipped with enough IoT sensors.' : '냉장 보관소에 충분한 IoT 센서가 없습니다.'}</p>
              </div>
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

      {showEditFarm && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
           onClick={() => setShowEditFarm(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setShowEditFarm(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <MapIcon className="w-8 h-8 text-blue-500" />
              Sửa thông tin Nông Trại
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tên khu vực</label>
                <input type="text" defaultValue={selected.name} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Vĩ độ</label>
                  <input type="text" defaultValue="21.0285° N" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Kinh độ</label>
                  <input type="text" defaultValue="105.8542° E" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Loại đất</label>
                <input type="text" defaultValue="Đất phù sa, giữ nước tốt" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Đặc điểm / Khí hậu</label>
                <textarea rows="3" defaultValue="Nhiệt đới gió mùa, độ ẩm TB 75-85%" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              <button onClick={() => setShowEditFarm(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mt-4">
                Lưu Thay Đổi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};
