import os

def update_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Financial Impact
update_file('src/components/FinancialImpact.jsx', [
    ("import React from 'react';", "import React from 'react';\nimport { useTranslation } from '../contexts/LanguageContext.jsx';\nimport { formatCurrency } from '../utils/formatters.js';"),
    ("export const FinancialImpact = () => {", "export const FinancialImpact = () => {\n  const { t, currency } = useTranslation();"),
    ("Tổng hiệu quả kinh tế (Năm 2026)", "{t('fi_total_impact')}"),
    ("154.500.000", "{formatCurrency({VND: 154500000, USD: 6500, KRW: 8500000}, currency).replace(' / kg', '')}"),
    ("VNĐ", ""),
    ("Được tối ưu từ việc tiết kiệm phân bón và chênh lệch giá sàn giao dịch trực tiếp.", "{t('fi_impact_desc')}"),
    ("Chi phí đầu vào", "{t('fi_input_cost')}"),
    ("Giá bán trung bình", "{t('fi_avg_price')}"),
    ("Chi phí Phân bón & Vật tư", "{t('fi_fert_cost')}"),
    ("Biểu đồ Phân bổ Doanh thu", "{t('fi_revenue_alloc')}"),
    ("Quý 1", "{t('fi_q1')}"),
    ("Quý 2", "{t('fi_q2')}"),
    ("Quý 3", "{t('fi_q3')}"),
    ("Quý 4", "{t('fi_q4')}"),
    ("Truyền thống (Không AI)", "{t('fi_trad')}"),
    ("Dùng FARMERA AI", "{t('fi_ai')}"),
    ("Thương lái ép giá", "{t('fi_trader')}"),
    ("Giá Bán Chuẩn FARMERA", "{t('fi_platform')}"),
    ("Gạo Lài OCOP", "{t('prod_rice')}"),
    ("Bắp Cải VietGAP", "{t('prod_cab')}"),
    ("Dâu Tây Premium", "{t('prod_straw')}"),
    # Fix garbled mojibake
    ("Tá»•ng hiá»‡u quáº£ kinh táº¿ (NÄƒm 2026)", "{t('fi_total_impact')}"),
    ("Được tá»‘i Æ°u tá»« viá»‡c tiáº¿t kiá»‡m phÃ¢n bÃ³n vÃ  chÃªnh lá»‡ch giÃ¡ sÃ n giao dá»‹ch trá»±c tiáº¿p.", "{t('fi_impact_desc')}"),
    ("Chi phÃ Ä‘áº§u vÃ o", "{t('fi_input_cost')}"),
    ("GiÃ¡ bÃ¡n trung bÃ¬nh", "{t('fi_avg_price')}"),
    ("Chi phÃ PhÃ¢n bÃ³n & Váºt tÆ°", "{t('fi_fert_cost')}"),
    ("QuÃ½ 1", "{t('fi_q1')}"),
    ("QuÃ½ 2", "{t('fi_q2')}"),
    ("QuÃ½ 3", "{t('fi_q3')}"),
    ("QuÃ½ 4", "{t('fi_q4')}"),
    ("Truyá»n thá»‘ng (KhÃ´ng AI)", "{t('fi_trad')}"),
    ("DÃ¹ng FARMERA AI", "{t('fi_ai')}"),
    ("ThÆ°Æ¡ng lÃ¡i Ã©p giÃ¡", "{t('fi_trader')}"),
    ("GiÃ¡ BÃ¡n Cháº©n FARMERA", "{t('fi_platform')}"),
    ("Gáº¡o LÃ i OCOP", "{t('prod_rice')}"),
    ("Báº¯p Cáº£i VietGAP", "{t('prod_cab')}"),
    ("DÃ¢u TÃ¢y Premium", "{t('prod_straw')}"),
    ("Biá»ƒu Ä‘á»“ PhÃ¢n bá»• Doanh thu", "{t('fi_revenue_alloc')}"),
    ("Giá Bán Chẩn", "Giá Bán Chuẩn")
])

# FarmZoneMap
update_file('src/components/FarmZoneMap.jsx', [
    ("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from '../contexts/LanguageContext.jsx';"),
    ("export const FarmZoneMap = () => {", "export const FarmZoneMap = () => {\n  const { t } = useTranslation();"),
    ("Bản đồ Nông trại (IoT & Zoning)", "{t('fz_title')}"),
    ("Báº£n Ä‘á»“ NÃ´ng tráº¡i (IoT & Zoning)", "{t('fz_title')}"),
    ("Khu A (Lúa OCOP)", "{t('fz_zoneA')}"),
    ("Khu B (Cây ăn quả)", "{t('fz_zoneB')}"),
    ("Khu C (Rau màu VietGAP)", "{t('fz_zoneC')}"),
    ("Nhà kho (Storage)", "{t('fz_zoneD')}"),
    ("Khu A (LÃºa OCOP)", "{t('fz_zoneA')}"),
    ("Khu B (CÃ¢y Äƒn quáº£)", "{t('fz_zoneB')}"),
    ("Khu C (Rau mÃ u VietGAP)", "{t('fz_zoneC')}"),
    ("NhÃ kho (Storage)", "{t('fz_zoneD')}"),
    ("Thông số Thời gian thực", "{t('fz_realtime')}"),
    ("ThÃ´ng sá»‘ Thá»i gian thá»±c", "{t('fz_realtime')}"),
    ("Trạng thái Hoạt động", "{t('fz_status')}"),
    ("Tráº¡ng thÃ¡i Hoáº¡t Ä‘á»™ng", "{t('fz_status')}"),
    ("Bình thường", "{t('fz_normal')}"),
    ("BÃ¬nh thÆ°á»ng", "{t('fz_normal')}"),
    ("Cảnh báo: Độ ẩm cực thấp", "{t('fz_alert_moist')}"),
    ("Cáº£nh bÃ¡o: Äá»™ áº©m cá»±c tháº¥p", "{t('fz_alert_moist')}"),
    ("Nhật ký chăm sóc gần đây", "{t('fz_logs')}"),
    ("Nháºt kÃ½ chÄƒm sÃ³c gáº§n Ä‘Ã¢y", "{t('fz_logs')}"),
    ("Chưa có lịch sử IoT cho khu vực này", "{t('fz_no_logs')}"),
    ("ChÆ°a cÃ³ lá»‹ch sá» IoT cho khu vá»±c nÃ y", "{t('fz_no_logs')}")
])

# ComplianceGuide
update_file('src/components/ComplianceGuide.jsx', [
    ("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from '../contexts/LanguageContext.jsx';"),
    ("export const ComplianceGuide = () => {", "export const ComplianceGuide = () => {\n  const { t } = useTranslation();"),
    ("Bản đồ tuân thủ quy chuẩn", "{t('cg_title')}"),
    ("Báº£n Ä‘á»“ tuÃ¢n thá»§ quy chuáº©n", "{t('cg_title')}"),
    ("Các bước thực hiện:", "{t('cg_steps')}")
])

# Also LogisticsWidget
update_file('src/components/LogisticsWidget.jsx', [
    ("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from '../contexts/LanguageContext.jsx';"),
    ("export const LogisticsWidget = () => {", "export const LogisticsWidget = () => {\n  const { t } = useTranslation();"),
    ("Lên lịch Vận chuyển & Giao thương", "{t('lw_title')}"),
    ("LÃªn lá»‹ch Váºn chuyá»ƒn & Giao thÆ°Æ¡ng", "{t('lw_title')}"),
    ("Quản lý Chuyến hàng", "{t('lw_manage')}"),
    ("Quáº£n lÃ½ Chuyáº¿n hÃ ng", "{t('lw_manage')}")
])
