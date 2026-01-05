export type DrinkLog = {
  id: string;
  amount: number;
  timestamp: string;
  drinkType: 'water' | 'coffee' | 'tea' | 'juice';
  status: 'pending' | 'success' | 'error';
};

export type DailyGoal = number; // in ml
