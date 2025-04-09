import { useForm } from "react-hook-form";
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import './LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit , formState: { errors }} = useForm();
    const { signin, isAuthenticated , errors:loginErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated]);

    return (
        <div className='login'>
            <h2 className='login__title'>Login</h2>
            <div>
                {loginErrors && 
                    loginErrors.map((error, index) => (
                        <div className='login__error error-api' key={index}>{error}</div>
                    ))
                }
            </div>
            <form className='login__form' onSubmit={onSubmit}>
                <input className='login__input login__input--email' type="email" {...register('email', { required: true })} placeholder='email'/>
                {errors.email && <span className='login__error'>Email is required</span>}
                <div className='login__password--container'>
                    <input className='login__input login__input--password' type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} placeholder='password'/>
                    {!showPassword && <FaRegEye className={`login__password--icon ${!showPassword ? 'active' : 'inactive'}`} onClick={togglePasswordVisibility} />}
                    {showPassword && <FaRegEyeSlash className={`login__password--icon ${showPassword ? 'active' : 'inactive'}`}onClick={togglePasswordVisibility} />}
                </div>
                    {errors.password && <span className='login__error'>Password is required</span>}
                <button className='login__button' type='submit'>Login</button>
                <p>Don't have an account?   <Link className="button" to={'/register'}>Register</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;