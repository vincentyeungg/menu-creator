// use custom hook to send http requests to backend server to avoid duplication of code
import { useState, useCallback, useRef, useEffect } from 'react';

function useHttpClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                signal: httpAbortCtrl.signal
            });
            
            const responseData = await response.json();

            // remove abort controller from array of abort controllers if a request is completed
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
    
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            throw error;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };

};

export default useHttpClient;