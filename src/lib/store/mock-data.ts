import type { Category } from './entities/categories';
import type { Transaction } from './transactions';
import type { BaseEntity } from './types';

// Mock Categories
export const mockCategories: Omit<Category, keyof BaseEntity>[] = [
  { name: 'Food & Dining', color: 'pastel-peach' },
  { name: 'Shopping', color: 'pastel-pink' },
  { name: 'Transportation', color: 'pastel-blue' },
  { name: 'Bills & Utilities', color: 'pastel-purple' },
  { name: 'Entertainment', color: 'pastel-yellow' },
  { name: 'Health & Fitness', color: 'pastel-mint' },
  { name: 'Travel', color: 'pastel-sky' },
  { name: 'Education', color: 'pastel-lavender' },
  { name: 'Investments', color: 'pastel-green' },
  { name: 'Income', color: 'pastel-teal' },
];

// Helper to generate random date within last 3 months
function getRandomDate() {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 3);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Helper to generate random price between min and max
function getRandomPrice(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Mock Transactions Generator
export function generateMockTransactions(categoryIds: string[]): Omit<Transaction, keyof BaseEntity>[] {
  const transactions: Omit<Transaction, keyof BaseEntity>[] = [];
  const transactionNames = [
    'Grocery Shopping',
    'Restaurant Bill',
    'Uber Ride',
    'Movie Tickets',
    'Gym Membership',
    'Electric Bill',
    'Internet Service',
    'Online Course',
    'Stock Purchase',
    'Salary Deposit',
    'Coffee Shop',
    'Gas Station',
    'Phone Bill',
    'Amazon Purchase',
    'Medical Checkup',
  ];

  // Generate 50 random transactions
  for (let i = 0; i < 50; i++) {
    const hasInstallment = Math.random() > 0.7; // 30% chance of installment
    const installment = hasInstallment
      ? {
          current: Math.floor(Math.random() * 3) + 1, // 1-3
          total: Math.floor(Math.random() * 8) + 4, // 4-12
        }
      : null;

    transactions.push({
      name: transactionNames[Math.floor(Math.random() * transactionNames.length)],
      date: getRandomDate(),
      category: categoryIds[Math.floor(Math.random() * categoryIds.length)],
      price: getRandomPrice(10, 1000),
      installment,
    });
  }

  return transactions;
}

// Function to populate the stores
export async function populateStores(
  categoryStore: {
    getAll: () => Category[];
    remove: (id: string) => void;
    add: (item: Omit<Category, keyof BaseEntity>) => void;
  },
  transactionStore: {
    getAll: () => Transaction[];
    remove: (id: string) => void;
    add: (item: Omit<Transaction, keyof BaseEntity>) => void;
  }
) {
  // Clear existing data
  const existingCategories = categoryStore.getAll();
  const existingTransactions = transactionStore.getAll();

  existingCategories.forEach((cat) => categoryStore.remove(cat.id));
  existingTransactions.forEach((trans) => transactionStore.remove(trans.id));

  // Add categories
  mockCategories.forEach((category) => categoryStore.add(category));

  // Get category IDs and generate transactions
  const categories = categoryStore.getAll();
  const categoryIds = categories.map((cat) => cat.id);
  const transactions = generateMockTransactions(categoryIds);

  // Add transactions
  transactions.forEach((transaction) => transactionStore.add(transaction));

  console.log('Mock data populated successfully!');
  console.log(`Added ${categories.length} categories and ${transactions.length} transactions.`);
}
