import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/authContext';
import { TaskProvider } from './context/TasksContext';

import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/> } />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TaskFormPage />} />
                <Route path="/task/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;