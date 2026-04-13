import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanLine } from 'lucide-react';
import { t } from '../data/constants.js';
import { formatCurrency } from '../utils/formatters.js';

export const ConsumerMarketplace = ({ products, lang, currency, onScan }) => (
  <div>
    <div className="mb-8 md:text-center mt-4">
      <h1 className="text-3xl md:text-5xl font-black text-brand-teal mb-4 tracking-tight">{t[lang].title}</h1>
      <p className="text-gray-500 md:text-xl max-w-2xl mx-auto">{t[lang].subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((prod) => (
        <motion.div whileHover={{ y: -5 }} key={prod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="relative h-60">
            <img src={prod.image} alt={prod.name[lang]} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-green flex items-center gap-1 shadow">
              <ShieldCheck className="w-4 h-4" /> {t[lang].verified}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-brand-teal mb-1">{prod.name[lang]}</h3>
            <p className="text-gray-500 text-sm mb-4">{prod.farm} • {prod.origin}</p>
            <div className="text-lg font-black text-brand-green mb-6">
              {formatCurrency(prod.prices, currency)}
            </div>
            <div className="mt-auto">
              <button 
                onClick={() => onScan(prod)} 
                className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-brand-green/30"
              >
                <ScanLine className="w-5 h-5" /> {t[lang].scan}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
