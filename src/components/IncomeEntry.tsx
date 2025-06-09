
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncomeData } from '@/types/financial';

interface IncomeEntryProps {
  incomeData: IncomeData;
  onIncomeChange: (income: IncomeData) => void;
  onSave?: () => void;
  hasChanges?: boolean;
  loading?: boolean;
}

const IncomeEntry: React.FC<IncomeEntryProps> = ({
  incomeData,
  onIncomeChange,
  onSave,
  hasChanges = false,
  loading = false
}) => {
  const { t, isRTL } = useLanguage();
  const [income, setIncome] = useState<IncomeData>(incomeData);

  useEffect(() => {
    setIncome(incomeData);
  }, [incomeData]);

  useEffect(() => {
    const newTotal = income.basicSalary + income.freelance + income.rent + income.investments + income.other;
    const updatedIncome = {
      ...income,
      total: newTotal
    };
    setIncome(updatedIncome);
    onIncomeChange(updatedIncome);
  }, [income.basicSalary, income.freelance, income.rent, income.investments, income.other]);

  const handleInputChange = (field: keyof Omit<IncomeData, 'total'>, value: string) => {
    const numValue = parseFloat(value) || 0;
    setIncome(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const incomeFields = [
    { key: 'basicSalary', label: t('basicSalary'), icon: t('salaryIcon') },
    { key: 'freelance', label: t('freelance'), icon: t('freelanceIcon') },
    { key: 'rent', label: t('rent'), icon: t('rentIcon') },
    { key: 'investments', label: t('investments'), icon: t('investmentIcon') },
    { key: 'other', label: t('otherIncome'), icon: t('otherIcon') }
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded mb-3 sm:mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 sm:h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl md:text-2xl">💰</span>
              <span className="leading-tight">{t('incomeEntry')}</span>
            </CardTitle>
            {hasChanges && onSave && (
              <Button 
                onClick={onSave} 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base"
                size="sm"
              >
                {t('saveChanges')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Income Fields Grid - Single Column on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {incomeFields.map(field => (
              <div key={field.key} className="space-y-2">
                <Label className="text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2">
                  <span className="text-base sm:text-lg md:text-xl">{field.icon}</span>
                  <span className="leading-tight">{field.label}</span>
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income[field.key as keyof Omit<IncomeData, 'total'>] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof Omit<IncomeData, 'total'>, e.target.value)}
                    placeholder="0.00"
                    className={`h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors bg-white focus:bg-white ${
                      isRTL ? 'pr-10 sm:pr-12 text-right' : 'pl-3 sm:pl-4 pr-10 sm:pr-12 text-left'
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <span className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm md:text-base ${
                    isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'
                  }`}>
                    {t('currency')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Section - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <p className="text-sm sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">{t('totalMonthlyIncome')}</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 arabic-numbers break-words">
                {income.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
              {hasChanges && (
                <p className="text-xs sm:text-sm text-amber-600 mt-2">
                  ⏳ {t('autoSaving')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeEntry;
