import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
