with open('src/components/FarmerDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

import_line = "export const FarmerDashboard = ({ products, setProducts, currency, setShowActionPlan }) => {\n    const { t, lang } = useTranslation();"

add_code = \"\"\"
    const chartDataVariant = {
      ...CHART_DATA,
      datasets: [{
        ...CHART_DATA.datasets[0],
        label: Market Demand (),
        data: CHART_DATA.datasets[0].data.map(val => 
          currency === 'KRW' ? Math.round(val / 18.75) :
          currency === 'USD' ? parseFloat((val / 25000).toFixed(2)) :
          val
        )
      }]
    };
\"\"\"

text = text.replace(import_line, import_line + add_code)
text = text.replace("<Line data={CHART_DATA}", "<Line data={chartDataVariant}")

with open('src/components/FarmerDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/components/FarmZoneMap.jsx', 'r', encoding='utf-8') as f:
    fz = f.read()

fz = fz.replace('NÆ°á»›c', '{t(\\'fz_water\\')}')
fz = fz.replace('Nhiá»‡t', '{t(\\'fz_temp\\')}')

with open('src/components/FarmZoneMap.jsx', 'w', encoding='utf-8') as f:
    f.write(fz)
