import { api } from '../axios-instance';
import type { TransactionDto, CreateTransactionDto, UpdateTransactionDto } from '../dtos/transaction.dto';

export const transactionService = {
  async getAll(): Promise<TransactionDto[]> {
    const response = await api.get<TransactionDto[]>('/transactions');
    return response.data;
  },

  async getById(id: string): Promise<TransactionDto> {
    const response = await api.get<TransactionDto>(`/transactions/${id}`);
    return response.data;
  },

  async create(data: CreateTransactionDto): Promise<TransactionDto> {
    const response = await api.post<TransactionDto>('/transactions', data);
    return response.data;
  },

  async update(id: string, data: UpdateTransactionDto): Promise<TransactionDto> {
    const response = await api.patch<TransactionDto>(`/transactions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },
};
