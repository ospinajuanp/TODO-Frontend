import { createContext, useContext, useState } from "react";

import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest, getTaskIdRequest } from './../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function TaskProvider ({ children }) {

    const [tasks, setTasks] = useState([]);

    const createTasks = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
        
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.data.status === 204) {
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id, task) => {
        try {
            const res = await getTaskIdRequest(id, task);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id,task) => {
        try {
            const res = await updateTaskRequest(id,task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTasks,
            getTasks,
            getTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

