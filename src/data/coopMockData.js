export const COOP_MEMBERS = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const isPremium = id <= 10;
  const crops = ['Vải thiều', 'Nhãn lồng', 'Thanh Long'];
  const crop = crops[i % crops.length];
  const warning = isPremium && Math.random() > 0.7; // Only premium has real-time warning
  
  return {
    id,
    name: `Hộ ${String.fromCharCode(65 + (i % 26))} ${id}`,
    isPremium,
    crop,
    lat: 21.0 + (Math.random() - 0.5) * 0.1,
    lng: 105.8 + (Math.random() - 0.5) * 0.1,
    vietgapProgress: isPremium ? 100 : Math.floor(Math.random() * 40) + 50,
    status: warning ? 'warning' : 'stable',
    lastFertilized: `2026-04-${Math.floor(Math.random() * 15 + 1).toString().padStart(2, '0')}`,
    harvestEstimate: Math.floor(Math.random() * 500) + 100, // kg
    moisture: isPremium ? Math.floor(Math.random() * 30 + 50) : null
  };
});