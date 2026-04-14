import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Circle, Clock, ClipboardList, ShieldCheck } from 'lucide-react';

const ROADMAP_STEPS = [
  { id: 1, title: 'Đánh giá vùng đất & Nước', status: 'completed', tasks: ['Lấy mẫu đất', 'Lấy mẫu nước', 'Kiểm định kim loại nặng'] },
  { id: 2, title: 'Quản lý Giống & Vật tư', status: 'in_progress', tasks: ['Cập nhật nguồn gốc giống', 'Hóa đơn mua phân bón hữu cơ', 'Sổ tay thiết bị'] },
  { id: 3, title: 'Nhật ký Canh tác Kỹ thuật số', status: 'pending', tasks: ['Ghi chép phun thuốc > 30 ngày', 'Cập nhật tưới tiêu hàng tuần'] },
  { id: 4, title: 'Kiểm định Mẫu thử & Thu hoạch', status: 'pending', tasks: ['Lấy mẫu sản phẩm nghiệm thu', 'Đóng gói chuẩn VietGAP'] },
  { id: 5, title: 'Cấp chứng nhận VietGAP', status: 'pending', tasks: ['Nộp hồ sơ trực tuyến', 'Đoàn chuyên gia đánh giá'] },
];

export const ComplianceGuide = () => {
  const [steps, setSteps] = useState(ROADMAP_STEPS);
  
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-8 h-8 text-white" />;
      case 'in_progress': return <Clock className="w-8 h-8 text-brand-teal" />;
      default: return <Circle className="w-8 h-8 text-gray-300" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-brand-green border-brand-green';
      case 'in_progress': return 'bg-brand-light border-brand-teal ring-4 ring-brand-teal/20';
      default: return 'bg-white border-gray-300';
    }
  };

  const handleUpload = (stepId) => {
    alert(`Mô phỏng: Upload tài liệu minh chứng cho Bước ${stepId}. Mã Hash (IPFS) tạo tự động!`);
    // Giao diện tĩnh: Tự động đánh dấu bước in_progress thành completed
    const newSteps = steps.map(s => {
      if (s.id === stepId) return { ...s, status: 'completed' };
      if (s.id === stepId + 1 && s.status === 'pending') return { ...s, status: 'in_progress' };
      return s;
    });
    setSteps(newSteps);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      
      {/* Progress Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <ShieldCheck className="absolute -right-8 -top-8 w-48 h-48 text-brand-green/10" />
        <div className="w-full md:w-2/3 shrink-0 relative z-10">
          <h2 className="text-3xl font-black text-brand-teal mb-2">Lộ trình VietGAP / OCOP</h2>
          <p className="text-gray-500 font-medium mb-6">Bạn đang hoàn thiện hồ sơ trên Blockchain.</p>
          
          <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progressPercent}%` }} 
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-brand-green h-full rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 font-bold text-sm">
            <span className="text-brand-green">{progressPercent}% Hoàn thành</span>
            <span className="text-gray-400">100%</span>
          </div>
        </div>
        
        <div className="flex-1 text-center relative z-10">
          <div className="inline-flex flex-col items-center justify-center bg-brand-light w-32 h-32 rounded-full border-8 border-white shadow-xl">
            <span className="text-3xl font-black text-brand-teal">{completedCount}/{steps.length}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Bước</span>
          </div>
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-green before:via-brand-light before:to-gray-200">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline Icon */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-ml-6 md:group-even:-mr-6 
                ${getStatusColor(step.status)}`}
              >
                {getStatusIcon(step.status)}
              </div>
              
              {/* Card */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                ${step.status === 'in_progress' ? 'ring-2 ring-brand-teal shadow-xl' : ''} transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold ${step.status === 'completed' ? 'text-brand-green' : 'text-gray-800'}`}>
                    Bước {step.id}: {step.title}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full 
                    ${step.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      step.status === 'in_progress' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}>
                    {step.status === 'completed' ? 'Hoàn thành' : step.status === 'in_progress' ? 'Đang xử lý' : 'Chờ'}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1"><ClipboardList className="w-4 h-4"/> Checklist tài liệu</h4>
                  <ul className="space-y-2 mb-4">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                          ${step.status === 'completed' ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300'}`}>
                            {step.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                         </div>
                         {task}
                      </li>
                    ))}
                  </ul>
                  
                  {step.status === 'in_progress' && (
                    <button 
                      onClick={() => handleUpload(step.id)}
                      className="w-full py-2.5 bg-brand-teal hover:bg-teal-800 transition text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" /> Upload Tài liệu minh chứng
                    </button>
                  )}
                  {step.status === 'completed' && (
                    <div className="w-full text-center py-2 bg-green-50 text-green-700 font-bold rounded-lg text-sm">
                      Dữ liệu đã được băm (Hash) lên Blockchain
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};
