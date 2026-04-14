import React, { useState } from 'react';
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
