
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  loading?: boolean;
}

const IncomeEntry: React.FC<IncomeEntryProps> = ({ incomeData, onIncomeChange, loading = false }) => {
  const [income, setIncome] = useState<IncomeData>(incomeData);

  useEffect(() => {
    setIncome(incomeData);
  }, [incomeData]);

  const total = Object.values(income).reduce((sum, value) => sum + value, 0) - income.total;

  useEffect(() => {
    const newTotal = income.basicSalary + income.freelance + income.rent + income.investments + income.other;
    const updatedIncome = { ...income, total: newTotal };
    setIncome(updatedIncome);
    onIncomeChange(updatedIncome);
  }, [income.basicSalary, income.freelance, income.rent, income.investments, income.other]);

  const handleInputChange = (field: keyof Omit<IncomeData, 'total'>, value: string) => {
    const numValue = parseFloat(value) || 0;
    setIncome(prev => ({ ...prev, [field]: numValue }));
  };

  const incomeFields = [
    { key: 'basicSalary', label: 'الراتب الأساسي', icon: '💼' },
    { key: 'freelance', label: 'العمل الحر', icon: '💻' },
    { key: 'rent', label: 'إيجار الممتلكات', icon: '🏠' },
    { key: 'investments', label: 'الاستثمارات', icon: '📈' },
    { key: 'other', label: 'دخل إضافي', icon: '💎' }
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
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-blue-600 flex items-center gap-3">
            <span>💰</span>
            إدخال الدخل الشهري
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {incomeFields.map((field) => (
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
                    className="h-12 md:h-14 text-base md:text-lg pr-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base">ريال</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">إجمالي الدخل الشهري</p>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 arabic-numbers">
                {income.total.toLocaleString('ar-SA')} ريال
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeEntry;
