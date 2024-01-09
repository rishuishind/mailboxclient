import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { mailActions } from '../store/MailBox.js';
import { useDispatch, useSelector } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';

const MyEmails = () => {

    const myEmail = localStorage.getItem('senderEmail').split('@')[0];

    const myMails = useSelector(state => state.mail.myMails);
    const unReadMsg = useSelector(state => state.mail.unreadMessage);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${myEmail}.json`);
            if (!response.ok) {
                console.log('Auth fails');
            }
            const data = await response.json();
            if (data) {
                dispatch(mailActions.loadMails(Object.values(data)));
            }
        }
        fetchEmails();
    }, [])


    const checkEmails = () => {
        toast.loading('Loading emails', { duration: 300 })
        const fetchEmails = async () => {
            const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${myEmail}.json`);
            if (!response.ok) {
                console.log('Auth fails');
            }
            const data = await response.json();
            if (data) {
                toast.success('Mails loaded')
                dispatch(mailActions.loadMails(Object.values(data)));
            } else {
                toast.error('No emails found')
            }
        }
        fetchEmails();
    }

    const handleMessageSeen = async (value) => {
        console.log('hi im inside 4');
        const editEmail = async () => {
            console.log('hi im inside');
            try {
                const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${myEmail}/${value.id}.json`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...value,
                        isRead: true
                    })
                });
                if (!response.ok) {
                    console.log('hi im inside 3');
                    throw new Error('request failed');
                }
                console.log('hi im inside 2');
            } catch (error) {
                console.log(error);
            }

        }
        editEmail();
    }

    return (
        <div className=' bg-slate-100'>
            <div className='flex justify-between'>
                <button className=' bg-blue-800 text-red-100 p-3 mt-2 mb-5 ml-4 rounded-md' onClick={checkEmails}>Check Emails</button>
                <span className='px-4 py-3 mt-2 mb-4 bg-slate-700 mr-5 rounded-lg text-white'>Unread:{unReadMsg} </span>
            </div>
            {myMails && <div className=' bg-slate-100 h-screen'>
                <div className=''>
                    <div className='grid grid-cols-6 bg-slate-200 p-5'>
                        <div className=' col-span-1'>
                            <span className=' font-mono font-bold'>Sender Email:</span>
                        </div>
                        <div className=' col-span-1'>
                            <span className=' font-mono font-bold'>Subject:</span>
                        </div>
                        <div className=' col-span-1'>
                            <span className=' font-mono font-bold'>Message:</span>
                        </div>
                    </div>
                    {myMails.map((value) => (
                        <NavLink onClick={() => handleMessageSeen(value)} to={`/mailbox/my-emails/${value.id}`} key={value.id} className='grid grid-cols-6 p-5 hover:opacity-55'>
                            <div className=' col-span-1'>
                                <span>{value.senderEmail}</span>
                            </div>
                            <div className=' col-span-1 flex'>
                                {!value.isRead && <GoDotFill className='flex text-blue-700 ml-2 text-2xl' />}
                                <span className=' text-wrap'>{value.subject}</span>
                            </div>
                            <div id='hey' className='col-span-3'>
                                <span dangerouslySetInnerHTML={{ __html: value.message }} className='overflow-hidden text-ellipsis' style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 1, // Adjust this value to limit the number of lines
                                }} />
                            </div>
                            <div className=' col-span-1'>
                                <button className=' bg-red-600 text-white px-2 py-1 rounded-md'>Delete</button>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default MyEmails