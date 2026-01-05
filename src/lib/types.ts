export type DrinkLog = {
    id: string;
    drinkType: 'water' | 'coffee' | 'tea' | 'juice';
    amount: number;
    timestamp: string;
    status: 'pending' | 'synced' | 'error';
};
