import { useAuth } from '../context/authContext';

const TasksPage = () => {

    const { user } = useAuth();

    return (
        <div>
            Tasks Page
        </div>
    );
};

export default TasksPage;