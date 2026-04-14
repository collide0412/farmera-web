import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. Persistent State: Đọc từ LocalStorage (O(1))
  const [lang, setLang] = useState(() => localStorage.getItem('farmera_lang') || 'vi');

  useEffect(() => {
    localStorage.setItem('farmera_lang', lang);
    document.documentElement.lang = lang; // Tối ưu SEO
  }, [lang]);

  // 2. Thuật toán tối ưu hoá (O(1) Tra cứu): 
  // Chỉ tính toán Lại (Merge Objects) 1 lần duy nhất KHI NGÔN NGỮ THAY ĐỔI
  const dict = useMemo(() => {
    const active = translations[lang] || translations['vi'];
    const fallback = translations['en'];
    // Merge: Phủ dữ liệu ngôn ngữ hiện tại lên trên tiếng Anh. 
    // Tránh lỗi undefined nếu ngôn ngữ hiện tại bị khuyết từ (Fallback Pattern).
    return { ...fallback, ...active }; 
  }, [lang]);

  // Hàm dịch siêu nhẹ: Không có vòng lặp, Không if-else tra cứu lồng nhau.
  const t = (key) => dict[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook tiện lợi
export const useTranslation = () => useContext(LanguageContext);
