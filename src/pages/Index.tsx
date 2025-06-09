
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIncomeData } from '@/hooks/useIncomeData';
import { useExpenseData } from '@/hooks/useExpenseData';
import Navigation from '@/components/Navigation';
import IncomeEntry from '@/components/IncomeEntry';
import ExpenseEntry from '@/components/ExpenseEntry';
import BalanceAnalysis from '@/components/BalanceAnalysis';
import FinancialPlanning from '@/components/FinancialPlanning';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('income');
  const [showMainApp, setShowMainApp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { incomeData, updateIncomeData, saveManually: saveIncome, loading: incomeLoading, hasChanges: incomeHasChanges } = useIncomeData();
  const { expenseData, updateExpenseData, saveManually: saveExpense, loading: expenseLoading, hasChanges: expenseHasChanges } = useExpenseData();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/auth';
    }
  }, [user, authLoading]);

  // Add minimum loading time of 3 seconds
  useEffect(() => {
    if (!authLoading && user) {
      const timer = setTimeout(() => {
        setShowMainApp(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [authLoading, user]);

  // Handle smooth tab transitions
  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      setIsTransitioning(true);
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setActiveTab(newTab);
        setIsTransitioning(false);
      }, 150);
    }
  };

  // Show loading while checking authentication or during minimum loading time
  if (authLoading || (!showMainApp && user)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <div className="text-4xl text-white font-bold">💰</div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30 animate-ping"></div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2 animate-fade-in">{t('welcome')}</h1>
            <p className="text-xl text-blue-600 font-semibold animate-fade-in">{t('personalBudgetApp')}</p>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-lg text-blue-700 animate-fade-in">{t('loading')}</p>
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
    const tabContent = (() => {
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
    })();

    return (
      <div className={`transition-all duration-300 ease-out ${
        isTransitioning 
          ? 'opacity-0 translate-y-4 scale-95' 
          : 'opacity-100 translate-y-0 scale-100'
      }`}>
        {tabContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main content with proper spacing to avoid bottom tracker overlap */}
      <main className="animate-fade-in pb-32 pt-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          {renderActiveTab()}
        </div>
      </main>
      
      {/* Enhanced Quick Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-2xl transition-all duration-300 hover:shadow-3xl z-50">
        <div className="max-w-6xl mx-auto p-3 md:p-4">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-gray-600 mb-1 group-hover:text-blue-600 transition-colors">{t('income')}</p>
              <p className="font-bold text-blue-600 arabic-numbers text-sm md:text-base group-hover:scale-110 transition-transform">
                {incomeData.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
              </p>
            </div>
            
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-gray-600 mb-1 group-hover:text-red-600 transition-colors">{t('expenses')}</p>
              <p className="font-bold text-red-600 arabic-numbers text-sm md:text-base group-hover:scale-110 transition-transform">
                {expenseData.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
              </p>
            </div>
            
            <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <p className="text-gray-600 mb-1 group-hover:text-emerald-600 transition-colors">{t('balance')}</p>
              <p className={`font-bold arabic-numbers text-sm md:text-base group-hover:scale-110 transition-all duration-300 ${
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
    </div>
  );
};

export default Index;
