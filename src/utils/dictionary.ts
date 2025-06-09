
export const dictionary = {
  ar: {
    // Navigation
    appTitle: 'حاسبة الميزانية الشخصية',
    appTitleShort: 'حاسبة الميزانية',
    income: 'الدخل',
    expenses: 'المصروفات',
    analysis: 'التحليل',
    planning: 'التخطيط',
    logout: 'خروج',
    logoutFull: 'تسجيل الخروج',
    
    // Common
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    saved: 'تم الحفظ',
    loading: 'جاري التحميل...',
    welcome: 'مرحباً بك',
    balance: 'الرصيد',
    total: 'المجموع',
    
    // Income
    incomeEntry: 'إدخال الدخل',
    salary: 'الراتب',
    freelance: 'العمل الحر',
    investments: 'الاستثمارات',
    other: 'أخرى',
    amount: 'المبلغ',
    
    // Expenses
    expenseEntry: 'إدخال المصروفات',
    housing: 'السكن',
    food: 'الطعام',
    transportation: 'المواصلات',
    entertainment: 'الترفيه',
    healthcare: 'الرعاية الصحية',
    education: 'التعليم',
    
    // Analysis
    balanceAnalysis: 'تحليل الرصيد',
    monthlyIncome: 'الدخل الشهري',
    monthlyExpenses: 'المصروفات الشهرية',
    netBalance: 'صافي الرصيد',
    
    // Planning
    financialPlanning: 'التخطيط المالي',
    goalAmount: 'مبلغ الهدف',
    timeframe: 'الإطار الزمني',
    monthlySavings: 'الادخار الشهري',
    
    // Loading screen
    personalBudgetApp: 'تطبيق إدارة الميزانية الشخصية'
  },
  en: {
    // Navigation
    appTitle: 'Personal Budget Calculator',
    appTitleShort: 'Budget Calculator',
    income: 'Income',
    expenses: 'Expenses',
    analysis: 'Analysis',
    planning: 'Planning',
    logout: 'Logout',
    logoutFull: 'Sign Out',
    
    // Common
    save: 'Save',
    saving: 'Saving...',
    saved: 'Saved',
    loading: 'Loading...',
    welcome: 'Welcome',
    balance: 'Balance',
    total: 'Total',
    
    // Income
    incomeEntry: 'Income Entry',
    salary: 'Salary',
    freelance: 'Freelance',
    investments: 'Investments',
    other: 'Other',
    amount: 'Amount',
    
    // Expenses
    expenseEntry: 'Expense Entry',
    housing: 'Housing',
    food: 'Food',
    transportation: 'Transportation',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    education: 'Education',
    
    // Analysis
    balanceAnalysis: 'Balance Analysis',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    netBalance: 'Net Balance',
    
    // Planning
    financialPlanning: 'Financial Planning',
    goalAmount: 'Goal Amount',
    timeframe: 'Timeframe',
    monthlySavings: 'Monthly Savings',
    
    // Loading screen
    personalBudgetApp: 'Personal Budget Management App'
  }
};

export type Language = 'ar' | 'en';
export type TranslationKey = keyof typeof dictionary.ar;
