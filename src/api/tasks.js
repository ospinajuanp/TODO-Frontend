import axios from './axios';

export const getTasksRequest = () => axios.get(`/tasks`);

export const getTaskIdRequest = id => axios.get(`/tasks/${id}`);

export const createTaskRequest = task => axios.post(`/tasks`, task);

export const updateTaskRequest = task => axios.put(`/tasks/${task.id}`, task);

export const deleteTaskRequest = task => axios.delete(`/tasks/${task.id}`, task);


