import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                        <Link to='/my-emails'><li className='ml-5 mr-64'>My Mails</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar