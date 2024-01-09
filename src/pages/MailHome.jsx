import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const MailHome = () => {
    return (
        <div>
            <div className=' text-center mt-16'>
                <p className=' text-lg'>{`Hello there user ${localStorage.getItem('senderEmail').split('@')[0]} What do you want to do?`}
                </p>
                <span>To send an email click on the Compose button<br /></span>
                <span>To check your emails click on the Inbox button</span>
            </div>
            <div className=' flex justify-between'>
                <NavLink className='ml-10 bg-black text-white px-3 py-2 rounded-md' to='/mailbox/compose'>Compose Mail</NavLink>
                <Link className='mr-10 bg-black text-white px-3 py-2 rounded-md' to='/mailbox/my-emails'>Inbox</Link>
            </div>
        </div>
    )
}

export default MailHome