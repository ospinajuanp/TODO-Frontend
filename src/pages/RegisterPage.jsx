import { useForm } from 'react-hook-form';

import { registerRequest } from '../api/auth';

import './RegisterPage.css'

const RegisterPage = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const res = await registerRequest(data);
        console.log(res);
    })

    return (
        <div className='register'>
            <h2 className='register__title'>Register</h2>
            <form className='register__form' onSubmit={onSubmit}>
                <input className='register__input register__input--name' type="text" {...register('name', { required: true })} placeholder='name'/>
                <input className='register__input register__input--email' type="email" {...register('email', { required: true })} placeholder='email'/>
                <input className='register__input register__input--password' type="password"{...register('password', { required: true })} placeholder='password'/>
                <button className='register__button' type='submit'>Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;