import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';

import './TaskFormPage.css';
import {  useEffect } from 'react';

const TaskAddPage = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { createTasks, getTask, updateTask } = useTasks();
    const Navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                setValue('title', task.title);
                setValue('description', task.description);
                setValue('status', task.status);
            }
        }
        loadTask();
    }, [params.id]);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, data);
        } else {
            createTasks(data)
        }
        Navigate('/tasks');
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
                <button className='task__button' >Save</button>
            </form>
        </div>
    );
};

export default TaskAddPage;
