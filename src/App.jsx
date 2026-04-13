import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScanLine, ShieldCheck, Activity, Fingerprint, 
  X, Sprout, PackageCheck, Store, Globe,
  ClipboardCheck, CheckCircle2, Leaf, Coins
} from 'lucide-react';

import { t, INITIAL_PRODUCTS } from './data/constants.js';
import { ConsumerMarketplace } from './components/ConsumerMarketplace.jsx';
import { FarmerDashboard } from './components/FarmerDashboard.jsx';
import { AdminLedger } from './components/AdminLedger.jsx';
import { JourneyStep } from './components/Shared.jsx';

export const App = () => {
  const [role, setRole] = useState('consumer'); // 'consumer' or 'farmer'
  const [activeTab, setActiveTab] = useState('consumer');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lang, setLang] = useState('vi');
  const [currency, setCurrency] = useState('VND');
  const [showTrace, setShowTrace] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);

  const handleScan = (product) => { 
    setIsScanning(true); 
    setTimeout(() => { 
      setIsScanning(false); 
      setSelectedProduct(product); 
    }, 1500); 
  };
  
  const toggleRole = () => {
    if (role === 'consumer') { setRole('farmer'); setActiveTab('farmer'); }
    else { setRole('consumer'); setActiveTab('consumer'); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20 md:pb-0 font-sans">
      <header className="bg-brand-teal text-white sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <img src="./images/farmera_logo.png" alt="FARMERA Logo" className="h-10 md:h-12 lg:h-14 object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            <span className="text-2xl font-bold tracking-tight" style={{display: 'none'}}>FARMERA</span>
          </div>
          
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center justify-center flex-1">
            {role === 'consumer' ? (
              <button 
                onClick={() => setActiveTab('consumer')} 
                className={`font-medium pb-1 ${activeTab === 'consumer' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
              >
                {t[lang].nav_market}
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setActiveTab('farmer')} 
                  className={`font-medium pb-1 ${activeTab === 'farmer' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
                >
                  {t[lang].nav_farm}
                </button>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`font-medium pb-1 ${activeTab === 'admin' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
                >
                  {t[lang].nav_ledger}
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button onClick={toggleRole} className="text-xs md:text-sm font-bold underline px-2 hover:text-brand-green transition-colors">
              {role === 'consumer' ? 'Farmer Mode' : 'Client Mode'}
            </button>

            {/* Currency Switcher */}
            <div className="relative group h-full flex items-center cursor-pointer">
              <button className="flex items-center gap-1 font-medium hover:text-brand-green outline-none py-2 text-sm md:text-base">
                <Coins className="w-5 h-5"/> <span className="uppercase">{currency}</span>
              </button>
              <div className="absolute right-0 top-full pt-4 w-24 hidden group-hover:block z-50">
                <div className="bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-800 border overflow-hidden">
                  <button onClick={()=>setCurrency('VND')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">VND</button>
                  <button onClick={()=>setCurrency('USD')} className="block w-full text-left px-4 py-3 hover:bg-brand-light border-y font-medium text-sm transition-colors text-gray-800">USD</button>
                  <button onClick={()=>setCurrency('KRW')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">KRW</button>
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative group h-full flex items-center cursor-pointer">
              <button className="flex items-center gap-1 font-medium hover:text-brand-green outline-none py-2 text-sm md:text-base">
                <Globe className="w-5 h-5"/> <span className="uppercase">{lang}</span>
              </button>
              <div className="absolute right-0 top-full pt-4 w-32 hidden group-hover:block z-50">
                <div className="bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-800 border overflow-hidden">
                  <button onClick={()=>setLang('en')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">English (EN)</button>
                  <button onClick={()=>setLang('vi')} className="block w-full text-left px-4 py-3 hover:bg-brand-light border-y font-medium text-sm transition-colors text-gray-800">Tiếng Việt (VI)</button>
                  <button onClick={()=>setLang('ko')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">한국어 (KO)</button>
                </div>
              </div>
            </div>

            <button onClick={()=>setShowTrace(true)} className="bg-brand-green md:ml-4 hover:bg-emerald-600 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base whitespace-nowrap">
              <Fingerprint className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span className="hidden sm:inline">{t[lang].nav_trace}</span><span className="sm:hidden text-xs">Trace</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'consumer' && ( 
            <motion.div key="consumer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <ConsumerMarketplace products={products} lang={lang} currency={currency} onScan={handleScan} /> 
            </motion.div> 
          )}
          {activeTab === 'farmer' && ( 
            <motion.div key="farmer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <FarmerDashboard products={products} setProducts={setProducts} lang={lang} setShowActionPlan={setShowActionPlan} /> 
            </motion.div> 
          )}
          {activeTab === 'admin' && ( 
            <motion.div key="admin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <AdminLedger lang={lang} /> 
            </motion.div> 
          )}
        </AnimatePresence>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-around p-3 z-40 border-t border-gray-100">
        {role === 'consumer' ? (
          <button onClick={() => setActiveTab('consumer')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeTab === 'consumer' ? 'text-brand-green bg-brand-light' : 'text-gray-500'}`}>
            <Store className="w-6 h-6" /> <span className="text-[10px] mt-1 font-semibold">{t[lang].store}</span>
          </button>
        ) : (
          <>
            <button onClick={() => setActiveTab('farmer')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeTab === 'farmer' ? 'text-brand-green bg-brand-light' : 'text-gray-500'}`}>
              <Activity className="w-6 h-6" /> <span className="text-[10px] mt-1 font-semibold">{t[lang].farm}</span>
            </button>
            <button onClick={() => setActiveTab('admin')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeTab === 'admin' ? 'text-brand-green bg-brand-light' : 'text-gray-500'}`}>
              <Fingerprint className="w-6 h-6" /> <span className="text-[10px] mt-1 font-semibold">{t[lang].ledger}</span>
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {isScanning && (
          <motion.div className="fixed inset-0 bg-brand-teal/90 z-50 flex flex-col items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}> <ScanLine className="w-24 h-24 text-brand-green mb-4" /> </motion.div>
            <h2 className="text-2xl text-white font-bold animate-pulse">{t[lang].reading}</h2>
          </motion.div>
        )}

        {selectedProduct && !isScanning && (
          <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <motion.div className="bg-white w-full max-w-md lg:max-w-lg h-full overflow-y-auto shadow-2xl relative" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between border-b z-10">
                <h2 className="text-xl flex items-center gap-2 font-bold text-brand-teal"> <ShieldCheck className="text-brand-green" /> {t[lang].auth_ver} </h2>
                <button onClick={() => setSelectedProduct(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"> <X className="w-5 h-5 text-gray-600" /> </button>
              </div>
              
              <div className="p-6">
                <img src={selectedProduct.image} alt={selectedProduct.name[lang]} className="w-full h-56 object-cover rounded-xl shadow-md mb-6" />
                <h3 className="text-2xl font-bold mb-1">{selectedProduct.name[lang]}</h3>
                <p className="text-gray-500 mb-6 flex items-center gap-1"><Store className="w-4 h-4"/> {selectedProduct.farm} • {selectedProduct.origin}</p>
                
                <div className="bg-brand-light border border-brand-green/20 rounded-xl p-4 mb-8">
                  <p className="text-xs text-brand-teal uppercase font-bold tracking-widest mb-2">{t[lang].contract}</p>
                  <p className="font-mono text-sm text-gray-700 break-all bg-white p-2 rounded border">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                </div>

                {selectedProduct.certs && selectedProduct.certs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-bold text-lg mb-3 text-brand-teal flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green" /> {lang === 'vi' ? 'Chứng nhận & Tiêu chuẩn' : 'Certifications'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.certs.map(cert => (
                        <span key={cert} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <h4 className="font-bold text-lg mb-4 text-brand-teal">{t[lang].lifecycle}</h4>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-green before:to-transparent">
                  <JourneyStep icon={<Sprout />} title={t[lang].seed} desc={t[lang].seed_desc} time="Mar 01, 2026" />
                  
                  {selectedProduct.logs && selectedProduct.logs.map((log, index) => (
                    <JourneyStep 
                      key={index} 
                      icon={<ClipboardCheck className="w-5 h-5" />} 
                      title={log.type} 
                      desc={log.details} 
                      time={log.date} 
                    />
                  ))}

                  <JourneyStep icon={<Activity />} title={t[lang].iot} desc={t[lang].iot_desc} time="Mar - Apr, 2026" />
                  <JourneyStep icon={<Leaf />} title={t[lang].harvest} desc={t[lang].harvest_desc} time="Apr 12, 2026" />
                  <JourneyStep icon={<PackageCheck />} title={t[lang].pack} desc={t[lang].pack_desc} time="Apr 12, 2026" isLast />
                </div>
                
                <div className="mt-10 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1595825833444-94e4fbd604f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farmer" className="w-full h-48 object-cover" />
                  <div className="p-4 bg-white">
                    <p className="font-bold">{t[lang].meet_farmer} Nguyen Van A</p>
                    <p className="text-sm text-gray-500">{t[lang].farmer_quote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showTrace && (
          <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-brand-teal/80 backdrop-blur-sm" onClick={() => setShowTrace(false)} />
            <motion.div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl relative overflow-hidden z-10" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: 'spring', damping: 25 }}>
              <div className="bg-brand-teal p-6 text-white text-center">
                <Fingerprint className="w-16 h-16 mx-auto mb-4 text-brand-green mix-blend-screen" />
                <h2 className="text-2xl font-bold">{t[lang].nav_trace}</h2>
                <p className="text-white/80 mt-2 text-sm">{t[lang].demo_desc}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">{t[lang].prod_scanned}</p>
                    <p className="font-bold text-brand-teal">Premium Organic Rice</p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-brand-green" />
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">{t[lang].harvest_date}</p>
                    <p className="font-bold text-brand-teal">{t[lang].days_ago}</p>
                  </div>
                  <Activity className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                <button onClick={() => setShowTrace(false)} className="bg-brand-green hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 w-full">
                  {t[lang].close_demo}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showActionPlan && (
          <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-teal-900/80 backdrop-blur-sm" onClick={() => setShowActionPlan(false)} />
            <motion.div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl relative overflow-hidden z-10" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: 'spring', damping: 25 }}>
              <div className="bg-gradient-to-r from-brand-teal to-teal-700 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg"><Activity className="w-6 h-6" /></div>
                  <h2 className="text-xl font-bold">{t[lang].ai_rec}</h2>
                </div>
                <button onClick={() => setShowActionPlan(false)} className="text-white/70 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
                  <h4 className="font-bold text-orange-800 mb-1">{t[lang].market_opp}</h4>
                  <p className="text-sm text-orange-700">{t[lang].ai_desc}</p>
                </div>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                  <JourneyStep icon={<Activity className="w-5 h-5"/>} title={t[lang].today} desc={t[lang].today_desc} time={t[lang].now} />
                  <JourneyStep icon={<Leaf className="w-5 h-5"/>} title={t[lang].tomorrow} desc={t[lang].tomorrow_desc} time={t[lang].in_1_day} />
                  <JourneyStep icon={<PackageCheck className="w-5 h-5"/>} title={t[lang].day_3} desc={t[lang].day_3_desc} time={t[lang].in_2_days} isLast />
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button onClick={() => setShowActionPlan(false)} className="bg-brand-teal hover:bg-teal-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  {t[lang].understood}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
