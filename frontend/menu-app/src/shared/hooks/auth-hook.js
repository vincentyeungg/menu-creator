import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      // once user logs in, set the token expiration to after 1 hour, as configured in the backend
      // if user already has an existing token configured earlier within the hour, use that token instead
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify(
        {
          userId: uid, 
          token: token,
          expiration: tokenExpirationDate.toISOString()
        }
      ));
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
          // backend timer limits token to 1 hour
          const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
          logoutTimer = setTimeout(logout, remainingTime);
        } else {
          // if user triggers logout, then clear all timeout functions
          clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      } 
    }, [login]);

    return { token, login, logout, userId };
};