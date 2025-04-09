import { createContext, useState, useContext } from "react";
import { registerRequest } from '../api/auth';


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
    const [errors, setErrors] = useState([' ']);

    const signup = async (data) => {
        try {
            const res = await registerRequest(data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
            // console.log(errors);
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                signup,
                user,
                isAuthenticated,
                errors
            }}>
                {children}
        </AuthContext.Provider>
    );
};