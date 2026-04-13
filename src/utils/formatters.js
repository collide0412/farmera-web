export const formatCurrency = (pricesObj, currencyCode) => {
  const amount = pricesObj[currencyCode] || pricesObj['VND'];
  if (currencyCode === 'VND') return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount) + ' / kg';
  if (currencyCode === 'KRW') return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount) + ' / kg';
  if (currencyCode === 'USD') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount) + ' / kg';
  return amount + ' / kg';
};