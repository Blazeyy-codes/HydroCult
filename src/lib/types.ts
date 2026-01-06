import type { Timestamp } from "firebase/firestore";

export type DrinkLog = {
    id: string;
    drinkType: 'water' | 'coffee' | 'tea' | 'juice';
    amount: number;
    timestamp: string; // ISO string for client-side
};

// This type represents the data structure as it is stored in and retrieved from Firestore
export type FirebaseDrinkLog = Omit<DrinkLog, 'timestamp'> & {
    id: string;
    timestamp: Timestamp; // Firestore Timestamp object
};
