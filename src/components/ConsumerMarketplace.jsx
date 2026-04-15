import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanLine } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export const ConsumerMarketplace = ({ products, currency, onScan }) => { const { t, lang } = useTranslation(); return (
  <div>
    <div className="mb-6 md:mb-8 md:text-center mt-2 md:mt-4">
      <h1 className="text-2xl md:text-5xl font-black text-brand-teal mb-2 md:mb-4 tracking-tight">{t('title')}</h1>
      <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {products.map((prod) => (
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
