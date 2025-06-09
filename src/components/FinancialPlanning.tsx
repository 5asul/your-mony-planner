
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
    <div className="max-w-6xl mx-auto p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="card-financial bg-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <span>🎯</span>
            {t('financialPlanningGoals')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-lg font-semibold text-blue-700 mb-2">{t('availableSavings')}</p>
            <p className="text-3xl font-bold text-blue-800 arabic-numbers">
              {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')} {t('monthly')}
            </p>
            {balance <= 0 && (
              <p className="text-sm text-red-600 mt-2">
                ⚠️ {t('needBudgetImprovement')}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">{t('yourFinancialGoals')}</h3>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="btn-financial bg-primary text-white"
            >
              {showAddForm ? t('cancel') : `+ ${t('addNewGoal')}`}
            </Button>
          </div>

          {showAddForm && (
            <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span>✨</span>
                    {t('addNewFinancialGoal')}
                  </h4>
                  <p className="text-blue-600">{t('setGoalPlan')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-blue-500">📝</span>
                      {t('goalTitle')}
                    </Label>
                    <div className="relative">
                      <Input 
                        value={newGoal.title} 
                        onChange={e => setNewGoal({...newGoal, title: e.target.value})} 
                        placeholder={t('goalTitlePlaceholder')}
                        className="h-14 text-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300" 
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-green-500">💰</span>
                      {t('requiredAmount')}
                    </Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={newGoal.targetAmount} 
                        onChange={e => setNewGoal({...newGoal, targetAmount: e.target.value})} 
                        placeholder="50000"
                        className={`h-14 text-lg border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-green-300 ${isRTL ? 'pl-16' : 'pr-16'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      <span className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-green-600 font-semibold`}>
                        {t('currency')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-purple-500">📅</span>
                      {t('targetDate')}
                    </Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        value={newGoal.deadline} 
                        onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} 
                        className="h-14 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-purple-300"
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-orange-500">🏷️</span>
                      {t('goalCategory')}
                    </Label>
                    <div className="relative">
                      <select 
                        value={newGoal.category} 
                        onChange={e => setNewGoal({...newGoal, category: e.target.value})} 
                        className={`w-full h-14 text-lg border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-orange-300 px-4 ${isRTL ? 'text-right' : 'text-left'} appearance-none`}
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
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button 
                    onClick={addGoal} 
                    className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                    disabled={!newGoal.title || !newGoal.targetAmount || !newGoal.deadline}
                  >
                    <span className={isRTL ? 'ml-2' : 'mr-2'}>✅</span>
                    {t('addGoal')}
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(false)} 
                    variant="outline" 
                    className="h-14 px-8 text-lg border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold bg-red-300 hover:bg-red-200"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {goals.map(goal => {
              const progress = goal.currentAmount / goal.targetAmount * 100;
              const remaining = goal.targetAmount - goal.currentAmount;
              const monthsToGoal = calculateMonthsToGoal(goal);
              
              return (
                <Card key={goal.id} className="p-6 border-2 border-gray-100 hover:border-primary/30 transition-colors bg-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryIcons[goal.category as keyof typeof categoryIcons] || '🎯'}</span>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{goal.title}</h4>
                        <p className="text-sm text-gray-500">
                          {t('target')}: {new Date(goal.deadline).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-500">{t('remaining')}</p>
                        <p className="font-bold text-financial-expense arabic-numbers">
                          {remaining.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
                        </p>
                      </div>
                      <Button 
                        onClick={() => confirmDeleteGoal(goal.id)} 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-200 bg-red-300 hover:bg-red-200"
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{goal.currentAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}</span>
                      <span>{goal.targetAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{t('completed')} {progress.toFixed(1)}%</span>
                      <span>
                        {balance > 0 ? `${monthsToGoal} ${t('monthsRemaining')}` : t('needsBudgetImprovement')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, 500)} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      + 500 {t('currency')}
                    </Button>
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, 1000)} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      + 1000 {t('currency')}
                    </Button>
                    <Button 
                      onClick={() => updateGoalProgress(goal.id, -500)} 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white flex-1" 
                      disabled={goal.currentAmount < 500}
                    >
                      - 500 {t('currency')}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">{t('noCurrentGoals')}</p>
              <p className="text-gray-400">{t('startAddingGoals')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">{t('confirmDeleteGoal')}</DialogTitle>
            <DialogDescription className="text-lg">
              {t('confirmDeleteMessage')} "{goalToDeleteData?.title}"?
              <br />
              <span className="text-sm text-gray-500 mt-2 block">
                {t('cannotUndoAction')}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={deleteGoal} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {t('yesDeleteGoal')}
            </Button>
            <Button 
              onClick={() => setDeleteDialogOpen(false)} 
              variant="outline" 
              className="flex-1"
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
