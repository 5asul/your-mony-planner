
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LoadingScreen = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-md mx-auto p-8">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <div className="text-4xl text-white font-bold">💰</div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30 animate-ping"></div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2 animate-fade-in">{t('welcome')}</h1>
          <p className="text-xl text-blue-600 font-semibold animate-fade-in">{t('personalBudgetApp')}</p>
        </div>
        
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-lg text-blue-700 animate-fade-in">{t('loading')}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
