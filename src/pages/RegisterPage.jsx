import { useForm } from 'react-hook-form';

const RegisterPage = () => {

    const { register, handleSubmit } = useForm();

    return (
        <div>
            <form action="">
                <input type="text" {...register} />
                <input type="email" {...register} />
                <input type="password"{...register} />
            </form>
        </div>
    );
};

export default RegisterPage;