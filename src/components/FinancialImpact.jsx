import React from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { formatCurrency } from '../utils/formatters.js';
import { Coins, TrendingUp, PiggyBank, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const FinancialImpact = ({ currency }) => {
  const { t } = useTranslation();

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
