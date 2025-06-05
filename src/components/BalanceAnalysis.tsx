
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BalanceAnalysisProps {
  income: { total: number; [key: string]: number };
  expenses: { 
    total: number;
    housing: number;
    utilities: number;
    food: number;
    transportation: number;
    education: number;
    entertainment: number;
    health: number;
    savings: number;
  };
}

const BalanceAnalysis: React.FC<BalanceAnalysisProps> = ({ income, expenses }) => {
  const balance = income.total - expenses.total;
  const isPositive = balance >= 0;

  const expenseData = [
    { name: 'السكن', value: expenses.housing, color: '#EF4444' },
    { name: 'الفواتير', value: expenses.utilities, color: '#F59E0B' },
    { name: 'الطعام', value: expenses.food, color: '#10B981' },
    { name: 'المواصلات', value: expenses.transportation, color: '#3B82F6' },
    { name: 'التعليم', value: expenses.education, color: '#8B5CF6' },
    { name: 'الترفيه', value: expenses.entertainment, color: '#EC4899' },
    { name: 'الصحة', value: expenses.health, color: '#14B8A6' },
    { name: 'الادخار', value: expenses.savings, color: '#6366F1' }
  ].filter(item => item.value > 0);

  const comparisonData = [
    { name: 'الدخل', value: income.total },
    { name: 'المصروفات', value: expenses.total }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Balance Summary */}
      <Card className="card-financial">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <span>📊</span>
            ملخص الميزانية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-financial-income/10 to-financial-income/5 rounded-xl">
              <p className="text-lg font-semibold text-gray-700 mb-2">إجمالي الدخل</p>
              <p className="text-3xl font-bold text-financial-income arabic-numbers">
                {income.total.toLocaleString('ar-SA')} ريال
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-financial-expense/10 to-financial-expense/5 rounded-xl">
              <p className="text-lg font-semibold text-gray-700 mb-2">إجمالي المصروفات</p>
              <p className="text-3xl font-bold text-financial-expense arabic-numbers">
                {expenses.total.toLocaleString('ar-SA')} ريال
              </p>
            </div>
            
            <div className={`text-center p-6 rounded-xl ${
              isPositive 
                ? 'bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/20' 
                : 'bg-gradient-to-r from-danger/10 to-danger/5 border-2 border-danger/20'
            }`}>
              <p className="text-lg font-semibold text-gray-700 mb-2">الرصيد</p>
              <p className={`text-3xl font-bold arabic-numbers ${
                isPositive ? 'text-success' : 'text-danger'
              }`}>
                {balance.toLocaleString('ar-SA')} ريال
              </p>
              {!isPositive && (
                <p className="text-sm text-danger mt-2 font-semibold">⚠️ تحذير: المصروفات تتجاوز الدخل!</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="card-financial">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <span>🥧</span>
              توزيع المصروفات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="card-financial">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <span>📊</span>
              مقارنة الدخل والمصروفات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, '']} />
                <Bar dataKey="value">
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#DC2626'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Tips */}
      <Card className="card-financial">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <span>💡</span>
            نصائح مالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {isPositive ? (
              <>
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <p className="font-semibold text-success mb-2">✅ وضع مالي جيد!</p>
                  <p className="text-sm text-gray-700">لديك فائض قدره {balance.toLocaleString('ar-SA')} ريال. فكر في زيادة الادخار أو الاستثمار.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-2">🎯 هدف الادخار</p>
                  <p className="text-sm text-gray-700">يُنصح بادخار 20% من الدخل. هدفك: {(income.total * 0.2).toLocaleString('ar-SA')} ريال شهرياً.</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
                  <p className="font-semibold text-danger mb-2">⚠️ عجز في الميزانية</p>
                  <p className="text-sm text-gray-700">يجب تقليل المصروفات أو زيادة الدخل بمقدار {Math.abs(balance).toLocaleString('ar-SA')} ريال.</p>
                </div>
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="font-semibold text-warning mb-2">📉 اقتراحات التوفير</p>
                  <p className="text-sm text-gray-700">راجع المصروفات غير الضرورية مثل الترفيه والطعام خارج المنزل.</p>
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
