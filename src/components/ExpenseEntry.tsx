
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExpenseData {
  housing: number;
  utilities: number;
  food: number;
  transportation: number;
  education: number;
  entertainment: number;
  health: number;
  savings: number;
}

interface ExpenseEntryProps {
  onExpenseChange: (expenses: ExpenseData & { total: number }) => void;
}

const ExpenseEntry: React.FC<ExpenseEntryProps> = ({ onExpenseChange }) => {
  const [expenses, setExpenses] = useState<ExpenseData>({
    housing: 0,
    utilities: 0,
    food: 0,
    transportation: 0,
    education: 0,
    entertainment: 0,
    health: 0,
    savings: 0
  });

  const total = Object.values(expenses).reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    onExpenseChange({ ...expenses, total });
  }, [expenses, total, onExpenseChange]);

  const handleInputChange = (field: keyof ExpenseData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setExpenses(prev => ({ ...prev, [field]: numValue }));
  };

  const expenseFields = [
    { key: 'housing', label: 'السكن / قسط المنزل', icon: '🏠', color: 'border-red-200' },
    { key: 'utilities', label: 'الفواتير (كهرباء، ماء، إنترنت)', icon: '⚡', color: 'border-yellow-200' },
    { key: 'food', label: 'الطعام والبقالة', icon: '🛒', color: 'border-green-200' },
    { key: 'transportation', label: 'المواصلات', icon: '🚗', color: 'border-blue-200' },
    { key: 'education', label: 'التعليم', icon: '📚', color: 'border-purple-200' },
    { key: 'entertainment', label: 'الترفيه', icon: '🎮', color: 'border-pink-200' },
    { key: 'health', label: 'الصحة', icon: '🏥', color: 'border-teal-200' },
    { key: 'savings', label: 'الادخار والاستثمار', icon: '💎', color: 'border-indigo-200' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="card-financial">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-financial-expense flex items-center gap-3">
            <span>💳</span>
            إدخال المصروفات الشهرية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {expenseFields.map((field) => (
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
                    value={expenses[field.key as keyof ExpenseData] || ''}
                    onChange={(e) => handleInputChange(field.key as keyof ExpenseData, e.target.value)}
                    className={`input-financial text-lg border-2 ${field.color}`}
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-3 text-gray-500">ريال</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-financial-expense/10 to-financial-expense/5 rounded-xl border-2 border-financial-expense/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">إجمالي المصروفات الشهرية</p>
              <p className="text-4xl font-bold text-financial-expense arabic-numbers">
                {total.toLocaleString('ar-SA')} ريال
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseEntry;
