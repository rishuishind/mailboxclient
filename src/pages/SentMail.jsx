import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mailActions } from '../store/MailBox';

const SentMail = () => {

    const dispatch = useDispatch();
    const myEmail = localStorage.getItem('senderEmail')
    const sentMails = useSelector(state => state.mail.sentMails);

    useEffect(() => {
        let isMounted = true;
        const fetchEmails = async () => {
            try {
                const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent.json`);
                if (!response.ok) {
                    console.log('Auth fails');
                }
                const data = await response.json();
                if (isMounted) {
                    dispatch(mailActions.loadMails(Object.values(data)));
                    dispatch(mailActions.sentEmails(myEmail));
                }
            }
            catch (error) {

            }
        }
        fetchEmails();
        return () => {
            isMounted = false
        }
    }, [])
    return (
        <div className=' bg-slate-200 h-lvh p-3'>
            <div key={sentMails.id} className='grid grid-cols-5'>
                <div className=' col-span-1'>
                    <span className=' font-bold text-xl'>Reciever Email</span>
                </div>
                <div className=' col-span-1'>
                    <span className=' font-bold text-xl'>Subject</span>
                </div>
                <div>
                    <span className=' font-bold text-xl'>Message:</span>
                </div>
            </div>
            {sentMails && sentMails.map((mail) => (
                <div key={mail.id} className='grid grid-cols-5 hover:opacity-55'>
                    <div className=' col-span-1'>
                        <span>{mail.recieverEmail}</span>
                    </div>
                    <div className=' col-span-1'>
                        <span>{mail.subject}</span>
                    </div>
                    <div>
                        <span dangerouslySetInnerHTML={{ __html: mail.message }} className='overflow-hidden text-ellipsis' style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 1, // Adjust this value to limit the number of lines
                        }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SentMail