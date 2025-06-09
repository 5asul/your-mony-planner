
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncomeData, ExpenseData } from '@/types/financial';

interface BalanceAnalysisProps {
  income: IncomeData;
  expenses: ExpenseData;
}

const BalanceAnalysis: React.FC<BalanceAnalysisProps> = ({ income, expenses }) => {
  const { t, isRTL } = useLanguage();
  const balance = income.total - expenses.total;
  const isPositive = balance >= 0;

  const expenseData = [
    { name: t('housing'), value: expenses.housing, color: '#EF4444' },
    { name: t('utilities'), value: expenses.utilities, color: '#F97316' },
    { name: t('food'), value: expenses.food, color: '#10B981' },
    { name: t('transportation'), value: expenses.transportation, color: '#3B82F6' },
    { name: t('education'), value: expenses.education, color: '#8B5CF6' },
    { name: t('entertainment'), value: expenses.entertainment, color: '#EC4899' },
    { name: t('health'), value: expenses.health, color: '#14B8A6' },
    { name: t('savings'), value: expenses.savings, color: '#6366F1' }
  ].filter(item => item.value > 0);

  const comparisonData = [
    { name: t('income'), value: income.total },
    { name: t('expenses'), value: expenses.total }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Balance Summary */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3">
            <span>📊</span>
            {t('budgetSummary')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">{t('totalIncome')}</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 arabic-numbers">
                {income.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">{t('totalExpenses')}</p>
              <p className="text-2xl md:text-3xl font-bold text-red-600 arabic-numbers">
                {expenses.total.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
            </div>
            
            <div className={`text-center p-4 md:p-6 rounded-xl ${
              isPositive 
                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200' 
                : 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200'
            }`}>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">{t('balance')}</p>
              <p className={`text-2xl md:text-3xl font-bold arabic-numbers ${
                isPositive ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}
              </p>
              {!isPositive && (
                <p className="text-xs md:text-sm text-red-600 mt-2 font-semibold">⚠️ {t('exceedsIncome')}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
              <span>🥧</span>
              {t('expenseDistribution')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={12}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} ${t('currency')}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
              <span>📊</span>
              {t('incomeVsExpenses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} ${t('currency')}`, '']} />
                <Bar dataKey="value">
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563EB' : '#DC2626'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Tips */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
            <span>💡</span>
            {t('financialTips')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isPositive ? (
              <>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="font-semibold text-emerald-700 mb-2">✅ {t('goodFinancialPosition')}</p>
                  <p className="text-sm text-gray-700">
                    {t('surplusAmount')} {balance.toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}. {t('considerInvestment')}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-2">🎯 {t('savingsGoal')}</p>
                  <p className="text-sm text-gray-700">
                    {t('recommendedSavings')} {(income.total * 0.2).toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')} {t('monthly')}.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-700 mb-2">⚠️ {t('budgetDeficit')}</p>
                  <p className="text-sm text-gray-700">
                    {t('deficitWarning')} {Math.abs(balance).toLocaleString(isRTL ? 'ar-SA' : 'en-US')} {t('currency')}.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-semibold text-orange-700 mb-2">📉 {t('savingsSuggestions')}</p>
                  <p className="text-sm text-gray-700">{t('reviewExpenses')}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceAnalysis;
