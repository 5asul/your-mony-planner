
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinancialSummaryProps {
  balance: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ balance }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-base sm:text-lg font-semibold text-blue-700 mb-1 sm:mb-2">
        {t('availableSavings')}
      </p>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 arabic-numbers break-words">
        {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')} {t('monthly')}
      </p>
      {balance <= 0 && (
        <p className="text-xs sm:text-sm text-red-600 mt-2">
          ⚠️ {t('needBudgetImprovement')}
        </p>
      )}
    </div>
  );
};

export default FinancialSummary;
