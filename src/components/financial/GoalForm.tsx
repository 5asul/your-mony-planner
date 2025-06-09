
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewGoal {
  title: string;
  targetAmount: string;
  deadline: string;
  category: string;
}

interface GoalFormProps {
  newGoal: NewGoal;
  setNewGoal: React.Dispatch<React.SetStateAction<NewGoal>>;
  onAddGoal: () => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({
  newGoal,
  setNewGoal,
  onAddGoal,
  onCancel
}) => {
  const { t, isRTL } = useLanguage();

  return (
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
            onClick={onAddGoal} 
            className="flex-1 h-12 sm:h-14 text-sm sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
            disabled={!newGoal.title || !newGoal.targetAmount || !newGoal.deadline}
          >
            <span className={isRTL ? 'ml-2' : 'mr-2'}>✅</span>
            {t('addGoal')}
          </Button>
          <Button 
            onClick={onCancel} 
            variant="outline" 
            className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold bg-red-300 hover:bg-red-200"
          >
            {t('cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalForm;
