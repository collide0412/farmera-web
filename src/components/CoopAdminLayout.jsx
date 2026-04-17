import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  LayoutDashboard, Users, Map, Truck, ShieldCheck, Download, AlertTriangle, AlertCircle,
  Leaf, Info, Share2, Printer, Factory, MessageCircle, FileText, CheckCircle2, Factory as Store,
  Crown, X, CalendarClock
} from 'lucide-react';
import { COOP_MEMBERS } from '../data/coopMockData.js';
import { formatCurrency } from '../utils/formatters.js';

const HTX_TRANSLATIONS = {
  vi: {
    need_role: "Bạn cần Quyền Quản trị HTX",
    upgrade_desc: "Nâng cấp lên gói quản lý Hợp Tác Xã để mở khóa Tháp Điều Khiển, Bản Đồ Master và Điều phối AI.",
    upgrade_btn: "Nâng cấp lên gói HTX",
    htx_title: "FARMERA HTX",
    htx_subtitle: "Quản trị viên Hệ thống",
    tab_dash: "Tổng quan",
    tab_members: "Thành viên",
    tab_map: "Bản đồ",
    tab_log: "Điều phối AI",
    tab_cert: "Chứng nhận",
    dash_title: "Tháp điều khiển HTX",
    dash_desc: "Theo dõi sức khỏe toàn khu vực trong thời gian thực.",
    stat_members: "Tổng Xã Viên",
    stat_area: "Tổng Diện Tích",
    stat_est: "Dự Kiến Cấp",
    stat_warn: "Cảnh Báo",
    unit_farms: "Hộ",
    unit_ha: "ha",
    unit_tons: "Tấn",
    unit_zones: "Khu",
    chart_title: "Tăng trưởng Sản Lượng (Tấn)",
    mem_title: "Quản lý Thành viên",
    mem_desc: "Danh sách hồ sơ và trạng thái trang trại của xã viên thuộc HTX.",
    th_farmer: "Hộ",
    th_crop: "Cây Trồng",
    th_status: "Trạng Thái",
    th_plan: "Gói Cước",
    badge_prem: "Premium",
    badge_std: "Tiêu chuẩn",
    badge_warn: "Cảnh Báo",
    badge_ok: "Ổn định",
    txt_kg: "kg",
    map_title: "Bản Đồ Master HTX",
    map_desc: "Giám sát thời gian thực. Định vị IoT.",
    map_all: "Tất cả",
    map_premium: "Premium IoT",
    map_standard: "Standard",
    map_moist: "Độ ẩm",
    map_manual: "Tay",
    map_alert: "Kiểm tra",
    log_title: "Điều phối Logistics",
    log_desc: "Giảm 25% chi phí bằng AI",
    log_hot: "AI Đề xuất",
    log_opt: "Tối ưu 90%",
    log_found: "Tìm thấy 2 xe tải đang trống",
    log_detail: "Đề xuất gom hàng của 12 hộ (Tổng: ~5.4 tấn) khu vực phía Đông.",
    log_confirm: "Xác nhận ghép chuyến",
    log_confirmed: "Đã xác nhận & Chuyển lệnh!",
    log_view: "Xem chi tiết lịch trình",
    log_save: "Tiết kiệm ước tính:",
    log_list: "Hộ báo cáo thu hoạch (3 ngày tới)",
    log_est: "Dự kiến:",
    log_pos: "Tọa độ",
    log_live: "Trạm điều hướng Live",
    log_fleet: "Hạm đội xe",
    log_empty: "Xe trống",
    log_base_rate: "Cước nền",
    log_fuel: "Giá xăng dầu",
    txt_farmer_name: "Ông Nguyễn Văn",
    txt_zone_east: "Khu Đông",
    cert_title: "Chứng Nhận & Báo Cáo",
    cert_desc: "Xuất tệp minh bạch, làm việc với Đối tác",
    cert_btn: "Xuất PDF",
    cert_th_name: "Hộ",
    cert_th_crop: "Cây Trồng",
    cert_th_prog: "Tiến Độ (%)",
    cert_th_miss: "Thiếu",
    cert_th_action: "Hành động",
    cert_comp: "Đầy đủ",
    schedule_details: "Chi tiết lịch trình",
    schedule_trip: "Chuyến",
    schedule_loc: "Địa điểm:",
    schedule_time: "Thời gian:",
    schedule_driver: "Tài xế/Xe:",
    schedule_weight: "Tải trọng",
    schedule_goods: "Hàng hóa:",
    schedule_track: "Theo dõi",
    schedule_st_depart: "Sắp khởi hành",
    schedule_st_loading: "Đang xếp hàng",
    schedule_st_wait: "Chờ duyệt",
    schedule_item_veg: "Rau cải, củ cải",
    schedule_item_fruits: "Trái cây các loại",
    schedule_item_rice: "Gạo Lài, Gạch",
    schedule_dest_1: "CH Xanh",
    schedule_dest_2: "Cảng SG",
    schedule_dest_3: "Siêu thị Go",
    cert_remind: "Nhắc App",
  },
  en: {
    need_role: "HTX Admin Required",
    upgrade_desc: "Upgrade to Cooperative plan to unlock features.",
    upgrade_btn: "Upgrade",
    htx_title: "FARMERA HTX",
    htx_subtitle: "System Administrator",
    tab_dash: "Dashboard",
    tab_members: "Members",
    tab_map: "Master Map",
    tab_log: "AI Logistics",
    tab_cert: "Reports",
    dash_title: "HTX Control Tower",
    dash_desc: "Monitor regional health in real time.",
    stat_members: "Total Members",
    stat_area: "Total Area",
    stat_est: "Est. Harvest",
    stat_warn: "Alerts",
    unit_farms: "Farms",
    unit_ha: "ha",
    unit_tons: "Tons",
    unit_zones: "Zones",
    chart_title: "Growth (Tons)",
    mem_title: "Member Management",
    mem_desc: "List of all farmers in the Cooperative.",
    th_farmer: "Farmer",
    th_crop: "Crop",
    th_status: "Status",
    th_plan: "Plan",
    badge_prem: "Premium",
    badge_std: "Standard",
    badge_warn: "Alert Active",
    badge_ok: "Stable",
    txt_kg: "kg",
    map_title: "HTX Master Map",
    map_desc: "Real-time monitoring. Direct IoT positioning.",
    map_all: "All Crops",
    map_premium: "Premium IoT",
    map_standard: "Standard",
    map_moist: "Moisture",
    map_manual: "Manual",
    map_alert: "Urgent",
    log_title: "Logistics & Carpooling",
    log_desc: "Reduce costs by 25% with AI",
    log_hot: "AI Recommendation",
    log_opt: "90% Optimized",
    log_found: "Found two 3-ton trucks empty",
    log_detail: "Proposing to consolidate goods from 12 famers in East Zone.",
    log_confirm: "Confirm Carpool",
    log_confirmed: "Confirmed & Sent Notice!",
    log_view: "View Schedule",
    log_save: "Estimated Savings:",
    log_list: "Harvest Reporting (Next 3 days)",
    log_est: "Estimated:",
    log_pos: "Pos",
    log_live: "Live Nav Station",
    log_fleet: "Fleet Status",
    log_empty: "Empty",
    log_base_rate: "Base rate",
    log_fuel: "Fuel price",
    txt_farmer_name: "Mr. Nguyen Van",
    txt_zone_east: "East Zone",
    cert_title: "Certifications",
    cert_desc: "Export transparent files for negotiating",
    cert_btn: "Export PDF",
    cert_th_name: "Name",
    cert_th_crop: "Crop",
    cert_th_prog: "Progress (%)",
    cert_th_miss: "Missing",
    cert_th_action: "Action",
    cert_comp: "Completed",
    schedule_details: "Schedule Details",
    schedule_trip: "Trip",
    schedule_loc: "Location:",
    schedule_time: "Time:",
    schedule_driver: "Driver/Vehicle:",
    schedule_weight: "Payload",
    schedule_goods: "Goods:",
    schedule_track: "Track",
    schedule_st_depart: "Departing soon",
    schedule_st_loading: "Loading",
    schedule_st_wait: "Pending",
    schedule_item_veg: "Cabbages, Radishes",
    schedule_item_fruits: "Mixed Fruits",
    schedule_item_rice: "Jasmine Rice, Bricks",
    schedule_dest_1: "Green Mart",
    schedule_dest_2: "SG Port",
    schedule_dest_3: "Go Supermarket",
    cert_remind: "Ping App",
  },
  ko: {
    need_role: "HTX 관리자 권한 필요",
    upgrade_desc: "협동조합 관리 플랜으로 업그레이드하세요.",
    upgrade_btn: "업그레이드",
    htx_title: "FARMERA HTX",
    htx_subtitle: "시스템 관리자",
    tab_dash: "대시보드",
    tab_members: "회원",
    tab_map: "마스터 지도",
    tab_log: "AI 물류",
    tab_cert: "보고서",
    dash_title: "HTX 관제탑",
    dash_desc: "지역 건강 실시간 모니터링.",
    stat_members: "총 회원수",
    stat_area: "총 면적",
    stat_est: "예상 수확량",
    stat_warn: "경고",
    unit_farms: "농장",
    unit_ha: "ha",
    unit_tons: "톤",
    unit_zones: "구역",
    chart_title: "성장 (톤)",
    mem_title: "회원 관리",
    mem_desc: "모든 농부 목록.",
    th_farmer: "농부",
    th_crop: "작물",
    th_status: "상태",
    th_plan: "플랜",
    badge_prem: "프리미엄",
    badge_std: "표준",
    badge_warn: "경고",
    badge_ok: "안정",
    txt_kg: "kg",
    map_title: "HTX 마스터 지도",
    map_desc: "실시간 모니터링 및 IoT 위치 추적.",
    map_all: "모든 작물",
    map_premium: "프리미엄 IoT",
    map_standard: "표준",
    map_moist: "수분",
    map_manual: "수동",
    map_alert: "긴급",
    log_title: "물류 및 카풀",
    log_desc: "AI를 통해 비용 25% 절감",
    log_hot: "AI 추천",
    log_opt: "90% 최적화",
    log_found: "빈 역방향 트럭 2대 발견",
    log_detail: "동부 구역 12개 농가의 화물 통합 제안.",
    log_confirm: "카풀 확인",
    log_confirmed: "확인 및 알림 전송!",
    log_view: "일정 세부 정보 보기",
    log_save: "예상 절감액:",
    log_list: "수확 보고 (향후 3일)",
    log_est: "예상:",
    log_pos: "좌표",
    log_live: "실시간 위치",
    log_fleet: "차량 상태",
    log_empty: "비어 있음",
    log_base_rate: "기본 요금",
    log_fuel: "연료비",
    txt_farmer_name: "응우옌 반",
    txt_zone_east: "동부 구역",
    cert_title: "인증 및 보고서",
    cert_desc: "거래를 위한 투명한 파일 내보내기",
    cert_btn: "PDF 내보내기",
    cert_th_name: "이름",
    cert_th_crop: "작물",
    cert_th_prog: "진행률 (%)",
    cert_th_miss: "누락",
    cert_th_action: "작업",
    cert_comp: "완료됨",
    cert_remind: "앱 알림",
  }
};

export const CoopAdminLayout = ({ isPremium = false, lang = "vi", currency = "VND" }) => {
  const [tab, setTab] = useState("dashboard");
  const t = (key) => HTX_TRANSLATIONS[lang]?.[key] || HTX_TRANSLATIONS["vi"][key] || key;
  
  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShieldCheck className="w-20 h-20 text-emerald-800 mb-6" />
        <h2 className="text-3xl font-black text-gray-800 mb-4">{t("need_role")}</h2>
        <p className="text-gray-500 max-w-md mb-8 text-lg">{t("upgrade_desc")}</p>
        <button className="bg-emerald-800 text-white shadow-lg text-lg rounded-xl px-8 py-4 font-bold hover:bg-emerald-900 transition flex items-center gap-2">
          {t("upgrade_btn")} <Factory className="w-5 h-5"/>
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
          <p className="text-xs text-emerald-200">{t("htx_subtitle")}</p>
        </div>
        <nav className="flex md:block md:w-full p-2 md:p-0 gap-2 shrink-0 md:space-y-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: t("tab_dash") },
            { id: "members", icon: Users, label: t("tab_members") },
            { id: "map", icon: Map, label: t("tab_map") },
            { id: "logistics", icon: Truck, label: t("tab_log") },
            { id: "certList", icon: FileText, label: t("tab_cert") },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 md:gap-4 px-4 py-3 md:py-4 transition-all whitespace-nowrap text-sm md:text-base font-bold w-auto md:w-full md:text-left ${tab === item.id ? "bg-emerald-800 border-l-0 md:border-l-4 border-yellow-500 text-yellow-400" : "hover:bg-emerald-900 text-emerald-100 hover:text-white border-l-0 md:border-l-4 border-transparent"}`}
            >
              <item.icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 ${tab === item.id ? "text-yellow-400" : ""}`} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
        {tab === "dashboard" && <HTXDashboard lang={lang} currency={currency} t={t} />}
        {tab === "map" && <MasterMap lang={lang} currency={currency} t={t} />}
        {tab === "logistics" && <AICarpooling lang={lang} currency={currency} t={t} />}
        {tab === "certList" && <Certifications lang={lang} currency={currency} t={t} />}
        {tab === "members" && (
          <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-emerald-100 min-h-[500px]">
            <h3 className="text-2xl font-black text-emerald-900 mb-2">{t("mem_title")}</h3>
            <p className="text-gray-500 font-medium mb-6">{t("mem_desc")}</p>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-widest font-bold border-b-2 border-gray-100">
                    <th className="pb-4 pt-2 w-16">ID</th>
                    <th className="pb-4 pt-2">{t("th_farmer")}</th>
                    <th className="pb-4 pt-2">{t("th_crop")}</th>
                    <th className="pb-4 pt-2">{t("th_plan")}</th>
                    <th className="pb-4 pt-2">{t("th_status")}</th>
                    <th className="pb-4 pt-2 text-right">{t("stat_est")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {COOP_MEMBERS.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 font-mono text-xs text-gray-400">#{String(m.id).padStart(3, "0")}</td>
                      <td className="py-3 font-bold text-gray-800">{m.name}</td>
                      <td className="py-3 font-medium text-emerald-700">{m.crop}</td>
                      <td className="py-3">
                        {m.isPremium ? (
                           <span className="inline-flex gap-1 items-center bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-0.5 rounded text-xs font-bold shadow-sm"><Crown className="w-3 h-3"/> {t("badge_prem")}</span>
                        ) : (
                           <span className="inline-flex gap-1 items-center bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">{t("badge_std")}</span>
                        )}
                      </td>
                      <td className="py-3">
                        {m.status === "warning" ? (
                          <span className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 px-2 py-1 rounded-md inline-flex items-center gap-1 shadow-sm"><AlertCircle className="w-3 h-3"/> {t("badge_warn")}</span>
                        ) : (
                          <span className="text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {t("badge_ok")}</span>
                        )}
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-emerald-900 bg-emerald-50/50">{m.harvestEstimate} <span className="text-gray-400 text-xs">{t("txt_kg")}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ====================== Sub Components ====================== 

const HTXDashboard = ({ t }) => {
  const chartData = {
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [{
      fill: true,
      label: 'Sản Lượng',
      data: [120, 135, 150, 180, 195],
      borderColor: "#059669",
      backgroundColor: "rgba(5, 150, 105, 0.2)",
      tension: 0.4
    }]
  };
  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">{t("dash_title")}</h2>
        <p className="text-gray-500 font-medium">{t("dash_desc")}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t("stat_members"), val: "50", unit: t("unit_farms"), icon: Users },
          { label: t("stat_area"), val: "12.5", unit: t("unit_ha"), icon: Map },
          { label: t("stat_est"), val: "45.2", unit: t("unit_tons"), icon: Leaf },
          { label: t("stat_warn"), val: "3", unit: t("unit_zones"), icon: AlertTriangle, color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color || "text-emerald-500"}`} />
            </div>
            <div>
              <span className={`text-2xl md:text-4xl font-black ${s.color ? s.color : "text-gray-800"}`}>{s.val}</span>
              <span className="text-sm font-bold text-gray-400 ml-1">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-emerald-100 min-h-[300px] flex flex-col">
        <h3 className="font-bold text-gray-800 mb-4">{t("chart_title")}</h3>
        <div className="flex-1 relative min-h-[250px]"><Line data={chartData} options={chartOptions} /></div>
      </div>
    </div>
  );
};

const MasterMap = ({ t }) => {
  const [filter, setFilter] = useState("all");
  const [activeHover, setActiveHover] = useState(null);

  const displayNodes = filter === "all" ? COOP_MEMBERS : COOP_MEMBERS.filter(m => m.crop === filter);

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">{t("map_title")}</h2>
          <p className="text-gray-500 font-medium">{t("map_desc")}</p>
        </div>
        <select 
          className="px-4 py-2 border-2 border-emerald-200 rounded-xl font-bold text-emerald-800 bg-white focus:ring-4 focus:ring-emerald-100 outline-none"
          value={filter} onChange={e => setFilter(e.target.value)}
        >
          <option value="all">{t("map_all")}</option>
          <option value="Vải thiều">Vải thiều</option>
          <option value="Nhãn lồng">Nhãn lồng</option>
          <option value="Thanh Long">Thanh Long</option>
        </select>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-lg border border-emerald-100 relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="absolute inset-4 md:inset-10">
          {displayNodes.map((m) => {
            const x = ((m.lng - 105.7) / 0.2) * 100;
            const y = ((m.lat - 20.9) / 0.2) * 100;
            const isAlert = m.status === "warning";
            return (
              <div 
                key={m.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${m.isPremium ? "z-20" : "z-10"}`}
                style={{ left: `${Math.max(10, Math.min(x, 90))}%`, top: `${Math.max(10, Math.min(y, 90))}%` }}
                onMouseEnter={() => setActiveHover(m)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {isAlert && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>}
                <div className={`relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] border-white shadow-xl ${isAlert ? "bg-red-500" : m.isPremium ? "bg-yellow-400 border-yellow-200" : "bg-emerald-500"} ${activeHover?.id === m.id ? "scale-150 ring-4 ring-emerald-200" : "hover:scale-125"} transition-all`}>
                   {m.isPremium && <Crown className="w-3 h-3 text-yellow-900" />}
                </div>
              </div>
            );
          })}

          {activeHover && (
            <div 
              className="absolute z-50 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-4 border border-emerald-100 min-w-[200px] pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
              style={{ left: `calc(${((activeHover.lng - 105.7) / 0.2) * 100}% + 20px)`, top: `calc(${((activeHover.lat - 20.9) / 0.2) * 100}% - 20px)` }}
            >
              <h4 className="font-black text-gray-800 text-lg mb-1 flex items-center gap-2">
                 {activeHover.name}
                 {activeHover.isPremium && <Crown className="w-4 h-4 text-yellow-500" strokeWidth={3}/>}
              </h4>
              <p className="text-emerald-700 text-sm font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded-md mb-3 border border-emerald-100">{activeHover.crop}</p>
              
              <div className="space-y-2 text-sm bg-gray-50 p-2 rounded-xl">
                <div className="flex justify-between border-b pb-1 border-dashed border-gray-300">
                  <span className="text-gray-500">Plan:</span>
                  <span className={activeHover.isPremium ? "text-yellow-700 font-bold" : "text-gray-700 font-bold"}>{activeHover.isPremium ? t("map_premium") : t("map_standard")}</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-dashed border-gray-300">
                  <span className="text-gray-500">{t("map_moist")}:</span>
                  <span className="font-bold text-emerald-700">{activeHover.moisture ? `${activeHover.moisture}%` : t("map_manual")}</span>
                </div>
                {activeHover.status === "warning" && (
                  <div className="flex items-center gap-1 text-red-600 font-bold pt-2 text-xs">
                    <AlertCircle className="w-4 h-4"/> {t("map_alert")}
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

const AICarpooling = ({ lang, currency, t }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);

  // Quick formatter to fix the NaN issue
  const localFormatMoney = (valInVND, curCode) => {
    let amount = valInVND;
    if (curCode === 'KRW') amount = valInVND * 0.052; // roughly 130,000 KRW
    if (curCode === 'USD') amount = valInVND / 25000; // roughly 100 USD

    const loc = curCode === 'VND' ? 'vi-VN' : curCode === 'KRW' ? 'ko-KR' : 'en-US';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: curCode, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">{t("log_title")}</h2>
        <p className="text-gray-500 font-medium">{t("log_desc")}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 bg-orange-50 w-64 h-64 rounded-full opacity-50 blur-3xl group-hover:bg-orange-100 transition-colors"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-4 bg-orange-100 rounded-2xl shrink-0"><Truck className="w-10 h-10 text-orange-600" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-black text-orange-900">{t("log_hot")}</h3>
                  <span className="bg-green-100 text-green-700 font-bold text-xs px-2 py-0.5 rounded flex items-center gap-1 border border-green-200"><CheckCircle2 className="w-3 h-3"/> {t("log_opt")}</span>
                </div>
                <p className="text-orange-800 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  {t("log_found")}. <br/> {t("log_detail")}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setIsConfirmed(true)}
                    className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 ${isConfirmed ? "bg-green-500 hover:bg-green-600 shadow-green-200 text-white cursor-default" : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 hover:scale-105 active:scale-95"}`}
                    disabled={isConfirmed}
                  >
                    {isConfirmed ? <><CheckCircle2 className="w-5 h-5"/> {t("log_confirmed")}</> : t("log_confirm")}
                  </button>
                  <button 
                    onClick={() => setShowScheduleDetails(true)} 
                    className="bg-white px-5 py-3 rounded-xl font-bold shadow-md transition-colors border border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    {t("log_view")}
                  </button>
                  <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-200 text-green-800">
                     <span className="text-sm">{t("log_save")}</span> <span className="font-black text-lg">{localFormatMoney(2500000, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-6 text-lg border-b pb-4 border-dashed">{t("log_list")}</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-500 shrink-0">{t("unit_farms")} {i}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{t("txt_farmer_name")} {i}</h4>
                      <p className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">{t("log_est")} 450 {t("txt_kg")}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-right w-full sm:w-auto">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t("log_pos")}</p>
                    <p className="text-sm font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded-md inline-block">{t("txt_zone_east")} ({i}.2km)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-emerald-400 font-black text-xl mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> {t("log_live")}</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t("log_fleet")}</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">{t("log_empty")}</span><span className="text-emerald-400">4 / 15</span></div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t("log_base_rate")}</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">{t("log_fuel")}</span><span className="text-red-400">+0.2%</span></div>
                <div className="mt-2 text-xs text-gray-400">Base rate: {localFormatMoney(25000, currency)}/km</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScheduleDetails && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
           onClick={() => setShowScheduleDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setShowScheduleDetails(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-black text-emerald-900 mb-6 flex items-center gap-3">
              <CalendarClock className="w-8 h-8 text-emerald-500" />
              {t('schedule_details')}
            </h2>

            <div className="space-y-4">
               {[
                 { id: "HTX-1", dest: t('schedule_dest_1'), time: "08:00 - 10:00", status: t('schedule_st_depart'), driver: "Trần Văn A", items: t('schedule_item_veg'), size: "1.5 " + t('unit_tons') },
                 { id: "HTX-2", dest: t('schedule_dest_2'), time: "11:00 - 15:00", status: t('schedule_st_loading'), driver: "Lê Văn B", items: t('schedule_item_fruits'), size: "3 " + t('unit_tons') },
                 { id: "HTX-3", dest: t('schedule_dest_3'), time: "16:00 - 18:00", status: t('schedule_st_wait'), driver: "Nguyễn Văn C", items: t('schedule_item_rice'), size: "2 " + t('unit_tons') }
               ].map((trip) => (
                 <div key={trip.id} className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/50 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex-1 w-full">
                       <h4 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                          <Truck className="w-5 h-5"/> {t('schedule_trip')} {trip.id} 
                          <span className="text-xs px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full">{trip.status}</span>
                       </h4>
                       <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p><span className="font-semibold">{t('schedule_loc')}</span> {trip.dest}</p>
                          <p><span className="font-semibold">{t('schedule_time')}</span> {trip.time}</p>
                          <p><span className="font-semibold">{t('schedule_driver')}</span> {trip.driver} ({t('schedule_weight')} {trip.size})</p>
                          <p><span className="font-semibold">{t('schedule_goods')}</span> {trip.items}</p>
                       </div>
                    </div>
                    <div>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700">{t('schedule_track')}</button>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

const Certifications = ({ t }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">{t("cert_title")}</h2>
          <p className="text-gray-500 font-medium">{t("cert_desc")}</p>
        </div>
        <button className="bg-emerald-800 hover:bg-emerald-900 text-yellow-400 px-6 py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 group w-full md:w-auto justify-center">
          <Printer className="w-5 h-5 group-hover:animate-bounce"/> {t("cert_btn")}
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
                <th className="pb-4 pt-2">{t("cert_th_name")}</th>
                <th className="pb-4 pt-2">{t("cert_th_crop")}</th>
                <th className="pb-4 pt-2">{t("cert_th_prog")}</th>
                <th className="pb-4 pt-2">{t("cert_th_miss")}</th>
                <th className="pb-4 pt-2 text-right">{t("cert_th_action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Hộ Trần Văn T', crop: 'Vải thiều', prog: 100, miss: '-', isPremium: true },
                { name: 'Hộ Cường 2', crop: 'Thanh Long', prog: 85, miss: 'Ảnh thu hoạch hôm nay', isPremium: false },
                { name: 'Hộ Lê K', crop: 'Nhãn lồng', prog: 40, miss: 'Nhật ký bón phân', isPremium: false },
              ].map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{m.name}</p>
                    <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 px-2 py-0.5 rounded-md font-bold inline-block mt-1">{m.isPremium ? t("badge_prem") : t("badge_std")}</span>
                  </td>
                  <td className="py-4 font-medium text-emerald-700">{m.crop}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        <div className={`h-full ${m.prog === 100 ? "bg-green-500" : m.prog > 50 ? "bg-yellow-400" : "bg-red-500"}`} style={{width: `${m.prog}%`}}></div>
                      </div>
                      <span className="text-sm font-bold text-gray-600">{m.prog}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    {m.prog === 100 ? <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {t("cert_comp")}</span> : <span className="text-red-500 text-xs font-medium pr-4">{m.miss}</span>}
                  </td>
                  <td className="py-4 text-right">
                    {m.prog < 100 && (
                      <button className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <MessageCircle className="w-4 h-4"/> {t("cert_remind")}
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
