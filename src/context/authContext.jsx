import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (data) => {
        try {
            const res = await registerRequest(data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors([`${error.response.data.message}`]);
        }
    };

    const signin = async (data) => {
        try {
            const res = await loginRequest(data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors([`${error.response.data.message}`]);
        }
    };

    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer =setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return
                }
                setUser(res.data);
                setIsAuthenticated(true);
                setLoading(false);
                
            }catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
            
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors
            }}>
                {children}
        </AuthContext.Provider>
    );
};