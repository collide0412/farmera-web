import React from 'react';
import { LEDGER_LOGS } from '../data/constants.js';
import { useTranslation } from '../contexts/LanguageContext.jsx';

export const AdminLedger = ({ lang }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <h2 className="text-3xl font-black text-brand-teal mb-8">{t('nav_ledger')}</h2>
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
          <tr>
            <th className="p-4">{t('tx_id')}</th>
            <th className="p-4">{t('event_status')}</th>
            <th className="p-4">{t('time')}</th>
            <th className="p-4">{t('hash')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {LEDGER_LOGS.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-mono font-medium text-brand-teal">{log.id}</td>
              <td className="p-4">
                <span className="bg-brand-light text-brand-green px-2 py-1 rounded text-xs font-bold border border-brand-green/20">
                  {log.status[lang] || log.status.en}
                </span>
              </td>
              <td className="p-4 text-gray-600 text-sm">{log.time}</td>
              <td className="p-4 font-mono text-xs text-gray-400">{log.hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};
