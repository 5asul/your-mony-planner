
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExpenseData } from '@/types/financial';

interface ExpenseEntryProps {
  expenseData: ExpenseData;
  onExpenseChange: (expenses: ExpenseData) => void;
  onSave: () => void;
  hasChanges: boolean;
  loading?: boolean;
}

const ExpenseEntry: React.FC<ExpenseEntryProps> = ({ 
  expenseData, 
  onExpenseChange, 
  onSave, 
  hasChanges, 
  loading = false 
}) => {
  const { t, isRTL } = useLanguage();
  const [expenses, setExpenses] = useState<ExpenseData>(expenseData);

  useEffect(() => {
    setExpenses(expenseData);
  }, [expenseData]);

  useEffect(() => {
    const newTotal = expenses.housing + expenses.utilities + expenses.food + expenses.transportation + 
                    expenses.education + expenses.entertainment + expenses.health + expenses.savings;
    const updatedExpenses = { ...expenses, total: newTotal };
    setExpenses(updatedExpenses);
    onExpenseChange(updatedExpenses);
  }, [expenses.housing, expenses.utilities, expenses.food, expenses.transportation, 
      expenses.education, expenses.entertainment, expenses.health, expenses.savings]);

  const handleInputChange = (field: keyof Omit<ExpenseData, 'total'>, value: string) => {
    const numValue = parseFloat(value) || 0;
    setExpenses(prev => ({ ...prev, [field]: numValue }));
  };

  const expenseFields = [
    { key: 'housing', label: t('housing'), icon: t('housingIcon'), color: 'border-red-200 focus:border-red-500' },
    { key: 'utilities', label: t('utilities'), icon: t('utilitiesIcon'), color: 'border-orange-200 focus:border-orange-500' },
    { key: 'food', label: t('food'), icon: t('foodIcon'), color: 'border-emerald-200 focus:border-emerald-500' },
    { key: 'transportation', label: t('transportation'), icon: t('transportIcon'), color: 'border-blue-200 focus:border-blue-500' },
    { key: 'education', label: t('education'), icon: t('educationIcon'), color: 'border-purple-200 focus:border-purple-500' },
    { key: 'entertainment', label: t('entertainment'), icon: t('entertainmentIcon'), color: 'border-pink-200 focus:border-pink-500' },
    { key: 'health', label: t('health'), icon: t('healthIcon'), color: 'border-teal-200 focus:border-teal-500' },
    { key: 'savings', label: t('savings'), icon: t('savingsIcon'), color: 'border-indigo-200 focus:border-indigo-500' }
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
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
            <CardTitle className="text-xl md:text-2xl font-bold text-red-600 flex items-center gap-3">
              <span>💳</span>
              {t('expenseEntry')}
            </CardTitle>
            {hasChanges && (
              <Button 
                onClick={onSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('manualSave')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {expenseFields.map((field) => (
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
                    value={expenses[field.key as keyof Omit<ExpenseData, 'total'>] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof Omit<ExpenseData, 'total'>, e.target.value)}
                    className={`h-12 md:h-14 text-base md:text-lg border-2 transition-colors bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 ${field.color} ${
                      isRTL ? 'pr-12 text-right' : 'pl-4 pr-12 text-left'
                    }`}
                    placeholder="0.00"
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
          
          <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">{t('totalMonthlyExpenses')}</p>
              <p className="text-3xl md:text-4xl font-bold text-red-600 arabic-numbers">
                {expenses.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseEntry;
