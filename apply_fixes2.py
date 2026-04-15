import re

with open('src/components/FarmerDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

add_code = \"\"\"export const FarmerDashboard = ({ products, setProducts, currency, setShowActionPlan }) => {
  const chartDataVariant = {
    ...CHART_DATA,
    datasets: [{
      ...CHART_DATA.datasets[0],
      label: \\ (\/kg)\,
      data: CHART_DATA.datasets[0].data.map(val => 
        currency === 'KRW' ? Math.round(val / 18.75) :
        currency === 'USD' ? parseFloat((val / 25000).toFixed(2)) :
        val
      )
    }]
  };
\"\"\"

text = text.replace("export const FarmerDashboard = ({ products, setProducts, currency, setShowActionPlan }) => {", add_code)
text = text.replace("<Line data={CHART_DATA}", "<Line data={chartDataVariant}")

with open('src/components/FarmerDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/components/FarmZoneMap.jsx', 'r', encoding='utf-8') as f:
    fz = f.read()

fz = fz.replace('NÆ°á»›c', '{t(\\'fz_water\\')}')
fz = fz.replace('Nhiá»‡t', '{t(\\'fz_temp\\')}')

with open('src/components/FarmZoneMap.jsx', 'w', encoding='utf-8') as f:
    f.write(fz)
