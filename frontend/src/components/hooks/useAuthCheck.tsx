import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user.slice";


export const useAuthCheck = (): boolean => {
    const dispatch = useDispatch();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/checkAuthUser`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (!response.ok) throw new Error('Auth check failed');
          
        } catch (error) {
          console.error('Auth check error:', error);
          dispatch(logout());
        } finally {
          setIsAuthChecked(true);
        }
      };
  
      checkAuth();
    }, [dispatch]);
  
    return isAuthChecked;
  };