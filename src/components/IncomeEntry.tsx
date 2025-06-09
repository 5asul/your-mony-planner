
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface IncomeData {
  basicSalary: number;
  freelance: number;
  rent: number;
  investments: number;
  other: number;
  total: number;
}

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
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl md:text-2xl font-bold text-blue-600 flex items-center gap-3">
              <span>💰</span>
              {t('incomeEntry')}
            </CardTitle>
            {hasChanges && onSave && (
              <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('saveChanges')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {incomeFields.map(field => (
              <div key={field.key} className="space-y-2">
                <Label className="text-base md:text-lg font-semibold flex items-center gap-2">
                  <span className="text-xl">{field.icon}</span>
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income[field.key as keyof Omit<IncomeData, 'total'>] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof Omit<IncomeData, 'total'>, e.target.value)}
                    placeholder="0.00"
                    className={`h-12 md:h-14 text-base md:text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors bg-white focus:bg-white ${
                      isRTL ? 'pr-12 text-right' : 'pl-4 pr-12 text-left'
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <span className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base ${
                    isRTL ? 'right-3' : 'left-3'
                  }`}>
                    {t('currency')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">{t('totalMonthlyIncome')}</p>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 arabic-numbers">
                {income.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
              {hasChanges && (
                <p className="text-sm text-amber-600 mt-2">
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
