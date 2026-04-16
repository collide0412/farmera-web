import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  LayoutDashboard, Users, Map, Truck, ShieldCheck, Download, AlertTriangle, AlertCircle,
  Leaf, Info, Share2, Printer, Factory, MessageCircle, FileText, CheckCircle2, Factory as Store
} from 'lucide-react';
import { COOP_MEMBERS } from '../data/coopMockData.js';

export const CoopAdminLayout = ({ isPremium = false }) => {
  const [tab, setTab] = useState('dashboard');
  
  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShieldCheck className="w-20 h-20 text-emerald-800 mb-6" />
        <h2 className="text-3xl font-black text-gray-800 mb-4">You need HTX Admin Role</h2>
        <p className="text-gray-500 max-w-md mb-8 text-lg">Nâng cấp lên gói quản lý Hợp Tác Xã để mở khóa Tháp Điều Khiển, Bản Đồ Master và Điều phối AI.</p>
        <button className="bg-emerald-800 text-white shadow-lg text-lg rounded-xl px-8 py-4 font-bold hover:bg-emerald-900 transition flex items-center gap-2">
          Nâng cấp lên gói HTX <Factory className="w-5 h-5"/>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[85vh] bg-gray-50 overflow-hidden text-gray-800">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#064e3b] text-white shrink-0 shadow-xl flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar md:pb-8 border-b-4 md:border-b-0 md:border-r-4 border-yellow-500">
        <div className="p-4 md:p-6 hidden md:block shrink-0">
          <h2 className="text-lg md:text-2xl font-black text-yellow-500 tracking-wider">FARMERA HTX</h2>
          <p className="text-xs text-emerald-200">Quản trị viên Hệ thống</p>
        </div>
        <nav className="flex md:block md:w-full p-2 md:p-0 gap-2 shrink-0 md:space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
            { id: 'members', icon: Users, label: 'Thành viên' },
            { id: 'map', icon: Map, label: 'Bản đồ tổng thể' },
            { id: 'logistics', icon: Truck, label: 'Điều phối AI' },
            { id: 'certList', icon: FileText, label: 'Báo cáo & Chứng nhận' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 md:gap-4 px-4 py-3 md:py-4 transition-all whitespace-nowrap text-sm md:text-base font-bold w-auto md:w-full md:text-left ${tab === item.id ? 'bg-emerald-800 border-l-0 md:border-l-4 border-yellow-500 text-yellow-400' : 'hover:bg-emerald-900 text-emerald-100 hover:text-white border-l-0 md:border-l-4 border-transparent'}`}
            >
              <item.icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 ${tab === item.id ? 'text-yellow-400' : ''}`} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
        {tab === 'dashboard' && <HTXDashboard />}
        {tab === 'map' && <MasterMap />}
        {tab === 'logistics' && <AICarpooling />}
        {tab === 'certList' && <Certifications />}
        {tab === 'members' && (
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-emerald-100/50">
            <h3 className="text-2xl font-black text-emerald-900 mb-6">Quản lý Thành viên</h3>
            <p className="text-gray-500">Khu vực phân hệ danh sách (Mocked) - Tương tự như xem danh sách 50 hộ ở CSDL.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ====================== Sub Components ====================== 

const HTXDashboard = () => {
  const chartData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5'],
    datasets: [{
      fill: true,
      label: 'Diện tích (ha)',
      data: [120, 135, 150, 180, 195],
      borderColor: '#059669',
      backgroundColor: 'rgba(5, 150, 105, 0.2)',
      tension: 0.4
    }]
  };
  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">Tháp điều khiển HTX</h2>
        <p className="text-gray-500 font-medium">Theo dõi sức khỏe toàn khu vực trong thời gian thực</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPI title="Tổng diện tích" val="150.5 ha" sub="Tăng 12% so với 2025" icon={Leaf} border="border-emerald-200" />
        <KPI title="Chuẩn hóa VietGAP" val="85%" sub="42/50 hộ đã đạt" icon={ShieldCheck} border="border-blue-200" />
        <KPI title="Cảnh báo Real-time" val="5 vườn" sub="Đang thiếu nước/bệnh" icon={AlertTriangle} border="border-red-200" color="text-red-500" />
        <KPI title="Doanh thu dự kiến" val="2.4 Tỷ" sub="Dựa trên 80 tấn sắp thu" icon={Store} border="border-yellow-400" bgColor="bg-yellow-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-6 text-lg">Diện tích gieo trồng (ha)</h3>
          <div className="flex-1 w-full h-full min-h-[250px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
          <h3 className="font-bold text-gray-800 mb-6 text-lg flex items-center justify-between">
            Activity Feed <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">Live</span>
          </h3>
          <div className="space-y-5 overflow-y-auto max-h-[300px] pr-2">
            {[
              { text: "Hệ thống phát hiện thiếu nước cục bộ tại Khu vực C.", tag: 'alert', time: '10p trước' },
              { text: "Hộ ông D vừa hoàn tất nhật ký bón urê.", tag: 'info', time: '35p trước' },
              { text: "Giấy chứng nhận VietGAP của hộ ông A1 sắp hết hạn.", tag: 'warn', time: '1 giờ trước' },
              { text: "Hộ bà B vừa xác nhận lịch gom đơn thanh long.", tag: 'success', time: '2 giờ trước' },
            ].map((msg, i) => (
              <div key={i} className="flex gap-4 items-start relative pl-4 before:absolute before:left-[7px] before:top-4 before:bottom-[-20px] last:before:hidden before:w-[2px] before:bg-gray-100">
                <div className={`w-4 h-4 rounded-full shrink-0 border-[3px] border-white shadow-sm z-10 ${msg.tag === 'alert' ? 'bg-red-500' : msg.tag === 'warn' ? 'bg-yellow-500' : msg.tag === 'success' ? 'bg-teal-500' : 'bg-blue-400'}`}></div>
                <div>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1 font-bold">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const KPI = ({ title, val, sub, icon: Icon, border, color = 'text-emerald-900', bgColor = 'bg-white' }) => (
  <div className={`${bgColor} p-6 rounded-3xl shadow-sm border-2 ${border} relative overflow-hidden group`}>
    <Icon className={`absolute right-4 top-4 w-12 h-12 opacity-5 scale-110 group-hover:scale-125 transition-transform ${color}`} />
    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</h4>
    <p className={`text-3xl font-black mt-2 mb-1 ${color}`}>{val}</p>
    <p className="text-xs font-bold text-gray-400">{sub}</p>
  </div>
);

const MasterMap = () => {
  const [filter, setFilter] = useState('all');
  const [activeHover, setActiveHover] = useState(null);

  const displayNodes = COOP_MEMBERS.filter(m => filter === 'all' || m.crop === filter);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">Bản đồ đa tầng (Premium)</h2>
          <p className="text-gray-500 font-medium">Giám sát sức khỏe vườn theo thời gian thực</p>
        </div>
        <select className="border-2 border-emerald-100 outline-none text-emerald-900 font-bold p-3 rounded-xl bg-white shadow-sm" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Tất cả loại cây</option>
          <option value="Vải thiều">Chỉ Vải thiều</option>
          <option value="Nhãn lồng">Chỉ Nhãn lồng</option>
          <option value="Thanh Long">Chỉ Thanh Long</option>
        </select>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-lg border border-emerald-100 relative overflow-hidden min-h-[500px]">
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Render Farmers as absolute points via pseudo coordinates mapped to % */}
        <div className="absolute inset-4 md:inset-10">
          {displayNodes.map((m, i) => {
            const x = ((m.lng - 105.7) / 0.2) * 100;
            const y = ((m.lat - 20.9) / 0.2) * 100;
            const isAlert = m.status === 'warning';
            return (
              <div 
                key={m.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ left: `${Math.max(10, Math.min(x, 90))}%`, top: `${Math.max(10, Math.min(y, 90))}%` }}
                onMouseEnter={() => setActiveHover(m)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {isAlert && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>}
                <div className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white shadow-md ${isAlert ? 'bg-red-500' : 'bg-emerald-500'} ${activeHover?.id === m.id ? 'scale-150 ring-4 ring-emerald-200' : ''} transition-transform`}></div>
              </div>
            );
          })}

          {/* Tooltip Overlay */}
          {activeHover && (
            <div 
              className="absolute z-50 bg-white rounded-2xl shadow-2xl p-4 border-2 border-emerald-100 min-w-[200px] pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
              style={{ left: `calc(${((activeHover.lng - 105.7) / 0.2) * 100}% + 15px)`, top: `calc(${((activeHover.lat - 20.9) / 0.2) * 100}% - 20px)` }}
            >
              <h4 className="font-black text-gray-800 text-lg mb-1">{activeHover.name}</h4>
              <p className="text-emerald-700 text-sm font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded-md mb-3">{activeHover.crop}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1 border-dashed">
                  <span className="text-gray-500">Gói Cước:</span>
                  <span className={activeHover.isPremium ? 'text-yellow-600 font-bold' : 'text-gray-700'}>{activeHover.isPremium ? 'Premium IoT' : 'Standard'}</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-dashed">
                  <span className="text-gray-500">Độ ẩm (AI):</span>
                  <span className="font-bold text-gray-800">{activeHover.moisture ? `${activeHover.moisture}%` : 'Không có (Tay)'}</span>
                </div>
                {activeHover.status === 'warning' && (
                  <div className="flex items-center gap-1 text-red-500 font-bold pt-1 text-xs bg-red-50 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4"/> Cần kiểm tra sâu bệnh gấp
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AICarpooling = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">Điều phối Logistics & Carpool</h2>
        <p className="text-gray-500 font-medium">Giảm 25% chi phí thu hoạch bằng AI Ghép chuyến</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 bg-orange-50 w-64 h-64 rounded-full opacity-50 blur-3xl group-hover:bg-orange-100 transition-colors"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-4 bg-orange-100 rounded-2xl shrink-0"><Truck className="w-10 h-10 text-orange-600" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-black text-orange-900">AI Recommendation (Hot!)</h3>
                  <span className="bg-green-100 text-green-700 font-bold text-xs px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Tối ưu 90%</span>
                </div>
                <p className="text-orange-800 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  Hệ thống tìm thấy <span className="font-black bg-orange-200 px-1 rounded">2 xe tải 3 tấn đang trống chuyến</span> từ nhà xe X chiều về.
                  Đề xuất gom hàng của 12 hộ (Tổng: ~5.4 tấn) khu vực phía Đông Hải Dương ngay chiều tối nay.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    Xác nhận ghép chuyến & Gửi thông báo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-6 text-lg border-b pb-4 border-dashed">Danh sách hộ báo cáo thu hoạch (3 ngày tới)</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-500 shrink-0">Hộ {i}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Ông Nguyễn Văn {i}</h4>
                      <p className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">Dự kiến: 450 kg Vải</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-right w-full sm:w-auto">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tọa độ</p>
                    <p className="text-sm font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded-md inline-block">Khu Đông ({i}.2km)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-emerald-400 font-black text-xl mb-6">Trạm điều hướng Live</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Hạm đội xe</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">Xe trống (Sẵn sàng)</span><span className="text-emerald-400">4 / 15</span></div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Dự báo cước</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">Giá xăng dầu</span><span className="text-red-400">Tăng nhẹ +0.2%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">Chứng Nhận & Báo Cáo</h2>
          <p className="text-gray-500 font-medium">Xuất tệp minh bạch, làm việc với Siêu thị & Đối tác XK</p>
        </div>
        <button className="bg-emerald-800 hover:bg-emerald-900 text-yellow-400 px-6 py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 group w-full md:w-auto justify-center">
          <Printer className="w-5 h-5 group-hover:animate-bounce"/> Xuất báo cáo PDF minh bạch
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100 lg:min-h-[500px]">
        <h3 className="font-bold text-gray-800 mb-6 text-lg border-b pb-4 border-dashed flex items-center gap-2">
          <ShieldCheck className="text-emerald-500 w-6 h-6"/> VietGAP Tracker
        </h3>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-widest font-bold border-b-2 border-gray-100">
                <th className="pb-4 pt-2">Hộ Thành Viên</th>
                <th className="pb-4 pt-2">Loại Cây</th>
                <th className="pb-4 pt-2">Tiến Độ Ghi Chép (%)</th>
                <th className="pb-4 pt-2">Tiêu Chí Thiếu</th>
                <th className="pb-4 pt-2 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Hộ Trần Văn T', crop: 'Vải thiều', prog: 100, miss: '-', isPremium: true },
                { name: 'Hộ Cường D', crop: 'Thanh Long', prog: 75, miss: 'Mẫu test hóa chất Đợt 2', isPremium: false },
                { name: 'Hộ Lê K', crop: 'Nhãn lồng', prog: 40, miss: 'Nhật ký bón phân tháng 3, Xử lý rác thải', isPremium: false },
              ].map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{m.name}</p>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-bold inline-block">{m.isPremium ? 'Premium (Tự động)' : 'Standard (Thủ công)'}</span>
                  </td>
                  <td className="py-4 font-medium text-emerald-700">{m.crop}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        <div className={`h-full ${m.prog === 100 ? 'bg-green-500' : m.prog > 50 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{width: `${m.prog}%`}}></div>
                      </div>
                      <span className="text-sm font-bold text-gray-600">{m.prog}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    {m.prog === 100 ? <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Đầy đủ</span> : <span className="text-red-500 text-sm font-medium pr-4">{m.miss}</span>}
                  </td>
                  <td className="py-4 text-right">
                    {m.prog < 100 && (
                      <button className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <MessageCircle className="w-4 h-4"/> Nhắc App
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};