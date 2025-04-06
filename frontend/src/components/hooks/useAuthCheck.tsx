import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login,logout } from "../../store/auth.slice";


export const useAuthCheck = (): boolean => {
    const dispatch = useDispatch();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch(`${API_URL}/checkAuthUser`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (!response.ok) throw new Error('Auth check failed');
          
          const data = await response.json();
          dispatch(data.isAuthenticated ? login(data.user) : logout());
        } catch (error) {
          console.error('Auth check error:', error);
          dispatch(logout());
        } finally {
          setIsAuthChecked(true);
        }
      };
  
      checkAuth();
    }, [dispatch, API_URL]);
  
    return isAuthChecked;
  };