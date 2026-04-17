const fs = require('fs');

let content = fs.readFileSync('src/components/CoopAdminLayout.jsx', 'utf8');

let start = content.indexOf('<CalendarClock');
if (start === -1) {
    console.log("Could not find start");
    process.exit(1);
}

let endStr = '             </div>';
let end = content.indexOf(endStr, start);

if (end === -1) {
    console.log("Could not find end");
    process.exit(1);
}

let toReplace = content.substring(start, end);

let replacement = `<CalendarClock className="w-8 h-8 text-emerald-500" />
              {t('schedule_details')}
            </h2>

            <div className="space-y-4">
               {[
                 { id: 'HTX-1', dest: t('schedule_dest_1'), time: '08:00 - 10:00', status: t('schedule_st_depart'), driver: 'Trần Văn A', items: t('schedule_item_veg'), size: '1.5 ' + t('unit_tons') },
                 { id: 'HTX-2', dest: t('schedule_dest_2'), time: '11:00 - 15:00', status: t('schedule_st_loading'), driver: 'Lê Văn B', items: t('schedule_item_fruits'), size: '3 ' + t('unit_tons') },
                 { id: 'HTX-3', dest: t('schedule_dest_3'), time: '16:00 - 18:00', status: t('schedule_st_wait'), driver: 'Nguyễn Văn C', items: t('schedule_item_rice'), size: '2 ' + t('unit_tons') }
               ].map((trip) => (
                 <div key={trip.id} className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/50 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex-1 w-full">
                       <h4 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                          <Truck className="w-5 h-5"/> {t('schedule_trip')} {trip.id} 
                          <span className="text-xs px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full">{trip.status}</span>
                       </h4>
                       <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p><span className="font-semibold">{t('schedule_loc')}</span> {trip.dest}</p>
                          <p><span className="font-semibold">{t('schedule_time')}</span> {trip.time}</p>
                          <p><span className="font-semibold">{t('schedule_driver')}</span> {trip.driver} ({t('schedule_weight')} {trip.size})</p>
                          <p><span className="font-semibold">{t('schedule_goods')}</span> {trip.items}</p>
                       </div>
                    </div>
                    <div>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700">{t('schedule_track')}</button>
                    </div>
                 </div>
               ))}`;

content = content.replace(toReplace, replacement);
fs.writeFileSync('src/components/CoopAdminLayout.jsx', content, 'utf8');
console.log('JS Replace successful');
const fs = require('fs');

let content = fs.readFileSync('src/components/CoopAdminLayout.jsx', 'utf8');

let start = content.indexOf('<CalendarClock');
if (start === -1) {
    console.log("Could not find start");
    process.exit(1);
}

let endStr = '             </div>';
let end = content.indexOf(endStr, start);

if (end === -1) {
    console.log("Could not find end");
    process.exit(1);
}

let toReplace = content.substring(start, end);

let replacement = \<CalendarClock className="w-8 h-8 text-emerald-500" />
              {t('schedule_details')}
            </h2>

            <div className="space-y-4">
               {[
                 { id: 'HTX-1', dest: t('schedule_dest_1'), time: '08:00 - 10:00', status: t('schedule_st_depart'), driver: 'Tr?n Van A', items: t('schedule_item_veg'), size: '1.5 ' + t('unit_tons') },
                 { id: 'HTX-2', dest: t('schedule_dest_2'), time: '11:00 - 15:00', status: t('schedule_st_loading'), driver: 'L� Van B', items: t('schedule_item_fruits'), size: '3 ' + t('unit_tons') },
                 { id: 'HTX-3', dest: t('schedule_dest_3'), time: '16:00 - 18:00', status: t('schedule_st_wait'), driver: 'Nguy?n Van C', items: t('schedule_item_rice'), size: '2 ' + t('unit_tons') }
               ].map((trip) => (
                 <div key={trip.id} className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/50 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex-1 w-full">
                       <h4 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                          <Truck className="w-5 h-5"/> {t('schedule_trip')} {trip.id} 
                          <span className="text-xs px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full">{trip.status}</span>
                       </h4>
                       <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p><span className="font-semibold">{t('schedule_loc')}</span> {trip.dest}</p>
                          <p><span className="font-semibold">{t('schedule_time')}</span> {trip.time}</p>
                          <p><span className="font-semibold">{t('schedule_driver')}</span> {trip.driver} ({t('schedule_weight')} {trip.size})</p>
                          <p><span className="font-semibold">{t('schedule_goods')}</span> {trip.items}</p>
                       </div>
                    </div>
                    <div>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700">{t('schedule_track')}</button>
                    </div>
                 </div>
               ))}\;
               
content = content.replace(toReplace, replacement);
fs.writeFileSync('src/components/CoopAdminLayout.jsx', content, 'utf8');
console.log('JS Replace successful');
