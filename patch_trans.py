with open('src/data/translations.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('under_process: \"Being Documented\"', 'under_process: \"Being Documented\", now: \"now\", in_1_day: \"in_1_day\", in_2_days: \"in_2_days\", day_mon: \"Mon\", day_tue: \"Tue\", day_wed: \"Wed\", day_thu: \"Thu\", day_fri: \"Fri\", day_sat: \"Sat\", day_sun: \"Sun\"')

text = text.replace('under_process: \"Đang Cập Nhật\"', 'under_process: \"Đang Cập Nhật\", now: \"bây giờ\", in_1_day: \"1 ngày tới\", in_2_days: \"2 ngày tới\", day_mon: \"T2\", day_tue: \"T3\", day_wed: \"T4\", day_thu: \"T5\", day_fri: \"T6\", day_sat: \"T7\", day_sun: \"CN\"')

text = text.replace('under_process: \"문서화 중\"', 'under_process: \"문서화 중\", now: \"현재\", in_1_day: \"1일 이내\", in_2_days: \"2일 이내\", day_mon: \"월\", day_tue: \"화\", day_wed: \"수\", day_thu: \"목\", day_fri: \"금\", day_sat: \"토\", day_sun: \"일\"')

with open('src/data/translations.js', 'w', encoding='utf-8') as f:
    f.write(text)
