
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface GoalCardProps {
  goal: Goal;
  balance: number;
  onUpdateProgress: (goalId: string, amount: number) => void;
  onDelete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  balance,
  onUpdateProgress,
  onDelete
}) => {
  const { t, isRTL } = useLanguage();

  const categoryIcons = {
    emergency: '🚨',
    savings: '💰',
    purchase: '🛍️',
    travel: '✈️',
    education: '📚',
    health: '🏥'
  };

  const calculateMonthsToGoal = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (balance <= 0) return '∞';
    return Math.ceil(remaining / balance);
  };

  const progress = goal.currentAmount / goal.targetAmount * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsToGoal = calculateMonthsToGoal(goal);

  return (
    <Card className="p-4 sm:p-6 border-2 border-gray-100 hover:border-primary/30 transition-colors bg-blue-50">
      {/* Goal Header - Mobile Optimized */}
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="text-xl sm:text-2xl flex-shrink-0">
            {categoryIcons[goal.category as keyof typeof categoryIcons] || '🎯'}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm sm:text-lg text-gray-800 break-words leading-tight">
              {goal.title}
            </h4>
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
            onClick={() => onDelete(goal.id)} 
            size="sm" 
            variant="outline" 
            className="group relative h-8 w-8 p-0 bg-red-50 border-red-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200 flex-shrink-0"
          >
            <Trash2 
              size={14} 
              className="text-red-500 group-hover:text-red-700 transition-colors" 
            />
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="arabic-numbers">
            {goal.currentAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
          </span>
          <span className="arabic-numbers">
            {goal.targetAmount.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
          </span>
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
          onClick={() => onUpdateProgress(goal.id, 500)} 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9"
        >
          + 500
        </Button>
        <Button 
          onClick={() => onUpdateProgress(goal.id, 1000)} 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9"
        >
          + 1000
        </Button>
        <Button 
          onClick={() => onUpdateProgress(goal.id, -500)} 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-2 py-1 h-8 sm:h-9" 
          disabled={goal.currentAmount < 500}
        >
          - 500
        </Button>
      </div>
    </Card>
  );
};

export default GoalCard;
