export interface TransactionDto {
  id: string;
  description: string;
  payment: number;
  deposit: number;
  date: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface CreateTransactionDto {
  description: string;
  payment: number;
  deposit: number;
  date: string;
  categoryId: string;
}

export interface UpdateTransactionDto {
  description?: string;
  payment?: number;
  deposit?: number;
  date?: string;
  categoryId?: string;
}
