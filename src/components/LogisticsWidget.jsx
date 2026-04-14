import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { Truck, CalendarDays, Package, MapPin, Calculator, Snowflake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogisticsWidget = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [truckType, setTruckType] = useState('normal'); 
  const [weight, setWeight] = useState('');
  const [destination, setDestination] = useState('hanoi');

  const seedDate = new Date('2026-03-01');
  const harvestDate = new Date(seedDate);
  harvestDate.setDate(harvestDate.getDate() + 90);
  const daysLeft = Math.floor((harvestDate - new Date()) / (1000 * 60 * 60 * 24));

  const calculateCost = () => {
    if (!weight) return 0;
    const base = destination === 'hanoi' ? 2000 : 800; // km approx
    const rate = truckType === 'cold' ? 1.5 : 1;
    return (weight * base * rate).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand-green shrink-0">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{t('lw_title')}</h3>
            <p className="text-gray-500">{t('lw_est_harvest')} {harvestDate.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-bold uppercase">{t('lw_days_left')}</p>
            <p className="text-3xl font-black text-orange-500">{daysLeft}</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 shadow-md transition flex items-center">
             {t('lw_book')} <ArrowRight className="ml-2 w-5 h-5"/>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MapPin className="text-brand-green" /> {t('lw_manage')}
        </h3>
        {/* Placeholder tracking list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-bold text-gray-800">{t('lw_trip')} #TRK-8821</p>
                <p className="text-sm text-gray-500">{t('lw_route')}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-1">{t('lw_in_transit')}</span>
              <p className="text-sm font-bold text-gray-600">{t('lw_eta')}</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
              <h2 className="text-2xl font-black text-brand-teal mb-6 flex items-center gap-2"><Calculator /> {t('lw_est_cost')}</h2>
              
              <div className="space-y-4 mb-8">
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">{t('lw_payload')}</label>
                   <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" placeholder="{t('lw_placeholder')}" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">{t('lw_dest')}</label>
                   <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl">
                     <option value="hcm">{t('lw_hcm')}</option>
                     <option value="hanoi">{t('lw_hanoi')}</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">{t('lw_type')}</label>
                   <div className="flex gap-4">
                     <button onClick={() => setTruckType('normal')} className={`flex-1 p-3 rounded-xl border-2 font-bold flex flex-col items-center gap-2 ${truckType === 'normal' ? 'border-brand-green bg-brand-light text-brand-green' : 'border-gray-100 text-gray-500'}`}>
                       <Package /> {t('lw_standard')}
                     </button>
                     <button onClick={() => setTruckType('cold')} className={`flex-1 p-3 rounded-xl border-2 font-bold flex flex-col items-center gap-2 ${truckType === 'cold' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-500'}`}>
                       <Snowflake /> {t('lw_cold')}
                     </button>
                   </div>
                 </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between mb-6">
                 <span className="font-bold text-gray-600">{t('lw_total')}</span>
                 <span className="text-2xl font-black text-brand-teal">₫ {calculateCost()}</span>
              </div>
              
              <button onClick={() => setShowModal(false)} className="w-full py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 shadow-lg">{t('lw_confirm')}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
