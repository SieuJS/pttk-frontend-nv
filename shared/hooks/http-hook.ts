import { useState, useCallback, useRef, useEffect } from 'react';

interface HttpRequest {
  abort: () => void;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<HttpRequest[]>([]);

  const sendRequest = useCallback(
    async (url: string, method: string = 'GET', headers: HeadersInit = {}, body: BodyInit | null = null) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });
        activeHttpRequests.current.push(httpAbortCtrl);
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => {
        try {
          abortCtrl.abort();
        } catch (err) {
          // handle error if needed
        }
      });
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
