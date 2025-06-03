
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IncomeData {
  basicSalary: number;
  freelance: number;
  rent: number;
  investments: number;
  other: number;
}

interface IncomeEntryProps {
  onIncomeChange: (income: IncomeData & { total: number }) => void;
}

const IncomeEntry: React.FC<IncomeEntryProps> = ({ onIncomeChange }) => {
  const [income, setIncome] = useState<IncomeData>({
    basicSalary: 0,
    freelance: 0,
    rent: 0,
    investments: 0,
    other: 0
  });

  const total = Object.values(income).reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    onIncomeChange({ ...income, total });
  }, [income, total, onIncomeChange]);

  const handleInputChange = (field: keyof IncomeData, value: string) => {
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="card-financial">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-financial-income flex items-center gap-3">
            <span>💰</span>
            إدخال الدخل الشهري
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {incomeFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <span>{field.icon}</span>
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income[field.key as keyof IncomeData] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof IncomeData, e.target.value)}
                    className="input-financial text-lg"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-3 text-gray-500">ريال</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-financial-income/10 to-financial-income/5 rounded-xl border-2 border-financial-income/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">إجمالي الدخل الشهري</p>
              <p className="text-4xl font-bold text-financial-income arabic-numbers">
                {total.toLocaleString('ar-SA')} ريال
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeEntry;
