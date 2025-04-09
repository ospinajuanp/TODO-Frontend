import { useEffect } from 'react';
import { useTasks } from './../context/TasksContext';
import TaskCard from '../components/TaskCard';

import './TasksPage.css'

const TasksPage = () => {

    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) {
        return (
            <div className='tasks-container no-tasks'>
                <h1 className='no-tasks'>No hay tareas</h1>
            </div>
        )
    }

    return (
        <div className='tasks-container'>
            <h1>Tasks Page</h1>
            <div className='tasks-list'>
                {
                    tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))
                }
            </div>
        </div>
    );
};

export default TasksPage;