import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

const TaskCard = ({task}) => {
    const { deleteTask } = useTasks();

    const handleDelete = () => {
        deleteTask(task._id);
    }

    return (
        <div className='task'>
            <header className='task__header'>
                <h2 className='task__title' >{task.title}</h2>
                <div className='task__actions'>
                    <button className='btn__action delete' onClick={handleDelete}>Delete</button>
                    <Link className='btn__action edit' to={`/task/${task._id}`}>Edit</Link>
                </div>
            </header>
            <p className='task__description' >{task.description}</p>
            <label className={`task__status ${task.status}`} >{task.status}</label>
        </div>
    );
};

export default TaskCard;