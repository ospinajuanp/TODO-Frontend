import { useEffect } from 'react';
import { useTasks } from './../context/TasksContext';

import './TasksPage.css'

const TasksPage = () => {

    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) {
        return <h1>No hay tareas</h1>
    }

    return (
        <div className='tasks-container'>
            <h1>Tasks Page</h1>
            <div className='tasks-list'>
                {
                    tasks.map((task, index) => (
                        <div className='task' key={index}>
                            <h2 className='task__title' >{task.title}</h2>
                            <p className='task__description' >{task.description}</p>
                            <label className={`task__status ${task.status}`} >{task.status}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TasksPage;