import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

import './Navbar.css'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className='navbar'>
            <Link className='navbar__logo' to='/'>
                <h1 className='navbar__title'>Task Manager</h1>
            </Link>
            <ul className='navbar__list'>
                {isAuthenticated ? (
                    <>
                        <li className='navbar__item welcome'>
                            <h1 className=''>Welcome <span className='navbar__item--user'> {user?.name?.split(' ')[0]?.toLowerCase()}</span>
                            </h1>
                        </li>
                        {/* <li className='navbar__item'>
                            <Link className='link' to='/tasks'>Tasks</Link>
                        </li> */}
                        <li className='navbar__item'>
                            <Link className='link' to='/add-task'>New Task</Link>
                        </li>
                        <li className='navbar__item'>
                            <Link className='link' to='/profile'>Profile</Link>
                        </li>
                        <li className='navbar__item'>
                            <Link className='link' to='/' onClick={logout}>Logout</Link>
                        </li>
                    </>
                ):
                (
                    <>
                        <li className='navbar__item'>
                            <Link className='link' to='/login'>Login</Link>
                        </li>
                        <li className='navbar__item'>
                            <Link className='link' to='/register'>Register</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    );
};

export default Navbar;