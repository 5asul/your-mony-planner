import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
  const [goals, setGoals] = useState<Goal[]>([{
    id: '1',
    title: 'صندوق الطوارئ',
    targetAmount: 30000,
    currentAmount: 8000,
    deadline: '2024-12-31',
    category: 'emergency'
  }, {
    id: '2',
    title: 'سيارة جديدة',
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
  return <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="card-financial bg-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <span>🎯</span>
            التخطيط المالي والأهداف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-lg font-semibold text-blue-700 mb-2">رصيدك المتاح للادخار</p>
            <p className="text-3xl font-bold text-blue-800 arabic-numbers">
              {balance.toLocaleString('ar-SA')} ريال شهرياً
            </p>
            {balance <= 0 && <p className="text-sm text-red-600 mt-2">⚠️ تحتاج لتحسين ميزانيتك قبل وضع أهداف ادخار جديدة</p>}
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">أهدافك المالية</h3>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="btn-financial bg-primary text-white">
              {showAddForm ? 'إلغاء' : '+ إضافة هدف جديد'}
            </Button>
          </div>

          {showAddForm && <Card className="mb-6 p-4 bg-gray-50 border-2 border-dashed border-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">عنوان الهدف</Label>
                  <Input value={newGoal.title} onChange={e => setNewGoal({
                ...newGoal,
                title: e.target.value
              })} placeholder="مثال: شراء منزل" className="input-financial" />
                </div>
                <div>
                  <Label className="font-semibold">المبلغ المطلوب (ريال)</Label>
                  <Input type="number" value={newGoal.targetAmount} onChange={e => setNewGoal({
                ...newGoal,
                targetAmount: e.target.value
              })} placeholder="50000" className="input-financial" />
                </div>
                <div>
                  <Label className="font-semibold">التاريخ المستهدف</Label>
                  <Input type="date" value={newGoal.deadline} onChange={e => setNewGoal({
                ...newGoal,
                deadline: e.target.value
              })} className="input-financial" />
                </div>
                <div>
                  <Label className="font-semibold">فئة الهدف</Label>
                  <select value={newGoal.category} onChange={e => setNewGoal({
                ...newGoal,
                category: e.target.value
              })} className="input-financial">
                    <option value="savings">ادخار عام</option>
                    <option value="emergency">صندوق طوارئ</option>
                    <option value="purchase">شراء</option>
                    <option value="travel">سفر</option>
                    <option value="education">تعليم</option>
                    <option value="health">صحة</option>
                  </select>
                </div>
              </div>
              <Button onClick={addGoal} className="mt-4 btn-financial bg-blue-600 text-white hover:bg-blue-700">
                إضافة الهدف
              </Button>
            </Card>}

          <div className="grid lg:grid-cols-2 gap-6">
            {goals.map(goal => {
            const progress = goal.currentAmount / goal.targetAmount * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            const monthsToGoal = calculateMonthsToGoal(goal);
            return <Card key={goal.id} className="p-6 border-2 border-gray-100 hover:border-primary/30 transition-colors bg-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryIcons[goal.category as keyof typeof categoryIcons] || '🎯'}</span>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{goal.title}</h4>
                        <p className="text-sm text-gray-500">مستهدف: {new Date(goal.deadline).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">المتبقي</p>
                      <p className="font-bold text-financial-expense arabic-numbers">
                        {remaining.toLocaleString('ar-SA')} ريال
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{goal.currentAmount.toLocaleString('ar-SA')} ريال</span>
                      <span>{goal.targetAmount.toLocaleString('ar-SA')} ريال</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>تم إنجاز {progress.toFixed(1)}%</span>
                      <span>
                        {balance > 0 ? `${monthsToGoal} شهر متبقي` : 'يحتاج تحسين الميزانية'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => updateGoalProgress(goal.id, 500)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                      + 500 ريال
                    </Button>
                    <Button onClick={() => updateGoalProgress(goal.id, 1000)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                      + 1000 ريال
                    </Button>
                    <Button onClick={() => updateGoalProgress(goal.id, -500)} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white flex-1" disabled={goal.currentAmount < 500}>
                      - 500 ريال
                    </Button>
                  </div>
                </Card>;
          })}
          </div>

          {goals.length === 0 && <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">لا توجد أهداف مالية حالياً</p>
              <p className="text-gray-400">ابدأ بإضافة هدفك المالي الأول!</p>
            </div>}
        </CardContent>
      </Card>
    </div>;
};
export default FinancialPlanning;
