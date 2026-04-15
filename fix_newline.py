with open('src/data/translations.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('Dự Kiến Thu:\\nHoạch:', 'Dự Kiến Thu Hoạch:')
text = text.replace('Dự Kiến Thu:\nHoạch:', 'Dự Kiến Thu Hoạch:')

with open('src/data/translations.js', 'w', encoding='utf-8') as f:
    f.write(text)
