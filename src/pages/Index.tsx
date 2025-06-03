
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import IncomeEntry from '@/components/IncomeEntry';
import ExpenseEntry from '@/components/ExpenseEntry';
import BalanceAnalysis from '@/components/BalanceAnalysis';
import FinancialPlanning from '@/components/FinancialPlanning';

const Index = () => {
  const [activeTab, setActiveTab] = useState('income');
  const [incomeData, setIncomeData] = useState({
    basicSalary: 0,
    freelance: 0,
    rent: 0,
    investments: 0,
    other: 0,
    total: 0
  });
  const [expenseData, setExpenseData] = useState({
    housing: 0,
    utilities: 0,
    food: 0,
    transportation: 0,
    education: 0,
    entertainment: 0,
    health: 0,
    savings: 0,
    total: 0
  });

  const balance = incomeData.total - expenseData.total;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'income':
        return <IncomeEntry onIncomeChange={setIncomeData} />;
      case 'expenses':
        return <ExpenseEntry onExpenseChange={setExpenseData} />;
      case 'analysis':
        return <BalanceAnalysis income={incomeData} expenses={expenseData} />;
      case 'planning':
        return <FinancialPlanning balance={balance} />;
      default:
        return <IncomeEntry onIncomeChange={setIncomeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="animate-fade-in">
        {renderActiveTab()}
      </main>
      
      {/* Quick Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-600">الدخل</p>
            <p className="font-bold text-financial-income arabic-numbers">
              {incomeData.total.toLocaleString('ar-SA')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">المصروفات</p>
            <p className="font-bold text-financial-expense arabic-numbers">
              {expenseData.total.toLocaleString('ar-SA')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">الرصيد</p>
            <p className={`font-bold arabic-numbers ${
              balance >= 0 ? 'text-success' : 'text-danger'
            }`}>
              {balance.toLocaleString('ar-SA')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
