
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface IncomeData {
  total: number;
}

interface ExpenseData {
  total: number;
}

interface QuickSummaryBarProps {
  incomeData: IncomeData;
  expenseData: ExpenseData;
}

const QuickSummaryBar: React.FC<QuickSummaryBarProps> = ({ incomeData, expenseData }) => {
  const { t, isRTL } = useLanguage();
  const balance = incomeData.total - expenseData.total;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-2xl transition-all duration-300 hover:shadow-3xl z-50">
      <div className="max-w-6xl mx-auto p-2 sm:p-3 md:p-4">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-0 flex-1">
            <p className="text-gray-600 mb-1 group-hover:text-blue-600 transition-colors truncate">{t('income')}</p>
            <p className="font-bold text-blue-600 arabic-numbers text-sm md:text-base group-hover:scale-110 transition-transform truncate">
              {incomeData.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
          
          <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-0 flex-1 mx-2">
            <p className="text-gray-600 mb-1 group-hover:text-red-600 transition-colors truncate">{t('expenses')}</p>
            <p className="font-bold text-red-600 arabic-numbers text-sm md:text-base group-hover:scale-110 transition-transform truncate">
              {expenseData.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
          
          <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-0 flex-1">
            <p className="text-gray-600 mb-1 group-hover:text-emerald-600 transition-colors truncate">{t('balance')}</p>
            <p className={`font-bold arabic-numbers text-sm md:text-base group-hover:scale-110 transition-all duration-300 truncate ${
              balance >= 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${Math.min(100, (incomeData.total / (incomeData.total + expenseData.total)) * 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickSummaryBar;
