import { create } from 'zustand';
import { transactionService } from '../api/services/transaction.service';
import type { TransactionDto, CreateTransactionDto, UpdateTransactionDto } from '../api/dtos/transaction.dto';

interface TransactionState {
  transactions: TransactionDto[];
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  selectedTransaction: TransactionDto | null;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  createTransaction: (data: CreateTransactionDto) => Promise<void>;
  updateTransaction: (id: string, data: UpdateTransactionDto) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setSelectedTransaction: (transaction: TransactionDto | null) => void;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  isInitialLoading: false,
  error: null,
  selectedTransaction: null,

  fetchTransactions: async () => {
    try {
      set({ isInitialLoading: true, error: null });
      const transactions = await transactionService.getAll();
      set({ transactions });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch transactions' });
    } finally {
      set({ isInitialLoading: false });
    }
  },

  createTransaction: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const newTransaction = await transactionService.create(data);
      set(state => ({
        transactions: [...state.transactions, newTransaction],
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create transaction' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateTransaction: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTransaction = await transactionService.update(id, data);
      set(state => ({
        transactions: state.transactions.map(trans => 
          trans.id === id ? updatedTransaction : trans
        ),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update transaction' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await transactionService.delete(id);
      set(state => ({
        transactions: state.transactions.filter(trans => trans.id !== id),
        selectedTransaction: state.selectedTransaction?.id === id ? null : state.selectedTransaction,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete transaction' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
  clearError: () => set({ error: null }),
}));
