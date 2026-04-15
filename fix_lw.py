with open('src/components/LogisticsWidget.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('placeholder=\"{t(\'lw_placeholder\')}\"', 'placeholder={t(\'lw_placeholder\')}')

with open('src/components/LogisticsWidget.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
