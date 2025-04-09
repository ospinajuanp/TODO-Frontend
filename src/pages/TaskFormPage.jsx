import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';

import './TaskFormPage.css';

const TaskAddPage = () => {
    const { register, handleSubmit } = useForm();
    const { tasks, createTasks } = useTasks();

    const onSubmit = handleSubmit((data) => {
        createTasks(data)
    });

    return (
        <div className='task-container'>
            <form className='task-form' onSubmit={onSubmit}>
                <input
                    className='task__input'
                    type='text'
                    placeholder='Title'
                    {...register('title', { required: true })}
                    autoFocus
                />

                <textarea
                    className='task__input'
                    rows='3'
                    placeholder='Description'
                    {...register('description', { required: true })}
                />

                {/* Wrapper agregado para la flecha decorativa */}
                <div className='task__select-wrapper'>
                    <select
                    className='task__select'
                    {...register('status', { required: true })}
                    >
                        <option value='pending'>Pending</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <button className='task__button' >Add Task</button>
            </form>
        </div>
    );
};

export default TaskAddPage;
