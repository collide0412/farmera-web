import React from 'react';
import { Leaf, ScanLine, ShieldCheck, Activity, TrendingUp, Droplets, Bug, Sprout, PackageCheck, Store, ClipboardCheck, CheckCircle2, X } from 'lucide-react';
import { t } from '../data/constants.js';

export const DashboardCard = ({ title, value, icon, trend, status }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-sm font-semibold mb-1">{title}</p>
      <h4 className="text-3xl font-black text-brand-teal mb-2">{value}</h4>
      <p className="text-xs font-bold text-gray-400">{trend}</p>
    </div>
    <div className={`p-3 rounded-xl ${status === 'optimal' ? 'bg-brand-light border-brand-green/20' : 'bg-gray-100'} border`}>
      {icon}
    </div>
  </div>
);

export const JourneyStep = ({ icon, title, desc, time, isLast }) => (
  <div className="relative flex items-start gap-4">
    <div className="absolute left-0 w-10 h-10 rounded-full bg-brand-light border-2 border-brand-green flex items-center justify-center text-brand-green z-10 shrink-0">
      {icon}
    </div>
    <div className="ml-14 bg-gray-50 p-4 rounded-xl border border-gray-100 flex-1">
      <div className="flex justify-between items-start mb-1">
        <h5 className="font-bold text-brand-teal">{title}</h5>
        <span className="text-xs text-gray-400 font-mono tracking-tighter">{time}</span>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </div>
);
