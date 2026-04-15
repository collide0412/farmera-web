with open('src/components/FarmerDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

labels_old = \"\"\"    ...CHART_DATA,
    datasets: [{\"\"\"
labels_new = \"\"\"    ...CHART_DATA,
    labels: [t('day_mon'), t('day_tue'), t('day_wed'), t('day_thu'), t('day_fri'), t('day_sat'), t('day_sun')],
    datasets: [{\"\"\"

text = text.replace(labels_old, labels_new)

with open('src/components/FarmerDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
