import React, { useState } from 'react';
import { ClipboardCheck, Edit2, Plus, Trash2, Droplets, Activity, Bug, TrendingUp, Leaf, Map as MapIcon, Truck, PiggyBank, ShieldCheck } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CHART_DATA, CHART_OPTIONS } from '../data/constants.js';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { DashboardCard } from './Shared.jsx';
import { FarmZoneMap } from './FarmZoneMap.jsx';
import { LogisticsWidget } from './LogisticsWidget.jsx';
import { FinancialImpact } from './FinancialImpact.jsx';
import { ComplianceGuide } from './ComplianceGuide.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const FarmerDashboard = ({ products, setProducts, setShowActionPlan }) => {
  const { t, lang } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logType, setLogType] = useState('f_type_fert');
  const [logDetails, setLogDetails] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [farmerTab, setFarmerTab] = useState('overview'); // overview | zones | compliance | logistics | finance

  const activeProduct = products.find(p => p.id === selectedProduct) || products[0];

  const handleAddLog = (e) => {
    e.preventDefault();
    const updated = products.map(p => {
      if (p.id === selectedProduct) {
        let newLogs = [...p.logs];
        if (editingIndex !== null) {
          newLogs[editingIndex] = { date: logDate, type: logType, details: logDetails };
        } else {
          newLogs = [{ date: logDate, type: logType, details: logDetails }, ...newLogs];
        }
        return { ...p, logs: newLogs };
      }
      return p;
    });
    setProducts(updated);
    setLogDetails('');
    setEditingIndex(null);
  };

  const handleEdit = (index, log) => {
    setLogDate(log.date);
    setLogType(log.type);
    setLogDetails(log.details);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (!window.confirm(t('f_del_confirm'))) return;
    const updated = products.map(p => {
      if (p.id === selectedProduct) {
        const newLogs = p.logs.filter((_, i) => i !== index);
        return { ...p, logs: newLogs };
      }
      return p;
    });
    setProducts(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setLogDetails('');
    }
  };

  return (
    <div className="space-y-8 mt-4 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-brand-teal">{t('nav_farm')}</h2>
        
        {/* Farmer Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setFarmerTab('overview')} 
            className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${farmerTab === 'overview' ? 'bg-brand-green text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Activity className="w-4 h-4"/> {t('nav_overview')}
          </button>
          <button 
            onClick={() => setFarmerTab('zones')} 
            className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${farmerTab === 'zones' ? 'bg-brand-teal text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <MapIcon className="w-4 h-4"/> {t('nav_zones')}
          </button>
          <button 
            onClick={() => setFarmerTab('logistics')} 
            className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${farmerTab === 'logistics' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Truck className="w-4 h-4"/> {t('nav_logistics')}
          </button>
          <button 
            onClick={() => setFarmerTab('finance')} 
            className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${farmerTab === 'finance' ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <PiggyBank className="w-4 h-4"/> {t('nav_finance')}
          </button>
          <button 
            onClick={() => setFarmerTab('compliance')} 
            className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${farmerTab === 'compliance' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ShieldCheck className="w-4 h-4"/> {t('nav_compliance')}
          </button>
        </div>
      </div>

      {farmerTab === 'overview' && (
        <>
          {/* Input Form for Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ClipboardCheck className="w-6 h-6 mr-2 text-brand-green" />
          {t('f_log_title')}
        </h3>
        <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t('f_prod')}</label>
            <select value={selectedProduct} onChange={e => {
              setSelectedProduct(parseInt(e.target.value));
              setEditingIndex(null);
              setLogDetails('');
            }} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green">
              {products.map(p => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t('f_date')}</label>
            <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t('f_type')}</label>
            <select value={logType} onChange={e => setLogType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green">
              <option value="f_type_fert">{t('f_type_fert')}</option>
              <option value="f_type_pest">{t('f_type_pest')}</option>
              <option value="f_type_water">{t('f_type_water')}</option>
              <option value="f_type_harv">{t('f_type_harv')}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-600 mb-1">{t('f_details')}</label>
            <input type="text" value={logDetails} onChange={e => setLogDetails(e.target.value)} placeholder={t('f_ph_details')} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green" required />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition flex items-center justify-center">
              {editingIndex !== null ? <Edit2 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {editingIndex !== null 
                ? (t('f_update'))
                : (t('f_add'))}
            </button>
            {editingIndex !== null && (
              <button type="button" onClick={() => { setEditingIndex(null); setLogDetails(''); }} className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline w-full sm:w-auto text-center sm:ml-4">
                {t('f_cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Log Management Table */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ClipboardCheck className="w-6 h-6 mr-2 text-brand-green" />
          {t('f_manage')} {activeProduct.name[lang]}
        </h3>
        {activeProduct.logs && activeProduct.logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-bold">
                <tr>
                  <th className="p-4 rounded-tl-xl">{t('f_date')}</th>
                  <th className="p-4">{t('f_type')}</th>
                  <th className="p-4">{t('f_details')}</th>
                  <th className="p-4 rounded-tr-xl text-right">{t('f_action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {activeProduct.logs.map((log, index) => (
                  <tr key={index} className={`hover:bg-brand-light/30 transition-colors ${editingIndex === index ? 'bg-brand-light/50 border-l-4 border-brand-green' : ''}`}>
                    <td className="p-4 text-sm font-mono text-gray-600">{log.date}</td>
                    <td className="p-4 font-bold text-brand-teal text-sm">{t(log.type) || log.type}</td>
                    <td className="p-4 text-sm text-gray-600"><span className="whitespace-normal break-words max-w-[200px] md:max-w-xs line-clamp-2">{log.details}</span></td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(index, log)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title={t('f_edit')}>
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title={t('f_delete')}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
            {t('f_empty')}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title={t('soil_moist')} value="68%" icon={<Droplets className="text-blue-500" />} trend="+2%" status="optimal" />
        <DashboardCard title={t('soil_ph')} value="6.5" icon={<Activity className="text-purple-500" />} trend="" status="optimal" />
        <DashboardCard title={t('pest_alert')} value="0" icon={<Bug className="text-red-500" />} trend="" status="safe" alert={false} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="text-brand-green" /> {t('demand')}</h3>
          <div className="h-64"><Line data={CHART_DATA} options={CHART_OPTIONS} /></div>
        </div>
        <div className="bg-gradient-to-br from-brand-teal to-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-center">
          <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
          <h3 className="font-bold text-xl mb-2 relative z-10">{t('ai_rec')}</h3>
          <p className="text-teal-50 leading-relaxed mb-6 relative z-10 text-sm md:text-base">{t('ai_desc')}</p>
          <div className="relative z-10 flex border-t border-teal-700/50 pt-4 mt-auto">
            <button 
              onClick={() => setShowActionPlan(true)} 
              className="bg-brand-green text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-emerald-400 transition transform hover:scale-105 w-full md:w-auto flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              {t('view_plan')}
            </button>
          </div>
        </div>
      </div>
      </>
      )}

      {farmerTab === 'zones' && <FarmZoneMap />}
      {farmerTab === 'compliance' && <ComplianceGuide />}
      {farmerTab === 'logistics' && <LogisticsWidget />}
      {farmerTab === 'finance' && <FinancialImpact />}

    </div>
  );
};
