import os

c = open('src/data/translations.js', 'r', encoding='utf-8').read()
c = c.replace('fz_no_logs: "No IoT logs available.",', 'fz_no_logs: "No IoT logs available.", fz_water: "Water", fz_temp: "Temp",')
c = c.replace('fz_no_logs: "Chưa có lịch sử IoT cho khu vực này",', 'fz_no_logs: "Chưa có lịch sử IoT cho khu vực này", fz_water: "Nước", fz_temp: "Nhiệt",')
c = c.replace('fz_no_logs: "해당 구역의 IoT 기록이 없습니다.",', 'fz_no_logs: "해당 구역의 IoT 기록이 없습니다.", fz_water: "수분", fz_temp: "온도",')
open('src/data/translations.js', 'w', encoding='utf-8').write(c)

c = open('src/components/FarmZoneMap.jsx', 'r', encoding='utf-8').read()
c = c.replace('NÆ°á»›c', "{t('fz_water')}")
c = c.replace('Nhiá»‡t', "{t('fz_temp')}")
c = c.replace('Â°C', '°C')
open('src/components/FarmZoneMap.jsx', 'w', encoding='utf-8').write(c)

print('Fixed mojibake in FarmZoneMap')
