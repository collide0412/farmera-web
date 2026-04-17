import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScanLine, ShieldCheck, Activity, Fingerprint, 
  X, Sprout, PackageCheck, Store, Globe,
  ClipboardCheck, CheckCircle2, Leaf, Coins,
  Thermometer, Droplets, Crown, Lock, Star,
  MapPin, Phone, Mail, MessageCircle
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

import { INITIAL_PRODUCTS } from './data/constants.js';
import { useTranslation } from './contexts/LanguageContext.jsx';
import { ConsumerMarketplace } from './components/ConsumerMarketplace.jsx';
import { FarmerDashboard } from './components/FarmerDashboard.jsx';
import { AdminLedger } from './components/AdminLedger.jsx';
import { CoopAdminLayout } from './components/CoopAdminLayout.jsx';
import { JourneyStep } from './components/Shared.jsx';

export const App = () => {
  const [role, setRole] = useState('consumer'); // 'consumer' or 'farmer'
  const [activeTab, setActiveTab] = useState('consumer');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('premium') === 'true');
  useEffect(() => { localStorage.setItem('premium', isPremium); }, [isPremium]);
  const [currency, setCurrency] = useState('VND');
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [traceTab, setTraceTab] = useState('info');

  const handleScan = (product) => { 
    setIsScanning(true); 
    setTraceTab('info');
    setTimeout(() => { 
      setIsScanning(false); 
      setSelectedProduct(product); 
    }, 1500); 
  };

  const getSortedTimeline = () => {
    if (!selectedProduct) return [];
    
    // Seed is marked as Mar 1, 2026. Give it a date matching that.
    const timeline = [
      { type: 'seed', desc: 'seed_desc', date: '2026-03-01', hardcoded: true, icon: 'Sprout' }
    ];

    if (selectedProduct.logs) {
      selectedProduct.logs.forEach(log => {
        timeline.push({ type: log.type, desc: log.details, date: log.date, isLog: true, icon: 'ClipboardCheck' });
      });
    }

    if (selectedProduct.id !== 2) {
      // IoT represents the growing phase, let's put it at roughly mid-March so logs don't conflict, 
      // or we can sort by date and let it fall correctly.
      timeline.push({ type: 'iot', desc: 'iot_desc', date: '2026-03-15', hardcoded: true, icon: 'Activity' });
    }

    // Harvest & Pack are April 12, 2026
    timeline.push({ type: 'harvest', desc: 'harvest_desc', date: '2026-04-12', hardcoded: true, icon: 'Leaf' });
    timeline.push({ type: 'pack', desc: 'pack_desc', date: '2026-04-12', hardcoded: true, icon: 'PackageCheck' });

    // Sort ascending by date
    return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const sortedTimeline = getSortedTimeline();
  
  const setRoleAndTab = (newRole) => {
    setRole(newRole);
    setActiveTab(newRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20 md:pb-0 font-sans">
      <header className={`text-white sticky top-0 z-40 shadow-xl transition-all duration-500 ${role === 'coop' ? 'bg-[#064e3b] border-b-4 border-yellow-500' : isPremium ? "bg-emerald-900 border-b-2 border-yellow-500" : "bg-brand-teal"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 md:py-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-2">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2 shrink-0">
              <img src="./images/farmera_logo.png" alt="FARMERA Logo" className="h-10 md:h-12 lg:h-14 object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span className="text-2xl font-bold tracking-tight" style={{display: 'none'}}>FARMERA</span>
            </div>
            
            {role === 'consumer' && (
              <button onClick={() => handleScan(products[0])} className="md:hidden bg-brand-green hover:bg-emerald-600 px-4 py-1.5 rounded-full font-bold shadow-lg flex items-center justify-center gap-1.5 text-sm whitespace-nowrap active:scale-95 transition-transform">
                <Fingerprint className="w-4 h-4 shrink-0" /> {t('nav_trace')}
              </button>
            )}
          </div>
          
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center justify-center flex-1">
            {role === 'consumer' && (
              <button 
                onClick={() => setActiveTab('consumer')} 
                className={`font-medium pb-1 ${activeTab === 'consumer' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
              >
                {t('nav_market')}
              </button>
            )}
            {role === 'farmer' && (
              <>
                <button 
                  onClick={() => setActiveTab('farmer')} 
                  className={`font-medium pb-1 ${activeTab === 'farmer' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
                >
                  {t('nav_farm')}
                </button>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`font-medium pb-1 ${activeTab === 'admin' ? 'border-b-2 border-brand-green text-brand-green' : 'hover:text-brand-green'}`}
                >
                  {t('nav_ledger')}
                </button>
              </>
            )}
            {role === 'coop' && (
               <span className="font-bold text-emerald-200 uppercase tracking-widest text-sm">Trung tâm điều hành</span>
            )}
          </nav>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 md:gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0 pb-1 md:pb-0">
            <div className="flex items-center gap-2">
              <div className="relative group h-full flex items-center cursor-pointer mr-1" tabIndex="0">
                <button className="text-xs md:text-sm font-bold underline hover:text-brand-green transition-colors text-yellow-300 outline-none focus:text-yellow-400">
                  {role === 'consumer' ? t('nav_client_mode') : role === 'farmer' ? t('nav_farmer_mode') : t('nav_htx_mode')}
                </button>
                <div className="absolute left-0 md:left-auto md:right-0 top-full pt-2 md:pt-4 w-40 hidden group-hover:block group-focus-within:block focus-within:block z-50">
                  <div className="bg-white rounded-md shadow-2xl text-gray-800 border overflow-hidden">
                    <button onClick={() => setRoleAndTab('consumer')} className={`block w-full text-left px-4 py-3 hover:bg-brand-light font-bold text-sm transition-colors ${role === 'consumer' ? 'text-brand-teal bg-gray-50' : 'text-gray-600'}`}>{t('nav_client_mode')}</button>
                    <button onClick={() => setRoleAndTab('farmer')} className={`block w-full text-left px-4 py-3 hover:bg-brand-light border-y font-bold text-sm transition-colors ${role === 'farmer' ? 'text-brand-green bg-gray-50' : 'text-gray-600'}`}>{t('nav_farmer_mode')}</button>
                    <button onClick={() => setRoleAndTab('coop')} className={`block w-full text-left px-4 py-3 hover:bg-brand-light font-bold text-sm transition-colors ${role === 'coop' ? 'text-emerald-900 bg-emerald-50' : 'text-gray-600'}`}>{t('nav_htx_mode')}</button>
                  </div>
                </div>
              </div>
                {role === 'farmer' && (
                  <button onClick={() => setIsPremium(!isPremium)} className={`flex items-center gap-1 font-bold px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs transition-colors whitespace-nowrap ${isPremium ? 'bg-yellow-400 text-yellow-900 shadow-md ring-2 ring-yellow-200' : 'bg-teal-800 text-gray-300'}`}>
                    <Crown className="w-3 h-3 md:w-3.5 md:h-3.5"/> {isPremium ? 'Premium' : 'Standard'}
                  </button>
                )}
                {role === 'coop' && (
                  <button onClick={() => setIsPremium(!isPremium)} className={`flex items-center gap-1 font-bold px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs transition-colors whitespace-nowrap ${isPremium ? 'bg-emerald-700 text-yellow-400 shadow-md ring-2 ring-yellow-400/50' : 'bg-emerald-900 text-gray-300 border border-emerald-700'}`}>
                    <Lock className="w-3 h-3 md:w-3.5 md:h-3.5"/> {isPremium ? 'HTX Admin' : 'Guest'}
                  </button>
                )}
            </div>

            <div className="flex items-center justify-end gap-1 md:gap-3">
              {/* Currency Switcher */}
              <div className="relative group h-full flex items-center cursor-pointer" tabIndex="0">
                <button className="flex items-center gap-1 font-medium hover:text-brand-green outline-none py-1 md:py-2 text-[10px] md:text-sm lg:text-base focus:text-brand-green">
                  <Coins className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"/> <span className="uppercase">{currency}</span>
                </button>
                <div className="absolute right-0 top-full pt-2 md:pt-4 w-24 hidden group-hover:block group-focus-within:block focus-within:block z-50">
                  <div className="bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-800 border overflow-hidden">
                    <button onClick={()=>setCurrency('VND')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">VND</button>
                    <button onClick={()=>setCurrency('USD')} className="block w-full text-left px-4 py-3 hover:bg-brand-light border-y font-medium text-sm transition-colors text-gray-800">USD</button>
                    <button onClick={()=>setCurrency('KRW')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">KRW</button>
                  </div>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="relative group h-full flex items-center cursor-pointer ml-1 md:ml-0" tabIndex="0">
                <button className="flex items-center gap-1 font-medium hover:text-brand-green outline-none py-1 md:py-2 text-[10px] md:text-sm lg:text-base focus:text-brand-green">
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"/> <span className="uppercase">{lang}</span>
                </button>
                <div className="absolute right-0 top-full pt-2 md:pt-4 w-32 hidden group-hover:block group-focus-within:block focus-within:block z-50">
                  <div className="bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-gray-800 border overflow-hidden">
                    <button onClick={()=>setLang('en')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">English (EN)</button>
                    <button onClick={()=>setLang('vi')} className="block w-full text-left px-4 py-3 hover:bg-brand-light border-y font-medium text-sm transition-colors text-gray-800">Tiếng Việt (VI)</button>
                    <button onClick={()=>setLang('ko')} className="block w-full text-left px-4 py-3 hover:bg-brand-light font-medium text-sm transition-colors text-gray-800">한국어 (KO)</button>
                  </div>
                </div>
              </div>

              {role === 'consumer' && (
                <button onClick={() => handleScan(products[0])} className="hidden md:flex bg-brand-green md:ml-4 hover:bg-emerald-600 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 items-center justify-center gap-1 md:gap-2 text-sm md:text-base whitespace-nowrap">
                  <Fingerprint className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span>{t('nav_trace')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 w-full mx-auto ${role === 'coop' ? 'max-w-[1920px] p-0' : 'max-w-7xl p-3 sm:p-4 md:p-8'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'consumer' && ( 
            <motion.div key="consumer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <ConsumerMarketplace products={products} lang={lang} currency={currency} onScan={handleScan} isPremium={isPremium} /> 
            </motion.div> 
          )}
          {activeTab === 'farmer' && ( 
            <motion.div key="farmer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <FarmerDashboard products={products} setProducts={setProducts} lang={lang} currency={currency} setShowActionPlan={setShowActionPlan} isPremium={isPremium} /> 
            </motion.div> 
          )}
          {activeTab === 'admin' && ( 
            <motion.div key="admin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}> 
              <AdminLedger lang={lang} /> 
            </motion.div> 
          )}
          {activeTab === 'coop' && (
            <motion.div key="coop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full min-h-[85vh]"> 
              <CoopAdminLayout isPremium={isPremium} lang={lang} currency={currency} /> 
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER - Platform info and team contact */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t-4 border-brand-green relative z-10 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="./images/farmera_logo.png" alt="FARMERA Logo" className="h-10 object-contain bg-white rounded p-1" />
                <span className="text-xl font-bold text-white tracking-tight" style={{display: 'none'}}>FARMERA</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t('app_desc')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><MessageCircle className="w-5 h-5"/></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail className="w-5 h-5"/></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Phone className="w-5 h-5"/></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('contact_team')}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0" />
                  <span>{t('location')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  <span>+84 (0) 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-green shrink-0" />
                  <span>hello@farmera.vn</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('support_team')}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-green transition-colors">{t('guide_reg')}</a></li>
                <li><a href="#" className="hover:text-brand-green transition-colors">{t('privacy')}</a></li>
                <li><a href="#" className="hover:text-brand-green transition-colors">{t('terms')}</a></li>
                <li><a href="#" className="hover:text-brand-green transition-colors">{t('report_issue')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} FARMERA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {role !== 'coop' && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex justify-around p-2 pb-6 z-40 border-t border-gray-100">
          {role === 'consumer' ? (
            <button onClick={() => setActiveTab('consumer')} className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-colors ${activeTab === 'consumer' ? 'text-brand-green bg-brand-light/50' : 'text-gray-400 hover:text-gray-600'}`}>
              <Store className="w-6 h-6" /> <span className="text-[10px] mt-1 font-bold">{t('store')}</span>
            </button>
          ) : (
            <>
              <button onClick={() => setActiveTab('farmer')} className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-colors ${activeTab === 'farmer' ? 'text-brand-green bg-brand-light/50' : 'text-gray-400 hover:text-gray-600'}`}>
                <Activity className="w-6 h-6" /> <span className="text-[10px] mt-1 font-bold">{t('farm')}</span>
              </button>
              <button onClick={() => setActiveTab('admin')} className={`flex flex-col items-center p-2 rounded-xl flex-1 transition-colors ${activeTab === 'admin' ? 'text-brand-green bg-brand-light/50' : 'text-gray-400 hover:text-gray-600'}`}>
                <Fingerprint className="w-6 h-6" /> <span className="text-[10px] mt-1 font-bold">{t('ledger')}</span>
              </button>
            </>
          )}
        </div>
      )}

      <AnimatePresence>
        {isScanning && (
          <motion.div className="fixed inset-0 bg-brand-teal/90 z-50 flex flex-col items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}> <ScanLine className="w-24 h-24 text-brand-green mb-4" /> </motion.div>
            <h2 className="text-2xl text-white font-bold animate-pulse">{t('reading')}</h2>
          </motion.div>
        )}

        {selectedProduct && !isScanning && (
          <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <motion.div className="bg-white w-full max-w-md lg:max-w-lg h-full overflow-y-auto shadow-2xl relative" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between border-b z-10">
                <h2 className="text-xl flex items-center gap-2 font-bold text-brand-teal"> <ShieldCheck className="text-brand-green" /> {t('auth_ver')} </h2>
                <button onClick={() => setSelectedProduct(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"> <X className="w-5 h-5 text-gray-600" /> </button>
              </div>
              
              <div className="p-6">
                <img src={selectedProduct.image} alt={selectedProduct.name[lang]} className="w-full h-56 object-cover rounded-xl shadow-md mb-6" />
                <h3 className="text-2xl font-bold mb-1">{selectedProduct.name[lang]}</h3>
                <p className="text-gray-500 mb-6 flex items-center gap-1"><Store className="w-4 h-4"/> {selectedProduct.farm} • {selectedProduct.origin}</p>
                
                <div className="bg-brand-light border border-brand-green/20 rounded-xl p-4 mb-8">
                  <p className="text-xs text-brand-teal uppercase font-bold tracking-widest mb-2">{t('contract')}</p>
                  <p className="font-mono text-sm text-gray-700 break-all bg-white p-2 rounded border">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                </div>

                {selectedProduct.certs && selectedProduct.certs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-bold text-lg mb-3 text-brand-teal flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-green" /> {t('certifications')}
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

                <div className="flex bg-gray-100 p-1 mb-6 rounded-xl relative gap-1">
                  <button onClick={() => setTraceTab('info')} className={`flex-1 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-colors overflow-hidden truncate ${traceTab === 'info' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t('trace_details_tab')}
                  </button>
                  <button onClick={() => setTraceTab('lifecycle')} className={`flex-1 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-colors overflow-hidden truncate ${traceTab === 'lifecycle' ? 'bg-white shadow text-brand-teal' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t('trace_lifecycle')}
                  </button>
                  <button onClick={() => setTraceTab('environment')} className={`flex-1 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-colors overflow-hidden truncate ${traceTab === 'environment' ? 'bg-white shadow text-brand-green' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t('trace_environment')}
                  </button>
                </div>

                {traceTab === 'info' ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 md:p-5">
                        <ul className="space-y-4">
                           <li className="flex justify-between items-center text-sm md:text-base border-b border-blue-100/50 pb-3">
                             <span className="text-blue-800 font-bold">{t('trace_expiry')}</span>
                             <span className="text-gray-800 font-medium">{selectedProduct.details?.expiry?.[lang] || 'N/A'}</span>
                           </li>
                           <li className="flex justify-between items-center text-sm md:text-base border-b border-blue-100/50 pb-3">
                             <span className="text-blue-800 font-bold">{t('trace_storage')}</span>
                             <span className="text-gray-800 font-medium">{selectedProduct.details?.storage?.[lang] || 'N/A'}</span>
                           </li>
                           <li className="flex justify-between items-start text-sm md:text-base border-b border-blue-100/50 pb-3">
                             <span className="text-blue-800 font-bold max-w-[40%]">{t('trace_nutrition')}</span>
                             <span className="text-gray-800 font-medium text-right max-w-[55%]">{selectedProduct.details?.nutrition?.[lang] || 'N/A'}</span>
                           </li>
                           <li className="flex justify-between items-center text-sm md:text-base border-b border-blue-100/50 pb-3">
                             <span className="text-blue-800 font-bold">{t('trace_area')}</span>
                             <span className="text-gray-800 font-medium">{selectedProduct.details?.area || 'N/A'}</span>
                           </li>
                           <li className="flex justify-between items-center text-sm md:text-base">
                             <span className="text-blue-800 font-bold">{t('trace_distributor')}</span>
                             <span className="text-gray-800 font-medium">{selectedProduct.details?.distributor || 'N/A'}</span>
                           </li>
                        </ul>
                     </div>
                  </div>
                ) : traceTab === 'lifecycle' ? (
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-green before:to-transparent">
                    {(() => {
                      const timeline = [
                        { type: 'seed', desc: 'seed_desc', date: '2026-03-01', base: true, icon: 'Sprout' }
                      ];
                      if (selectedProduct.logs) {
                        selectedProduct.logs.forEach(log => {
                          timeline.push({ type: log.type, desc: log.details, date: log.date, base: false, icon: 'ClipboardCheck' });
                        });
                      }
                      if (selectedProduct.id !== 2) {
                        timeline.push({ type: 'iot', desc: 'iot_desc', date: '2026-03-15', base: true, icon: 'Activity' });
                      }
                      timeline.push({ type: 'harvest', desc: 'harvest_desc', date: '2026-04-12', base: true, icon: 'Leaf' });
                      timeline.push({ type: 'pack', desc: 'pack_desc', date: '2026-04-12', base: true, icon: 'PackageCheck' });

                      return timeline.sort((a, b) => new Date(a.date) - new Date(b.date)).map((item, index) => {
                        let IconComp = ClipboardCheck;
                        if (item.icon === 'Sprout') IconComp = Sprout;
                        if (item.icon === 'Activity') IconComp = Activity;
                        if (item.icon === 'Leaf') IconComp = Leaf;
                        if (item.icon === 'PackageCheck') IconComp = PackageCheck;

                        let timeStr = '';
                        if (item.base) {
                          if (item.type === 'seed') timeStr = t('date_mar_1');
                          else if (item.type === 'iot') timeStr = t('date_mar_apr');
                          else if (item.type === 'harvest' || item.type === 'pack') timeStr = t('date_apr_12');
                        } else {
                          timeStr = new Date(item.date).toLocaleDateString(t('date_format'), {month: 'short', day: 'numeric', year: 'numeric'});
                        }

                        return (
                          <JourneyStep 
                            key={index} 
                            icon={<IconComp className={!item.base ? "w-5 h-5" : ""} />} 
                            title={t(item.type)} 
                            desc={!item.base ? item.desc : t(item.desc)} 
                            time={timeStr} 
                            isLast={index === timeline.length - 1}
                          />
                        );
                      });
                    })()}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {selectedProduct.id === 2 ? (
                      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center mt-4">
                        <Lock className="w-12 h-12 text-gray-400 mb-3" />
                          <h4 className="font-bold text-gray-600 mb-1">{t('iot_lock_title')}</h4>
                          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{t('iot_lock_desc')}</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-green-50 border border-green-500 p-4 rounded-xl mb-6 flex items-start gap-3 relative overflow-hidden">
                              <Crown className="absolute right-[-10px] top-[-10px] w-12 h-12 text-yellow-200/50" />
                              <ShieldCheck className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-bold text-green-800 text-sm flex items-center gap-2">{t('trace_verified_data')} <span className="bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-black">Verified by Block & IoT</span></h4>
                                <p className="text-xs text-green-700 mt-1">{t('trace_verified_desc')}</p>
                              </div>
                            </div>
                          <h4 className="font-bold text-gray-700 text-sm mb-3">{t('trace_7_days')}</h4>
                          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 h-64">
                            <Line 
                              data={{
                                labels: [t('trace_day_1'), t('trace_day_2'), t('trace_day_3'), t('trace_day_4'), t('trace_day_5'), t('trace_day_6'), t('trace_day_7')],
                                datasets: [
                                  { label: t('trace_temp'), data: [28, 29, 27, 26, 30, 28, 27], borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', tension: 0.4, yAxisID: 'y' },
                                  { label: t('trace_humid'), data: [65, 62, 60, 68, 70, 72, 68], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', tension: 0.4, yAxisID: 'y1' }
                                ]
                              }} 
                              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { type: 'linear', position: 'left' }, y1: { type: 'linear', position: 'right' } } }} 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-2 border border-orange-100">
                            <Thermometer className="w-5 h-5 text-orange-500" />
                            <div><p className="text-xs text-orange-600 font-bold">{t('trace_avg_temp')}</p><p className="font-black text-orange-700 text-lg">27.8°C</p></div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2 border border-blue-100">
                            <Droplets className="w-5 h-5 text-blue-500" />
                            <div><p className="text-xs text-blue-600 font-bold">{t('trace_avg_humid')}</p><p className="font-black text-blue-700 text-lg">66.4%</p></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                <div className={`mt-10 rounded-xl overflow-hidden shadow-lg border ${(isPremium && selectedProduct.id !== 2) ? 'border-yellow-400 shadow-yellow-100/50' : 'border-gray-200'}`}>
                    <img src={`./images/${selectedProduct.id === 2 ? 'do_mixi_1.png' : 'do_mixi.png'}?v=${Date.now()}`} alt="Farmer" className="w-full h-48 object-cover" />
                  <div className="p-4 bg-white">
                    <p className="font-bold">{t('meet_farmer')} {selectedProduct.id === 2 ? 'Phùng Văn B' : 'Phùng Văn A'}</p>
                    <p className="text-sm text-gray-500">{t('farmer_quote')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showActionPlan && (
          <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-end md:justify-center p-0 md:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-teal-900/80 backdrop-blur-sm" onClick={() => setShowActionPlan(false)} />
            <motion.div className="bg-white max-w-lg w-full rounded-t-3xl md:rounded-2xl shadow-2xl relative flex flex-col z-10 max-h-[90vh]" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}>
              <div className="bg-gradient-to-r from-brand-teal to-teal-700 p-5 md:p-6 text-white flex flex-col md:flex-row items-center md:justify-between shrink-0 rounded-t-3xl md:rounded-t-none relative">
                <div className="w-12 h-1.5 bg-white/30 rounded-full mb-4 md:hidden" />
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <div className="p-2 bg-white/20 rounded-lg"><Activity className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <h2 className="text-lg md:text-xl font-bold flex-1">{t('ai_rec')}</h2>
                  <button onClick={() => setShowActionPlan(false)} className="text-white/70 hover:text-white md:hidden"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
                </div>
                <button onClick={() => setShowActionPlan(false)} className="text-white/70 hover:text-white hidden md:block"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-5 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3 md:p-4 rounded-r-xl">
                  <h4 className="font-bold text-orange-800 mb-1 text-sm md:text-base">{t('market_opp')}</h4>
                  <p className="text-xs md:text-sm text-orange-700">{t('ai_desc')}</p>
                </div>
                {role === 'farmer' && (
                  <div className="bg-teal-50 border-l-4 border-teal-500 p-3 md:p-4 rounded-r-xl mb-4">
                    <h4 className="font-bold text-teal-800 mb-1 text-sm md:text-base">{t('ai_weather_title')}</h4>
                    <p className="text-xs md:text-sm text-teal-700">{t('ai_weather_alert')}</p>
                  </div>
                )}
                <div className="space-y-3 md:space-y-4 relative before:absolute before:inset-0 before:ml-4 md:before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                  <JourneyStep icon={<Activity className="w-4 h-4 md:w-5 md:h-5"/>} title={t('today')} desc={t('today_desc')} time={t('now')} />
                  <JourneyStep icon={<Leaf className="w-4 h-4 md:w-5 md:h-5"/>} title={t('tomorrow')} desc={t('tomorrow_desc')} time={t('in_1_day')} />
                  <JourneyStep icon={<PackageCheck className="w-4 h-4 md:w-5 md:h-5"/>} title={t('day_3')} desc={t('day_3_desc')} time={t('in_2_days')} isLast />
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                <button onClick={() => setShowActionPlan(false)} className="bg-brand-teal w-full md:w-auto hover:bg-teal-800 text-white font-bold py-3 md:py-2 px-6 rounded-xl md:rounded-lg transition-colors text-sm md:text-base">
                  {t('understood')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
