import React from 'react'

const Navbar = () => {
    return (
        <div className='container border border-black w-screen'>
            <div className='flex m-2 justify-between'>
                <div className='ml-10 mr-28'>
                    <h1 className='font-bold'>MailBox Client</h1>
                </div>
                <div>
                    <ul className='flex justify-between border border-black'>
                        <li>Home</li>
                        <li>Contact us</li>
                        <li>About us</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar