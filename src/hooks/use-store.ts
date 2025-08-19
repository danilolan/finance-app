import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseStoreOptions<T> {
  key: string;
  initialData?: T | null;
  onError?: (error: Error) => void;
  storage?: 'local' | 'api';  // We can extend this later with more options
}

interface UseStoreResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: T | ((prev: T | null) => T)) => Promise<void>;
  removeData: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useStore<T>({
  key,
  initialData = null,
  onError,
  storage = 'local'
}: UseStoreOptions<T>): UseStoreResult<T> {
  const [data, setDataState] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Helper to handle errors consistently
  const handleError = useCallback((error: Error) => {
    setError(error);
    onError?.(error);
    toast.error('An error occurred', {
      description: error.message
    });
  }, [onError]);

  // Fetch data from storage
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (storage === 'local') {
        const item = localStorage.getItem(key);
        const parsedData = item ? JSON.parse(item) : null;
        setDataState(parsedData);
      } else {
        // Here we'll add API fetching logic in the future
        // const response = await fetch(`/api/${key}`);
        // const data = await response.json();
        // setDataState(data);
      }
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setIsLoading(false);
    }
  }, [key, storage, handleError]);

  // Set data to storage
  const setData = useCallback(async (newData: T | ((prev: T | null) => T)) => {
    setIsLoading(true);
    setError(null);

    try {
      const valueToStore = newData instanceof Function ? newData(data) : newData;

      if (storage === 'local') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
        setDataState(valueToStore);
      } else {
        // Here we'll add API update logic in the future
        // await fetch(`/api/${key}`, {
        //   method: 'PUT',
        //   body: JSON.stringify(valueToStore)
        // });
        // setDataState(valueToStore);
      }
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Failed to save data'));
    } finally {
      setIsLoading(false);
    }
  }, [key, storage, data, handleError]);

  // Remove data from storage
  const removeData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (storage === 'local') {
        localStorage.removeItem(key);
        setDataState(null);
      } else {
        // Here we'll add API delete logic in the future
        // await fetch(`/api/${key}`, { method: 'DELETE' });
        // setDataState(null);
      }
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Failed to remove data'));
    } finally {
      setIsLoading(false);
    }
  }, [key, storage, handleError]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    setData,
    removeData,
    refresh: fetchData
  };
}
