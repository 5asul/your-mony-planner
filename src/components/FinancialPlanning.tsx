
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import GoalCard from '@/components/financial/GoalCard';
import GoalForm from '@/components/financial/GoalForm';
import DeleteGoalDialog from '@/components/financial/DeleteGoalDialog';
import FinancialSummary from '@/components/financial/FinancialSummary';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface FinancialPlanningProps {
  balance: number;
}

const FinancialPlanning: React.FC<FinancialPlanningProps> = ({ balance }) => {
  const { t, isRTL } = useLanguage();
  
  const [goals, setGoals] = useState<Goal[]>([{
    id: '1',
    title: t('emergencyFund'),
    targetAmount: 30000,
    currentAmount: 8000,
    deadline: '2024-12-31',
    category: 'emergency'
  }, {
    id: '2',
    title: t('newCar'),
    targetAmount: 80000,
    currentAmount: 15000,
    deadline: '2025-06-30',
    category: 'purchase'
  }]);
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'savings'
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<string>('');

  const addGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        deadline: newGoal.deadline,
        category: newGoal.category
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        targetAmount: '',
        deadline: '',
        category: 'savings'
      });
      setShowAddForm(false);
    }
  };

  const updateGoalProgress = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => goal.id === goalId ? {
      ...goal,
      currentAmount: Math.max(0, goal.currentAmount + amount)
    } : goal));
  };

  const confirmDeleteGoal = (goalId: string) => {
    setGoalToDelete(goalId);
    setDeleteDialogOpen(true);
  };

  const deleteGoal = () => {
    setGoals(goals.filter(goal => goal.id !== goalToDelete));
    setDeleteDialogOpen(false);
    setGoalToDelete('');
  };

  const goalToDeleteData = goals.find(goal => goal.id === goalToDelete);

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="card-financial bg-slate-50">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🎯</span>
            <span className="leading-tight">{t('financialPlanningGoals')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Available Savings Card - Mobile Optimized */}
          <FinancialSummary balance={balance} />

          {/* Header with Add Button - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{t('yourFinancialGoals')}</h3>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="btn-financial bg-primary text-white w-full sm:w-auto text-sm sm:text-base"
              size="sm"
            >
              {showAddForm ? t('cancel') : `+ ${t('addNewGoal')}`}
            </Button>
          </div>

          {/* Add Form - Mobile Optimized */}
          {showAddForm && (
            <GoalForm
              newGoal={newGoal}
              setNewGoal={setNewGoal}
              onAddGoal={addGoal}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {/* Goals Grid - Single Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                balance={balance}
                onUpdateProgress={updateGoalProgress}
                onDelete={confirmDeleteGoal}
              />
            ))}
          </div>

          {/* Empty State */}
          {goals.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl text-gray-500 mb-3 sm:mb-4">{t('noCurrentGoals')}</p>
              <p className="text-sm sm:text-base text-gray-400">{t('startAddingGoals')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteGoalDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        goalToDelete={goalToDeleteData}
        onConfirmDelete={deleteGoal}
      />
    </div>
  );
};

export default FinancialPlanning;
