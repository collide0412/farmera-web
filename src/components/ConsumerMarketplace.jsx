import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanLine, Search, Filter } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export const ConsumerMarketplace = ({ products, currency, onScan }) => { 
  const { t, lang } = useTranslation(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [standardFilter, setStandardFilter] = useState('ALL');

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name[lang]?.toLowerCase().includes(searchTerm.toLowerCase()) || prod.farm?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || prod.category === categoryFilter;
    const matchesStandard = standardFilter === 'ALL' || (prod.standard && prod.standard.includes(standardFilter));
    return matchesSearch && matchesCategory && matchesStandard;
  });

  return (
  <div>
    <div className="mb-6 md:mb-8 md:text-center mt-2 md:mt-4">
      <h1 className="text-2xl md:text-5xl font-black text-brand-teal mb-2 md:mb-4 tracking-tight">{t('title')}</h1>
      <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
    </div>

    <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder={t('search_products')} 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex w-full md:w-auto gap-4 items-center overflow-x-auto pb-2 md:pb-0">
        <Filter className="w-5 h-5 text-gray-400 shrink-0 hidden md:block" />
        <select 
          className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 font-medium focus:ring-2 focus:ring-brand-green outline-none min-w-[140px]"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">{t('cat_all')}</option>
          <option value="FRUIT">{t('cat_fruit')}</option>
          <option value="VEGETABLE">{t('cat_veg')}</option>
          <option value="RICE_GRAIN">{t('cat_rice')}</option>
        </select>

        <select 
          className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 font-medium focus:ring-2 focus:ring-brand-green outline-none min-w-[140px]"
          value={standardFilter}
          onChange={e => setStandardFilter(e.target.value)}
        >
          <option value="ALL">{t('std_all')}</option>
          <option value="VietGAP">VietGAP</option>
          <option value="GlobalGAP">GlobalGAP</option>
          <option value="OCOP">OCOP</option>
          <option value="Organic">Organic</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {filteredProducts.map((prod) => (
        <motion.div whileHover={{ y: -5 }} key={prod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="relative h-48 md:h-60">
            <img src={prod.image} alt={prod.name[lang]} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-brand-green flex items-center gap-1 shadow">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> {t('verified')}
            </div>
          </div>
          <div className="p-4 md:p-5 flex-1 flex flex-col">
            <h3 className="text-lg md:text-xl font-bold text-brand-teal mb-1">{prod.name[lang]}</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 truncate">{prod.farm} • {prod.origin}</p>
            <div className="text-lg md:text-xl font-black text-brand-green mb-4 md:mb-6">
              {formatCurrency(prod.prices, currency)}
            </div>
            <div className="mt-auto">
              <button 
                onClick={() => onScan(prod)} 
                className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-brand-green/30 text-sm md:text-base"
              >
                <ScanLine className="w-4 h-4 md:w-5 md:h-5" /> {t('scan')}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
};
