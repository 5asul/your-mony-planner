
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

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

const FinancialPlanning: React.FC<FinancialPlanningProps> = ({
  balance
}) => {
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

  const calculateMonthsToGoal = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (balance <= 0) return '∞';
    return Math.ceil(remaining / balance);
  };

  const categoryIcons = {
    emergency: '🚨',
    savings: '💰',
    purchase: '🛍️',
    travel: '✈️',
    education: '📚',
    health: '🏥'
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
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-base sm:text-lg font-semibold text-blue-700 mb-1 sm:mb-2">{t('availableSavings')}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 arabic-numbers break-words">
              {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')} {t('monthly')}
            </p>
            {balance <= 0 && (
              <p className="text-xs sm:text-sm text-red-600 mt-2">
                ⚠️ {t('needBudgetImprovement')}
              </p>
            )}
          </div>

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
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span>✨</span>
                    <span className="leading-tight">{t('addNewFinancialGoal')}</span>
                  </h4>
                  <p className="text-sm sm:text-base text-blue-600">{t('setGoalPlan')}</p>
                </div>
                
                {/* Form Fields - Single Column on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-blue-500">📝</span>
                      <span>{t('goalTitle')}</span>
                    </Label>
                    <Input 
                      value={newGoal.title} 
                      onChange={e => setNewGoal({...newGoal, title: e.target.value})} 
                      placeholder={t('goalTitlePlaceholder')}
                      className="h-12 sm:h-14 text-sm sm:text-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300" 
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-green-500">💰</span>
                      <span>{t('requiredAmount')}</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={newGoal.targetAmount} 
                        onChange={e => setNewGoal({...newGoal, targetAmount: e.target.value})} 
                        placeholder="50000"
                        className={`h-12 sm:h-14 text-sm sm:text-lg border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-green-300 ${isRTL ? 'pl-12 sm:pl-16' : 'pr-12 sm:pr-16'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      <span className={`absolute ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} top-1/2 transform -translate-y-1/2 text-green-600 font-semibold text-xs sm:text-base`}>
                        {t('currency')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-purple-500">📅</span>
                      <span>{t('targetDate')}</span>
                    </Label>
                    <Input 
                      type="date" 
                      value={newGoal.deadline} 
                      onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} 
                      className="h-12 sm:h-14 text-sm sm:text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-purple-300"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-orange-500">🏷️</span>
                      <span>{t('goalCategory')}</span>
                    </Label>
                    <select 
                      value={newGoal.category} 
                      onChange={e => setNewGoal({...newGoal, category: e.target.value})} 
                      className={`w-full h-12 sm:h-14 text-sm sm:text-lg border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-orange-300 px-3 sm:px-4 ${isRTL ? 'text-right' : 'text-left'} appearance-none`}
                    >
                      <option value="savings">💰 {t('generalSavings')}</option>
                      <option value="emergency">🚨 {t('emergencyFund')}</option>
                      <option value="purchase">🛍️ {t('purchase')}</option>
                      <option value="travel">✈️ {t('travel')}</option>
                      <option value="education">📚 {t('education')}</option>
                      <option value="health">🏥 {t('health')}</option>
                    </select>
                  </div>
                </div>
                
                {/* Action Buttons - Stack on Mobile */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button 
                    onClick={addGoal} 
                    className="flex-1 h-12 sm:h-14 text-sm sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                    disabled={!newGoal.title || !newGoal.targetAmount || !newGoal.deadline}
                  >
                    <span className={isRTL ? 'ml-2' : 'mr-2'}>✅</span>
                    {t('addGoal')}
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(false)} 
                    variant="outline" 
                    className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold bg-red-300 hover:bg-red-200"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Goals Grid - Single Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {goals.map(goal => {
              const progress = goal.currentAmount / goal.targetAmount * 100;
              const remaining = goal.targetAmount - goal.currentAmount;
              const monthsToGoal = calculateMonthsToGoal(goal);
              
              return (
                <Card key={goal.id} className="p-4 sm:p-6 border-2 border-gray-100 hover:border-primary/30 transition-colors bg-blue-50">
                  {/* Goal Header - Mobile Optimized */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{categoryIcons[goal.category as keyof typeof categoryIcons] || '🎯'}</span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm sm:text-lg text-gray-800 break-words leading-tight">{goal.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {t('target')}: {new Date(goal.deadline).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Remaining Amount and Delete - Stack on Small Screens */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0`}>
                        <p className="text-xs text-gray-500">{t('remaining')}</p>
                        <p className="font-bold text-financial-expense arabic-numbers text-xs sm:text-sm break-words">
                          {remaining.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
                        </p>
                      </div>
                      <Button 
                        onClick={() => confirmDeleteGoal(goal.id)} 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-200 bg-red-300 hover:bg-red-200 h-8 w-8 p-0 flex-shrink-0"
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="arabic-numbers">{goal.currentAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}</span>
                      <span className="arabic-numbers">{goal.targetAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}</span>
                    </div>
                    <Progress value={progress} className="h-2 sm:h-3" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{t('completed')} {progress.toFixed(1)}%</span>
                      <span className="text-right">
                        {balance > 0 ? `${monthsToGoal} ${t('monthsRemaining')}` : t('needsBudgetImprovement')}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons - Responsive Grid */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3 sm:mt-4">
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, 500)} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9"
                    >
                      + 500
                    </Button>
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, 1000)} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9"
                    >
                      + 1000
                    </Button>
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, -500)} 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9" 
                      disabled={goal.currentAmount < 500}
                    >
                      - 500
                    </Button>
                  </div>
                </Card>
              );
            })}
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
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm sm:max-w-md bg-white mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold text-red-600">{t('confirmDeleteGoal')}</DialogTitle>
            <DialogDescription className="text-sm sm:text-lg">
              {t('confirmDeleteMessage')} "{goalToDeleteData?.title}"?
              <br />
              <span className="text-xs sm:text-sm text-gray-500 mt-2 block">
                {t('cannotUndoAction')}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
            <Button 
              onClick={deleteGoal} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base"
            >
              {t('yesDeleteGoal')}
            </Button>
            <Button 
              onClick={() => setDeleteDialogOpen(false)} 
              variant="outline" 
              className="flex-1 text-sm sm:text-base"
            >
              {t('cancel')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialPlanning;
