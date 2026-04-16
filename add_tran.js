const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('app_desc:')) {
  content = content.replace(/en: \{/, `en: {
    app_desc: 'Smart Agriculture digitization platform connecting Farmers, Cooperatives, and Consumers through Blockchain & IoT.',
    contact_team: 'Contact Our Team',
    location: 'Hanoi, Vietnam',
    support_team: 'Support',
    guide_reg: 'Standard Registration Guide',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    report_issue: 'Report an Issue',
    vietgap_desc: 'Vietnamese Std',
    globalgap_desc: 'International Std',
    organic_desc: 'Organic/Bio',
    docs_fees: 'Docs & Fees',
    read_docs: 'Read detailed documentation',
    key_benefits: 'Key Benefits',
    benefit_1: 'Increase market price by 30%',
    benefit_2: 'Easier export to strict markets',
    benefit_3: 'Priority for Coop support programs',
    log_success: 'Log added successfully!',
    farming_log: 'Farming Logbook',
    field_product: 'Product',
    field_date: 'Date',
    date_format: 'en-US',`);

  content = content.replace(/vi: \{/, `vi: {
    app_desc: 'Nền tảng số hóa Nông nghiệp thông minh, kết nối trực tiếp Nông dân, Hợp tác xã và Người tiêu dùng thông qua Blockchain & IoT.',
    contact_team: 'Liên Hệ Đội Ngũ',
    location: 'Hà Nội, Việt Nam',
    support_team: 'Hỗ trợ',
    guide_reg: 'Hướng dẫn Đăng ký Tiêu chuẩn',
    privacy: 'Chính sách bảo mật',
    terms: 'Điều khoản sử dụng',
    report_issue: 'Báo cáo sự cố',
    vietgap_desc: 'Tiêu chuẩn Việt Nam',
    globalgap_desc: 'Tiêu chuẩn Quốc tế',
    organic_desc: 'Hữu cơ',
    docs_fees: 'Hồ sơ & Chi phí',
    read_docs: 'Đọc tài liệu hướng dẫn chi tiết',
    key_benefits: 'Lợi ích khi đăng ký',
    benefit_1: 'Tăng 30% giá bán ra thị trường',
    benefit_2: 'Dễ dàng xuất khẩu vào các thị trường khó tính',
    benefit_3: 'Được ưu tiên hỗ trợ từ ngân sách HTX',
    log_success: 'Đã thêm nhật ký!',
    farming_log: 'Nhật ký Canh tác',
    field_product: 'Sản phẩm',
    field_date: 'Ngày thực hiện',
    date_format: 'vi-VN',`);

  content = content.replace(/ko: \{/, `ko: {
    app_desc: '블록체인 및 IoT를 통해 농부, 협동조합, 소비자를 직접 연결하는 스마트 농업 디지털화 플랫폼입니다.',
    contact_team: '팀 연락하기',
    location: '베트남 하노이',
    support_team: '지원',
    guide_reg: '표준 등록 가이드',
    privacy: '개인정보처리방침',
    terms: '서비스 약관',
    report_issue: '문제 신고',
    vietgap_desc: '베트남 표준',
    globalgap_desc: '국제 표준',
    organic_desc: '유기농',
    docs_fees: '서류 및 비용',
    read_docs: '상세 문서 읽기',
    key_benefits: '주요 혜택',
    benefit_1: '시장 판매 가격 30% 상승',
    benefit_2: '엄격한 시장으로의 수출 용이',
    benefit_3: '협동조합 지원 프로그램 우선권 부여',
    log_success: '일지가 성공적으로 추가되었습니다!',
    farming_log: '농작 일지',
    field_product: '제품',
    field_date: '실행 날짜',
    date_format: 'ko-KR',`);

  fs.writeFileSync(filePath, content, 'utf8');
}
