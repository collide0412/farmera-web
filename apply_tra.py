with open('src/components/LogisticsWidget.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    ('Est. Harvest:', '{t(\'lw_est_harvest\')}'),
    ('>Days Left<', '>{t(\'lw_days_left\')}<'),
    ('Book Transport ', '{t(\'lw_book\')} '),
    ('Trip #TRK-8821', '{t(\'lw_trip\')} #TRK-8821'),
    ('Route: Farm &rarr; HCM City', '{t(\'lw_route\')}'),
    ('>In Transit<', '>{t(\'lw_in_transit\')}<'),
    ('ETA: 48 hours', '{t(\'lw_eta\')}'),
    ('Estimate Cost', '{t(\'lw_est_cost\')}'),
    ('Total Payload (kg)', '{t(\'lw_payload\')}'),
    ('e.g. 5000', '{t(\'lw_placeholder\')}'),
    ('Dest. Hub', '{t(\'lw_dest\')}'),
    ('>Ho Chi Minh City<', '>{t(\'lw_hcm\')}<'),
    ('>Hanoi Center<', '>{t(\'lw_hanoi\')}<'),
    ('Vehicle Type', '{t(\'lw_type\')}'),
    ('Standard Dry', '{t(\'lw_standard\')}'),
    ('Cold Chain', '{t(\'lw_cold\')}'),
    ('Est. Total:', '{t(\'lw_total\')}'),
    ('Confirm Booking', '{t(\'lw_confirm\')}')
]

for old, new in replacements:
    text = text.replace(old, new)

with open('src/components/LogisticsWidget.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
