import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const MyEmails = () => {

    const myEmail = localStorage.getItem('senderEmail').split('@')[0];
    const [emailValues, setEmailValues] = useState([]);

    useEffect(() => {
        toast.loading('Loading emails', { duration: 300 })
        const fetchEmails = async () => {
            const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${myEmail}.json`);
            if (!response.ok) {
                console.log('Auth fails');
            }
            const data = await response.json();
            if (data) {
                toast.success('Mails loaded')
                setEmailValues(Object.values(data));
            } else {
                toast.error('No emails found')
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
                setEmailValues(Object.values(data));
            } else {
                toast.error('No emails found')
            }
        }
        fetchEmails();
    }

    return (
        <>
            <button className=' bg-blue-800 text-red-100 p-3 mt-2 mb-5 ml-4 rounded-md' onClick={checkEmails}>Check Emails</button>
            {emailValues && <div>
                <div className='ml-5'>
                    <div className='grid grid-cols-6'>
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
                    {emailValues.map((value) => (
                        <div className='grid grid-cols-6'>
                            <div className=' col-span-1'>
                                <span>{value.senderEmail}</span>
                            </div>
                            <div className=' col-span-1'>
                                <span className=' text-wrap'>{value.subject}</span>
                            </div>
                            <div className=' col-span-4'>
                                {<span dangerouslySetInnerHTML={{ __html: value.message }} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default MyEmails