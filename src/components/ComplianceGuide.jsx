import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext.jsx';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Circle, Clock, ClipboardList, ShieldCheck, FileText, Info, Award, Phone, X } from 'lucide-react';

export const ComplianceGuide = () => {
  const { t, lang } = useTranslation();

  const [stepStatuses, setStepStatuses] = useState([
    'completed', 'in_progress', 'pending', 'pending', 'pending'
  ]);
  const [showDocDialog, setShowDocDialog] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState('VietGAP');

  const getStepsByStandard = () => {
    switch (selectedStandard) {
      case 'GlobalGAP':
        return [
          { id: 1, title: t('cg_g_s1'), status: stepStatuses[0], tasks: [t('cg_g_s1_1'), t('cg_g_s1_2')] },
          { id: 2, title: t('cg_g_s2'), status: stepStatuses[1], tasks: [t('cg_g_s2_1'), t('cg_g_s2_2')] },
          { id: 3, title: t('cg_g_s3'), status: stepStatuses[2], tasks: [t('cg_g_s3_1'), t('cg_g_s3_2')] },
          { id: 4, title: t('cg_g_s4'), status: stepStatuses[3], tasks: [t('cg_g_s4_1'), t('cg_g_s4_2')] },
          { id: 5, title: t('cg_g_s5'), status: stepStatuses[4], tasks: [t('cg_g_s5_1'), t('cg_g_s5_2')] },
        ];
      case 'Organic':
        return [
          { id: 1, title: t('cg_o_s1'), status: stepStatuses[0], tasks: [t('cg_o_s1_1'), t('cg_o_s1_2')] },
          { id: 2, title: t('cg_o_s2'), status: stepStatuses[1], tasks: [t('cg_o_s2_1'), t('cg_o_s2_2')] },
          { id: 3, title: t('cg_o_s3'), status: stepStatuses[2], tasks: [t('cg_o_s3_1'), t('cg_o_s3_2')] },
          { id: 4, title: t('cg_o_s4'), status: stepStatuses[3], tasks: [t('cg_o_s4_1'), t('cg_o_s4_2')] },
          { id: 5, title: t('cg_o_s5'), status: stepStatuses[4], tasks: [t('cg_o_s5_1'), t('cg_o_s5_2')] },
        ];
      case 'VietGAP':
      default:
        return [
          { id: 1, title: t('cg_s1'), status: stepStatuses[0], tasks: [t('cg_s1_1'), t('cg_s1_2'), t('cg_s1_3')] },
          { id: 2, title: t('cg_s2'), status: stepStatuses[1], tasks: [t('cg_s2_1'), t('cg_s2_2'), t('cg_s2_3')] },
          { id: 3, title: t('cg_s3'), status: stepStatuses[2], tasks: [t('cg_s3_1'), t('cg_s3_2')] },
          { id: 4, title: t('cg_s4'), status: stepStatuses[3], tasks: [t('cg_s4_1'), t('cg_s4_2')] },
          { id: 5, title: t('cg_s5'), status: stepStatuses[4], tasks: [t('cg_s5_1'), t('cg_s5_2')] },
        ];
    }
  };

  const getStandardInfo = () => {
    switch (selectedStandard) {
      case 'GlobalGAP':
        return {
          fees: t('cg_g_fees'),
          docTitle1: t('cg_g_doc_t1'),
          docDesc1: t('cg_g_doc_d1'),
          docTitle2: t('cg_g_doc_t2'),
          docItems2: [t('cg_g_doc_i2_1'), t('cg_g_doc_i2_2'), t('cg_g_doc_i2_3'), t('cg_g_doc_i2_4')],
          docTitle3: t('cg_g_doc_t3'),
          docDesc3: t('cg_g_doc_d3')
        };
      case 'Organic':
        return {
          fees: t('cg_o_fees'),
          docTitle1: t('cg_o_doc_t1'),
          docDesc1: t('cg_o_doc_d1'),
          docTitle2: t('cg_o_doc_t2'),
          docItems2: [t('cg_o_doc_i2_1'), t('cg_o_doc_i2_2'), t('cg_o_doc_i2_3'), t('cg_o_doc_i2_4')],
          docTitle3: t('cg_o_doc_t3'),
          docDesc3: t('cg_o_doc_d3')
        };
      case 'VietGAP':
      default:
        return {
          fees: t('cg_v_fees'),
          docTitle1: t('cg_v_doc_t1'),
          docDesc1: t('cg_v_doc_d1'),
          docTitle2: t('cg_v_doc_t2'),
          docItems2: [t('cg_v_doc_i2_1'), t('cg_v_doc_i2_2'), t('cg_v_doc_i2_3'), t('cg_v_doc_i2_4')],
          docTitle3: t('cg_v_doc_t3'),
          docDesc3: t('cg_v_doc_d3')
        };
    }
  };

  const steps = getStepsByStandard();
  const stdInfo = getStandardInfo();
  
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
    const newStatuses = [...stepStatuses];
    newStatuses[stepId - 1] = 'completed';
    if (stepId < newStatuses.length && newStatuses[stepId] === 'pending') {
      newStatuses[stepId] = 'in_progress';
    }
    setStepStatuses(newStatuses);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      
      {/* STANDARD SELECTION */}
      <div className="flex justify-end mb-4">
        <select 
          className="bg-white border-2 border-brand-teal text-brand-teal font-bold py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer"
          value={selectedStandard}
          onChange={(e) => setSelectedStandard(e.target.value)}
        >
          <option value="VietGAP">VietGAP ({t('vietgap_desc')})</option>
          <option value="GlobalGAP">GlobalGAP ({t('globalgap_desc')})</option>
          <option value="Organic">Organic ({t('organic_desc')})</option>
        </select>
      </div>

      {/* THÔNG TIN HƯỚNG DẪN TIÊU CHUẨN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl"><FileText className="text-blue-600 w-6 h-6"/></div>
            <h3 className="font-black text-lg text-gray-800">{t('docs_fees')} ({selectedStandard})</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {stdInfo.fees}
          </p>
          <button onClick={(e) => { e.preventDefault(); setShowDocDialog(true); }} className="text-blue-600 font-bold text-sm hover:underline mt-auto text-left">
            → {t('read_docs')}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-3 rounded-xl"><Award className="text-emerald-700 w-6 h-6"/></div>
            <h3 className="font-black text-lg text-gray-800">{t('key_benefits')}</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {t('benefit_1')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {t('benefit_2')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {t('benefit_3')}</li>
          </ul>
        </div>
      </div>

      {/* LIÊN HỆ ĐỘI NGŨ CHUYÊN GIA */}
      <div className="bg-gradient-to-r from-brand-teal to-brand-green p-6 rounded-2xl shadow-lg mb-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-black text-xl mb-2 flex items-center gap-2"><Info className="w-5 h-5"/> {t('need_support')}</h3>
          <p className="text-sm text-emerald-50 max-w-xl">{t('support_desc')}</p>
        </div>
        <button className="bg-white text-brand-green hover:bg-gray-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap shadow-md transition-transform active:scale-95 shrink-0">
          <Phone className="w-4 h-4"/> {t('contact_experts')}
        </button>
      </div>

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

      {/* Docs Dialog */}
      {showDocDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-black text-xl text-brand-teal flex items-center gap-2">
                <FileText className="w-5 h-5"/>
                {t('cg_detail_doc_title')}
              </h3>
              <button onClick={() => setShowDocDialog(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-gray-700 text-sm leading-relaxed">
              <h4 className="font-bold text-lg text-gray-900">{stdInfo.docTitle1}</h4>
              <p>{stdInfo.docDesc1}</p>
              
              <h4 className="font-bold text-lg text-gray-900 mt-6">{stdInfo.docTitle2}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {stdInfo.docItems2.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <h4 className="font-bold text-lg text-gray-900 mt-6">{stdInfo.docTitle3}</h4>
              <p>{stdInfo.docDesc3}</p>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end bg-gray-50">
               <button 
                onClick={() => setShowDocDialog(false)} 
                className="px-6 py-2.5 font-bold text-white bg-brand-teal hover:bg-teal-700 rounded-xl shadow-md transition-transform active:scale-95"
              >
                {t('cg_understood')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
