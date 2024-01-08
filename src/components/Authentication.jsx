import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const isLogingIn = useSelector(state => state.auth.isloggingIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const auth_API = isLogingIn ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI';

    const handleLogin = () => {
        dispatch(authActions.toggleLogin());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailRef.current.value.length < 6 || passwordRef.current.value < 6) {
            toast.error('Please enter valid crendentials');
            return;
        }
        if (!isLogingIn) {
            if (passwordRef.current.value !== confirmPasswordRef.current.value) {
                console.log('password does not match');
                toast.error('Password does not match');
                return;
            }
            confirmPasswordRef.current.value = '';
        }

        const fetchForAuth = async () => {
            const response = await fetch(auth_API, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Authentication Failed')
            }
            const data = await response.json();
            dispatch(authActions.setToken(data.idToken));
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('senderEmail', emailRef.current.value);
            toast.success('Logged In Successfully')
            emailRef.current.value = '';
            passwordRef.current.value = '';
            navigate('/mailbox')
        }
        fetchForAuth();
    }


    return (
        <div className='flex-col p-12 rounded-md absolute border-black top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 shadow-2xl'>
            <div>
                <h1 className=' text-lg font-semibold'>{isLogingIn ? 'Login' : 'SignUp'}</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input ref={emailRef} className='border p-1.5 m-1' type="email" placeholder='email' />
                    </div>
                    <div>
                        <input ref={passwordRef} className='border p-1.5 m-1' type="password" placeholder='password' />
                    </div>
                    {!isLogingIn && <div>
                        <input ref={confirmPasswordRef} className='border p-1.5 m-1' type="password" placeholder='confirm password' />
                    </div>}
                    <h1 className=' text-red-600 cursor-pointer'>Forget Password ?</h1>
                    <div>
                        <button type='submit' className='p-2 bg-black text-white rounded-md mt-3'>{isLogingIn ? 'Login' : 'Signup'}</button>
                    </div>
                </form>
            </div>
            <div>
                <button onClick={handleLogin}>{isLogingIn ? "Don't have an account?" : "Already Havem an account"}</button>
            </div>
        </div>
    )
}

export default Authentication