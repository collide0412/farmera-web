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
  
  const steps = [
    { id: 1, title: t('cg_s1'), status: stepStatuses[0], tasks: [t('cg_s1_1'), t('cg_s1_2'), t('cg_s1_3')] },
    { id: 2, title: t('cg_s2'), status: stepStatuses[1], tasks: [t('cg_s2_1'), t('cg_s2_2'), t('cg_s2_3')] },
    { id: 3, title: t('cg_s3'), status: stepStatuses[2], tasks: [t('cg_s3_1'), t('cg_s3_2')] },
    { id: 4, title: t('cg_s4'), status: stepStatuses[3], tasks: [t('cg_s4_1'), t('cg_s4_2')] },
    { id: 5, title: t('cg_s5'), status: stepStatuses[4], tasks: [t('cg_s5_1'), t('cg_s5_2')] },
  ];
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
      
      {/* THÔNG TIN HƯỚNG DẪN TIÊU CHUẨN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl"><FileText className="text-blue-600 w-6 h-6"/></div>
            <h3 className="font-black text-lg text-gray-800">{lang === 'vi' ? 'Hồ sơ pháp lý & Chi phí' : 'Required Docs & Fees'}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {lang === 'vi' 
              ? 'Chi phí đánh giá chứng nhận VietGAP dao động từ 15 - 20 triệu VNĐ, GlobalGAP từ 50 - 100 triệu VNĐ. Nông dân cần chuẩn bị Giấy đăng ký kinh doanh, sổ nhật ký canh tác.' 
              : 'VietGAP certification fees range from 15-20M VND, GlobalGAP from 50-100M VND. Requires Business Registration and farming logbooks.'}
          </p>
          <button onClick={(e) => { e.preventDefault(); setShowDocDialog(true); }} className="text-blue-600 font-bold text-sm hover:underline mt-auto text-left">
            → {lang === 'vi' ? 'Đọc tài liệu hướng dẫn chi tiết' : 'Read detailed documentation'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-3 rounded-xl"><Award className="text-emerald-700 w-6 h-6"/></div>
            <h3 className="font-black text-lg text-gray-800">{lang === 'vi' ? 'Lợi ích khi đăng ký' : 'Key Benefits'}</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {lang === 'vi' ? 'Tăng 30% giá bán ra thị trường' : 'Increase market price by 30%'}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {lang === 'vi' ? 'Dễ dàng xuất khẩu sang các thị trường khó tính' : 'Easier export to strict markets'}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {lang === 'vi' ? 'Được ưu tiên tham gia các chương trình hỗ trợ của HTX' : 'Priority for Coop support programs'}</li>
          </ul>
        </div>
      </div>

      {/* LIÊN HỆ ĐỘI NGŨ CHUYÊN GIA */}
      <div className="bg-gradient-to-r from-brand-teal to-brand-green p-6 rounded-2xl shadow-lg mb-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-black text-xl mb-2 flex items-center gap-2"><Info className="w-5 h-5"/> {lang === 'vi' ? 'Cần hỗ trợ chuyển đổi Tiêu chuẩn?' : 'Need Compliance Support?'}</h3>
          <p className="text-sm text-emerald-50 max-w-xl">{lang === 'vi' ? 'Đội ngũ Kỹ sư Nông nghiệp của FARMERA luôn sẵn sàng đồng hành, tư vấn miễn phí quy trình và hồ sơ lấy chứng nhận.' : 'Our Agri-engineers are ready to provide free consultation on the certification process and paperwork.'}</p>
        </div>
        <button className="bg-white text-brand-green hover:bg-gray-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap shadow-md transition-transform active:scale-95 shrink-0">
          <Phone className="w-4 h-4"/> {lang === 'vi' ? 'Liên hệ Chuyên gia ngay' : 'Contact Experts'}
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
                {lang === 'vi' ? 'Tài Liệu Hướng Dẫn Chi Tiết' : 'Detailed Documentation'}
              </h3>
              <button onClick={() => setShowDocDialog(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-gray-700 text-sm leading-relaxed">
              <h4 className="font-bold text-lg text-gray-900">{lang === 'vi' ? '1. Quy trình cấp chứng nhận VietGAP' : '1. VietGAP Certification Process'}</h4>
              <p>
                {lang === 'vi' 
                ? 'VietGAP (Vietnamese Good Agricultural Practices) là bộ tiêu chuẩn thực hành nông nghiệp tốt tại Việt Nam, bao gồm những nguyên tắc, trình tự, thủ tục hướng dẫn tổ chức, cá nhân sản xuất, thu hoạch, xử lý sau thu hoạch nhằm đảm bảo an toàn, nâng cao chất lượng sản phẩm, đảm bảo phúc lợi xã hội, sức khỏe người sản xuất và người tiêu dùng; đồng thời bảo vệ môi trường và truy xuất nguồn gốc sản xuất.' 
                : 'VietGAP (Vietnamese Good Agricultural Practices) is a set of good agricultural practice standards in Vietnam, including principles, procedures, and procedures guiding organizations and individuals to produce, harvest, and process after harvest to ensure safety, improve product quality, ensure social welfare, health of producers and consumers; at the same time protect the environment and trace the origin of production.'}
              </p>
              
              <h4 className="font-bold text-lg text-gray-900 mt-6">{lang === 'vi' ? '2. Hồ sơ cần chuẩn bị (Cơ bản)' : '2. Required Documents (Basic)'}</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>{lang === 'vi' ? 'Giấy chứng nhận đăng ký kinh doanh' : 'Business Registration Certificate'}</li>
                <li>{lang === 'vi' ? 'Sơ đồ mặt bằng khu vực sản xuất' : 'Site plan of the production area'}</li>
                <li>{lang === 'vi' ? 'Sổ nhật ký ghi chép quá trình canh tác' : 'Farming logbook'}</li>
                <li>{lang === 'vi' ? 'Kết quả kiểm tra mẫu đất, nước (nếu có)' : 'Test results of soil and water samples (if any)'}</li>
              </ul>
              
              <h4 className="font-bold text-lg text-gray-900 mt-6">{lang === 'vi' ? '3. Chi phí dự kiến' : '3. Estimated Costs'}</h4>
              <p>
                {lang === 'vi' 
                ? 'Tùy thuộc vào quy mô, diện tích và loại cây trồng, chi phí chứng nhận VietGAP thường dao động từ 15.000.000 VNĐ đến 20.000.000 VNĐ. Với tiêu chuẩn GlobalGAP, chi phí có thể từ 50.000.000 VNĐ đến 100.000.000 VNĐ cho chu kỳ 1 năm.' 
                : 'Depending on the scale, area, and type of crop, the cost of VietGAP certification usually ranges from 15,000,000 VND to 20,000,000 VND. For GlobalGAP standards, the cost can range from 50,000,000 VND to 100,000,000 VND for a 1-year cycle.'}
              </p>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end bg-gray-50">
               <button 
                onClick={() => setShowDocDialog(false)} 
                className="px-6 py-2.5 font-bold text-white bg-brand-teal hover:bg-teal-700 rounded-xl shadow-md transition-transform active:scale-95"
              >
                {lang === 'vi' ? 'Đã hiểu' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
