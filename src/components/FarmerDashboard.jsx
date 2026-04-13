import React, { useState } from 'react';
import { ClipboardCheck, Edit2, Plus, Trash2, Droplets, Activity, Bug, TrendingUp, Leaf } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { t, CHART_DATA, CHART_OPTIONS } from '../data/constants.js';
import { DashboardCard } from './Shared.jsx';

export const FarmerDashboard = ({ products, setProducts, lang, setShowActionPlan }) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logType, setLogType] = useState('Phân bón/Fertilizer');
  const [logDetails, setLogDetails] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const activeProduct = products.find(p => p.id === selectedProduct) || products[0];

  const handleAddLog = (e) => {
    e.preventDefault();
    const updated = products.map(p => {
      if (p.id === selectedProduct) {
        let newLogs = [...p.logs];
        if (editingIndex !== null) {
          newLogs[editingIndex] = { date: logDate, type: logType, details: logDetails };
        } else {
          newLogs = [{ date: logDate, type: logType, details: logDetails }, ...newLogs];
        }
        return { ...p, logs: newLogs };
      }
      return p;
    });
    setProducts(updated);
    setLogDetails('');
    setEditingIndex(null);
  };

  const handleEdit = (index, log) => {
    setLogDate(log.date);
    setLogType(log.type);
    setLogDetails(log.details);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc muốn xóa nhật ký này?' : 'Are you sure you want to delete this log?')) return;
    const updated = products.map(p => {
      if (p.id === selectedProduct) {
        const newLogs = p.logs.filter((_, i) => i !== index);
        return { ...p, logs: newLogs };
      }
      return p;
    });
    setProducts(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setLogDetails('');
    }
  };

  return (
    <div className="space-y-8 mt-4 pb-24">
      <h2 className="text-3xl font-black text-brand-teal">{t[lang].nav_farm}</h2>

      {/* Input Form for Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ClipboardCheck className="w-6 h-6 mr-2 text-brand-green" />
          {lang === 'vi' ? 'Nhật ký Canh tác' : 'Farming Logbook'}
        </h3>
        <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'vi' ? 'Sản phẩm' : 'Product'}</label>
            <select value={selectedProduct} onChange={e => {
              setSelectedProduct(parseInt(e.target.value));
              setEditingIndex(null);
              setLogDetails('');
            }} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green">
              {products.map(p => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'vi' ? 'Ngày thực hiện' : 'Date'}</label>
            <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'vi' ? 'Loại vật tư/Hoạt động' : 'Type'}</label>
            <select value={logType} onChange={e => setLogType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green">
              <option value="Phân bón/Fertilizer">{lang === 'vi' ? 'Phân bón' : 'Fertilizer'}</option>
              <option value="Thuốc BVTV/Pesticide">{lang === 'vi' ? 'Thuốc bảo vệ thực vật' : 'Pesticide'}</option>
              <option value="Tưới nước/Watering">{lang === 'vi' ? 'Tưới tiêu' : 'Watering'}</option>
              <option value="Thu hoạch/Harvest">{lang === 'vi' ? 'Thu hoạch' : 'Harvest'}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'vi' ? 'Tên vật tư, quy cách, liều lượng' : 'Details'}</label>
            <input type="text" value={logDetails} onChange={e => setLogDetails(e.target.value)} placeholder={lang === 'vi' ? 'VD: Phân Đầu Trâu NPK, 50kg/ha' : 'e.g. NPK Fertilizer, 50kg/ha'} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green" required />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition flex items-center justify-center">
              {editingIndex !== null ? <Edit2 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {editingIndex !== null 
                ? (lang === 'vi' ? 'Cập Nhật Lịch Sử' : 'Update Log')
                : (lang === 'vi' ? 'Thêm Lịch Sử Cập Nhật' : 'Add History Event')}
            </button>
            {editingIndex !== null && (
              <button type="button" onClick={() => { setEditingIndex(null); setLogDetails(''); }} className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline w-full sm:w-auto text-center sm:ml-4">
                {lang === 'vi' ? 'Hủy sửa' : 'Cancel Edit'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Log Management Table */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ClipboardCheck className="w-6 h-6 mr-2 text-brand-green" />
          {lang === 'vi' ? 'Quản lý Nhật ký: ' : 'Log Management: '} {activeProduct.name[lang]}
        </h3>
        {activeProduct.logs && activeProduct.logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-bold">
                <tr>
                  <th className="p-4 rounded-tl-xl">{lang === 'vi' ? 'Ngày' : 'Date'}</th>
                  <th className="p-4">{lang === 'vi' ? 'Loại vật tư' : 'Type'}</th>
                  <th className="p-4">{lang === 'vi' ? 'Chi tiết' : 'Details'}</th>
                  <th className="p-4 rounded-tr-xl text-right">{lang === 'vi' ? 'Hành động' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {activeProduct.logs.map((log, index) => (
                  <tr key={index} className={`hover:bg-brand-light/30 transition-colors ${editingIndex === index ? 'bg-brand-light/50 border-l-4 border-brand-green' : ''}`}>
                    <td className="p-4 text-sm font-mono text-gray-600">{log.date}</td>
                    <td className="p-4 font-bold text-brand-teal text-sm">{log.type}</td>
                    <td className="p-4 text-sm text-gray-600"><span className="whitespace-normal break-words max-w-[200px] md:max-w-xs line-clamp-2">{log.details}</span></td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(index, log)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title={lang === 'vi' ? 'Chỉnh sửa' : 'Edit'}>
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title={lang === 'vi' ? 'Xóa' : 'Delete'}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
            {lang === 'vi' ? 'Chưa có nhật ký nào cho sản phẩm này.' : 'No logs available for this product yet.'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title={t[lang].soil_moist} value="68%" icon={<Droplets className="text-blue-500" />} trend="+2% today" status="optimal" />
        <DashboardCard title={t[lang].soil_ph} value="6.5" icon={<Activity className="text-purple-500" />} trend="Stable" status="optimal" />
        <DashboardCard title={t[lang].pest_alert} value="Zero Detected" icon={<Bug className="text-red-500" />} trend="Safe" status="safe" alert={false} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="text-brand-green" /> {t[lang].demand}</h3>
          <div className="h-64"><Line data={CHART_DATA} options={CHART_OPTIONS} /></div>
        </div>
        <div className="bg-gradient-to-br from-brand-teal to-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-center">
          <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
          <h3 className="font-bold text-xl mb-2 relative z-10">{t[lang].ai_rec}</h3>
          <p className="text-teal-50 leading-relaxed mb-6 relative z-10 text-sm md:text-base">{t[lang].ai_desc}</p>
          <div className="relative z-10 flex border-t border-teal-700/50 pt-4 mt-auto">
            <button 
              onClick={() => setShowActionPlan(true)} 
              className="bg-brand-green text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-emerald-400 transition transform hover:scale-105 w-full md:w-auto flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              {t[lang].view_plan}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
