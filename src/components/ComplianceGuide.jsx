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
          { id: 1, title: lang === 'vi' ? 'Đánh giá rủi ro & Kế hoạch' : 'Risk Assessment & Plan', status: stepStatuses[0], tasks: [lang === 'vi' ? 'Đánh giá rủi ro đất nền, nguồn nước' : 'Soil and water risk assessment', lang === 'vi' ? 'Khảo sát môi trường và sinh thái' : 'Environmental survey'] },
          { id: 2, title: lang === 'vi' ? 'Quản lý Hóa chất & Dư lượng' : 'Chemical & Residue Mgmt', status: stepStatuses[1], tasks: [lang === 'vi' ? 'Phân tích thuốc BVTV theo tiêu chuẩn EU' : 'Pesticide testing to EU standards', lang === 'vi' ? 'Huấn luyện an toàn lao động & kho bãi' : 'Training & storage safety'] },
          { id: 3, title: lang === 'vi' ? 'Ghi chép & Truy xuất nguồn gốc' : 'Records & Traceability', status: stepStatuses[2], tasks: [lang === 'vi' ? 'Thiết lập hệ thống truy xuất (Traceability)' : 'Setup traceability system', lang === 'vi' ? 'Sổ tay canh tác phiên bản GlobalGAP' : 'GlobalGAP farming logbook'] },
          { id: 4, title: lang === 'vi' ? 'Đánh giá nội bộ & Khắc phục' : 'Internal Audit & Correction', status: stepStatuses[3], tasks: [lang === 'vi' ? 'Tự đánh giá qua Check-list GlobalGAP' : 'Self-assessment by GlobalGAP checklist', lang === 'vi' ? 'Khắc phục các rủi ro, lỗi cấp độ Major/Minor' : 'Corrective actions for Major/Minor risks'] },
          { id: 5, title: lang === 'vi' ? 'Được cấp chứng nhận GlobalGAP' : 'GlobalGAP Certified', status: stepStatuses[4], tasks: [lang === 'vi' ? 'Thanh tra từ bên thứ 3 (Control Union, SGS...)' : 'Third-party inspection (Control Union, SGS...)', lang === 'vi' ? 'Nhận mã số GGN toàn cầu' : 'Receive GGN number'] },
        ];
      case 'Organic':
        return [
          { id: 1, title: lang === 'vi' ? 'Thời gian chuyển đổi' : 'Transition Period', status: stepStatuses[0], tasks: [lang === 'vi' ? 'Ngừng sử dụng hóa chất từ 1-3 năm' : 'Stop chemicals for 1-3 years', lang === 'vi' ? 'Thiết lập vùng đệm cách ly với xung quanh' : 'Setup buffer zone isolation'] },
          { id: 2, title: lang === 'vi' ? 'Quản lý đất & Nguồn nước' : 'Soil & Water Mgmt', status: stepStatuses[1], tasks: [lang === 'vi' ? 'Cải tạo đất bằng phân hữu cơ sinh học' : 'Ameliorate soil with bio-organics', lang === 'vi' ? 'Kiểm tra chặt chẽ vi sinh và kim loại nặng' : 'Testing for microbes and heavy metals'] },
          { id: 3, title: lang === 'vi' ? 'Phòng trừ Sâu bệnh sinh học' : 'Bio Pest Control', status: stepStatuses[2], tasks: [lang === 'vi' ? 'Sử dụng thiên địch, rào chắn tự nhiên' : 'Use natural enemies, barriers', lang === 'vi' ? 'Bảo tồn đa dạng sinh học trong vườn' : 'Preserve farm biodiversity'] },
          { id: 4, title: lang === 'vi' ? 'Hồ sơ & Thanh tra hữu cơ' : 'Logs & Inspection', status: stepStatuses[3], tasks: [lang === 'vi' ? 'Kế hoạch quản lý OSP minh bạch 100%' : '100% transparent Organic System Plan', lang === 'vi' ? 'Các đoàn đánh giá kiểm tra đột xuất' : 'Unannounced organic inspections'] },
          { id: 5, title: lang === 'vi' ? 'Chứng nhận Hữu cơ Quốc tế' : 'Intl Organic Certified', status: stepStatuses[4], tasks: [lang === 'vi' ? 'Tuân thủ các chuẩn USDA/EU Organic' : 'Compliance with USDA/EU Organic', lang === 'vi' ? 'Được cấp chứng nhận & dán nhãn Hữu cơ' : 'Certified & Organic labeling'] },
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
          fees: lang === 'vi' ? 'Chi phí cấp chứng nhận GlobalGAP dao động từ 50 - 100 triệu VNĐ. Yêu cầu khắt khe về đánh giá rủi ro an toàn và môi trường, kiểm tra dư lượng thuốc bảo vệ thực vật cấp độ cao.' : 'GlobalGAP certification fees range from 50-100M VND. Strict requirements on safety/environmental risk assessment and high-level pesticide residue testing.',
          docTitle1: lang === 'vi' ? '1. Quy trình cấp chứng nhận GlobalGAP' : '1. GlobalGAP Certification Process',
          docDesc1: lang === 'vi' ? 'GlobalGAP là tiêu chuẩn toàn cầu về Thực hành nông nghiệp tốt. Yêu cầu mức độ tuân thủ cao, truy xuất nguồn gốc tối đa và cam kết bảo vệ môi trường, sức khỏe người lao động.' : 'GlobalGAP is the global standard for Good Agricultural Practices. It requires high compliance, maximum traceability, and commitment to environmental and worker protection.',
          docTitle2: lang === 'vi' ? '2. Hồ sơ cần chuẩn bị' : '2. Required Documents',
          docItems2: lang === 'vi' ? ['Hệ thống quản lý chất lượng (QMS)', 'Sổ tay canh tác phiên bản GlobalGAP', 'Kết quả phân tích đất, nước đầy đủ', 'Đánh giá rủi ro vệ sinh, an toàn lao động'] : ['Quality Management System (QMS)', 'GlobalGAP version farming logbook', 'Comprehensive soil, water analysis results', 'Health and safety risk assessments'],
          docTitle3: lang === 'vi' ? '3. Chi phí dự kiến' : '3. Estimated Costs',
          docDesc3: lang === 'vi' ? 'Do quy mô và tính phức tạp quốc tế, chi phí chứng nhận và tái đánh giá thường dao động từ 50.000.000 đến 100.000.000 VNĐ.' : 'Due to scale and international complexity, certification and re-audit fees range from 50,000,000 to 100,000,000 VND.'
        };
      case 'Organic':
        return {
          fees: lang === 'vi' ? 'Chi phí chứng nhận Hữu cơ (USDA, EU) từ 40 - 120 triệu VNĐ. Phải trải qua quá trình cách ly khỏi hóa chất từ 1-3 năm trước khi sản xuất.' : 'Organic certification fees (USDA, EU) range from 40-120M VND. Requires 1-3 years of transition period without chemical inputs.',
          docTitle1: lang === 'vi' ? '1. Tiêu chuẩn Nông nghiệp Hữu cơ' : '1. Organic Farming Standards',
          docDesc1: lang === 'vi' ? 'Nông nghiệp hữu cơ (Organic) nghiêm cấm sử dụng phân bón hóa học, thuốc trừ sâu độc hại, giống biến đổi gen. Ưu tiên thiên địch, luân canh tự nhiên.' : 'Organic farming strictly prohibits chemical fertilizers, toxic pesticides, and GMOs. It prioritizes natural enemies and crop rotation.',
          docTitle2: lang === 'vi' ? '2. Hồ sơ & Khảo sát' : '2. Documents & Survey',
          docItems2: lang === 'vi' ? ['Kế hoạch quản lý hệ thống hữu cơ (OSP)', 'Sổ ghi chép chuyển đổi (1-3 năm không dùng hóa chất)', 'Chứng từ chứng minh nguồn gốc hạt giống non-GMO', 'Kế hoạch bảo vệ vùng đệm sinh thái'] : ['Organic System Plan (OSP)', 'Transition logbook (1-3 years without chemicals)', 'Proof of non-GMO seed origins', 'Ecological buffer zone protection plan'],
          docTitle3: lang === 'vi' ? '3. Chi phí dự kiến' : '3. Estimated Costs',
          docDesc3: lang === 'vi' ? 'Trọn gói đánh giá và cấp nhãn Hữu cơ quốc tế (như USDA Organic, EU Organic, JAS) mất khoảng 40.000.000 - 120.000.000 VNĐ tùy tổ chức và diện tích.' : 'Full assessment and international Organic labeling (e.g. USDA, EU, JAS) costs around 40,000,000 - 120,000,000 VND depending on certifier and area.'
        };
      case 'VietGAP':
      default:
        return {
          fees: lang === 'vi' ? 'Chi phí đánh giá chứng nhận VietGAP dao động từ 15 - 20 triệu VNĐ. Nông dân cần chuẩn bị Giấy đăng ký kinh doanh, sơ đồ mặt bằng và sổ nhật ký canh tác.' : 'VietGAP certification fees range from 15-20M VND. Requires Business Registration, site plan, and farming logbooks.',
          docTitle1: lang === 'vi' ? '1. Quy trình cấp chứng nhận VietGAP' : '1. VietGAP Certification Process',
          docDesc1: lang === 'vi' ? 'VietGAP (Vietnamese Good Agricultural Practices) là bộ tiêu chuẩn thực hành nông nghiệp tốt tại Việt Nam, nhằm đảm bảo an toàn, nâng cao chất lượng sản phẩm.' : 'VietGAP (Vietnamese Good Agricultural Practices) is a set of good agricultural practice standards in Vietnam, aiming to ensure safety and improve product quality.',
          docTitle2: lang === 'vi' ? '2. Hồ sơ cần chuẩn bị (Cơ bản)' : '2. Required Documents (Basic)',
          docItems2: lang === 'vi' ? ['Giấy chứng nhận đăng ký kinh doanh', 'Sơ đồ mặt bằng khu vực sản xuất', 'Sổ nhật ký ghi chép quá trình canh tác', 'Kết quả kiểm tra mẫu đất, nước (nếu có)'] : ['Business Registration Certificate', 'Site plan of the production area', 'Farming logbook', 'Test results of soil and water samples (if any)'],
          docTitle3: lang === 'vi' ? '3. Chi phí dự kiến' : '3. Estimated Costs',
          docDesc3: lang === 'vi' ? 'Tùy thuộc vào quy mô, diện tích và loại cây trồng, chi phí tư vấn chứng nhận VietGAP thường dao động từ 15.000.000 VNĐ đến 20.000.000 VNĐ.' : 'Depending on the scale, area, and type of crop, the cost of VietGAP certification usually ranges from 15,000,000 VND to 20,000,000 VND.'
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
          <option value="VietGAP">VietGAP ({lang === 'vi' ? 'Tiêu chuẩn Việt Nam' : 'Vietnamese Std'})</option>
          <option value="GlobalGAP">GlobalGAP ({lang === 'vi' ? 'Tiêu chuẩn Quốc tế' : 'International Std'})</option>
          <option value="Organic">Organic ({lang === 'vi' ? 'Hữu cơ' : 'Organic/Bio'})</option>
        </select>
      </div>

      {/* THÔNG TIN HƯỚNG DẪN TIÊU CHUẨN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl"><FileText className="text-blue-600 w-6 h-6"/></div>
            <h3 className="font-black text-lg text-gray-800">{lang === 'vi' ? 'Hồ sơ & Chi phí' : 'Docs & Fees'} ({selectedStandard})</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {stdInfo.fees}
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
                {lang === 'vi' ? 'Đã hiểu' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
