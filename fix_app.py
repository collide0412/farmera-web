with open('src/data/translations.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('\"Quét Mã QR\"', '\"Xem Nguồn Gốc\"')
text = text.replace('\"Scan QR\"', '\"View Origin\"')
text = text.replace('\"QR 스캔\"', '\"원산지 보기\"') 
text = text.replace('certifications: \"certifications\",', '') 
text = text.replace('nav_compliance: \"VietGAP / OCOP\",', 'nav_compliance: \"VietGAP / OCOP\", certifications: \"Certifications\", date_mar_1: \"Mar 01, 2026\", date_mar_apr: \"Mar - Apr, 2026\", date_apr_12: \"Apr 12, 2026\",', 1)
text = text.replace('nav_compliance: \"VietGAP / OCOP\",', 'nav_compliance: \"VietGAP / OCOP\", certifications: \"Chứng nhận chất lượng\", date_mar_1: \"01 Th03, 2026\", date_mar_apr: \"Th03 - Th04, 2026\", date_apr_12: \"12 Th04, 2026\",', 1) 
text = text.replace('nav_compliance: \"VietGAP / OCOP\",', 'nav_compliance: \"VietGAP / OCOP\", certifications: \"인증 마크\", date_mar_1: \"2026년 3월 1일\", date_mar_apr: \"2026년 3월 - 4월\", date_apr_12: \"2026년 4월 12일\",', 1)

with open('src/data/translations.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('time="Mar 01, 2026"', "time={t('date_mar_1')}")
app = app.replace('time="Mar - Apr, 2026"', "time={t('date_mar_apr')}")
app = app.replace('time="Apr 12, 2026"', "time={t('date_apr_12')}")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)
