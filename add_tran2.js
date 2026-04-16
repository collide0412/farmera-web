const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/date_format: 'en-US',/, `date_format: 'en-US',
    need_support: 'Need Compliance Support?',
    support_desc: 'Our Agri-engineers are ready to provide free consultation on the certification process and paperwork.',
    contact_experts: 'Contact Experts',
    search_products: 'Search products...',
    cat_all: 'All Categories',
    cat_fruit: 'Fruits',
    cat_veg: 'Vegetables',
    cat_rice: 'Rice & Grains',
    std_all: 'All Standards',`);

content = content.replace(/date_format: 'vi-VN',/, `date_format: 'vi-VN',
    need_support: 'Cần hỗ trợ chuyển đổi Tiêu chuẩn?',
    support_desc: 'Đội ngũ Kỹ sư Nông nghiệp của FARMERA luôn sẵn sàng đồng hành, tư vấn miễn phí quy trình và hồ sơ lấy chứng nhận.',
    contact_experts: 'Liên hệ Chuyên gia ngay',
    search_products: 'Tìm kiếm nông sản...',
    cat_all: 'Tất cả danh mục',
    cat_fruit: 'Trái cây',
    cat_veg: 'Rau củ',
    cat_rice: 'Gạo & Ngũ cốc',
    std_all: 'Tất cả tiêu chuẩn',`);

content = content.replace(/date_format: 'ko-KR',/, `date_format: 'ko-KR',
    need_support: '인증 지원이 필요하신가요?',
    support_desc: 'FARMERA의 농업 엔지니어들이 인증 절차와 문서 작업에 대한 무료 상담을 제공합니다.',
    contact_experts: '전문가 문의하기',
    search_products: '농산물 검색...',
    cat_all: '모든 카테고리',
    cat_fruit: '과일',
    cat_veg: '채소',
    cat_rice: '쌀 및 곡물',
    std_all: '모든 표준',`);

fs.writeFileSync(filePath, content, 'utf8');
