import os, re

with open('src/components/FarmerDashboard.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix static values
c = c.replace('trend="+2% today"', 'trend="+2%"')
c = c.replace('value="Zero Detected"', 'value="0"')
c = c.replace('trend="Safe"', 'trend=""')
c = c.replace('trend="Stable"', 'trend=""')

# Default state
c = c.replace("useState('Phân bón/Fertilizer')", "useState('f_type_fert')")

# Option values
c = c.replace('<option value="Phân bón/Fertilizer">', '<option value="f_type_fert">')
c = c.replace('<option value="Thuốc BVTV/Pesticide">', '<option value="f_type_pest">')
c = c.replace('<option value="Tưới nước/Watering">', '<option value="f_type_water">')
c = c.replace('<option value="Thu hoạch/Harvest">', '<option value="f_type_harv">')

# Render translate
c = c.replace('<td className="p-4 font-bold text-brand-teal text-sm">{log.type}</td>', '<td className="p-4 font-bold text-brand-teal text-sm">{t(log.type) || log.type}</td>')

with open('src/components/FarmerDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("done")
