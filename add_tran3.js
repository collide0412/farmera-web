const fs = require('fs');
const file = 'src/data/translations.js';
let content = fs.readFileSync(file, 'utf8');

const tEn = "\n    nav_client_mode: 'Client Mode',\n    nav_farmer_mode: 'Farmer Mode',\n    nav_htx_mode: 'HTX Mode',\n    cg_upload_verify: 'Upload Docs & Verify',\n    cg_hash_gen_alert: 'File Hash (IPFS) Generated for Step ',\n";
const tVn = "\n    nav_client_mode: 'Ch? d? Hành khách',\n    nav_farmer_mode: 'Ch? d? Nông dân',\n    nav_htx_mode: 'Ch? d? HTX',\n    cg_upload_verify: 'T?i tài li?u & Xác minh',\n    cg_hash_gen_alert: 'Ðã t?o mã Hash t?p tin (IPFS) cho Bu?c ',\n";
const tKo = "\n    nav_client_mode: '????? ??',\n    nav_farmer_mode: '?? ??',\n    nav_htx_mode: '?? ??',\n    cg_upload_verify: '?? ??? ? ??',\n    cg_hash_gen_alert: '1??? ?? ?? ??(IPFS)? ???????. ??: ',\n";

content = content.replace(/(en: \{)/, "$1" + tEn);
content = content.replace(/(vn: \{)/, "$1" + tVn);
content = content.replace(/(ko: \{)/, "$1" + tKo);

fs.writeFileSync(file, content);
