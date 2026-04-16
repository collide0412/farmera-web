import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  LayoutDashboard, Users, Map, Truck, ShieldCheck, Download, AlertTriangle, AlertCircle,
  Leaf, Info, Share2, Printer, Factory, MessageCircle, FileText, CheckCircle2, Factory as Store,
  Crown
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
    tab_map: "Bản đồ tổng thể",
    tab_log: "Điều phối AI",
    tab_cert: "Báo cáo & Chứng nhận",
    dash_title: "Tháp điều khiển HTX",
    dash_desc: "Theo dõi sức khỏe toàn khu vực trong thời gian thực.",
    stat_members: "Tổng Xã Viên",
    stat_area: "Tổng Diện Tích",
    stat_est: "Dự Kiến Cấp",
    stat_warn: "Cảnh Báo",
    chart_title: "Tăng trưởng Sản Lượng (Tấn)",
    mem_title: "Quản lý Thành viên",
    mem_desc: "Danh sách hồ sơ và trạng thái trang trại của xã viên thuộc HTX.",
    th_farmer: "Hộ Nông Dân",
    th_crop: "Loại Cây",
    th_status: "Trạng Thái",
    th_plan: "Gói Cước",
    badge_prem: "Premium",
    badge_std: "Tiêu chuẩn",
    badge_warn: "Cảnh Báo",
    badge_ok: "Ổn định",
    txt_kg: "kg",
    map_title: "Bản Đồ Master HTX",
    map_desc: "Giám sát 50+ vùng trồng trong thời gian thực. Định vị IoT trực tiếp.",
    map_all: "Tất cả cây trồng",
    map_premium: "Premium IoT",
    map_standard: "Standard",
    map_moist: "Độ ẩm (AI)",
    map_manual: "Không có (Tay)",
    map_alert: "Cần kiểm tra cấp tốc",
    log_title: "Điều phối Logistics & Carpool",
    log_desc: "Giảm 25% chi phí thu hoạch bằng AI Ghép chuyến",
    log_hot: "AI Recommendation (Hot!)",
    log_opt: "Tối ưu 90%",
    log_found: "Hệ thống tìm thấy 2 xe tải 3 tấn đang trống chuyến",
    log_detail: "Đề xuất gom hàng của 12 hộ (Tổng: ~5.4 tấn) khu vực phía Đông Hải Dương ngay chiều tối nay.",
    log_confirm: "Xác nhận ghép chuyến & Chuyển lệnh",
    log_save: "Tiết kiệm ước tính:",
    log_list: "Danh sách hộ báo cáo thu hoạch (3 ngày tới)",
    log_est: "Dự kiến:",
    log_pos: "Tọa độ",
    log_live: "Trạm điều hướng Live",
    log_fleet: "Hạm đội xe",
    log_empty: "Xe trống (Sẵn sàng)",
    cert_title: "Chứng Nhận & Báo Cáo",
    cert_desc: "Xuất tệp minh bạch, làm việc với Siêu thị & Đối tác XK",
    cert_btn: "Xuất báo cáo PDF minh bạch",
    cert_th_name: "Hộ Thành Viên",
    cert_th_crop: "Loại Cây",
    cert_th_prog: "Tiến Độ Ghi Chép (%)",
    cert_th_miss: "Tiêu Chí Thiếu",
    cert_th_action: "Hành động",
    cert_comp: "Đầy đủ",
    cert_remind: "Nhắc App",
  },
  en: {
    need_role: "HTX Admin Role Required",
    upgrade_desc: "Upgrade to the Cooperative management plan to unlock the Control Tower, Master Map, and AI Logistics.",
    upgrade_btn: "Upgrade to HTX Plan",
    htx_title: "FARMERA HTX",
    htx_subtitle: "System Administrator",
    tab_dash: "Dashboard",
    tab_members: "Members",
    tab_map: "Master Map",
    tab_log: "AI Logistics",
    tab_cert: "Reports & Certs",
    dash_title: "HTX Control Tower",
    dash_desc: "Monitor regional health in real time.",
    stat_members: "Total Members",
    stat_area: "Total Area",
    stat_est: "Est. Harvest",
    stat_warn: "Alerts",
    chart_title: "Ecological Yield Growth (Tons)",
    mem_title: "Member Management",
    mem_desc: "List module of all farmers under the Cooperative system.",
    th_farmer: "Farmer",
    th_crop: "Crop Type",
    th_status: "Status",
    th_plan: "Plan",
    badge_prem: "Premium",
    badge_std: "Standard",
    badge_warn: "Alert Active",
    badge_ok: "Stable",
    txt_kg: "kg",
    map_title: "HTX Master Map",
    map_desc: "Real-time monitoring of 50+ planting zones. Direct IoT positioning.",
    map_all: "All Crops",
    map_premium: "Premium IoT",
    map_standard: "Standard",
    map_moist: "Moisture (AI)",
    map_manual: "N/A (Manual)",
    map_alert: "Urgent Pest Inspection",
    log_title: "Logistics & Carpooling",
    log_desc: "Reduce harvest costs by 25% with AI Ride-sharing",
    log_hot: "AI Recommendation (Hot!)",
    log_opt: "90% Optimized",
    log_found: "System found two 3-ton trucks empty on the return trip",
    log_detail: "Proposing to consolidate goods from 12 famers (Total: ~5.4 tons) in East Hai Duong this evening.",
    log_confirm: "Confirm Carpool & Send Notice",
    log_save: "Estimated Savings:",
    log_list: "Harvest Reporting List (Next 3 days)",
    log_est: "Estimated:",
    log_pos: "Coordinates",
    log_live: "Live Nav Station",
    log_fleet: "Fleet Status",
    log_empty: "Empty (Ready)",
    cert_title: "Certifications & Reports",
    cert_desc: "Export transparent files, negotiate with Supermarkets & Exporters",
    cert_btn: "Export Transparent PDF",
    cert_th_name: "Member Name",
    cert_th_crop: "Crop Type",
    cert_th_prog: "Recording Progress (%)",
    cert_th_miss: "Missing Criteria",
    cert_th_action: "Action",
    cert_comp: "Completed",
    cert_remind: "Ping App",
  },
  ko: {
    need_role: "HTX 관리자 권한 필요",
    upgrade_desc: "협동조합 관리 플랜으로 업그레이드하여 관제탑, 마스터 지도, AI 물류를 잠금 해제하세요.",
    upgrade_btn: "HTX 플랜으로 업그레이드",
    htx_title: "FARMERA HTX",
    htx_subtitle: "시스템 관리자",
    tab_dash: "대시보드",
    tab_members: "회원",
    tab_map: "마스터 지도",
    tab_log: "AI 물류",
    tab_cert: "보고서 및 인증",
    dash_title: "HTX 관제탑",
    dash_desc: "실시간으로 지역 건강 모니터링.",
    stat_members: "총 회원수",
    stat_area: "총 면적",
    stat_est: "예상 수확량",
    stat_warn: "경고",
    chart_title: "생태학적 수확량 성장 (톤)",
    mem_title: "회원 관리",
    mem_desc: "협동조합 시스템 하의 모든 농부 목록 모듈.",
    th_farmer: "농부",
    th_crop: "작물 종류",
    th_status: "상태",
    th_plan: "플랜",
    badge_prem: "프리미엄",
    badge_std: "표준",
    badge_warn: "경고",
    badge_ok: "안정",
    txt_kg: "kg",
    map_title: "HTX 마스터 지도",
    map_desc: "50개 이상의 재배 구역 실시간 모니터링. 직접 IoT 위치 추적.",
    map_all: "모든 작물",
    map_premium: "프리미엄 IoT",
    map_standard: "표준",
    map_moist: "수분 (AI)",
    map_manual: "수동",
    map_alert: "긴급 검사 요망",
    log_title: "물류 및 카풀",
    log_desc: "AI 카풀을 통해 수확 비용 25% 절감",
    log_hot: "AI 추천 (인기!)",
    log_opt: "90% 최적화",
    log_found: "빈 귀환 트럭 2대 발견",
    log_detail: "오후에 12개 농가에서 약 5.4톤의 상품 통합 제안.",
    log_confirm: "카풀 확인",
    log_save: "예상 절감액:",
    log_list: "수확 보고 목록 (향후 3일)",
    log_est: "예상:",
    log_pos: "좌표",
    log_live: "실시간 내비 역",
    log_fleet: "차량 상태",
    log_empty: "비어 있음 (준비)",
    cert_title: "인증 및 보고서",
    cert_desc: "투명한 파일 내보내기, 거래 협상",
    cert_btn: "투명 PDF 내보내기",
    cert_th_name: "회원 이름",
    cert_th_crop: "작물 종류",
    cert_th_prog: "진행률 (%)",
    cert_th_miss: "누락 기준",
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
          { label: t("stat_members"), val: "50", unit: "Hộ/Farms", icon: Users },
          { label: t("stat_area"), val: "12.5", unit: "ha", icon: Map },
          { label: t("stat_est"), val: "45.2", unit: "Tấn/Tons", icon: Leaf },
          { label: t("stat_warn"), val: "3", unit: "Khu/Zones", icon: AlertTriangle, color: "text-red-500" },
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
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Render Farmers as absolute points */}
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
                
                {/* Premium marker has distinct shape/color vs Standard marker */}
                <div className={`relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] border-white shadow-xl ${isAlert ? "bg-red-500" : m.isPremium ? "bg-yellow-400 border-yellow-200" : "bg-emerald-500"} ${activeHover?.id === m.id ? "scale-150 ring-4 ring-emerald-200" : "hover:scale-125"} transition-all`}>
                   {m.isPremium && <Crown className="w-3 h-3 text-yellow-900" />}
                </div>
              </div>
            );
          })}

          {/* Tooltip Overlay */}
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
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    {t("log_confirm")}
                  </button>
                  <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-200 text-green-800">
                     <span className="text-sm">{t("log_save")}</span> <span className="font-black text-lg">{formatCurrency(2500000, currency)}</span>
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
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-500 shrink-0">Hộ {i}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Ông Nguyễn Văn {i}</h4>
                      <p className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">{t("log_est")} 450 {t("txt_kg")}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-right w-full sm:w-auto">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t("log_pos")}</p>
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
            <h3 className="text-emerald-400 font-black text-xl mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> {t("log_live")}</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t("log_fleet")}</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">{t("log_empty")}</span><span className="text-emerald-400">4 / 15</span></div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Cước nền</p>
                <div className="flex justify-between font-bold text-lg"><span className="text-white">Giá xăng dầu</span><span className="text-red-400">+0.2%</span></div>
                <div className="mt-2 text-xs text-gray-400">Base rate: {formatCurrency(25000, currency)}/km</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
