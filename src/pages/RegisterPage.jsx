import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


import './RegisterPage.css'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { signup, isAuthenticated, errors:registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const onSubmit = handleSubmit(async (data) => {
        await signup(data);
    });

    return (
        <div className='register'>
            <h2 className='register__title'>Register</h2>
            <div>

                {registerErrors && 
                    registerErrors.map((error, index) => (
                        <div className='register__error error-api' key={index}>{error}</div>
                    ))
                }
            </div>
            <form className='register__form' onSubmit={onSubmit}>
                <input className='register__input register__input--name' type="text" {...register('name', { required: true })} placeholder='name'/>
                {errors.name && <span className='register__error'>Name is required</span>}
                <input className='register__input register__input--email' type="email" {...register('email', { required: true })} placeholder='email'/>
                {errors.email && <span className='register__error'>Email is required</span>}
                <div className='register__password--container'>
                    <input className='register__input register__input--password' type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} placeholder='password'/>
                    {!showPassword && <FaRegEye className={`register__password--icon ${!showPassword ? 'active' : 'inactive'}`} onClick={togglePasswordVisibility} />}
                    {showPassword && <FaRegEyeSlash className={`register__password--icon ${showPassword ? 'active' : 'inactive'}`}onClick={togglePasswordVisibility} />}
                </div>
                    {errors.password && <span className='register__error'>Password is required</span>}
                <button className='register__button' type='submit'>Register</button>
                <p>Already have an account?   <span className="button" onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
};

export default RegisterPage;