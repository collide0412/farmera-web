import React, { useState } from 'react';
import { Truck, CalendarDays, Package, MapPin, Calculator, Snowflake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogisticsWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const [truckType, setTruckType] = useState('normal'); // normal | cold
  const [weight, setWeight] = useState('');
  const [destination, setDestination] = useState('hanoi');

  // Dự báo thu hoạch giả lập
  const seedDate = new Date('2026-03-01');
  const harvestDate = new Date(seedDate);
  harvestDate.setDate(harvestDate.getDate() + 90);
  const daysLeft = Math.floor((harvestDate - new Date()) / (1000 * 60 * 60 * 24));

  const calculateCost = () => {
    if (!weight) return 0;
    const basePrice = destination === 'hanoi' ? 2000 : 3500; // VNĐ/kg
    const coldMultiplier = truckType === 'cold' ? 1.5 : 1;
    let total = parseInt(weight) * basePrice * coldMultiplier;
    // Giảm 25% nhờ gom chuyến FARMERA
    return total * 0.75;
  };

  const estimatedCost = calculateCost();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dự báo thu hoạch */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 shadow-sm relative overflow-hidden">
          <CalendarDays className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-200/50" />
          <h3 className="text-xl font-bold text-orange-900 mb-4 relative z-10">Dự báo thu hoạch</h3>
          <div className="space-y-4 relative z-10">
            <div>
              <p className="text-sm text-orange-700 font-medium">Lô trồng gần nhất (Ngày gieo: 01/03/2026)</p>
              <h4 className="text-2xl font-black text-orange-600 mt-1">{harvestDate.toLocaleDateString('vi-VN')}</h4>
            </div>
            <div className="bg-white/60 p-3 rounded-lg flex items-center justify-between">
              <span className="font-bold text-orange-900">Còn lại:</span>
              <span className="text-lg font-black text-orange-600 border-b-2 border-orange-400">{daysLeft} ngày</span>
            </div>
          </div>
        </div>

        {/* Nút Đặt lịch */}
        <div className="bg-brand-teal p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center items-start relative overflow-hidden">
          <Truck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
          <h3 className="text-xl font-bold mb-2 relative z-10">Tối ưu Chuỗi Cung Ứng</h3>
          <p className="text-teal-100 text-sm mb-6 max-w-xs relative z-10">Giảm đến 25% chi phí logistics nhờ thuật toán gom chuyến thông minh của FARMERA.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-brand-green hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2 relative z-10"
          >
            <Truck className="w-5 h-5" /> Đặt lịch vận chuyển
          </button>
        </div>

      </div>

      {/* Modal Đặt Xe */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative z-10 overflow-hidden"
            >
              <div className="bg-brand-teal p-5 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2"><Truck /> Đặt xe Thu hoạch</h3>
                <button onClick={() => setShowModal(false)} className="hover:text-teal-200">✕</button>
              </div>

              <div className="p-6 space-y-5 text-gray-800">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Loại Xe</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      onClick={() => setTruckType('normal')}
                      className={`p-3 border-2 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${truckType === 'normal' ? 'border-brand-green bg-brand-light font-bold text-brand-teal' : 'border-gray-200 text-gray-500'}`}
                    >
                      <Package className="w-5 h-5"/> Tải thường
                    </div>
                    <div 
                      onClick={() => setTruckType('cold')}
                      className={`p-3 border-2 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${truckType === 'cold' ? 'border-blue-500 bg-blue-50 font-bold text-blue-700' : 'border-gray-200 text-gray-500'}`}
                    >
                      <Snowflake className="w-5 h-5"/> Xe lạnh
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Khối lượng (kg)</label>
                    <input 
                      type="number" 
                      value={weight} onChange={e => setWeight(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none" 
                      placeholder="VD: 500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Điểm đến</label>
                    <select 
                      value={destination} onChange={e => setDestination(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none"
                    >
                      <option value="hanoi">Kho Hà Nội</option>
                      <option value="haiphong">Kho Hải Phòng</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Giá gốc ước tính:</span>
                    <span className="line-through">{weight ? (estimatedCost / 0.75).toLocaleString() : 0} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-brand-teal">
                    <span className="flex items-center gap-1"><Calculator className="w-5 h-5"/> Ưu đãi Gom chuyến:</span>
                    <span className="text-2xl text-brand-green">{estimatedCost.toLocaleString()} VNĐ</span>
                  </div>
                  <p className="text-xs text-green-600 font-bold mt-2 text-right">Bạn đã tiết kiệm 25% chi phí!</p>
                </div>

                <button 
                  onClick={() => {
                    alert('Lệnh đặt xe đã được ghi nhận trên Blockchain & Hệ thống Điều phối!');
                    setShowModal(false);
                  }}
                  className="w-full bg-brand-green hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow transition"
                >
                  Xác nhận Lịch Đặt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
