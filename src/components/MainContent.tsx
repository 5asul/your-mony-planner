
import React from 'react';
import IncomeEntry from '@/components/IncomeEntry';
import ExpenseEntry from '@/components/ExpenseEntry';
import BalanceAnalysis from '@/components/BalanceAnalysis';
import FinancialPlanning from '@/components/FinancialPlanning';
import { IncomeData, ExpenseData } from '@/types/financial';

interface MainContentProps {
  activeTab: string;
  isTransitioning: boolean;
  incomeData: IncomeData;
  expenseData: ExpenseData;
  updateIncomeData: (income: IncomeData) => void;
  updateExpenseData: (expense: ExpenseData) => void;
  saveIncome: () => void;
  saveExpense: () => void;
  incomeHasChanges: boolean;
  expenseHasChanges: boolean;
  incomeLoading: boolean;
  expenseLoading: boolean;
  balance: number;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  isTransitioning,
  incomeData,
  expenseData,
  updateIncomeData,
  updateExpenseData,
  saveIncome,
  saveExpense,
  incomeHasChanges,
  expenseHasChanges,
  incomeLoading,
  expenseLoading,
  balance
}) => {
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
    <main className="animate-fade-in pb-24 pt-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Content container with mobile-optimized padding and max-width */}
      <div className="relative z-10 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveTab()}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
