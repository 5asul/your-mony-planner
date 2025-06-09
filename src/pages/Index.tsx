import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIncomeData } from '@/hooks/useIncomeData';
import { useExpenseData } from '@/hooks/useExpenseData';
import Navigation from '@/components/Navigation';
import IncomeEntry from '@/components/IncomeEntry';
import ExpenseEntry from '@/components/ExpenseEntry';
import BalanceAnalysis from '@/components/BalanceAnalysis';
import FinancialPlanning from '@/components/FinancialPlanning';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('income');
  const { incomeData, updateIncomeData, saveManually: saveIncome, loading: incomeLoading, hasChanges: incomeHasChanges } = useIncomeData();
  const { expenseData, updateExpenseData, saveManually: saveExpense, loading: expenseLoading, hasChanges: expenseHasChanges } = useExpenseData();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/auth';
    }
  }, [user, authLoading]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-4xl text-white font-bold">💰</div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30 animate-pulse"></div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">مرحباً بك</h1>
            <p className="text-xl text-blue-600 font-semibold">تطبيق إدارة الميزانية الشخصية</p>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-lg text-blue-700">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  const balance = incomeData.total - expenseData.total;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'income':
        return (
          <IncomeEntry 
            incomeData={incomeData} 
            onIncomeChange={updateIncomeData} 
            onSave={saveIncome}
            hasChanges={incomeHasChanges}
            loading={incomeLoading} 
          />
        );
      case 'expenses':
        return (
          <ExpenseEntry 
            expenseData={expenseData} 
            onExpenseChange={updateExpenseData} 
            onSave={saveExpense}
            hasChanges={expenseHasChanges}
            loading={expenseLoading} 
          />
        );
      case 'analysis':
        return <BalanceAnalysis income={incomeData} expenses={expenseData} />;
      case 'planning':
        return <FinancialPlanning balance={balance} />;
      default:
        return (
          <IncomeEntry 
            incomeData={incomeData} 
            onIncomeChange={updateIncomeData} 
            onSave={saveIncome}
            hasChanges={incomeHasChanges}
            loading={incomeLoading} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="animate-fade-in pb-20">
        {renderActiveTab()}
      </main>
      
      {/* Quick Summary Bar - Mobile Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs md:text-sm">
          <div className="text-center">
            <p className="text-gray-600 mb-1">الدخل</p>
            <p className="font-bold text-blue-600 arabic-numbers text-sm md:text-base">
              {incomeData.total.toLocaleString('ar-SA')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">المصروفات</p>
            <p className="font-bold text-red-600 arabic-numbers text-sm md:text-base">
              {expenseData.total.toLocaleString('ar-SA')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">الرصيد</p>
            <p className={`font-bold arabic-numbers text-sm md:text-base ${
              balance >= 0 ? 'text-emerald-600' : 'text-red-600'
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
