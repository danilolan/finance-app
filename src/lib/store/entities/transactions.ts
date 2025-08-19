import type { BaseEntity } from '../types';
import { createEntityStore } from '../createEntityStore';
import type { Category } from './categories';

export interface Transaction extends BaseEntity {
  name: string;
  date: string;
  category?: Category['id'] | null;
  price: number;
  installment: {
    current: number;
    total: number;
  } | null;
}

export const useTransactionStore = createEntityStore<Transaction>('transactions', []);
