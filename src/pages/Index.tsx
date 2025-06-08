
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop&crop=center" 
              alt="Eid Mubarak" 
              className="w-64 h-48 object-cover rounded-xl shadow-lg mx-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end justify-center">
              <h2 className="text-white text-2xl font-bold mb-4 text-center">عيد مبارك</h2>
            </div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري التحميل...</p>
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
