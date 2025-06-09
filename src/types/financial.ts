
export interface IncomeData {
  basicSalary: number;
  freelance: number;
  rent: number;
  investments: number;
  other: number;
  total: number;
  [key: string]: number;
}

export interface ExpenseData {
  housing: number;
  utilities: number;
  food: number;
  transportation: number;
  education: number;
  entertainment: number;
  health: number;
  savings: number;
  total: number;
  [key: string]: number;
}
