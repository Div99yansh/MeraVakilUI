import { useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T, P> extends UseApiState<T> {
  execute: (params: P) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T, P = void>(
  apiFunction: (params: P) => Promise<AxiosResponse<T>>
): UseApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (params: P): Promise<T | null> => {
      setState({ data: null, isLoading: true, error: null });

      try {
        const response = await apiFunction(params);
        setState({ data: response.data, isLoading: false, error: null });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<{ detail?: string }>;
        const errorMessage =
          axiosError.response?.data?.detail || axiosError.message || 'An error occurred';
        setState({ data: null, isLoading: false, error: errorMessage });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
