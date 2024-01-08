import React, { useState } from 'react'

const MyEmails = () => {

    const myEmail = localStorage.getItem('senderEmail').split('@')[0];
    const [emailValues, setEmailValues] = useState([]);


    const checkEmails = () => {
        const fetchEmails = async () => {
            const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${myEmail}.json`);
            if (!response.ok) {
                console.log('Auth fails');
            }
            const data = await response.json();
            setEmailValues(Object.values(data));
            console.log(emailValues);
        }
        fetchEmails();
    }

    return (
        <>
            <button className='bg-black text-red-100 p-3' onClick={checkEmails}>Check Emails</button>
            {emailValues && <div>
                <div>
                    <div className='grid grid-cols-6'>
                        <div className=' col-span-1'>
                            <span>Sender Email:</span>
                        </div>
                        <div className=' col-span-1'>
                            <span>Subject:</span>
                        </div>
                        <div className=' col-span-1'>
                            <span>Message:</span>
                        </div>
                    </div>
                    {emailValues.map((value) => (
                        <div className='grid grid-cols-6'>
                            <div className=' col-span-1'>
                                <span>{value.senderEmail}</span>
                            </div>
                            <div className=' col-span-1'>
                                <span>{value.subject}</span>
                            </div>
                            <div className=' col-span-4'>
                                <p>{value.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default MyEmails