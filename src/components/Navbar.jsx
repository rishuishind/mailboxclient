import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../store/AuthSlice';

const Navbar = () => {

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLoggedIn);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('senderEmail');
        dispatch(authActions.logout());
    }

    return (
        <div className='bg-slate-900 text-slate-50'>
            <div className='flex p-5 justify-between'>
                <div className='ml-10 w-60'>
                    <h1 className='font-bold text-3xl'><a href="/">MailBox Client</a></h1>
                </div>
                <div className=''>
                    <ul className='flex justify-between'>
                        <li className=' ml-5 mr-5'>Home</li>
                        <li className=' ml-5 mr-5'>Contact us</li>
                        <li className=' ml-5 mr-5'>About us</li>
                    </ul>
                </div>
                {isLogin && <Link to='/'>
                    <button onClick={handleLogout} className=' bg-red-600 px-6 py-1 rounded-lg'>Logout</button>
                </Link>}
            </div>
        </div>
    )
}

export default Navbar