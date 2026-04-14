import os

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fi_content = """import React from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { formatCurrency } from '../utils/formatters.js';
import { Coins, TrendingUp, PiggyBank, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const FinancialImpact = () => {
  const { t, currency } = useTranslation();

  const fertilizerData = {
    labels: [t('fi_q1'), t('fi_q2'), t('fi_q3'), t('fi_q4')],
    datasets: [
      { label: t('fi_trad'), data: [120, 150, 110, 130], backgroundColor: 'rgba(239, 68, 68, 0.6)', borderColor: 'rgba(239, 68, 68, 1)', borderWidth: 1 },
      { label: t('fi_ai'), data: [90, 110, 85, 100], backgroundColor: 'rgba(16, 185, 129, 0.6)', borderColor: 'rgba(16, 185, 129, 1)', borderWidth: 1 }
    ]
  };

  const revenueData = {
    labels: [t('prod_rice'), t('prod_cab'), t('prod_straw')],
    datasets: [
      { label: t('fi_trader'), data: [35, 20, 100], backgroundColor: 'rgba(156, 163, 175, 0.6)', borderColor: 'rgba(156, 163, 175, 1)', borderWidth: 1 },
      { label: t('fi_platform'), data: [45, 35, 150], backgroundColor: 'rgba(20, 184, 166, 0.6)', borderColor: 'rgba(20, 184, 166, 1)', borderWidth: 1 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-brand-green to-emerald-600 p-8 rounded-3xl shadow-lg border border-brand-green relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between">
        <PiggyBank className="absolute -left-6 -bottom-6 w-48 h-48 text-white/10" />
        <div className="relative z-10 w-full md:w-2/3 mb-6 md:mb-0">
          <p className="text-emerald-100 font-bold uppercase tracking-wider mb-2">{t('fi_total_impact')}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl md:text-6xl font-black">{formatCurrency({VND: 154500000, USD: 6500, KRW: 8500000}, currency).replace(' / kg', '')}</h2>
          </div>
          <p className="text-sm mt-3 text-emerald-50">{t('fi_impact_desc')}</p>
        </div>
        
        <div className="w-full md:w-1/3 flex flex-col gap-3 relative z-10">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between border border-white/30">
            <span className="text-sm font-bold opacity-80">{t('fi_input_cost')}</span>
            <span className="text-lg font-bold flex items-center text-red-200"><ArrowDownRight className="w-5 h-5"/> -28%</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between border border-white/30">
            <span className="text-sm font-bold opacity-80">{t('fi_avg_price')}</span>
            <span className="text-lg font-bold flex items-center text-green-200"><ArrowUpRight className="w-5 h-5"/> +45%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-brand-teal" /> {t('fi_fert_cost')}
          </h3>
          <p className="text-gray-500 text-sm mb-6"></p>
          <div className="h-64">
            <Bar data={fertilizerData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-500" /> {t('fi_real_price')}
          </h3>
          <p className="text-gray-500 text-sm mb-6"></p>
          <div className="h-64">
            <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};
"""

farm_content = """import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { Leaf, Warehouse, Sprout, Apple, Droplets, Thermometer, Activity, AlertTriangle } from 'lucide-react';
import { DashboardCard } from './Shared.jsx';

export const FarmZoneMap = () => {
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
                  <span className="flex items-center gap-1 text-sm font-bold"><Droplets className="w-4 h-4"/> Nước</span>
                  <span className="font-black">{selected.stats.moist}%</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-1 text-sm font-bold"><Thermometer className="w-4 h-4"/> Nhiệt</span>
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
    </div>
  );
};
"""

comp_content = """import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Circle, Clock, ClipboardList, ShieldCheck } from 'lucide-react';

export const ComplianceGuide = () => {
  const { t } = useTranslation();

  const ROADMAP_STEPS = [
    { id: 1, title: t('cg_s1'), status: 'completed', tasks: [t('cg_s1_1'), t('cg_s1_2'), t('cg_s1_3')] },
    { id: 2, title: t('cg_s2'), status: 'in_progress', tasks: [t('cg_s2_1'), t('cg_s2_2'), t('cg_s2_3')] },
    { id: 3, title: t('cg_s3'), status: 'pending', tasks: [t('cg_s3_1'), t('cg_s3_2')] },
    { id: 4, title: t('cg_s4'), status: 'pending', tasks: [t('cg_s4_1'), t('cg_s4_2')] },
    { id: 5, title: t('cg_s5'), status: 'pending', tasks: [t('cg_s5_1'), t('cg_s5_2')] },
  ];

  const [steps, setSteps] = useState(ROADMAP_STEPS);
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-6 h-6" />;
    if (status === 'in_progress') return <Clock className="w-6 h-6 animate-pulse" />;
    return <Circle className="w-6 h-6" />;
  };

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-green-100 text-green-600 border-green-200';
    if (status === 'in_progress') return 'bg-teal-100 text-brand-teal border-teal-200';
    return 'bg-gray-50 text-gray-400 border-gray-100';
  };

  const handleUpload = (stepId) => {
    alert(`File Hash (IPFS) Generated for Step ${stepId}!`);
    const newSteps = steps.map(s => {
      if (s.id === stepId) return { ...s, status: 'completed' };
      if (s.id === stepId + 1 && s.status === 'pending') return { ...s, status: 'in_progress' };
      return s;
    });
    setSteps(newSteps);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <ShieldCheck className="absolute -right-8 -top-8 w-48 h-48 text-brand-green/10" />
        <div className="w-full md:w-2/3 shrink-0 relative z-10">
          <h2 className="text-3xl font-black text-brand-teal mb-2">{t('cg_title')}</h2>
          <p className="text-gray-500 font-medium mb-6">{t('cg_subtitle')}</p>
          
          <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progressPercent}%` }} 
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-brand-green h-full rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 font-bold text-sm">
            <span className="text-brand-green">{progressPercent}% {t('cg_completed')}</span>
            <span className="text-gray-400">100%</span>
          </div>
        </div>
        
        <div className="flex-1 text-center relative z-10">
          <div className="inline-flex flex-col items-center justify-center bg-brand-light w-32 h-32 rounded-full border-8 border-white shadow-xl">
            <span className="text-3xl font-black text-brand-teal">{completedCount}/{steps.length}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">{t('cg_step')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-green before:via-brand-light before:to-gray-200">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-ml-6 md:group-even:-mr-6 
                ${getStatusColor(step.status)}`}
              >
                {getStatusIcon(step.status)}
              </div>
              
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                ${step.status === 'in_progress' ? 'ring-2 ring-brand-teal shadow-xl' : ''} transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold ${step.status === 'completed' ? 'text-brand-green' : 'text-gray-800'}`}>
                    {t('cg_step')} {step.id}: {step.title}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full 
                    ${step.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      step.status === 'in_progress' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}>
                    {step.status === 'completed' ? t('c_done') : step.status === 'in_progress' ? t('c_pending') : t('c_pending')}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {step.tasks.map((task, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 gap-2">
                       <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${step.status === 'completed' ? 'text-brand-green' : 'text-gray-300'}`} />
                       {task}
                    </li>
                  ))}
                </ul>

                {step.status === 'in_progress' && (
                  <button 
                    onClick={() => handleUpload(step.id)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-light text-brand-teal hover:bg-brand-teal hover:text-white font-bold py-2 px-4 rounded-xl transition"
                  >
                    <Upload className="w-4 h-4" /> Upload Docs & Verify
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
"""

lw_content = """import React, { useState } from 'react';
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
            <p className="text-gray-500">Est. Harvest: {harvestDate.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-bold uppercase">Days Left</p>
            <p className="text-3xl font-black text-orange-500">{daysLeft}</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 shadow-md transition flex items-center">
             Book Transport <ArrowRight className="ml-2 w-5 h-5"/>
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
                <p className="font-bold text-gray-800">Trip #TRK-8821</p>
                <p className="text-sm text-gray-500">Route: Farm &rarr; HCM City</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-1">In Transit</span>
              <p className="text-sm font-bold text-gray-600">ETA: 48 hours</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
              <h2 className="text-2xl font-black text-brand-teal mb-6 flex items-center gap-2"><Calculator /> Estimate Cost</h2>
              
              <div className="space-y-4 mb-8">
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">Total Payload (kg)</label>
                   <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" placeholder="e.g. 5000" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">Dest. Hub</label>
                   <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl">
                     <option value="hcm">Ho Chi Minh City</option>
                     <option value="hanoi">Hanoi Center</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-600 mb-1">Vehicle Type</label>
                   <div className="flex gap-4">
                     <button onClick={() => setTruckType('normal')} className={`flex-1 p-3 rounded-xl border-2 font-bold flex flex-col items-center gap-2 ${truckType === 'normal' ? 'border-brand-green bg-brand-light text-brand-green' : 'border-gray-100 text-gray-500'}`}>
                       <Package /> Standard Dry
                     </button>
                     <button onClick={() => setTruckType('cold')} className={`flex-1 p-3 rounded-xl border-2 font-bold flex flex-col items-center gap-2 ${truckType === 'cold' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-500'}`}>
                       <Snowflake /> Cold Chain
                     </button>
                   </div>
                 </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between mb-6">
                 <span className="font-bold text-gray-600">Est. Total:</span>
                 <span className="text-2xl font-black text-brand-teal">₫ {calculateCost()}</span>
              </div>
              
              <button onClick={() => setShowModal(false)} className="w-full py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 shadow-lg">Confirm Booking</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
"""

write_file('src/components/FinancialImpact.jsx', fi_content)
write_file('src/components/FarmZoneMap.jsx', farm_content)
write_file('src/components/ComplianceGuide.jsx', comp_content)
write_file('src/components/LogisticsWidget.jsx', lw_content)
print("Components updated successfully!")
