
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIncomeData } from '@/hooks/useIncomeData';
import { useExpenseData } from '@/hooks/useExpenseData';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';
import MainContent from '@/components/MainContent';
import QuickSummaryBar from '@/components/QuickSummaryBar';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { isRTL } = useLanguage();
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
    return <LoadingScreen />;
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  const balance = incomeData.total - expenseData.total;

  return (
    <div className="min-h-screen bg-white animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <MainContent
        activeTab={activeTab}
        isTransitioning={isTransitioning}
        incomeData={incomeData}
        expenseData={expenseData}
        updateIncomeData={updateIncomeData}
        updateExpenseData={updateExpenseData}
        saveIncome={saveIncome}
        saveExpense={saveExpense}
        incomeHasChanges={incomeHasChanges}
        expenseHasChanges={expenseHasChanges}
        incomeLoading={incomeLoading}
        expenseLoading={expenseLoading}
        balance={balance}
      />
      
      <QuickSummaryBar incomeData={incomeData} expenseData={expenseData} />
    </div>
  );
};

export default Index;
