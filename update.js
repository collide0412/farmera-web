const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace Trace Demo Texts
code = code.replace(/Interactive demo preview\. Data is verified via blockchain\./g, "{t[lang].demo_desc}");
code = code.replace(/Product Scanned/g, "{t[lang].prod_scanned}");
code = code.replace(/Premium Organic Rice/g, "{selectedProduct?.name[lang] || 'Premium Product'}");
code = code.replace(/Harvest Date/g, "{t[lang].harvest_date}");
code = code.replace(/2 days ago/g, "{t[lang].days_ago}");
code = code.replace(/Close Demo/g, "{t[lang].close_demo}");

// Replace AI Action Plan Texts
code = code.replace(/Market Opportunity Detected/g, "{t[lang].market_opp}");
code = code.replace(/Market price is hitting a peak\. Expected optimal harvest date is in 2 days\. Prepare packaging resources\./g, "{t[lang].ai_desc}");
code = code.replace(/title="Today" desc="Check soil moisture and prepare harvest tools\." time="Now"/g, "title={t[lang].today} desc={t[lang].today_desc} time={t[lang].now}");
code = code.replace(/title="Tomorrow" desc="Begin preliminary harvesting of mature crops\." time="In 1 day"/g, "title={t[lang].tomorrow} desc={t[lang].tomorrow_desc} time={t[lang].in_1_day}");
code = code.replace(/title="Day 3" desc="Package and deploy to smart contracts\." time="In 2 days"/g, "title={t[lang].day_3} desc={t[lang].day_3_desc} time={t[lang].in_2_days}");
code = code.replace(/Understood/g, "{t[lang].understood}");

// Update definitions
code = code.replace(/pack_desc: "Temperature-controlled transit to facility\."\s*\}/, 
\pack_desc: "Temperature-controlled transit to facility.",
        demo_desc: "Interactive demo preview. Data is verified via blockchain.",
        prod_scanned: "Product Scanned",
        harvest_date: "Harvest Date",
        days_ago: "2 days ago",
        close_demo: "Close Demo",
        market_opp: "Market Opportunity Detected",
        today: "Today",
        today_desc: "Check soil moisture and prepare harvest tools.",
        now: "Now",
        tomorrow: "Tomorrow",
        tomorrow_desc: "Begin preliminary harvesting of mature crops.",
        in_1_day: "In 1 day",
        day_3: "Day 3",
        day_3_desc: "Package and deploy to smart contracts.",
        in_2_days: "In 2 days",
        understood: "Understood"
      }\);

code = code.replace(/pack_desc: "Vận chuyển kiểm soát nhiệt độ đến cơ sở\."\s*\}/, 
\pack_desc: "Vận chuyển kiểm soát nhiệt độ đến cơ sở.",
        demo_desc: "Bản xem trước demo. Dữ liệu được xác minh trên blockchain.",
        prod_scanned: "Sản phẩm vừa quét",
        harvest_date: "Ngày Thu Hoạch",
        days_ago: "2 ngày trước",
        close_demo: "Đóng Demo",
        market_opp: "Đã phát hiện cơ hội thị trường",
        today: "Hôm nay",
        today_desc: "Kiểm tra độ ẩm đất và chuẩn bị công cụ thu hoạch.",
        now: "Bây giờ",
        tomorrow: "Ngày mai",
        tomorrow_desc: "Bắt đầu thu hoạch sơ bộ nông sản.",
        in_1_day: "1 ngày nữa",
        day_3: "Ngày 3",
        day_3_desc: "Đóng gói tự động lên smart contract.",
        in_2_days: "2 ngày nữa",
        understood: "Đã hiểu"
      }\);

code = code.replace(/pack_desc: "온도가 조절된 상태로 시설로 이동\."\s*\}/, 
\pack_desc: "온도가 조절된 상태로 시설로 이동.",
        demo_desc: "대화형 데모. 데이터는 블록체인에서 검증됩니다.",
        prod_scanned: "스캔된 제품",
        harvest_date: "수확 날짜",
        days_ago: "2일 전",
        close_demo: "데모 닫기",
        market_opp: "시장 기회 감지됨",
        today: "오늘",
        today_desc: "토양 수분 확인 및 수확 도구 준비.",
        now: "지금",
        tomorrow: "내일",
        tomorrow_desc: "성숙한 작물의 예비 수확 시작.",
        in_1_day: "1일 후",
        day_3: "3일차",
        day_3_desc: "포장하여 스마트 계약에 배포.",
        in_2_days: "2일 후",
        understood: "확인함"
      }\);

fs.writeFileSync('index.html', code);
